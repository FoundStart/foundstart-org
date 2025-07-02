
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
    const kashierMerchantId = Deno.env.get('KASHIER_MERCHANT_ID')

    if (!kashierApiKey || !kashierSecretKey || !kashierMerchantId) {
      console.error('Missing Kashier credentials')
      return new Response(
        JSON.stringify({ error: 'Payment gateway configuration error' }),
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

    const { amount, currency, customer, planId } = body

    // Validate required fields
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Valid amount is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!customer || !customer.email) {
      return new Response(
        JSON.stringify({ error: 'Customer information with email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

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
        JSON.stringify({ error: 'Database error: ' + dbError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Transaction created successfully:', transaction.id)

    // Create Kashier payment order
    const kashierData = {
      merchant_order_id: orderId,
      amount: amount,
      currency: currency || 'USD',
      merchant_id: kashierMerchantId,
      api_key: kashierApiKey,
      customer: customer,
      success_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-success?orderId=${orderId}`,
      failure_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-failure?orderId=${orderId}`,
      webhook_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`
    }

    // Generate hash for Kashier using the secret key
    const encoder = new TextEncoder()
    const hashString = `${orderId}${amount}${currency || 'USD'}${kashierSecretKey}`
    console.log('Hash string (without secret):', `${orderId}${amount}${currency || 'USD'}[SECRET]`)
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(hashString))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    kashierData.hash = hash
    console.log('Generated hash:', hash)

    console.log('Sending request to Kashier with data:', JSON.stringify({
      ...kashierData,
      api_key: '[HIDDEN]',
      hash: '[HIDDEN]'
    }, null, 2))

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
    console.error('Create Payment Error:', error)
    console.error('Error stack:', error.stack)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred',
        details: error.stack || 'No stack trace available'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
