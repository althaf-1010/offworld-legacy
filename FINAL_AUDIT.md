# OFFWORLD LEGACY — Final Competition Readiness Audit

Audit date: 2026-11-14
Repository: `althaf-1010/offworld-legacy`
Branch and revision inspected: `main`, `90d102c`
Scope: read-only review of source, canonical mission records, local imagery, documentation, automated checks, and NASA source material. No application or mission-data files were changed. This report is the only file added by the audit.

## 1. Executive summary

OFFWORLD LEGACY is a substantial, working response to the challenge. It presents six source-linked equipment records, story spotlights, searchable and filterable records, timelines, a coordinate plot, a recovery overview, and a short educational glossary. Its strongest practices are separating carrier landing from equipment deployment, leaving Opportunity unplotted without a coordinate this archive can verify, and distinguishing last contact from formal mission closure for Viking 1 and Opportunity.

The audit found two high-priority Surveyor 3 errors: the record attributes the landing bounce to the vernier engines although NASA says the main engine failed to cut off, and it labels May 4 as a shutdown even though NASA identifies that date as last contact and reports the end of Surveyor's first lunar-day operations on May 3. The interactive map also has a touch target that scales to about 11 px on a 320 px-wide phone, making a central mobile feature difficult to use.

**Verdict: not ready for final submission until the high-priority accuracy and mobile interaction findings are resolved.** The build, lint, and existing tests pass, but those checks do not detect the historical errors or assess the interface in a browser. No browser automation or browser binary is configured here. The official 2026 challenge page also returned a 502 through the research provider, so alignment is assessed against the challenge wording supplied for this audit and the brief linked in the README; this audit makes no award or eligibility determination.

### Remediation update — 2026-11-14

The HIGH and MEDIUM source, data, mobile-style, metadata, and programmatic-accessibility findings below have been addressed in the current working tree. ALSEP distance figures were removed from the record because the 180 m source endpoint could not be verified against the NASA central-station-to-LM description. The map's SVG now retains its visible markers and has separate 44 px keyboard-operable buttons. Browser/device validation remains outstanding: no browser binary or automation is available in this environment, so 320/360/390 px, tablet, desktop, overflow, and end-to-end interaction checks have not been claimed. The low-priority skip link and acronym glossary were also implemented.

| Finding | Resolution status |
|---|---|
| Surveyor 3 engine attribution and bounce sequence | Resolved: NASA's main-engine wording; two bounces and third touchdown retained. |
| Surveyor 3 first-lunar-day end and last contact | Resolved: May 3 operations-end and May 4 last-contact events are separate; no shutdown mechanism is invented. |
| Sojourner last data, later no-data signal, formal conclusion | Resolved: disposition and timeline distinguish September 27, October 7, and March 10, 1998. |
| Apollo 12 ALSEP deployment distance | Distance claim removed from the event; central-station coordinates and attribution retained. Exact reconciliation remains unresolved because the cited 180 m source could not be inspected and its endpoints are unclear. |
| Viking 1 HiRISE observation | Resolved: PSP_001521_2025 added; wording is limited to the lander location and likely entry-hardware locations stated by the observation. |
| Opportunity PIA18079 image date | Resolved: date is March 22–24, 2014. |
| Featured-story image-credit readability | Resolved in CSS; source link and full credit remain. |
| ExplorationMap touch targets | Resolved in implementation: independent 44 px native buttons preserve labels and keyboard access. Visual/browser confirmation is pending. |
| Small-screen labels and metadata typography | Resolved in CSS; visual/browser confirmation is pending. |
| Mobile overflow/clipping | Code-side masking removed from `main`; browser overflow inspection remains unverified and is not claimed. |
| Reduced-motion programmatic scroll | Resolved: record navigation uses instant scrolling when reduced motion is requested. |
| Vite starter favicon | Resolved: replaced with an archive-themed SVG favicon. |
| Relative social-preview image URLs | Resolved: Open Graph and Twitter preview image URLs now use the repository's absolute raw asset URL. |
| Skip-to-content and requested glossary terms | Resolved as additional accessibility work: skip link added; LCRU, GCTA, RTG, APXS, Pancam, PSE, and EVA are defined. |

