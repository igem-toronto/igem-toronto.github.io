# Deploying the site (Vercel)

The site is a static Astro build, so Vercel can host it for free with automatic redeploys on every push. This guide is written so anyone on the team can follow it — no prior Vercel experience needed.

## One-time setup

1. Make sure the latest code is pushed to the `main` branch on GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in **with GitHub** (use an account that can see this repository).
3. Click **Add New… → Project**.
4. Find `igem-toronto-site-fork` (or whatever the repo is named) in the list and click **Import**. If it does not appear, click **Adjust GitHub App Permissions** and grant Vercel access to the repo.
5. On the configure screen, everything should already be correct because the repo contains a [`vercel.json`](../vercel.json):
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
   - Environment Variables: none needed
6. Click **Deploy** and wait about a minute.

You will get a permanent URL like `https://igem-toronto-site.vercel.app`. That is the link to share.

## After the first deploy

Set the live URL in [`astro.config.mjs`](../astro.config.mjs):

```js
site: 'https://your-project.vercel.app',
```

Leave `base: '/'` alone — Vercel serves from the domain root. Commit and push; Vercel will redeploy automatically.

## How updates work from here

Every push to `main` triggers a new production deployment automatically. Pull requests get their own temporary "preview" URL, which is useful for showing the team a change before it goes live.

Nobody needs to run a deploy command manually.

## Adding a custom domain later

If the team gets a domain (for example `igemtoronto.ca`):

1. In the Vercel project, go to **Settings → Domains**.
2. Add the domain and follow the DNS instructions Vercel shows (usually one `A` or `CNAME` record with the domain registrar).
3. Update `site` in `astro.config.mjs` to the custom domain.

## What about the old GitHub Pages workflow?

[`.github/workflows/build-and-deploy.yml`](../.github/workflows/build-and-deploy.yml) still builds and deploys to GitHub Pages on every push. Once Vercel is the official home, you can either leave it (harmless, just a second copy of the site) or delete that file to avoid confusion.

Important: if you ever go back to GitHub Pages on a project subpath (`https://<user>.github.io/<repo>/`), you must set `base: '/<repo>/'` in `astro.config.mjs`, or every link and image will 404.

## Troubleshooting

- **Build fails on Vercel but works locally** — make sure `package-lock.json` is committed, since `npm ci` depends on it.
- **Site loads but CSS/images are missing** — `base` is almost certainly set to something other than `/`.
- **Changes are not showing up** — check the Deployments tab in Vercel; the newest deployment should point at the latest commit on `main`.
