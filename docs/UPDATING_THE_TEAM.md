# Updating the Team (and other content) — Maintainer Guide

This guide explains where each piece of team content lives and how to change it. No coding experience needed beyond editing text files.

As of November 2026 the roster, headshots, team photo, sponsors and division photos are all real: they were synced from the 2026 competition wiki (`petadex/iGEM_wiki`, `src/data/team/team.csv` and `src/data/sponsors.js`) and reconciled against the "Active members as of Sep 2026" and "Advisors Active as of Sep 2026" tabs of the 2026 Team Roster sheet in the president Drive. Next season, start from that wiki's data again or edit the files below by hand.

## 1. Updating the team roster

All team data lives in one file: [`src/data/team.json`](../src/data/team.json).

Each member is one JSON object:

```json
{
  "name": "Jane Doe",
  "group": "Wet Lab",
  "roles": ["Wet Lab Lead", "Social Director"],
  "description": "Jane is a third-year Molecular Biology student who leads the wet lab team...",
  "photo": "https://static.igem.wiki/teams/XXXX/wiki/team/jane.png",
  "linkedin": "https://www.linkedin.com/in/janedoe/",
  "website": "",
  "email": "jane.doe@mail.utoronto.ca"
}
```

Field-by-field:

| Field | What to put there |
|---|---|
| `name` | Preferred first name and surname, nothing else: no middle names, no legal name in parentheses (e.g. "Abby Lui", "James Zhang"). The wiki roster and the president's 2026 Team Roster sheet hold the preferred names; the UofT email confirms the surname. |
| `group` | Which section of the People page the card appears under. Must exactly match one of the names in the `groups` list at the top of the file (e.g. `"Wet Lab"`, `"Presidents"`). To add/remove/reorder sections, edit that `groups` list. |
| `roles` | A list of role badges shown on the card. Roles containing "Lead", "Director", or "President" get an orange badge and are sorted to the front of their group automatically. |
| `description` | A 1–4 sentence third-person bio, shown in the pop-up when a card is clicked. The 2026 bios are one line built from the wiki roster's year, programme and school; replace with a real bio whenever a member writes one. |
| `photo` | Full URL to the headshot, or `null` to show the generic placeholder silhouette. The 2026 headshots are the wiki's AVIF files under `https://static.igem.wiki/teams/6187/wiki/team/meet-the-team-pics/`. |
| `linkedin` / `website` / `email` | Optional. Leave as `""` to hide the icon. |

To add a member, copy an existing block (including the surrounding `{ }`), paste it inside the `members` list, and edit the values. Watch the commas: every member object except the last needs a trailing comma.

The old 2023 roster is archived at [`docs/archive/team-2023.csv`](archive/team-2023.csv) if you want to reuse any bios or links.

### Member photos

1. Log into [uploads.igem.org](https://uploads.igem.org) with your team account and upload the headshot (square crop, at least 400x400 px, PNG or JPG).
2. Copy the resulting `https://static.igem.wiki/teams/...` URL into the member's `photo` field.
3. Alternatively, put the file in `public/images/team/` in this repo and use the path `/images/team/filename.png` (prefix with the site base path if the site is deployed under a subpath).

If a photo URL breaks, the card automatically falls back to the placeholder silhouette.

## 2. Team group photo (People page)

The People page opens with a photograph from the gallery, set in [`src/pages/people.astro`](../src/pages/people.astro) (look for the `<figure>` near the top of the page body). It is currently the widest 2026 team shot on file, `public/images/history/2026/park-evening-group-wide-1.webp`, because no full-roster photograph of the 2026 team exists yet. When one is taken, drop it into `public/images/history/<year>/`, add it to `gallery.json` under the `team-photo` category, and point the `<img>` at it. The image is cropped to 2:1, so prefer a landscape shot.

## 3. Sponsors

The Sponsors page lists the 2026 sponsors in three groups (University of Toronto units, industry partners, community sponsors), mirrored from the wiki's `src/data/sponsors.js`. Each entry in [`src/pages/sponsors.astro`](../src/pages/sponsors.astro) has a `name`, an `href`, and a `logo` URL on the iGEM CDN (`https://static.igem.wiki/teams/6187/wiki/sponsor-logos/`). A sponsor with `logo: null` renders its name instead.

To add a sponsor, upload the logo via [uploads.igem.org](https://uploads.igem.org) (or put it in `public/images/sponsors/`) and add an object to the right group. Update the number in the page's lede ("Seventeen ... sponsors") when the count changes.

## 4. Competition history and photographs

The competition record moved out of this guide when the site grew from three seasons to
all twenty-one. It now has its own document:

**→ [HISTORY_AND_GALLERY.md](HISTORY_AND_GALLERY.md)**

That covers adding this year's season to `src/data/history.json`, adding photographs to
`src/data/gallery.json` and `public/images/history/`, and the rules about what the site
does and does not publish. `src/data/achievements.json` no longer exists; `history.json`
replaced it.

Short version, at the end of a competition season:

1. Add an entry to the top of `years` in `src/data/history.json`.
2. Update the `summary` block in the same file.
3. Add any photographs to `src/data/gallery.json`.
4. Run `npm run check:history`.

## 5. Division descriptions and photos

The Divisions page copy lives in the frontmatter of [`src/pages/divisions.astro`](../src/pages/divisions.astro). Each division has a `lede` (one punchy sentence), a `description` (2–3 sentences), three `highlights` bullets, and a `season` line that says what the division built this year (taken from the competition wiki's Project Description). Rewrite `season` every year.

Division photos are gallery files: `photo` is a path under `public/images/history/<year>/` and `photoPosition` is `object-center` or `object-top`, since the card crops to 16:9 and a portrait shot needs the top kept. Web has no photo yet.

## 6. Other content TODOs

Search the codebase for `TODO (human)` to find every spot that needs real content:

- **Home page** (`src/pages/index.astro`): the hero tagline is a single line if the team lands on a new one. The "2026 season" section (`seasonHighlights`) is rewritten each year from the wiki.
- **Favicon** (`src/layouts/BaseLayout.astro`): add a `favicon.svg` to `public/`.
- **Navigation** (`src/data/navigation.json`): add a link to the newest project wiki each year under "History".
- **Deployment** (`astro.config.mjs`, `README.md`): set the live URL once Vercel is set up.

## 7. Seeing your changes

- Locally: run `npm install` once, then `npm run dev` and open http://localhost:4321.
- In production: pushing to the `main` branch redeploys the site automatically — see [DEPLOYMENT.md](DEPLOYMENT.md).
