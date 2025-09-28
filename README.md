# domain-redirects Worker

Canonicalizes all non-primary domains to https://purpleflight.com with 301 redirects.

- Code: `index.js`
- Config: `wrangler.toml`
- Routes: attach ONLY on non-canonical domains in Cloudflare dashboard
  (e.g., `flypurpleflights.com/*`, `*.flypurpleflights.com/*`, etc.).
- Do **not** attach routes for `purpleflight.com/*` or `*.pages.dev/*`.
- Ensure the redirecting domains are orange-cloud proxied in DNS.
