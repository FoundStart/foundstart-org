
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

    // Get Kashier credentials from environment
    const kashierApiKey = Deno.env.get('KASHIER_API_KEY')
    const kashierSecretKey = Deno.env.get('KASHIER_SECRET_KEY')

    console.log('Kashier credentials check:', {
      apiKey: !!kashierApiKey,
      secretKey: !!kashierSecretKey,
    })

    if (!kashierApiKey || !kashierSecretKey) {
      console.error('Missing Kashier credentials')
      return new Response(
        JSON.stringify({ 
          error: 'Payment gateway configuration error',
          details: 'Missing required Kashier credentials'
        }),
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

    // Create Kashier payment order
    const currentUrl = req.url.replace('/functions/v1/create-payment', '')
    const baseUrl = currentUrl || `https://tylancgjmllwhuzptlxh.supabase.co`
    
    const kashierData = {
      merchant_order_id: orderId,
      amount: amount,
      currency: currency || 'USD',
      customer: {
        name: customer.name || customer.email,
        email: customer.email,
        phone: customer.phone || ''
      },
      success_url: `${baseUrl}/dashboard`,
      failure_url: `${baseUrl}/dashboard/billing`,
      webhook_url: `${baseUrl}/functions/v1/payment-webhook`
    }

    // Generate hash for Kashier
    const encoder = new TextEncoder()
    const hashString = `${orderId}${amount}${currency || 'USD'}${kashierSecretKey}`
    console.log('Hash string components:', { orderId, amount, currency: currency || 'USD' })
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(hashString))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    kashierData.hash = hash
    console.log('Generated hash for Kashier')

    console.log('Sending request to Kashier API...')

    const kashierResponse = await fetch('https://checkout.kashier.io/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${kashierApiKey}`
      },
      body: JSON.stringify(kashierData)
    })

    console.log('Kashier response status:', kashierResponse.status)
    const kashierResult = await kashierResponse.json()
    console.log('Kashier response:', JSON.stringify(kashierResult, null, 2))

    if (kashierResponse.ok && kashierResult.checkout_url) {
      // Update transaction with Kashier order details
      const { error: updateError } = await supabaseClient
        .from('payment_transactions')
        .update({
          kashier_order_id: kashierResult.order_id,
          payment_url: kashierResult.checkout_url
        })
        .eq('id', transaction.id)

      if (updateError) {
        console.error('Error updating transaction:', updateError)
      }

      console.log('Payment order created successfully')
      return new Response(
        JSON.stringify({
          success: true,
          orderId,
          paymentUrl: kashierResult.checkout_url,
          transaction: transaction
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      console.error('Kashier API error:', kashierResult)
      throw new Error(kashierResult.message || 'Payment creation failed with Kashier')
    }

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
