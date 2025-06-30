
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { amount, currency, customer, planId } = await req.json()

    // Generate unique order ID
    const orderId = `FS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create payment transaction record
    const { data: transaction, error } = await supabaseClient
      .from('payment_transactions')
      .insert({
        order_id: orderId,
        user_id: user.id,
        amount: amount,
        currency: currency || 'USD',
        status: 'pending',
        payment_method: 'kashier',
        customer_data: customer,
        plan_id: planId
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Create Kashier payment order
    const kashierData = {
      merchant_order_id: orderId,
      amount: amount,
      currency: currency || 'USD',
      merchant_id: 'MER-foundstart-001',
      api_key: 'd3884e3e-aed4-4341-b747-e91b815cd370',
      customer: customer,
      success_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-success?orderId=${orderId}`,
      failure_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-failure?orderId=${orderId}`,
      webhook_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`
    }

    // Generate hash for Kashier
    const encoder = new TextEncoder()
    const hashString = `${orderId}${amount}${currency}d3884e3e-aed4-4341-b747-e91b815cd370`
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(hashString))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    kashierData.hash = hash

    const kashierResponse = await fetch('https://checkout.kashier.io/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer d3884e3e-aed4-4341-b747-e91b815cd370`
      },
      body: JSON.stringify(kashierData)
    })

    const kashierResult = await kashierResponse.json()

    if (kashierResponse.ok) {
      // Update transaction with Kashier order details
      await supabaseClient
        .from('payment_transactions')
        .update({
          kashier_order_id: kashierResult.order_id,
          payment_url: kashierResult.checkout_url
        })
        .eq('id', transaction.id)

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
      throw new Error(kashierResult.message || 'Payment creation failed')
    }

  } catch (error) {
    console.error('Create Payment Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
