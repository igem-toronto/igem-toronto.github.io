#!/usr/bin/env bash
#
# Import curated historical photographs into public/images/history/<year>/.
#
# Reads scripts/curated-photos.tsv, converts each listed source image to WebP at
# a maximum width of 1600 px (never upscaled), and writes it to its year folder.
# Existing outputs are left alone, so the script is safe to re-run.
#
# Usage:
#   ./scripts/import-history-photos.sh [SOURCE_DIR]
#
# SOURCE_DIR defaults to the scraped wiki archive; override it if yours lives
# somewhere else. See docs/HISTORY_AND_GALLERY.md.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="${1:-$HOME/Documents/Research/iGEM/2026/wiki-images}"
TSV="$REPO_ROOT/scripts/curated-photos.tsv"
OUT_ROOT="$REPO_ROOT/public/images/history"
MAX_WIDTH=1600
QUALITY=82

if ! command -v cwebp >/dev/null 2>&1; then
  echo "error: cwebp not found. Install it with 'brew install webp'." >&2
  exit 1
fi

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "error: source directory not found: $SOURCE_DIR" >&2
  echo "Pass the archive location as the first argument." >&2
  exit 1
fi

imported=0
skipped=0
missing=0

while IFS=$'\t' read -r source year output category caption; do
  # Skip comments and blank lines.
  [[ -z "${source// }" || "$source" == \#* ]] && continue

  src="$SOURCE_DIR/$source"
  dest_dir="$OUT_ROOT/$year"
  dest="$dest_dir/$output"

  if [[ ! -f "$src" ]]; then
    echo "MISSING  $source"
    missing=$((missing + 1))
    continue
  fi

  if [[ -f "$dest" ]]; then
    skipped=$((skipped + 1))
    continue
  fi

  mkdir -p "$dest_dir"

  # Only downscale. sips reports the true pixel width; cwebp would happily
  # enlarge a 640 px 2006 photo to 1600 px and make it look worse.
  width="$(sips -g pixelWidth "$src" | awk '/pixelWidth/ {print $2}')"
  if [[ -n "$width" && "$width" -gt "$MAX_WIDTH" ]]; then
    cwebp -quiet -q "$QUALITY" -resize "$MAX_WIDTH" 0 "$src" -o "$dest"
  else
    cwebp -quiet -q "$QUALITY" "$src" -o "$dest"
  fi

  echo "IMPORTED $year/$output  ($category)"
  imported=$((imported + 1))
done < "$TSV"

echo
echo "imported=$imported skipped=$skipped missing=$missing"
echo "Total size: $(du -sh "$OUT_ROOT" 2>/dev/null | cut -f1)"
echo
echo "Remember to add matching entries to src/data/gallery.json."
