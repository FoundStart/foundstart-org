import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

// query-string style encoding of values (RFC3986 strict)
const encodeVal = (v: unknown) =>
  encodeURIComponent(String(v)).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

async function hmacHex(key: string, msg: string) {
  const enc = new TextEncoder()
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', k, enc.encode(msg))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  if (parseInt(req.headers.get('content-length') ?? '0', 10) > 65_536) return json({ error: 'Payload too large' }, 413)

  const apiKey = Deno.env.get('KASHIER_API_KEY')
  if (!apiKey) return json({ error: 'Configuration error' }, 500)

  let body: any
  try { body = await req.json() } catch { return json({ error: 'Invalid JSON' }, 400) }
  const data = body?.data
  if (!data || !Array.isArray(data.signatureKeys) || typeof data.merchantOrderId !== 'string') {
    return json({ error: 'Invalid payload' }, 400)
  }

  // Kashier signature: sort signatureKeys, build key=encodedValue&..., HMAC-SHA256 with Payment API Key
  const keys = [...data.signatureKeys].sort()
  const payload = keys.map((k: string) => `${k}=${encodeVal(data[k])}`).join('&')
  const expected = await hmacHex(apiKey, payload)
  const got = (req.headers.get('x-kashier-signature') ?? '').toLowerCase()
  if (!safeEqual(got, expected.toLowerCase())) {
    console.error('Invalid webhook signature for order:', data.merchantOrderId)
    return json({ error: 'Invalid signature' }, 401)
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')
  const { data: tx } = await supabase
    .from('payment_transactions').select('id, status, amount, currency').eq('order_id', data.merchantOrderId).single()
  if (!tx) return json({ error: 'Not found' }, 404)

  // Already finalised: acknowledge with 409 so Kashier stops retrying
  if (tx.status === 'completed') return json({ success: true, message: 'Already processed' }, 409)

  const status = String(data.status ?? '').toUpperCase()
  if (status === 'PENDING') return json({ success: true })
  const paidOk = status === 'SUCCESS' && body.event === 'pay'
    && Number(data.amount) === Number(tx.amount)
    && String(data.currency ?? '').toUpperCase() === String(tx.currency).toUpperCase()
  if (status === 'SUCCESS' && body.event === 'pay' && !paidOk) {
    console.error('Amount/currency mismatch for order:', data.merchantOrderId)
  }

  const { error } = await supabase.from('payment_transactions').update({
    status: paidOk ? 'completed' : 'failed',
    kashier_order_id: data.kashierOrderId ?? null,
    kashier_transaction_id: data.transactionId ?? null,
    webhook_data: body,
    updated_at: new Date().toISOString(),
  }).eq('id', tx.id)
  if (error) return json({ error: 'Update failed' }, 500)
  return json({ success: true })
})
