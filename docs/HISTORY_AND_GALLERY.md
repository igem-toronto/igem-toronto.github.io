# History and Gallery — Maintainer Guide

Two data files drive everything historical on this site:

| File | Drives |
|---|---|
| [`src/data/history.json`](../src/data/history.json) | The home page timeline, `/history/`, and one page per season at `/history/<year>/` |
| [`src/data/gallery.json`](../src/data/gallery.json) | `/gallery/`, the photo strip on the home timeline, and the photo grid on each season page |

Run `npm run check:history` after editing either one. It catches missing files,
unknown categories, and medal tallies that have drifted. `npm run build` runs it
automatically and refuses to build if it fails.

---

## 1. Adding this year's season

At the end of the competition, add one object to the **top** of the `years` array in
`src/data/history.json`:

```json
{
  "year": 2027,
  "teamName": "Toronto",
  "nickname": null,
  "project": "Project name as it appears on the wiki",
  "track": "Bioremediation",
  "section": "overgrad",
  "teamSize": 60,
  "status": "competed",
  "medal": "Gold",
  "awards": ["Best Model — winner", "Top 10 — Overgraduate"],
  "wikiUrl": "https://2027.igem.wiki/toronto/",
  "teamsUrl": "https://teams.igem.org/XXXX",
  "blurb": "One sentence. This is all the home page timeline shows.",
  "story": "Two to four sentences for the season page.",
  "note": null
}
```

Then update `summary` in the same file — `seasonsRegistered`, `seasonsCompeted`,
`memberYears`, `alumni`, and the medal counts. The check script will tell you if
the medal counts disagree with the seasons.

### Field notes

| Field | Notes |
|---|---|
| `status` | `"competed"`, `"withdrew"`, or `"inProgress"`. Drives the medal chip when there is no medal. |
| `medal` | `"Gold"`, `"Silver"`, `"Bronze"`, or `null`. See the warning below. |
| `awards` | Special prizes only, not the medal. Write winners as `"Best Model — winner"` and nominations as `"Best Model — nominee"`. |
| `project` | `null` if it genuinely cannot be recovered. Always pair a `null` project with a `note`. |
| `note` | Rendered as a highlighted caveat on the season page. Use it whenever the record is incomplete. |
| `section` | `"undergrad"`, `"overgrad"`, or `null`. |
| `wikiStatus` | `"full"` or `"template"`. Controls whether the season's wiki is linked from the History dropdown in the nav. |

### `wikiUrl` and `wikiStatus`

The nav's "Project wikis" grid is generated from `history.json` — never hardcode wiki
links in `navigation.json`. Adding a season with `wikiStatus: "full"` puts it in the
dropdown automatically.

Set `wikiStatus` to `"template"` when the wiki was registered but never filled in.
As of 2026 that is **2021 alone**: its pages are the stock iGEM template, down to
"this is the abstract of your project". Sending a visitor there is worse than not
linking at all. Every other season's wiki was fetched and confirmed to carry real
content.

> **Never put a trailing slash on a pre-2022 `wikiUrl`.** The old `<year>.igem.org`
> wikis run MediaWiki, which 404s on `Team:Toronto/` but serves `Team:Toronto`. Seven
> links were broken this way. The check script now rejects it.

Note also that legacy `igem.org` hosts return HTTP 403 to default clients — use a
browser User-Agent when checking a link by hand, or you will think a live wiki is dead.

> **`medal: null` does not mean "no medal."** For 2005, 2006, 2010, 2011 and 2012 it
> means no iGEM results page survives that we can reach — those teams may well have
> won something. The site renders `null` as **"No result recorded"** for exactly this
> reason. Never change that wording to "no medal" without evidence.

### Deliberate omissions

- **2020 is not in the file.** There was no Toronto team. It is listed in
  `skippedYears` instead, and both `/history/` and the team size chart render it as an
  explicit gap so it does not read as an oversight.
