
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10 // 10 requests per minute per user

// In-memory rate limit store (resets on cold start, but provides basic protection)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(userId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const userLimit = rateLimitStore.get(userId)
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new window
    rateLimitStore.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }
  
  if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((userLimit.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }
  
  userLimit.count++
  return { allowed: true }
}

// Validation schemas
const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters').trim(),
  email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters').trim(),
  phone: z.string().regex(/^[\d\+\-\s()]{0,20}$/, 'Invalid phone number format').optional().or(z.literal(''))
})

const paymentSchema = z.object({
  amount: z.number().positive('Amount must be positive').max(100000, 'Amount exceeds maximum limit'),
  currency: z.string().length(3, 'Currency must be a 3-letter code').optional().default('USD'),
  customer: customerSchema,
  planId: z.string().optional()
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting payment creation process...')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    // Kashier credentials (mode-scoped: test keys only work in test mode, live in live)
    const kashierApiKey = Deno.env.get('KASHIER_API_KEY')
    const kashierMid = Deno.env.get('KASHIER_MERCHANT_ID')
    const kashierMode = (Deno.env.get('KASHIER_MODE') ?? 'live') === 'test' ? 'test' : 'live'
    if (!kashierApiKey || !kashierMid) {
      console.error('Missing Kashier credentials')
      return new Response(
        JSON.stringify({ error: 'Payment configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')
    console.log('Auth header present:', !!authHeader)
    
    if (!authHeader) {
      console.error('No authorization header provided')
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Authentication failed: ' + authError.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!user) {
      console.error('No user found from token')
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('User authenticated:', user.id)

    // Check rate limit
    const rateLimit = checkRateLimit(user.id)
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for user: ${user.id}`)
      return new Response(
        JSON.stringify({ 
          error: 'Too many payment requests. Please try again later.',
          retryAfter: rateLimit.retryAfter
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimit.retryAfter)
          } 
        }
      )
    }

    // Parse request body
    let body
    try {
      body = await req.json()
      console.log('Request body received:', JSON.stringify(body, null, 2))
    } catch (parseError) {
      console.error('Error parsing request body:', parseError)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate request body with zod schema
    const validationResult = paymentSchema.safeParse(body)
    
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(e => e.message).join(', ')
      console.error('Validation errors:', validationResult.error.errors)
      return new Response(
        JSON.stringify({ error: `Validation failed: ${errorMessages}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { amount, currency, customer, planId } = validationResult.data

    // Generate unique order ID
    const orderId = `FS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log('Generated order ID:', orderId)

    // Create payment transaction record
    const transactionData = {
      order_id: orderId,
      user_id: user.id,
      amount: amount,
      currency: currency || 'USD',
      status: 'pending',
      payment_method: 'kashier',
      customer_data: customer,
      plan_id: planId || null
    }

    console.log('Creating transaction with data:', JSON.stringify(transactionData, null, 2))

    const { data: transaction, error: dbError } = await supabaseClient
      .from('payment_transactions')
      .insert(transactionData)
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Unable to create payment. Please try again or contact support.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Transaction created successfully:', transaction.id)

    // Build Kashier hosted payment page (HPP) URL. Hash = HMAC-SHA256(apiKey, /?payment=mid.orderId.amount.currency)
    const siteUrl = Deno.env.get('SITE_URL') ?? 'https://www.foundstart.org'
    const cur = (currency || 'USD').toUpperCase()
    const amt = String(amount)
    const enc = new TextEncoder()
    const hk = await crypto.subtle.importKey('raw', enc.encode(kashierApiKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const sig = await crypto.subtle.sign('HMAC', hk, enc.encode(`/?payment=${kashierMid}.${orderId}.${amt}.${cur}`))
    const hash = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')

    const params = new URLSearchParams({
      merchantId: kashierMid,
      orderId,
      amount: amt,
      currency: cur,
      hash,
      mode: kashierMode,
      merchantRedirect: `${siteUrl}/dashboard`,
      failureRedirect: 'true',
      serverWebhook: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
      display: 'en',
    })
    const paymentUrl = `https://payments.kashier.io/?${params.toString()}`

    await supabaseClient.from('payment_transactions').update({ payment_url: paymentUrl }).eq('id', transaction.id)

    return new Response(
      JSON.stringify({ success: true, orderId, paymentUrl, transaction }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    // Log detailed error server-side only for debugging
    console.error('Create Payment Error:', error)
    console.error('Error stack:', error.stack)
    
    // Return generic error message to client - never expose internal details
    return new Response(
      JSON.stringify({ 
        error: 'Payment processing failed. Please try again or contact support.'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
