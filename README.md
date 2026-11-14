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
- Explore verified Moon and Mars coordinates in an interactive equirectangular position plot; sites without confirmed coordinates are explicitly left unplotted.
- Read a plain-language field guide to landers, rovers, payloads, and surface operations.
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

Expanded records explain why the equipment was sent, its mission profile, events, scientific legacy, current disposition, and source trail. Last contact, operational shutdown, and later formal mission closure are represented as separate dated events when supported by sources.

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

## Challenge response checklist

The [official 2026 challenge brief](https://www.spaceappschallenge.org/2026/challenges/abandoned-but-not-forgotten-storytelling-about-nasas-discarded-equipment-on-the-moon-and-mars/) asks teams to tell the story of some or all of the equipment in a way that introduces school-age space enthusiasts to the hardware and science it made possible. This project responds with:

- Six equipment stories spanning the Moon and Mars, with plain-language purpose and legacy summaries.
- Source-linked timelines, historical image records, and NASA citations connected to the claims they support.
- A searchable archive and an interactive coordinate plot that leaves unconfirmed locations unplotted.
- A responsive browser-based demonstration, a short technical overview, and reproducible local validation commands.

This checklist describes the project's response to the published brief; it does not claim award eligibility or predict judging results.

## Deployment

The project builds as a static Vite site. Run `npm run build`, then publish the generated `dist/` directory on a static hosting service of your choice. No host is configured in this repository. Test the built site on the intended host before sharing it; public deployment has not been performed by this project workflow.

## Known limitations

- The archive intentionally covers six records and is not a complete inventory of hardware left beyond Earth.
- The Moon/Mars surface index is a coordinate plot, not a terrain basemap. It shows positions from published latitude/longitude values only; it does not imply a shared coordinate datum or centimeter-level accuracy. Opportunity has no confirmed point in this archive and is not plotted.
- The application has no automated browser-driven visual regression suite. Current automated checks validate lint, canonical records, local image formats and dimensions, and the production build.
- Some equipment condition details are inferred from mission documentation and orbital observations; claims are linked to sources, and uncertain coordinates are kept null.