- **No personal names appear anywhere in `history.json`** — not students, not advisors,
  not PIs. This was a deliberate decision. The names exist in the source dataset (see
  section 4) if the team ever chooses to publish them; adding them here means adding
  them to a searchable public page, which is a different thing from a 2011 wiki nobody
  visits. Photo captions follow the same rule.

---

## 2. Adding photographs

### What belongs in the gallery

Photographs of **people doing things**: lab work, the Jamboree, outreach events,
socials, team photos. That is the whole point of the gallery and it is what the site
is currently short of.

What does **not** belong: headshots (they live on the People page), sponsor logos,
wiki graphics, figures and diagrams, licence badges.

### The quick way — you already have the files

1. Put your images in `public/images/history/<year>/`. Use WebP or JPEG, no wider
   than about 1600 px, and give them descriptive kebab-case names
   (`jamboree-poster-session.webp`, not `IMG_5210.jpg`).
2. Add an entry per photo to the matching year in `src/data/gallery.json`:

   ```json
   "2027": [
     {
       "file": "2027/jamboree-poster-session.webp",
       "caption": "Presenting at the Jamboree poster session in Paris",
       "category": "jamboree",
       "credit": ""
     }
   ]
   ```

   `category` must be one of the ids in the `categories` list at the top of the file:
   `team-photo`, `lab`, `jamboree`, `outreach`, `social`. `credit` is optional — use it
   to credit a photographer.

3. Run `npm run check:history`.

**Captions must not name individuals**, for the same reason `history.json` does not.
Describe what is happening instead.

### The resizing way — you have originals straight off a camera

`scripts/import-history-photos.sh` converts to WebP, caps the width at 1600 px, never
upscales, and skips anything already imported.

1. Add rows to [`scripts/curated-photos.tsv`](../scripts/curated-photos.tsv) —
   **tab** separated, not spaces:

   ```
   source_file.jpg	2027	jamboree-poster-session.webp	jamboree	Presenting at the Jamboree poster session
   ```

2. Run it, pointing at wherever the originals live:

   ```bash
   ./scripts/import-history-photos.sh /path/to/your/photos
   ```

3. Copy the results into `gallery.json` as above, then `npm run check:history`.

Requires `cwebp` (`brew install webp`).

### Leaving a season empty

Keep the empty array. `"2015": []` is what makes `/gallery/` list 2015 under
"Seasons with no photographs" and makes the season page show a labelled empty slot.
Deleting the key breaks the check script. The gaps are meant to be visible — that is
how they get filled.

---

## 3. Where the current photographs came from

Thirteen photographs from six seasons (2006, 2009, 2010, 2016, 2018, 2023), pulled out
of a scrape of every surviving Toronto wiki. The other ~396 images in that scrape are
headshots, sponsor logos and page furniture, which is why the gallery is so thin.
2005 and 2021 have no surviving images at all.

The most likely places to find more: alumni's own photo libraries, the team's Google
Drive, old Facebook and Instagram posts, and the U of T engineering communications
archive.

---

## 4. Source dataset

The competition record was transcribed from a dataset built in August 2026 from
iGEM's team API cross-checked against every surviving Toronto wiki:

```
~/2nd_Brain/Knowledge/PetaScale/iGEM-alumni/
├── README.md                     ← provenance, known gaps, how to rebuild it
├── toronto-igem-teams.csv        ← 21 rows, one per season (the source for history.json)
├── toronto-igem-people.csv       ← 640 person-years, including names and roles
└── toronto-igem-images.csv       ← 443 images with download status and original URLs
```

The scraped images themselves are at
`~/Documents/Research/iGEM/2026/wiki-images/` (161 MB, not in git).

That README is the authority on why parts of the record are missing. Read it before
"fixing" anything on the history pages that looks like an omission.

To rebuild or extend the dataset:

```
https://api.igem.org/v1/teams/search?input=toronto
https://api.igem.org/v1/teams/<id>/roster     # names + roles, the primary source
https://api.igem.org/v1/teams/<id>/awards     # incomplete before 2009
```

Legacy `igem.org` hosts return HTTP 403 to default clients and need a browser
User-Agent.
