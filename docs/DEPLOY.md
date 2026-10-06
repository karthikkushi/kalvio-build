# Deploying on Cloudflare Pages (free, commercial use allowed)

Vercel's free Hobby plan is for non-commercial use only, so Kalvio Build moves to Cloudflare Pages. Everything here
is on Cloudflare's free plan: unlimited static requests, 500 builds a month and 100,000 Pages Function requests a
day (the function only runs for `/demo/*` pages).

## One-time setup (about 5 minutes, in your browser)

1. Sign in at <https://dash.cloudflare.com> (create a free account if you don't have one).
2. **Workers & Pages → Create → Pages → Connect to Git**, choose GitHub and the `karthikkushi/kalvio-build` repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: `main`
4. **Environment variables** (for Production and Preview):

   | name | value |
   |---|---|
   | `NODE_VERSION` | `22` |
   | `VITE_LEADFINDER_URL` | `https://eojvxcwvnsowfifxehaa.supabase.co` |
   | `VITE_LEADFINDER_KEY` | the Lead Finder **publishable** key (`sb_publishable_…`), never the secret key |
   | `SITE_ORIGIN` | `https://kalvio-build.pages.dev` (or your custom domain later) |

5. **Save and deploy.** Every push to a branch gets its own preview URL; `main` goes to production.

The `functions/` folder is picked up automatically: `functions/demo/[key].ts` personalises `/demo/*` pages at the
edge so WhatsApp link previews show the shop's name.

## Custom domain

**Custom domains → Set up a domain** (e.g. `kalviobuild.in`). Then set `SITE_ORIGIN` to it, redeploy, and update the
links in `docs/DEMO_LINKS.md` and Lead Finder's Make sample button.

## Retiring the Vercel project

Once Cloudflare is live, point any links (Lead Finder, WhatsApp templates, Instagram bio) to the new URL, then remove
the Vercel project. `vercel.json` is kept only so the old project still builds in the meantime.

## Local preview with the edge function

```
npm run build
npm run pages:dev     # http://127.0.0.1:8788, same as Cloudflare
```
