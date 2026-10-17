# Architecture rules
- Keep Co-founder model calls and partner tools in a dedicated authenticated Edge Function; preserve the existing document-generation assistant.
- Store Co-founder conversations as route-addressed threads and full AI SDK UI messages; use database UUIDs separately from SDK message IDs for reliable replay.
- Generate the Co-founder partner catalog from the site's partner data so recommendations use the same CTA destinations.
- Compose Co-founder chat with AI Elements and AI SDK transport so streaming, tool parts and conversation history share one protocol.