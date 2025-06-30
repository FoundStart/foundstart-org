
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const webhookData = await req.json()
    
    // Verify webhook authenticity
    const encoder = new TextEncoder()
    const hashString = `${webhookData.merchant_order_id}${webhookData.amount}${webhookData.currency}d3884e3e-aed4-4341-b747-e91b815cd370`
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(hashString))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const expectedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    if (webhookData.hash !== expectedHash) {
      return new Response(
        JSON.stringify({ error: 'Invalid webhook signature' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Find and update transaction
    const { data: transaction, error: findError } = await supabaseClient
      .from('payment_transactions')
      .select('*')
      .eq('order_id', webhookData.merchant_order_id)
      .single()

    if (findError || !transaction) {
      console.error('Transaction not found:', webhookData.merchant_order_id)
      return new Response(
        JSON.stringify({ error: 'Transaction not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update transaction status
    const { error: updateError } = await supabaseClient
      .from('payment_transactions')
      .update({
        status: webhookData.status === 'SUCCESS' ? 'completed' : 'failed',
        kashier_transaction_id: webhookData.transaction_id,
        webhook_data: webhookData,
        updated_at: new Date().toISOString()
      })
      .eq('id', transaction.id)

    if (updateError) {
      throw updateError
    }

    console.log(`Payment ${webhookData.status} for order: ${webhookData.merchant_order_id}`)

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Webhook Processing Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