Severity definitions: **CRITICAL** must resolve before submission; **HIGH** significantly affects accuracy, credibility, or core use; **MEDIUM** materially weakens quality or should be resolved; **LOW** is optional polish.

## 2. Challenge alignment assessment

**Assessment: strong functional fit, with a few storytelling and educational gaps.** The product clearly frames the collection as NASA equipment left on the Moon and Mars. Each record has a purpose, chronology, operational history, disposition, scientific legacy, sources, and a local image. Search, destination and equipment filters, mission expansion, featured stories, and linked coordinate markers make it an interactive archive rather than a static card gallery.

The location plot makes its limitation clear: it shows published site coordinates and is not a terrain map. It also explains that Sojourner's plotted point is the Pathfinder landing/deployment area and leaves Opportunity unplotted. The recovery section distinguishes Surveyor 3's partial component recovery from the five records with no recovery documented.

Weak points against the requested experience:

- Individual stories are expanded archive cards, not addressable pages. A visitor cannot open or share a stable URL for a particular mission story; the app stores the open record only in React state (`src/App.jsx`).
- The glossary defines broad terms but not several mission-specific acronyms and instruments used in the narratives, including LCRU, GCTA, RTG, APXS, Pancam, PSE, and EVA (`src/components/MissionGlossary.jsx`; `src/data/missions.js`). This leaves some mission details less accessible to school-age visitors and non-specialists.
- Surveyor 3 and the Apollo 15 LRV show only a year in the “Surface operations” profile. Their files do not summarize an operating duration in a similarly direct way to Sojourner's 83 sols or Opportunity's 5,111 sols (`src/data/missions.js`, `src/components/MissionCard.jsx`).
- The official challenge brief was not independently retrievable during this audit; the alignment assessment therefore uses the supplied challenge text. The README's statement about school-age audiences should be checked against the official brief when that page is available.

## 3. Scientific accuracy findings

### HIGH — Surveyor 3 landing cause names the wrong engine system — RESOLVED

- **Location:** `src/data/missions.js`, M-001 `events[1].description` (around line 54).
- **Issue:** The record says the *vernier engines* failed to cut off. NASA's Surveyor 3 mission history says the *main engine* failed to cut off at the correct moment; the spacecraft then bounced twice before settling on its third touchdown.
- **Evidence:** [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/) gives the engine and bounce sequence in its in-depth history.
- **Why it matters:** This is a central technical detail in the mission's landing story, and the record currently contradicts its cited NASA source.
- **Recommended solution:** Use NASA's “main engine” wording and retain the two-bounces/three-touchdowns distinction.

### HIGH — Surveyor 3 last contact is labeled as shutdown — RESOLVED

