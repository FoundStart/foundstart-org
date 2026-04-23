import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Strict payload validation — reject anything that doesn't look like a valid Kashier webhook
type WebhookPayload = {
  merchant_order_id: string
  amount: string | number
  currency: string
  hash: string
  status: string
  transaction_id?: string
}

const validatePayload = (data: unknown): { ok: true; data: WebhookPayload } | { ok: false; error: string } => {
  if (!data || typeof data !== 'object') return { ok: false, error: 'Invalid payload' }
  const d = data as Record<string, unknown>

  // merchant_order_id: required string, reasonable length
  if (typeof d.merchant_order_id !== 'string' || d.merchant_order_id.length === 0 || d.merchant_order_id.length > 128) {
    return { ok: false, error: 'Invalid merchant_order_id' }
  }
  // Strict character set to prevent injection in downstream queries
  if (!/^[A-Za-z0-9_\-]+$/.test(d.merchant_order_id)) {
    return { ok: false, error: 'Invalid merchant_order_id format' }
  }

  // amount: required, must parse as positive finite number
  const amountNum = typeof d.amount === 'number' ? d.amount : parseFloat(String(d.amount))
  if (!Number.isFinite(amountNum) || amountNum <= 0 || amountNum > 10_000_000) {
    return { ok: false, error: 'Invalid amount' }
  }

  // currency: 3-letter ISO code
  if (typeof d.currency !== 'string' || !/^[A-Z]{3}$/.test(d.currency)) {
    return { ok: false, error: 'Invalid currency' }
  }

  // hash: required hex string of expected length (SHA-256 = 64 hex chars)
  if (typeof d.hash !== 'string' || !/^[a-f0-9]{64}$/i.test(d.hash)) {
    return { ok: false, error: 'Invalid hash' }
  }

  // status: required string, bounded length
  if (typeof d.status !== 'string' || d.status.length === 0 || d.status.length > 32) {
    return { ok: false, error: 'Invalid status' }
  }

  // transaction_id: optional string, bounded length
  if (d.transaction_id !== undefined && (typeof d.transaction_id !== 'string' || d.transaction_id.length > 128)) {
    return { ok: false, error: 'Invalid transaction_id' }
  }

  return {
    ok: true,
    data: {
      merchant_order_id: d.merchant_order_id,
      amount: d.amount as string | number,
      currency: d.currency,
      hash: d.hash,
      status: d.status,
      transaction_id: d.transaction_id as string | undefined,
    },
  }
}

// Constant-time string comparison to prevent timing attacks on hash verification
const safeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Bound body size — Kashier payloads are small; reject anything suspiciously large
  const contentLength = parseInt(req.headers.get('content-length') ?? '0', 10)
  if (contentLength > 16_384) {
    return new Response(
      JSON.stringify({ error: 'Payload too large' }),
      { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
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
        JSON.stringify({ error: 'Configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let raw: unknown
    try {
      raw = await req.json()
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const validation = validatePayload(raw)
    if (!validation.ok) {
      console.error('Webhook payload rejected:', validation.error)
      return new Response(
        JSON.stringify({ error: 'Invalid payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    const webhookData = validation.data

    // Verify webhook authenticity via HMAC-style hash
    const encoder = new TextEncoder()
    const hashString = `${webhookData.merchant_order_id}${webhookData.amount}${webhookData.currency}${kashierSecretKey}`
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(hashString))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const expectedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    if (!safeEqual(webhookData.hash.toLowerCase(), expectedHash.toLowerCase())) {
      console.error('Invalid webhook signature for order:', webhookData.merchant_order_id)
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Find and update transaction
    const { data: transaction, error: findError } = await supabaseClient
      .from('payment_transactions')
      .select('id, status')
      .eq('order_id', webhookData.merchant_order_id)
      .single()

    if (findError || !transaction) {
      console.error('Transaction not found:', webhookData.merchant_order_id)
      return new Response(
        JSON.stringify({ error: 'Not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Idempotency: don't re-process already-completed transactions
    if (transaction.status === 'completed') {
      return new Response(
        JSON.stringify({ success: true, message: 'Already processed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const newStatus = webhookData.status === 'SUCCESS' ? 'completed' : 'failed'
    const { error: updateError } = await supabaseClient
      .from('payment_transactions')
      .update({
        status: newStatus,
        kashier_transaction_id: webhookData.transaction_id ?? null,
        webhook_data: webhookData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', transaction.id)

    if (updateError) {
      console.error('Error updating transaction')
      return new Response(
        JSON.stringify({ error: 'Update failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Payment ${newStatus} for order: ${webhookData.merchant_order_id}`)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Webhook processing error')
    return new Response(
      JSON.stringify({ error: 'Processing failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
