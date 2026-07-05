# Updating the Team (and other content) — Maintainer Guide

This site currently ships with **placeholder team members, a placeholder team photo, and placeholder sponsor logos**. This guide explains exactly how to replace them with real content. No coding experience needed beyond editing text files.

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
| `name` | Full display name. Remove the `PLACEHOLDER —` prefix! |
| `group` | Which section of the People page the card appears under. Must exactly match one of the names in the `groups` list at the top of the file (e.g. `"Wet Lab"`, `"Presidents"`). To add/remove/reorder sections, edit that `groups` list. |
| `roles` | A list of role badges shown on the card. Roles containing "Lead", "Director", or "President" get an orange badge and are sorted to the front of their group automatically. |
| `description` | A 1–4 sentence third-person bio, shown in the pop-up when a card is clicked. |
| `photo` | Full URL to the headshot, or `null` to show the generic placeholder silhouette. |
| `linkedin` / `website` / `email` | Optional. Leave as `""` to hide the icon. |

To add a member, copy an existing block (including the surrounding `{ }`), paste it inside the `members` list, and edit the values. Watch the commas: every member object except the last needs a trailing comma.

The old 2023 roster is archived at [`docs/archive/team-2023.csv`](archive/team-2023.csv) if you want to reuse any bios or links.

### Member photos

1. Log into [uploads.igem.org](https://uploads.igem.org) with your team account and upload the headshot (square crop, at least 400x400 px, PNG or JPG).
2. Copy the resulting `https://static.igem.wiki/teams/...` URL into the member's `photo` field.
3. Alternatively, put the file in `public/images/team/` in this repo and use the path `/images/team/filename.png` (prefix with the site base path if the site is deployed under a subpath).

If a photo URL breaks, the card automatically falls back to the placeholder silhouette.

## 2. Team group photo (People page)

The People page currently shows a dashed "Team photo coming soon" box. To replace it, open [`src/pages/people.astro`](../src/pages/people.astro), find the `TODO (human)` comment near the top of the page body, and swap the placeholder `<div>` for an `<img>` tag as shown in that comment. The 2023 photo is still available at `https://static.igem.wiki/teams/4615/wiki/hpphoto/img-3314.jpg`.

## 3. Sponsor logos

Most sponsor logo files were never committed to the old repository, so the Sponsors page renders "Logo coming soon" placeholder boxes. To fix one:

1. Get the logo file (PNG/SVG preferred) and place it in `public/images/sponsors/`.
2. Open [`src/pages/sponsors.astro`](../src/pages/sponsors.astro) and change that sponsor's `logo: null` to `` logo: `${base}/images/sponsors/your-file.png` ``.

Also review the tier assignments — they were carried over from the 2023 sponsor list.

## 4. Other content TODOs

Search the codebase for `TODO (human)` to find every spot that needs real content:

- **Home page** (`src/pages/index.astro`): the "most recent competition results" sentence and the medal counts in the stats strip.
- **Favicon** (`src/layouts/BaseLayout.astro`): add a `favicon.svg` to `public/`.
- **Collaborations** (`src/pages/collaborations.astro`): the listed events are from the 2023 cycle; add this year's events to the list in the frontmatter.
- **Navigation** (`src/data/navigation.json`): add a link to the newest project wiki when it exists.

## 5. Seeing your changes

- Locally: run `npm install` once, then `npm run dev` and open http://localhost:4321.
- In production: pushing to the `main` branch triggers the GitHub Actions workflow, which builds and deploys to GitHub Pages automatically (see `.github/workflows/build-and-deploy.yml`).
