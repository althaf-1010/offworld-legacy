# OFFWORLD LEGACY

**Every machine has a story. Every mission leaves a legacy.**

An interactive digital archive exploring NASA equipment left behind on the Moon and Mars.

## Project

- Team: ORBIT OF D.
- Event: NASA Space Apps Challenge 2026
- Challenge: Abandoned but not Forgotten
- Application: React + Vite

## Development

Install dependencies:

    npm install

Start development server:

    npm run dev

Build production version:

    npm run build

## Features

- Moon and Mars mission archive
- Mission filtering
- Expandable mission records
- Historical photographs and NASA source references

## Data and attribution

Mission records include NASA image IDs, titles, dates, source record URLs, and supporting references. NASA archival images are stored locally as optimized WebP files in `public/images/missions/`; the app uses these local copies and links to the corresponding NASA image record.

### NASA image asset workflow

The Phase 3C asset script in `scripts/download-nasa-assets.js` resolves the exact NASA image ID through the NASA Images API, selects the smallest available rendition at or above the configured width (or the largest available rendition), and converts it to WebP with Sharp. It writes to temporary files and replaces the destination only after a successful conversion. Each asset's NASA ID, local filename, target width, and credit are listed in the script; update the matching record's `media` and backward-compatible image fields in `src/data/missions.js` with the resulting local path and actual dimensions.

Run the workflow with:

    node scripts/download-nasa-assets.js

The script requires the Sharp development dependency. Confirm the NASA record, image title, date, and credit for each asset before adding or changing its mission record. Existing assets should be reused when valid rather than downloaded again.

## Status

Development in progress.
