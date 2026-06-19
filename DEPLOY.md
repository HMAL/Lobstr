# Deploying mylobstr (Cloudflare Workers Builds)

Deploys run on Cloudflare's Linux build infra, triggered by `git push`. This avoids the
Windows-only `@vercel/og` wasm bundling bug that breaks `npm run cf:deploy` from PowerShell.

## One-time setup (Cloudflare dashboard)

1. Dashboard → **Workers & Pages** → open the **`lobstr`** Worker → **Settings** → **Build**.
2. **Connect** → authorize GitHub → select repo **`HMAL/Lobstr`**, branch **`master`**. 
3. Set the commands:
   - **Build command:** `npm run cf:build`
   - **Deploy command:** `npx opennextjs-cloudflare deploy`
   - **Root directory:** `/` (repo root)
4. **Build variables and secrets** (Settings → Build → Variables):
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY = 0x4AAAAAADla0GvFMaRGvmE3`
     ⚠️ Required at **build time**. It's *not* in the repo (`.env.production` is gitignored),
     and it's public anyway, so set it here as a plain build variable.

## Runtime config (already in place)

These are consumed by the deployed Worker, not the build:
- **Secrets** (Worker → Settings → Variables and Secrets, as **encrypted Secrets**):
  `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` — already set. ✅
- **Plain vars** — `CONTACT_GLOBAL_DAILY_CAP` is committed in `wrangler.toml [vars]`. ✅
- **KV binding** — `RATE_LIMIT_KV` (id `205fe8…`) is committed in `wrangler.toml`. ✅

> The Turnstile **site key** (public) is build-time; the **secret key** is a runtime Secret.
> They must come from the **same** Turnstile widget or verification returns 403.

## Deploying a change

```bash
git add -A
git commit -m "..."
git push origin master
```
Cloudflare picks up the push, builds on Linux, and deploys automatically. Watch progress in
Worker → **Build** → latest build log.

## Verify after deploy
- Submit the live contact form → success, no visible Turnstile checkbox (invisible mode).
- `curl -X POST https://mylobstr.com/api/contact` (no token) → `403`.
- `npx wrangler tail` shows `Turnstile verification failed: [...]` codes if anything's off.
