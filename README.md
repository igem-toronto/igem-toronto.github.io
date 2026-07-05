# iGEM Toronto Website

The chapter website for iGEM Toronto, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages.

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
│   ├── components/          → Header, Footer, MemberCard, SectionHeading
│   ├── data/
│   │   ├── navigation.json  → main navigation bar config
│   │   └── team.json        → team roster (drives the People page)
│   ├── layouts/
│   │   └── BaseLayout.astro → HTML shell shared by all pages
│   ├── pages/               → one .astro file per page (routes match filenames)
│   └── styles/global.css    → Tailwind theme, brand colors, fonts
├── docs/
│   ├── UPDATING_THE_TEAM.md → how to update the roster, photos, sponsors
│   └── archive/team-2023.csv→ archived 2023 roster
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

Pushing to `main` triggers `.github/workflows/build-and-deploy.yml`, which builds the site with Astro and deploys it to GitHub Pages.

If the site is served from a project subpath (`https://<user>.github.io/<repo>/`), set `base` in `astro.config.mjs` accordingly — see the comment in that file.
