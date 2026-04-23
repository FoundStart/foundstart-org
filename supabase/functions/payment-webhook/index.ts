
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

    const kashierSecretKey = Deno.env.get('KASHIER_SECRET_KEY')
    
    if (!kashierSecretKey) {
      console.error('Missing Kashier secret key')
      return new Response(
        JSON.stringify({ error: 'Payment gateway configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const webhookData = await req.json()
    console.log('Webhook received:', JSON.stringify(webhookData, null, 2))
    
    // Verify webhook authenticity
    const encoder = new TextEncoder()
    const hashString = `${webhookData.merchant_order_id}${webhookData.amount}${webhookData.currency}${kashierSecretKey}`
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(hashString))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const expectedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    if (webhookData.hash !== expectedHash) {
      console.error('Invalid webhook signature. Expected:', expectedHash, 'Received:', webhookData.hash)
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
      console.error('Transaction not found:', webhookData.merchant_order_id, findError)
      return new Response(
        JSON.stringify({ error: 'Transaction not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update transaction status
    const newStatus = webhookData.status === 'SUCCESS' ? 'completed' : 'failed'
    const { error: updateError } = await supabaseClient
      .from('payment_transactions')
      .update({
        status: newStatus,
        kashier_transaction_id: webhookData.transaction_id,
        webhook_data: webhookData,
        updated_at: new Date().toISOString()
      })
      .eq('id', transaction.id)

    if (updateError) {
      console.error('Error updating transaction:', updateError)
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
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
