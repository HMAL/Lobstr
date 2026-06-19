# Contact form / abuse protection — setup runbook

Defense is in two layers:
- **In-app** (already in the code): honeypot, Turnstile verification, per-IP rate limit, global daily send cap, input validation/escaping, same-origin + body-size pre-filters.
- **Cloudflare edge** (configured in the dashboard, below): stops floods *before* the Worker runs, protecting the free-tier request/CPU/KV quotas.

Do Part A (deploy wiring) once so the code works in production, then Part B (edge rules) for DDoS protection.

---

## Part A — Wiring the code in production

### A1. Create the Turnstile widget (bot check)
1. Go to https://dash.cloudflare.com → **Turnstile** (left sidebar, account-level).
2. **Add widget**: name `mylobstr-contact`, hostname `mylobstr.com` (add `*.mylobstr.com` and `localhost` too).
3. Mode: **Managed** (recommended — usually invisible).
4. Copy the **Site Key** (public) and **Secret Key** (private).

### A2. Create the KV namespace (rate limit + daily cap)
From the project folder (PowerShell, with portable Node on PATH):
```powershell
$env:PATH = "C:\Users\Banu.Kommuri\AppData\Local\Programs\nodejs;$env:PATH"
npx wrangler kv namespace create RATE_LIMIT_KV
```
Copy the printed `id` into `wrangler.toml`, replacing `REPLACE_WITH_KV_NAMESPACE_ID`:
```toml
[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "<paste-id-here>"
```

### A3. Set production variables/secrets
- **Build-time public var** — `NEXT_PUBLIC_TURNSTILE_SITE_KEY` must be present when `next build` runs (Next inlines `NEXT_PUBLIC_*`). Add it to the build env, e.g. a `.env.production` file (gitignored) or your CI env:
  ```
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site key from A1>
  ```
- **Runtime secrets** — set on the deployed Worker:
  ```powershell
  npx wrangler secret put RESEND_API_KEY
  npx wrangler secret put TURNSTILE_SECRET_KEY
  ```
- **Non-secret runtime var** — add the daily cap to `wrangler.toml`:
  ```toml
  [vars]
  CONTACT_GLOBAL_DAILY_CAP = "80"
  ```
  (Or set per the Cloudflare dashboard → Workers & Pages → your Worker → Settings → Variables.)

### A4. Deploy
```powershell
npm run cf:deploy
```

---

## Part B — Cloudflare edge rules (DDoS / free-tier protection)

All of these are in the dashboard for the **mylobstr.com** zone. They block traffic *before* it reaches the Worker, so they don't consume Workers requests, CPU, or KV writes.

### B1. ⭐ Rate-limiting rule on the contact endpoint (highest impact)
1. Dashboard → select **mylobstr.com** → **Security** → **WAF** → **Rate limiting rules** → **Create rule**.
2. Name: `contact-post-limit`.
3. **If incoming requests match**: Field `URI Path` *equals* `/api/contact` **AND** `Request Method` *equals* `POST`.
4. **Rate**: e.g. **5 requests** per **1 minute**, counting by **IP**.
5. **Then**: action **Managed Challenge** (or **Block** for stricter).
6. Duration / mitigation timeout: 1 minute. Save & deploy.

> Free plan includes one rate-limiting rule — spend it here.

### B2. Bot Fight Mode
- **Security** → **Bots** → enable **Bot Fight Mode**. Free; auto-challenges known bad bots at the edge.

### B3. Geo / custom WAF rule (optional, very effective)
Your clientele is Albany / Capital Region. To shed most foreign attack traffic:
1. **Security** → **WAF** → **Custom rules** → **Create rule**.
2. Name: `contact-us-only`.
3. Expression: `(http.request.uri.path eq "/api/contact" and ip.geoip.country ne "US")`.
4. Action: **Managed Challenge** (use Block only if you're sure you have no non-US visitors).
5. Save. (Free plan allows up to 5 custom rules.)

### B4. Cache the static site (keep the Worker idle)
The build shows only `/api/contact` is dynamic — everything else is static. Make sure normal page loads are served from cache, not the Worker:
- **Caching** → **Configuration**: standard caching on.
- Optionally **Rules** → **Cache Rules**: cache `/_next/static/*` and HTML aggressively.
This stops an attacker from running up Worker requests by hammering ordinary pages.

### B5. Panic button — Under Attack Mode
If you're actively being attacked: **Security** → **Settings** → set **Security Level** to **I'm Under Attack** (or the quick toggle on the zone Overview). Presents an interstitial to every visitor; turn off when the attack subsides.

---

## Free-tier limits to watch
| Resource | Free/day | Protected by |
|---|---|---|
| Workers requests | 100,000 | B1, B3, B4 (edge blocking) |
| Workers CPU | 10 ms/req | body-size cap (code) |
| KV writes | **1,000** (tightest) | Turnstile gate + B1 |
| KV reads | 100,000 | B1 |
| Resend emails | ~100 | `CONTACT_GLOBAL_DAILY_CAP` (code) |

## Verify after setup
- Submit the real form once → email arrives.
- `curl -X POST https://mylobstr.com/api/contact` with no token → `403`.
- Repeat the curl >5×/min → challenged/blocked by B1.
- Watch **Security** → **Events** to confirm rules are firing.
