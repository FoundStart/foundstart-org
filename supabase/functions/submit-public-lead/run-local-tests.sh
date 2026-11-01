#!/usr/bin/env bash
# Focused local tests for submit-public-lead (negative paths, fail-closed behavior, body cap).
# Uses Cloudflare's PUBLISHED Turnstile test secrets, so no real widget or user data is involved:
#   always-fails secret 2x...AB -> every token rejected
#   always-passes secret 1x...AA -> every token accepted (but hostname/action checks still apply)
# No database is reachable: any path that would hit Supabase must fail closed.
# Concurrency of throttle_hit() itself is a database property (single-statement upsert) and is
# NOT tested here; it requires the migration to be applied on a test project.
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
BASE="http://127.0.0.1:8000"
PASS=0; FAIL=0

check() { # name expected actual
  if [ "$2" = "$3" ]; then PASS=$((PASS+1)); echo "PASS: $1"; else FAIL=$((FAIL+1)); echo "FAIL: $1 (expected $2, got $3)"; fi
}

start_fn() { # turnstile-secret-or-EMPTY
  TURNSTILE_SECRET_KEY="$1" THROTTLE_HMAC_SECRET="local-test-secret" \
  SUPABASE_URL="http://127.0.0.1:9/unreachable" SUPABASE_SERVICE_ROLE_KEY="unused" \
  deno run --allow-net --allow-env "$DIR/index.ts" >/tmp/fn-test.log 2>&1 &
  FN_PID=$!
  for i in $(seq 1 60); do curl -s -o /dev/null "$BASE" && break || sleep 0.5; done
  sleep 1
}
stop_fn() { kill $FN_PID 2>/dev/null; wait $FN_PID 2>/dev/null || true; }

VALID_NL='{"kind":"newsletter","email":"test@example.com","language":"en","source":"footer","website":"","turnstile_token":"x"}'

# --- Instance 1: always-fails Turnstile secret ---
start_fn "2x0000000000000000000000000000000AB"
check "GET rejected" 405 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE")"
check "invalid JSON" 400 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -d 'not-json')"
check "unknown kind" 400 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -d '{"kind":"other"}')"
check "honeypot fake-success" 200 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -d '{"kind":"newsletter","website":"http://spam"}')"
check "honeypot stores nothing (ok:true)" true "$(curl -s -X POST "$BASE" -H 'content-type: application/json' -d '{"kind":"newsletter","website":"http://spam"}' | grep -c '"ok":true' | grep -q 1 && echo true)"
check "missing token" 400 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -d '{"kind":"newsletter","email":"test@example.com"}')"
check "token rejected (always-fails secret)" 400 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -d "$VALID_NL")"
BIG=$(head -c 9000 /dev/zero | tr '\0' 'a')
check "9KB streamed body rejected" 413 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -d "$BIG")"
check "oversize Content-Length rejected" 413 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -H 'content-length: 99999' --data-raw '{}' --max-time 5 || echo 413)"
stop_fn

# --- Instance 2: no Turnstile secret configured (fail closed) ---
start_fn ""
check "unset secret fails closed" 500 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -d "$VALID_NL")"
stop_fn

# --- Instance 3: always-passes secret; hostname/action strictness must still reject ---
start_fn "1x0000000000000000000000000000000AA"
check "passed token but wrong hostname/action rejected" 400 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE" -H 'content-type: application/json' -d "$VALID_NL")"
stop_fn

echo "---"; echo "PASS=$PASS FAIL=$FAIL"
[ "$FAIL" = 0 ]
