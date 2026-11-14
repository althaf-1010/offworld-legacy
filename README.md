# OFFWORLD LEGACY

**Every machine has a story. Every mission leaves a legacy.**

An illustrated, source-linked field archive of NASA equipment left on the Moon and Mars.

## Project

- Team: ORBIT OF D.
- Event: NASA Space Apps Challenge 2026
- Challenge: Abandoned but not Forgotten
- Stack: React 19, Vite, JavaScript modules, CSS
- Archive: Six equipment records across lunar and Martian missions

## Features

- Filter the archive by world and search mission, equipment, program, and landing site.
- Expand a record to read mission identity, dates, location, disposition, scientific legacy, and a sourced event timeline.
- View optimized local NASA images and follow links to NASA image records and supporting primary references.
- Responsive mobile-first layouts, keyboard-visible focus, reduced-motion support, and image failure placeholders.
- Canonical mission and equipment data validated at module load; tests check calendar dates, event order, data relationships, image files, and image dimensions.

## Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Validate code and archive data, then build for production:

```sh
npm run lint
npm test
npm run build
```

## Archive data and dates

Each record in `src/data/missions.js` describes the specific equipment left on a planetary surface and keeps that equipment separate from the carrier mission. `landingDate` is the touchdown date of the equipment represented by the record. It is null when a separate lander delivered the equipment; the carrier landing is then recorded in the timeline, and `deploymentDate` records when the equipment reached the surface. `operationalPeriod` describes active surface operations, not a later administrative mission closure or a visit by another mission.

Coordinates identify the recorded surface site and include a human-readable reference frame where available. A null coordinate means this archive does not provide a confirmed point. Event dates are ISO calendar dates and must be in chronological order.

## NASA image workflow and attribution

NASA image assets are stored as optimized WebP files in `public/images/missions/`. Each record's `media` object contains its local path, actual dimensions, NASA ID, title, date, image credit, and NASA Images details URL. The expanded mission file links both to the image record and to supporting source references. Keep image titles, credits, dates, and URLs tied to the corresponding official record.

The Phase 3C downloader is `scripts/download-nasa-assets.js`. It looks up exact NASA IDs through the NASA Images API, chooses the smallest search-result rendition meeting the configured width when NASA provides rendition dimensions, or the largest known rendition when none meet it. When the API omits rendition dimensions, it uses the original asset to avoid upscaling. It converts with Sharp, applies request timeouts, rejects non-image downloads, and cleans up temporary files. It stages the converted WebP before replacing the destination so a failed conversion does not replace an existing image.

Run it when a required local image is missing or invalid:

```sh
node scripts/download-nasa-assets.js
```

After processing new assets, read the actual WebP dimensions and update the matching `media` fields. Do not redownload valid local assets. NASA imagery is generally made available for use under NASA's media usage guidelines; check the specific image page for photographer/credit details and NASA's [media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).

## Repository structure

- `src/App.jsx` — archive layout, search, and destination filters
- `src/components/MissionCard.jsx` — mission cards and expanded source-linked mission files
- `src/data/missions.js` — canonical six-record archive
- `src/data/schema.js` — runtime validation and query utilities
- `src/data/types.js` — JSDoc schema definitions
- `public/images/` — local hero and mission WebP assets
- `scripts/download-nasa-assets.js` — NASA image download and conversion workflow
- `test/archive.test.js` — schema, query, image, and historical-date semantics checks
