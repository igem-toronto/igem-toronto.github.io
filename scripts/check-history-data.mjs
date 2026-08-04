#!/usr/bin/env node
/**
 * Consistency check for the history and gallery data.
 *
 * Catches the mistakes that are easy to make by hand and invisible until the
 * page renders: a photo listed in gallery.json that was never committed, a
 * season key that does not exist in history.json, a medal tally that has drifted
 * out of step with the seasons it counts.
 *
 * Usage: node scripts/check-history-data.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => JSON.parse(readFileSync(join(repoRoot, path), 'utf8'));

const history = read('src/data/history.json');
const gallery = read('src/data/gallery.json');

const errors = [];
const warnings = [];

const seasonYears = history.years.map((season) => String(season.year));
const galleryYears = Object.keys(gallery.years);
const categoryIds = new Set(gallery.categories.map((category) => category.id));

// 1. Every season has a gallery key, and vice versa.
for (const year of seasonYears) {
  if (!galleryYears.includes(year)) {
    errors.push(`gallery.json has no key for season ${year} (it should at least be an empty array)`);
  }
}
for (const year of galleryYears) {
  if (!seasonYears.includes(year)) {
    errors.push(`gallery.json has a key for ${year}, which is not a season in history.json`);
  }
}

// 2. Every listed photograph exists on disk and has a known category.
let photoTotal = 0;
for (const [year, photos] of Object.entries(gallery.years)) {
  for (const photo of photos) {
    photoTotal++;
    const path = join('public/images/history', photo.file);
    if (!existsSync(join(repoRoot, path))) {
      errors.push(`${year}: ${path} is listed in gallery.json but not on disk`);
    }
    if (!photo.file.startsWith(`${year}/`)) {
      warnings.push(`${year}: ${photo.file} is filed under a different year's folder`);
    }
    if (!categoryIds.has(photo.category)) {
      errors.push(`${year}: "${photo.category}" is not one of the categories declared in gallery.json`);
    }
    if (!photo.caption?.trim()) {
      warnings.push(`${year}: ${photo.file} has no caption`);
    }
  }
}

// 3. The summary tallies match the seasons they claim to count.
const count = (medal) => history.years.filter((season) => season.medal === medal).length;
for (const [key, medal] of [
  ['gold', 'Gold'],
  ['silver', 'Silver'],
  ['bronze', 'Bronze'],
]) {
  const actual = count(medal);
  if (history.summary[key] !== actual) {
    errors.push(`summary.${key} says ${history.summary[key]}, but ${actual} seasons record a ${medal} medal`);
  }
}

if (history.summary.seasonsRegistered !== history.years.length) {
  errors.push(
    `summary.seasonsRegistered says ${history.summary.seasonsRegistered}, but history.json has ${history.years.length} seasons`,
  );
}

const competed = history.years.filter((season) => season.status !== 'withdrew').length;
if (history.summary.seasonsCompeted !== competed) {
  errors.push(`summary.seasonsCompeted says ${history.summary.seasonsCompeted}, but ${competed} seasons were not withdrawn`);
}

if (history.summary.firstYear !== Math.min(...history.years.map((s) => s.year))) {
  errors.push('summary.firstYear does not match the earliest season in history.json');
}

// 4. Required fields are present.
for (const season of history.years) {
  for (const field of ['blurb', 'story', 'wikiUrl', 'teamsUrl']) {
    if (!season[field]?.trim()) errors.push(`${season.year}: missing ${field}`);
  }
  if (!season.project && !season.note) {
    warnings.push(`${season.year}: has no project name and no note explaining why`);
  }
}

for (const warning of warnings) console.warn(`warn  ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);

console.log(
  `\n${history.years.length} seasons, ${photoTotal} photographs, ${errors.length} error(s), ${warnings.length} warning(s)`,
);

process.exit(errors.length > 0 ? 1 : 0);
