# Deploying on Cloudflare Pages (free, commercial use allowed)

Vercel's free Hobby plan is for non-commercial use only, so Kalvio Build runs on Cloudflare Pages. Everything here
is on Cloudflare's free plan: unlimited static requests and 100,000 Pages Function requests a day (the function only
runs for `/demo/*` pages).

## What is set up (6 Oct 2026)

- Cloudflare account: *Kushikarthikeyenmr@gmail.com's Account* (`580a7755e020979114ebfddba1d768eb`).
- Pages project **`kalvio-build`**, production branch `main`, created with Wrangler (a "Direct Upload" project).
- Production URL: <https://kalvio-build.pages.dev>, first deployed 6 Oct 2026 from the `redesign-2026` branch.
- Preview of the redesign: <https://redesign-2026.kalvio-build.pages.dev>.

Preview deployments are automatically `noindex`; production pages are indexable except personalised samples.

## Deploying from this Mac

```
npm run deploy:preview   # current branch -> https://<branch>.kalvio-build.pages.dev
npm run deploy           # production -> https://kalvio-build.pages.dev (run on main, after merging)
```

Both build first (which reads `.env` for the Lead Finder publishable key). Wrangler must be signed in
(`npx wrangler login`, once per computer).

## Automatic deploys on every push (optional, recommended)

Direct Upload projects can't be connected to GitHub from the Cloudflare dashboard, so `.github/workflows/deploy.yml`
does it instead. It already runs tests, lint and the build on every push; to let it deploy:

1. Cloudflare dashboard → **My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"** template, or a
   custom token with **Account → Cloudflare Pages → Edit**. Copy the token.
2. GitHub repo → **Settings → Secrets and variables → Actions**:
   - Secrets: `CLOUDFLARE_API_TOKEN` (the token), `CLOUDFLARE_ACCOUNT_ID` = `580a7755e020979114ebfddba1d768eb`
   - Variables: `VITE_LEADFINDER_URL` = `https://eojvxcwvnsowfifxehaa.supabase.co`,
     `VITE_LEADFINDER_KEY` = the Lead Finder **publishable** key (`sb_publishable_…`, never the secret key)

After that, a push to `main` deploys production and any other branch gets its own preview URL.

## Custom domain

Pages project → **Custom domains → Set up a domain** (e.g. `kalviobuild.in`). Then set `SITE_ORIGIN` to it (in
`.env` and in the workflow), redeploy, and update the links in `docs/DEMO_LINKS.md` and Lead Finder's Make sample
button.

## Retiring the Vercel project

Once production is live on Cloudflare, point any links (Lead Finder, WhatsApp templates, Instagram bio) to the new
URL, then remove the Vercel project. `vercel.json` is kept only so the old project still builds in the meantime.

## Local preview with the edge function

```
npm run build
npm run pages:dev     # http://127.0.0.1:8788, same as Cloudflare
```
