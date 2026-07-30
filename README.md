# iGEM Toronto Website

The chapter website for iGEM Toronto, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

<!-- TODO (human): paste the live Vercel URL here once the project is deployed. -->
**Live site:** _not deployed yet — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)_

> Rebuilt in 2026 from the previous Flask/Jinja site (which was adapted from the iGEM Toronto 2023 wiki).

## Quick start

```bash
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

Requires Node.js (LTS). No Python needed anymore.

## Project structure

```
├── public/                  → static assets served as-is
│   └── images/              → local images (placeholder headshot, sponsor logos)
├── src/
│   ├── components/          → Header, Footer, MemberBubble, AchievementsTimeline, MemberPie, ...
│   ├── data/
│   │   ├── navigation.json  → main navigation bar config
│   │   ├── team.json        → team roster (drives the People page and the pie chart)
│   │   └── achievements.json→ competition history (drives the home page timeline)
│   ├── layouts/
│   │   └── BaseLayout.astro → HTML shell shared by all pages
│   ├── pages/               → one .astro file per page (routes match filenames)
│   └── styles/global.css    → Tailwind theme, brand colors, fonts
├── docs/
│   ├── UPDATING_THE_TEAM.md → how to update the roster, photos, sponsors
│   ├── DEPLOYMENT.md        → how to deploy to Vercel
│   └── archive/team-2023.csv→ archived 2023 roster
├── vercel.json              → Vercel build settings
└── .github/workflows/       → build & deploy to GitHub Pages on push to main
```

## Updating content

**Start with [docs/UPDATING_THE_TEAM.md](docs/UPDATING_THE_TEAM.md).** It covers:

- Editing the team roster (`src/data/team.json`) — names, roles, bios, photos, social links
- Replacing the placeholder team photo and sponsor logos
- All remaining `TODO (human)` markers in the codebase

The site currently ships with **placeholder team members** — the real roster needs to be filled in.

## Images and the iGEM CDN

Larger images (headshots, event photos) should be uploaded via [uploads.igem.org](https://uploads.igem.org) and referenced by their `https://static.igem.wiki/teams/...` URL. Small local assets (logos, icons) can live in `public/images/`.

## Deployment

**See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for the step-by-step Vercel setup. In short: import the GitHub repo into Vercel once, and every push to `main` redeploys automatically with a permanent URL.

A GitHub Pages workflow (`.github/workflows/build-and-deploy.yml`) also still runs on push to `main`. It can be deleted once Vercel is the official home.