- **Location:** `src/data/missions.js`, M-001 `events[2]` (around line 56); label rendered by `src/components/MissionCard.jsx` `EVENT_LABELS`.
- **Issue:** The event is typed `shutdown` and dated May 4, 1967, but its description says that this was the date last data were received. NASA identifies May 4 as the last contact. A NASA technical paper describes the end of first-lunar-day operations/shutdown as May 3. The record merges two distinct milestones and presents a last-contact date as a shutdown date.
- **Evidence:** [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/) lists last contact on May 4; [NASA NTRS — Analysis of Surveyor 3](https://ntrs.nasa.gov/api/citations/19720019081/downloads/19720019081.pdf) describes first-lunar-day operations ending May 3.
- **Why it matters:** Visitors may infer a commanded shutdown on May 4, and the current record fails to distinguish equipment operation from final received data.
- **Recommended solution:** Represent May 4 as last contact/data, and describe the May 3 end of lunar-day operations separately only to the precision supported by the cited technical source.

### MEDIUM — Sojourner disposition summary conflicts with its later signal event — RESOLVED

- **Location:** `src/data/missions.js`, M-002 `physicalDisposition` (around line 126).
- **Issue:** The summary says communication through Pathfinder “ceased on September 27.” The timeline correctly records September 27 as the last successful data transmission and October 7 as a final signal without data. The summary does not preserve that distinction.
- **Evidence:** [NASA Science — Sojourner's final Pathfinder data transmission and mission conclusion](https://science.nasa.gov/resource/the-first-imp-image-from-mars/) confirms the September 27 data date and March 10, 1998 mission conclusion. The M-002 October 7 event cites [NASA/JPL Pathfinder status material](https://mars.nasa.gov/internal_resources/815/).
- **Why it matters:** A visitor reading only the disposition summary can mistake last data for the last signal or complete loss of communication.
- **Recommended solution:** Say “last successful data on September 27” in the summary, and refer to the October 7 no-data signal separately.

### MEDIUM — Apollo 12 ALSEP distance is inconsistent with NASA's account — RESOLVED BY OMITTING DISTANCE

- **Location:** `src/data/missions.js`, M-003 deployment event description (around line 270).
- **Issue:** The event states that the ALSEP was deployed approximately 180 m northwest of the Lunar Module. NASA's ALSEP history describes the Apollo 12 central station as 90 m northwest of the LM; the published ALSEP coordinates also produce a different separation when compared with the LM coordinates in NASA's landing-site data. The cited LPI page could not be opened by the audit browser, so the 180 m figure could not be reconciled to its cited source.
- **Evidence:** [NASA ALSEP history](https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html) gives the central station location as 90 m northwest; [NASA ALSEP arrays and status](https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm) publishes its deployment coordinates; [NASA Apollo landing-site coordinates](https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html) separately lists the LM and ALSEP points.
- **Why it matters:** The event presents a precise distance and direction as fact while authoritative records appear to disagree. A reader cannot tell whether the distance refers to the whole package, central station, walking route, or another estimate.
- **Recommended solution:** Reconcile the cited mission map with the central-station coordinates and name the endpoints. If the source basis remains unclear, omit the distance and keep the verified deployment coordinates.

### MEDIUM — Viking 1 HiRISE claim lacks a record-level citation — RESOLVED

- **Location:** `src/data/missions.js`, M-005 `physicalDisposition` (around line 448) and M-005 `references`.
- **Issue:** The text says MRO's HiRISE imaged the lander site and nearby entry hardware, but the M-005 reference list does not link the relevant HiRISE observation.
- **Evidence:** The claim is supported by [HiRISE observation PSP_001521_2025](https://hirise.lpl.arizona.edu/PSP_001521_2025), which identifies Viking Lander 1 and candidate backshell, heat-shield, and parachute locations. That source is absent from the canonical M-005 references shown in the mission file.
- **Why it matters:** The statement is supportable, but the interface's source trail does not currently let a visitor verify it from the relevant record.
- **Recommended solution:** Add the HiRISE observation to M-005's references with a claim matching what the image actually identifies.

### MEDIUM — Opportunity image date is too precise for a composite — RESOLVED

- **Location:** `src/data/missions.js`, M-006 `media.date` (around line 631); displayed in `src/components/MissionCard.jsx` under “Image record.”
- **Issue:** The field says “March 24, 2014.” NASA describes PIA18079 as a composite of frames taken from March 22 through March 24.
- **Evidence:** [NASA Photojournal — PIA18079](https://science.nasa.gov/photojournal/self-portrait-by-freshly-cleaned-opportunity-mars-rover-in-march-2014/) describes the March 22–24 capture range.
- **Why it matters:** A single-day date implies a more precise capture date than the source supports.
- **Recommended solution:** Display the capture range, or label March 24 specifically as the last frame date if that is what the stored value intends to mean.

### Other mission checks

- **Sojourner:** Launch on December 4, 1996, Pathfinder landing on July 4, 1997, Sol 2 deployment, 83-sol operation, September 27 last data, and March 10, 1998 formal mission conclusion are broadly consistent with [NASA's Pathfinder mission history](https://science.nasa.gov/mission/mars-pathfinder/) and the cited NASA Science photojournal record. The October 7 no-data signal is separately represented in the timeline, subject to the summary inconsistency above.
- **Apollo 12 ALSEP:** The November 19, 1969 deployment and September 30, 1977 commanded shutdown match NASA's [ALSEP status table](https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm). The Apollo 11 EASEP distinction is not violated in the records.
- **Apollo 15 LRV:** The July 31 deployment, August 2 final parking, and August 5 LCRU/GCTA downlink event are presented separately. The event says the August 5 date is inferred from NASA commentary saying the LCRU was switched on “yesterday”; NASA's [Apollo 15 commentary](https://www.nasa.gov/wp-content/uploads/2026/01/as15-pao.pdf) supports the roughly 13-minute operation and downlink loss. The event correctly avoids describing it as rover shutdown.
- **Viking 1:** November 11 last transmission, November 13 communications interruption/accidental shutdown, and May 21, 1983 mission closure are consistent with the [NASA Deep Space Chronicle](https://ntrs.nasa.gov/api/citations/20010071698/downloads/20010071698.pdf). The planetocentric and planetographic coordinates are labeled separately.
- **Opportunity:** June 10, 2018 final communication and February 13, 2019 formal mission conclusion match [NASA/JPL's conclusion report](https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/). The rover's physical condition remains explicitly unconfirmed and the record does not fabricate a plotted coordinate.

## 4. NASA source and image audit

Each mission record has a source list, each event carries a source URL, and the image record includes a NASA identifier, local path, title, credit, date, and NASA Images details URL. Canonical local WebP files were visually inspected and their dimensions are covered by the existing test.

| NASA ID | Record | Audit result |
|---|---|---|
| `AS12-48-7121` | Surveyor 3 | Local image depicts Surveyor 3 at its Apollo 12 visit. The ID is corroborated in NASA archival material. |
| `PIA04318` | Sojourner | NASA Photojournal confirms title, subject, and `NASA/JPL-Caltech` credit. |
| `AS12-47-6918` | Apollo 12 ALSEP | NASA archival catalog identifies this as an Apollo 12 central-station image; local image shows the deployed package. |
| `AS15-88-11901` | Apollo 15 LRV | NASA archival material identifies it as an LRV final-resting-place photograph; local image depicts the rover. |
| `PIA00381` | Viking 1 | NASA Photojournal confirms first Viking 1 surface photograph and `NASA/JPL` credit; local image depicts the surface and footpad. |
| `PIA18079` | Opportunity | NASA Photojournal confirms the Opportunity self-portrait and full multi-institution credit; local image matches the rover. |

NASA Photojournal records directly verified during this audit include [PIA04318](https://science.nasa.gov/photojournal/sojourner-sits-near-rock-garden/), [PIA00381](https://science.nasa.gov/photojournal/first-photograph-taken-on-mars-surface/), and [PIA18079](https://science.nasa.gov/photojournal/self-portrait-by-freshly-cleaned-opportunity-mars-rover-in-march-2014/). NASA archive material also corroborates [AS12-48-7121](https://ntrs.nasa.gov/api/citations/19720019081/downloads/19720019081.pdf), [AS12-47-6918](https://www.nasa.gov/wp-content/uploads/2017/10/617743main_nasa-usg_lunar_historic_sites_reva-508.pdf), and [AS15-88-11901](https://www.nasa.gov/wp-content/uploads/2017/10/617743main_nasa-usg_lunar_historic_sites_reva-508.pdf).

**Live-link limitation:** the audit browser could not open the six `images.nasa.gov/details/...` pages directly. That provider reported the domain/path as inaccessible; this does not establish that the links are dead in a regular browser. The app's schema verifies their HTTPS form and ID/path match, but no runtime browser click test was possible. The equivalent NASA Photojournal pages were independently verified for the three PIA identifiers above.

### MEDIUM — NASA image attribution is too small in the featured story overlay — RESOLVED

- **Location:** `src/components/StorySpotlights.jsx` `.spotlight-credit`; `src/index.css` `.spotlight-credit` (6 px).
- **Issue:** Featured image credits are technically visible, but rendered at 6 px in a narrow overlay. Full credit is available to assistive technology and in the expanded image record, but the visual credit is difficult to read on phones.
- **Why it matters:** Image-source transparency is a core project requirement, and a credit users cannot comfortably read is weak attribution.
- **Recommended solution:** Increase the visible credit text size or move it to a readable caption while preserving the source link.

## 5. Mobile usability findings

Static CSS review shows a one-column archive at phone width, stacked map details, responsive image containers, visible four-section navigation, and category/search controls that fit the viewport by design. No browser, Playwright, or other screenshot automation is configured, and no device-width visual check was performed. Therefore horizontal overflow, actual text wrapping, and browser behavior remain unverified.

### HIGH — Coordinate markers are too small for reliable touch — IMPLEMENTED; BROWSER CHECK PENDING

- **Location:** `src/components/ExplorationMap.jsx`, marker hit circle (`r="15"`, around line 53); `src/index.css`, mobile `.coordinate-map` and SVG sizing (around line 406).
- **Evidence:** The SVG has a 720-unit-wide viewBox and scales to the available phone width. At a 320 px viewport, after page gutters and map padding, the 30-unit hit circle is about 11 px across. The map is a central interactive section, and this hit area is below common touch-target guidance.
- **Why it matters:** Touch users can miss markers or activate the wrong adjacent site; keyboard support does not solve this mobile interaction problem.
- **Recommended solution:** Provide a larger touch target independent of the visible marker and test it at 320–390 px widths.

### MEDIUM — Several labels and timeline dates are micro-sized on phones — IMPLEMENTED; BROWSER CHECK PENDING

- **Location:** `src/index.css` mobile `.nav-links` (6–7 px), `.hero-image-credit` (6 px), `.event-date` (7 px), mission image captions (7 px), and section counts (7 px).
- **Issue:** The dark palette is consistent, but essential metadata and navigation use very small type, particularly on Android-sized screens. Featured image credits also use 6 px text as noted above.
- **Why it matters:** Important interaction and evidence cues become hard to read for many visitors, including users with low vision.
- **Recommended solution:** Raise small-screen text sizes, simplify decorative microcopy, and confirm reading at actual device scale.

### MEDIUM — Mobile fit and overflow are not browser-verified — CODE FIXES MADE; BROWSER CHECK PENDING

- **Location:** Responsive rules in `src/index.css`, especially `@media (max-width: 680px)` and `main { overflow: hidden; }`.
- **Issue:** Static inspection is not enough to confirm no clipping or horizontal overflow. The main container hides overflow, which could conceal a layout defect rather than demonstrate that none exists.
- **Why it matters:** The competition demo is likely to be viewed on phones; clipped content can go unnoticed in a desktop-only review.
- **Recommended solution:** Run a browser pass at 320, 360, 390, tablet, and desktop widths and inspect the archive, expanded timelines, map, and footer.

## 6. Accessibility findings

Positive static findings: semantic sections and headings are present, image alternatives use source titles, search has a screen-reader label, expandable mission buttons expose `aria-expanded`/`aria-controls`, map site controls are native labeled buttons with visible focus styles, and CSS includes a reduced-motion media query.

### MEDIUM — Programmatic smooth scrolling ignores reduced-motion preference — RESOLVED

- **Location:** `src/App.jsx`, `openMissionFile` (around line 22).
- **Issue:** The function calls `scrollIntoView({ behavior: "smooth" })` explicitly. The CSS reduced-motion rule sets `scroll-behavior: auto`, but does not override an explicit JavaScript smooth-scroll request.
- **Why it matters:** Visitors who request reduced motion can still receive animated scrolling when opening a record from a spotlight or map.
- **Recommended solution:** Respect `prefers-reduced-motion` in the navigation action, or use a scroll mechanism governed by the CSS preference.

### LOW — No skip link before navigation

**Status: RESOLVED.** A visible-on-focus “Skip to archive content” link now precedes the navigation.

- **Location:** `src/App.jsx`, page start.
- **Issue:** Keyboard users encounter the full navigation row before reaching the hero/archive content; no “skip to content” link is present.
- **Why it matters:** This adds repeated tab stops for keyboard and screen-reader users.
- **Recommended solution:** Add a visible-on-focus skip link to the main content start.

### Audit limitation — contrast and assistive technology were not measured

No axe, Lighthouse accessibility, screen-reader, or browser keyboard test was available. The focus and role patterns look reasonable in source, but this audit does not claim WCAG conformance or verified screen-reader behavior. Micro-sized text is a visible readability concern even where color contrast may be adequate.

## 7. Technical reliability findings

### MEDIUM — Browser tab still uses the Vite starter favicon — RESOLVED

- **Location:** `public/favicon.svg`, linked from `index.html` line 5.
- **Issue:** The favicon is the purple Vite lightning mark, unrelated to OFFWORLD LEGACY's identity.
- **Why it matters:** It is visible in browser tabs, bookmarks, and search surfaces and makes the submitted product look unfinished.
- **Recommended solution:** Replace it with a project-appropriate favicon and verify the served asset.

### MEDIUM — Social preview image URLs are relative — RESOLVED

- **Location:** `index.html`, `og:image` and `twitter:image` (lines 12 and 17).
- **Issue:** Both image values are `/images/hero/hero-bg.webp`, not absolute URLs. Social-card crawlers commonly expect a fully-qualified image URL; no canonical site URL is configured in this repository.
- **Why it matters:** Preview images may fail to render when the project is shared, depending on the crawler.
- **Recommended solution:** Once a deployment host is chosen, use its absolute HTTPS image URL and add a canonical URL if the site has a stable public address.

### LOW — Runtime data validation does not verify remote source reachability

- **Location:** `src/data/schema.js` and `test/archive.test.js`.
- **Issue:** Validation checks HTTPS shape and NASA image ID/path consistency, while tests check local WebP files and dimensions. Neither checks remote reference availability, and external-source availability can change.
- **Why it matters:** A source can pass validation while being moved or inaccessible. Several NASA Images details pages could not be fetched by this audit provider.
- **Recommended solution:** Keep a periodic manual source review in the submission checklist; avoid making the app depend on remote requests for core rendering.

### Verified technical checks

- `npm run lint` — passed.
- `npm test` — passed.
- `node test/archive.test.js` — all 22 individual checks passed, including all six local WebP paths, formats, and recorded dimensions.
- `npm run build` — passed with Vite 8.3.8; latest output JS is 277.42 kB (84.97 kB gzip), CSS is 22.81 kB (5.79 kB gzip).
- Browser console, network, and rendered-layout checks — not run because no browser automation/browser binary is configured.
- These are the post-remediation command results. Browser viewport checks at 320, 360, 390 px, tablet, and desktop remain unperformed.

## 8. Critical issues

No issue met the **CRITICAL** threshold. All three **HIGH** findings have code/data remediations; mobile visual confirmation remains pending without browser tooling.

## 9. Recommended improvements

1. Complete the pending browser/device pass at 320, 360, 390 px, tablet, and desktop widths, including map activation, navigation, filters, expanded timelines, credits, and overflow.
2. If the cited LPI Apollo 12 ALSEP page becomes inspectable, establish which two endpoints the 180 m figure describes before restoring any deployment distance; current record keeps the distance omitted.
3. Consider stable mission deep links as optional future work; the acronym glossary requested in this remediation is present.

## 10. Final submission readiness verdict

**The identified HIGH and MEDIUM code findings are remediated.** Automated validation and browser/device validation results should be recorded after remediation. Browser checks remain pending because no browser tooling is configured in this environment; do not treat mobile rendering or overflow as browser-verified.

### Prioritized action list

1. **HIGH:** Fix M-001 engine-system attribution and distinguish shutdown/operations end from last contact.
2. **HIGH:** Increase interactive map marker hit area for touch and verify on phone widths.
3. **MEDIUM:** Resolve M-003 ALSEP distance discrepancy and M-002 communication-summary wording.
4. **MEDIUM:** Add the missing HiRISE source and correct the PIA18079 date range.
5. **MEDIUM:** Improve mobile type size and photo-credit legibility; verify contrast and screen-reader behavior.
6. **MEDIUM:** Respect reduced-motion, replace the Vite favicon, and use absolute social preview URLs after hosting is selected.
7. **LOW:** Add skip navigation and consider individual mission deep links and glossary expansion.
