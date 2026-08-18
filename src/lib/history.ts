/**
 * Shared helpers for the competition history.
 *
 * Data lives in src/data/history.json (one entry per season) and
 * src/data/gallery.json (photographs, keyed by season). Everything that reads
 * either file goes through here so the medal styling, the "no result recorded"
 * wording, and the year ordering stay consistent across the home page timeline,
 * /history/, /history/<year>/, and /gallery/.
 */

import historyData from '../data/history.json';
import galleryData from '../data/gallery.json';

export type Medal = 'Gold' | 'Silver' | 'Bronze';
export type SeasonStatus = 'competed' | 'withdrew' | 'inProgress';

/** A video hosted on the iGEM Video Universe (video.igem.org), embedded via iframe. */
export interface SeasonVideo {
  /** 'promo' = Project Promotion, 'presentation' = Team Presentation, 'other' = anything else worth keeping. */
  role: 'promo' | 'presentation' | 'other';
  title: string;
  embedUrl: string;
  watchUrl: string;
}

export interface Season {
  year: number;
  teamName: string;
  nickname: string | null;
  project: string | null;
  track: string | null;
  section: string | null;
  teamSize: number;
  status: string;
  medal: string | null;
  awards: string[];
  wikiUrl: string;
  /** 'full' if the wiki carries real content, 'template' if it was never filled in. */
  wikiStatus: 'full' | 'template';
  teamsUrl: string;
  blurb: string;
  story: string;
  note: string | null;
  /** Videos from the iGEM Video Universe. Absent (not empty) for seasons with none archived there. */
  videos?: SeasonVideo[];
}

export interface Photo {
  file: string;
  caption: string;
  category: string;
  credit: string;
}

export interface PhotoCategory {
  id: string;
  label: string;
}

const seasons = historyData.years as Season[];

/** Every season, newest first. */
export const allSeasons: Season[] = [...seasons].sort((a, b) => b.year - a.year);

/** Seasons in chronological order — for charts and left-to-right timelines. */
export const seasonsAscending: Season[] = [...seasons].sort((a, b) => a.year - b.year);

export const summary = historyData.summary;
export const skippedYears = historyData.skippedYears;
export const photoCategories = galleryData.categories as PhotoCategory[];

/** Site-root-relative URL prefix, respecting a deployed base path. */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const seasonUrl = (year: number | string): string => `${base}/history/${year}/`;

export const photoUrl = (file: string): string => `${base}/images/history/${file}`;

/** Photographs for one season, or an empty array. Never undefined. */
export function photosFor(year: number | string): Photo[] {
  const years = galleryData.years as Record<string, Photo[]>;
  return years[String(year)] ?? [];
}

/** Total number of photographs currently in the gallery. */
export function photoCount(): number {
  return Object.values(galleryData.years as Record<string, Photo[]>).reduce(
    (total, photos) => total + photos.length,
    0,
  );
}

/**
 * Chip styling for a medal. `null` is not "no medal" — for most of the early
 * years it means iGEM has no reachable results page, which is a different
 * claim. See medalLabel().
 */
export function medalClass(medal: string | null): string {
  if (medal === null) return 'border-primary-950/20 bg-white text-primary-950/50';
  if (/gold/i.test(medal)) return 'border-amber-500/60 bg-amber-500/10 text-amber-700';
  if (/silver/i.test(medal)) return 'border-primary-950/25 bg-primary-950/5 text-primary-950/70';
  if (/bronze/i.test(medal)) return 'border-accent-orange/50 bg-accent-orange/10 text-accent-orange';
  return 'border-primary-950/20 bg-white text-primary-950/50';
}

/** What the medal chip should say, including the honest empty cases. */
export function medalLabel(season: Season): string {
  if (season.medal) return `${season.medal} Medal`;
  if (season.status === 'withdrew') return 'Did not compete';
  if (season.status === 'inProgress') return 'Season in progress';
  return 'No result recorded';
}

/** What to show where a project name should go. */
export function projectLabel(season: Season): string {
  if (season.project) return season.project;
  if (season.status === 'withdrew') return 'Registered, then withdrew';
  return 'Project not recoverable';
}

/** The previous and next seasons chronologically, skipping absent years. */
export function neighbours(year: number): { previous: Season | null; next: Season | null } {
  const index = seasonsAscending.findIndex((season) => season.year === year);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: seasonsAscending[index - 1] ?? null,
    next: seasonsAscending[index + 1] ?? null,
  };
}

/** Headline numbers for the stat ledgers, formatted for display. */
export function ledgerStats(): { value: string; label: string }[] {
  return [
    { value: String(summary.seasonsRegistered), label: 'Seasons entered' },
    { value: String(summary.memberYears), label: 'Member-years' },
    { value: String(summary.alumni), label: 'Alumni' },
    { value: String(summary.gold).padStart(2, '0'), label: 'Gold medals' },
  ];
}
