# OFFWORLD LEGACY — Repository Inspection Report

Inspection date: 2026-11-14  
Scope: Read-only inspection of the README, Git status, mission data, schema, app components, styles, asset files, and the uncommitted Phase 3C asset downloader.

## Git status at inspection

Branch `main` matched `origin/main`. The working tree already contained these uncommitted changes:

- Modified `package.json` and `package-lock.json` (adds the Sharp development dependency and its lockfile entries).
- Untracked `scripts/download-nasa-assets.js`.
- Untracked WebP files: `public/images/missions/apollo-15-lrv.webp`, `public/images/missions/viking-1-lander.webp`, and `public/images/missions/opportunity-rover.webp`.

Other mission image files and the hero background were already tracked. No files were modified during the original inspection. This report was added at the user's request; no commit or push was made.

## 1. Current project architecture

- **Frontend:** React 19 single-page app built and served with Vite. `src/main.jsx` mounts `App` in `StrictMode`.
- **UI:** The archive, hero, filters, mission cards, expandable mission details, and footer are implemented together in `src/App.jsx`. Active styles are in `src/index.css`. `src/App.css` contains starter styles and is not imported.
- **Data:** Six mission/equipment records are defined in `src/data/missions.js`. `src/data/types.js` documents a JSDoc schema; `src/data/schema.js` validates records at import time and exports destination/filter/lookup helpers.
- **Assets:** Mission images are stored in `public/images/missions/`; the hero background is `public/images/hero/hero-bg.webp`. `scripts/download-nasa-assets.js` uses the NASA Images API and Sharp to download and convert selected images to WebP.
- **Commands:** `npm run dev`, `npm run build`, `npm run lint`, and `npm run preview` are declared in `package.json`.

## 2. Existing implementation and completed features

- A dark, responsive archive page with hero section, Moon/Mars filters, result counts, mission cards, status, descriptions, and expandable legacy/image details.
- Six records: Surveyor 3, Sojourner, Apollo 12 ALSEP, Apollo 15 Lunar Roving Vehicle, Viking 1 Lander, and Opportunity Rover.
- A structured data model separates mission identity, equipment, destination, dates, operational status, physical disposition, location, events, media metadata, and source references.
- Runtime validation checks record IDs and uniqueness, destinations, coordinates, events, media metadata, references, and the backward-compatible fields consumed by the current UI.
- Three older image assets have JPEG and WebP files: Surveyor 3, Sojourner, and Apollo ALSEP.
- Current uncommitted Phase 3C work adds local WebP assets for Apollo 15, Viking 1, and Opportunity, an asset-download script, and Sharp as a development dependency.
- CSS includes tablet/mobile layouts and reduced-motion handling. Mission images use lazy loading and async decoding.

## 3. Missing or incomplete features

- The three new WebP assets are not connected to their M-004–M-006 records. Those records still set canonical `media.src` and compatibility `image` to `null`, so their cards show placeholders.
- The data duplicates image/UI values in canonical fields and backward-compatibility aliases. These representations can drift.
- Expanded mission files expose only legacy text and image information. Event timelines, physical disposition, coordinates, detailed dates, and the majority of cited references are not shown in the UI.
- The README describes an archive and references, but does not document the current schema, the NASA asset workflow, or detailed attribution. Its “Development in progress” status is broad and does not identify completed work.
- No separate component structure exists yet; all app UI remains in `App.jsx`.
- Filtering, expandable details, image failures, keyboard behavior, and assistive-technology behavior were not exercised as part of the read-only inspection.

## 4. Bugs and historical-data inconsistencies

These are repository-level observations; historical claims were not independently checked against the linked NASA sources.

### Implementation/data issues

- **M-004/M-005/M-006 image mismatch:** The local WebPs exist, but the records keep null image paths/dimensions. The UI therefore does not display the new assets.
- **M-003 Apollo 12 ALSEP:** `landingDate` is null even though its events record the Apollo 12 lunar landing on 1969-11-19. This may reflect that the record concerns equipment deployed from the Lunar Module rather than a direct lander, but that distinction is not documented in the schema.
- **M-002 Sojourner:** `landingDate` is null while the event list records the Pathfinder carrier landing on 1997-07-04 and Sojourner deployment on July 6. The equipment-versus-carrier meaning should be explicit.
- **M-006 Opportunity:** `operationalPeriod` ends in 2018 while a formal shutdown/termination event is dated 2019-02-13. This could describe active surface operations versus formal mission closure, but the field's meaning is unclear. Its deployment date is January 31, 2004; the narrative describes Sol 7 egress, and the date convention should be checked against the cited source before being normalized.
- **M-001 Surveyor 3:** `operationalPeriod` is only `1967`, while the record also includes a 1969 Apollo 12 crew visit and sample retrieval. The period appears to mean active lander operations rather than the full historical span.
- **Validation gaps:** `schema.js` checks date-string shape but not real calendar validity, event ordering, or consistency among mission dates. It permits null coordinates without validating `siteName`, and it does not check whether referenced local image files exist.
- **Unused stylesheet:** `src/App.css` is not imported and contains unrelated Vite starter styles, which can mislead future edits.

## 5. Prioritized implementation plan

### Phase 3C — NASA image assets

1. Wire the existing Apollo 15 LRV, Viking 1 Lander, and Opportunity WebPs into M-004–M-006, updating canonical media fields and compatibility aliases together.
2. Populate dimensions from the actual image files rather than assumed values. Confirm each file depicts the cited NASA image record and ensure the nasaId, title, source URL, and attribution agree.
3. Review the downloader's rendition selection, error handling, and temporary-file cleanup before relying on it for subsequent batches. In particular, ensure failed downloads/conversions do not leave stale temporary files and make output record updates reproducible.
4. Reconcile all six records' image metadata with available files and NASA source records so no card silently falls back to a placeholder when a local image is present.

### Following phases

5. **Historical data semantics:** Define how `landingDate`, `deploymentDate`, and `operationalPeriod` apply to equipment delivered by a carrier versus direct landers. Reconcile the ALSEP, Sojourner, Surveyor 3, and Opportunity fields with their event narratives and cited sources.
6. **Schema hardening:** Validate calendar-valid dates, event chronology, field relationships, and local media-file existence; make nullability and carrier/equipment distinctions clear in `types.js` and `schema.js`.
7. **Complete mission files in the UI:** Add event timelines, disposition, location/coordinates, key dates, and authoritative citations to expanded records.
8. **Reduce duplicated data:** Update the UI to consume canonical `mission`, `equipment`, and `media` fields, then remove compatibility aliases and their validation once all consumers are migrated.
9. **Documentation and cleanup:** Update README with actual features, data/schema conventions, NASA image processing steps, and attribution. Remove unused starter stylesheet/assets when they are confirmed unnecessary.

## Inspection limits

This was a read-only code and working-tree inspection, not a run-time verification or an independent historical fact-check. No build, lint, or other test command was run.
