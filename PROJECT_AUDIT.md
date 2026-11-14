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

## Inspection limits at the time of the original audit

The initial audit was a read-only code and working-tree inspection, not a run-time verification or an independent historical fact-check. No build, lint, or other test command was run at that time. The progress addendum below records subsequent implementation and validation.

## Progress addendum — 2026-11-14

### Phase 3C completed — commit `46f79ae`

- Verified the three existing new WebPs with Sharp and visual inspection: Apollo 15 LRV 1200×1255, Viking 1 1200×427, Opportunity 1200×939.
- Connected the assets to canonical `media` records and checked NASA IDs, NASA Images details URLs, titles, credits, local paths, and actual dimensions.
- Hardened the downloader to require an exact NASA ID result, choose the smallest adequate rendition when the API reports dimensions (otherwise use the largest known rendition or original), validate HTTPS image URLs, apply request timeouts, reject non-image downloads, stage converted output before replacing a destination, and clean temporary files on failure.
- Documented the asset workflow and Sharp requirement in README. No images were downloaded again.

### Historical source review and corrections

Primary-source review confirmed and corrected these inconsistencies:

- Surveyor 3 bounced twice during landing, not three times. The last data were received May 4, 1967, two days after local sunset on May 3; NASA lists the spacecraft as operating April 20 through May 4. Its disposition now states that the camera system, scoop, cable, and tubing were removed by Apollo 12 rather than describing the lander as intact. Sources: [NASA Surveyor 3 mission](https://science.nasa.gov/mission/surveyor-3/), [NASA Surveyor facts](https://science.nasa.gov/resource/nasa-facts-rangers-and-surveyors-to-the-moon/), and [NASA Apollo 12 mission history](https://www.nasa.gov/missions/apollo/apollo-12-the-pinpoint-mission/).
- Surveyor 3 returned to the surface after two bounces when its main engine did not cut off as planned; the event description now reflects that. Source: [NASA Surveyor 3 mission](https://science.nasa.gov/mission/surveyor-3/).
- Apollo 12 ALSEP was decommissioned on September 30, 1977, not 1972. The operational period is now 1969–1977. Sources: [NASA ALSEP arrays and status](https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm) and [NASA NTRS ALSEP history](https://ntrs.nasa.gov/api/citations/20180008613/downloads/20180008613.pdf).
- Sojourner left the Pathfinder ramp on July 6, 1997, and operated for 83 days; the carrier landing remains a timeline event while the equipment profile has a July 6 deployment date. Source: [NASA NSSDCA Mars Pathfinder](https://nssdc.gsfc.nasa.gov/planetary/mesur.html).
- Viking 1's final transmission on November 11 and its communications shutdown/loss on November 13 are kept as separate timeline events, consistent with NASA's history sources. Source: [NASA Viking 1 mission](https://science.nasa.gov/mission/viking-1/).
- Opportunity's last communication on June 10, 2018 and NASA's formal mission conclusion on February 13, 2019 remain separate events. Source: [NASA JPL mission conclusion](https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/).

Mission identity, deployment and landing distinctions, image records, and the other timeline items retain their existing cited sources. No mission facts were changed outside the corrections listed above.

### Data, UI, tests, and documentation delivered

- Removed duplicated backward-compatibility fields; the app now reads canonical mission, equipment, and media records.
- Expanded mission files to show mission profile, equipment dates, site and coordinates, present disposition, event timeline with source links, scientific legacy, image title/date/credit, and claim-specific references.
- Added destination filters, archive search, result counts, empty state, keyboard-visible focus, accessible expanded states, missing-image fallback, reduced-motion behavior, and responsive mobile layouts.
- Hardened schema checks for real calendar dates, chronological events, event types, landing/deployment semantics, media dimensions, NASA details URLs, credits, and reference URLs.
- Updated README and page metadata. Removed unused Vite starter stylesheet and logo assets.
- Added `npm test`, covering schema and query behavior, date and event ordering rules, payload landing/deployment semantics, NASA image links/credits, and all local WebP paths and dimensions.

### Validation

- `npm run lint` — passed.
- `npm test` — passed, including canonical data checks and verification that all six local WebPs open and match recorded dimensions.
- `npm run build` — passed; Vite generated the production bundle.

The implementation milestone is complete. No image downloads were run; all existing local NASA assets validated.

### Continued primary-source fact check

- Clarified Surveyor 3's touchdown wording: its failed vernier-engine cutoff caused two hops and three surface touchdowns. NASA's contemporary technical report distinguishes the number of hops from the number of touchdowns: [JPL Space Programs Summary 37-46, Vol. VI](https://ntrs.nasa.gov/citations/19670028016). NASA NSSDCA confirms the April 20 landing location and coordinates: [Surveyor missions](https://nssdc.gsfc.nasa.gov/planetary/lunar/surveyor.html).
- Cross-checked Sojourner's July 6 UTC deployment, 83-sol operation, and Pathfinder's September 27 final data transmission against NASA/JPL mission records: [Pathfinder mission description](https://planetarydata.jpl.nasa.gov/img/w10n/mpfl-m-imp-2-edr-v1.0/mpim_0001/document/mission.htm), [NASA Pathfinder image record](https://science.nasa.gov/resource/pathfinders-rover-airbags-martian-terrain/).
- Confirmed Apollo 12 ALSEP deployment and shutdown dates and site coordinates in NASA's ALSEP status table: [NASA ALSEP arrays and status](https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm).
- Confirmed Viking 1's last transmission/interrupted communications on November 11 and the end-of-mission date reported as November 13; NASA sources use both dates for these distinct milestones: [NASA Viking 1 mission](https://science.nasa.gov/mission/viking-1/), [NASA Viking project overview](https://science.nasa.gov/mission/viking/), [NASA NSSDCA Viking overview](https://nssdc.gsfc.nasa.gov/planetary/viking.html).
- Confirmed Opportunity's June 10, 2018 last signal, February 13, 2019 formal mission conclusion, and 45.16 km total odometry: [NASA Opportunity mission](https://science.nasa.gov/mission/mer-opportunity/). NASA's 2015 report confirms the March 24 marathon milestone: [NASA Aeronautics and Space Report](https://www.nasa.gov/wp-content/uploads/2023/01/presrep2015.pdf).

These checks confirmed the corresponding record dates and claims; the only wording change in this follow-up was the Surveyor 3 hops/touchdowns distinction.

### Master execution prompt progress

- Added a Moon/Mars coordinate plot using published latitude/longitude only. The plot is explicitly not a terrain basemap; the Opportunity record remains listed as unplotted because this archive has no verified coordinate point for it.
- Added equipment-category filtering and expanded archive search to include purpose and timeline text.
- Added a plain-language mission purpose to each record and an introductory glossary for landers, rovers, payloads, and surface operations.
- Added a project response checklist tied to the [official 2026 challenge brief](https://www.spaceappschallenge.org/2026/challenges/abandoned-but-not-forgotten-storytelling-about-nasas-discarded-equipment-on-the-moon-and-mars/), plus deployment steps and known limitations in README. No award eligibility or judging claim is made.
- Added automated coordinate-projection tests. Existing schema and local-image checks remain in place.
- Validation after these changes: `npm run lint`, `npm test`, and `npm run build` passed. Local Vite served the app entry point by HTTP. Browser-based responsive testing is unavailable in the configured environment; no public deployment was made.

### Master execution prompt completion pass — 2026-11-14

- Added featured Moon and Mars mission stories with direct links into the searchable archive, a physical recovery overview, and mobile-visible navigation to stories, archive, surface index, and legacy.
- Added plain-language definitions for science instruments and communication relays. Added image failure fallbacks and visible NASA credits for the featured images and hero photograph.
- Added a recovery status field with explicit categories: selected Surveyor 3 components were returned; no recovery is documented for the other five records. Updated disposition wording to avoid claiming direct knowledge of present component condition where none is available.
- Attached each plotted location to a coordinate source and a statement of what that point represents. The Sojourner point is explicitly the Pathfinder landing/deployment area, not a precise final rover position; Opportunity remains unplotted.
- Corrected Pathfinder chronology to show last successful data on September 27, 1997, a final signal without data on October 7, and formal carrier-mission closure on March 10, 1998. Split those from Sojourner surface operation end. Sources: [NASA Science: final Pathfinder transmission](https://science.nasa.gov/resource/the-first-imp-image-from-mars/) and [NASA/JPL Pathfinder mission description](https://planetarydata.jpl.nasa.gov/img/w10n/mpfl-m-imp-2-edr-v1.0/mpim_0001/document/mission.htm).
- Updated event types so Viking 1's last transmission, communication interruption, and 1983 formal closure are labeled separately; Opportunity's formal mission conclusion is separate from its 2018 final communication; Apollo 15's LCRU/GCTA downlink issue is labeled a subsystem failure. Viking closure source: [NASA NTRS Deep Space Chronicle](https://ntrs.nasa.gov/api/citations/20010071698/downloads/20010071698.pdf).
- Expanded regression tests for these event distinctions, recovery labels, and coordinate source links. Added social sharing metadata and a short demo flow to README.
- Validation on this pass: `npm run lint`, `npm test` (all tests passed), `npm run build`, and `git diff --check` passed. No browser automation is configured, no assets were downloaded again, and no public deployment was performed.
