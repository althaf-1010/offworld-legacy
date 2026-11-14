/**
 * @fileoverview OFFWORLD LEGACY — Mission Data Architecture Type Definitions
 * Uses JSDoc annotations to document the equipment record schema.
 */

/**
 * Surface geographical coordinate point.
 * Coordinates may be null when precision coordinates are unconfirmed or unavailable.
 *
 * @typedef {Object} CoordinatePoint
 * @property {number} latitude - Decimal degrees (-90.0 to +90.0)
 * @property {number} longitude - Decimal degrees (-180.0 to +180.0)
 * @property {string} display - Formatted human-readable string (e.g. "3.02° S, 23.42° W")
 */

/**
 * Historical event milestone.
 *
 * @typedef {Object} HistoricalEvent
 * @property {"launch" | "landing" | "deployment" | "milestone" | "shutdown" | "contact_loss" | "crew_visit"} type - Type of event
 * @property {string} date - ISO-8601 date string (YYYY, YYYY-MM, or YYYY-MM-DD)
 * @property {string} description - Factual description of the event
 * @property {string} [reference] - Supporting official source reference URL
 */

/**
 * Supporting NASA reference citation.
 *
 * @typedef {Object} ReferenceLink
 * @property {string} label - Reference title / descriptor
 * @property {string} url - Official HTTPS URL (e.g. nssdc.gsfc.nasa.gov, images.nasa.gov)
 * @property {string} claim - Specific factual claim supported by this reference
 * @property {string} [nssdcId] - NASA NSSDCA Master Catalog identifier if applicable
 */

/**
 * Media asset for equipment record.
 *
 * @typedef {Object} MediaAsset
 * @property {string} src - Local optimized WebP image path
 * @property {number} width - Intrinsic image width in pixels
 * @property {number} height - Intrinsic image height in pixels
 * @property {string} nasaId - Official NASA image record ID
 * @property {string} title - Archival image title
 * @property {string} date - Capture or archive release date
 * @property {string} sourceUrl - Official images.nasa.gov record URL
 */

/**
 * Mission-level identity.
 *
 * @typedef {Object} MissionIdentity
 * @property {string} name - Mission name (e.g. "Apollo 12", "Surveyor 3", "Mars Pathfinder")
 * @property {string} program - NASA program (e.g. "Apollo Program", "Surveyor Program", "Discovery Program")
 * @property {string} [spacecraftId] - Primary spacecraft NSSDCA / COSPAR identifier
 * @property {string} [launchDate] - Launch date in ISO format (YYYY-MM-DD)
 */

/**
 * Equipment-level identity.
 *
 * @typedef {Object} EquipmentIdentity
 * @property {string} name - Specific equipment or payload left behind
 * @property {"Lunar lander" | "Mars rover" | "Science instruments" | "Lunar rover" | "Descent stage"} type - Equipment category
 * @property {string} [designation] - Hardware designation or serial
 */

/**
 * Complete Equipment Record Schema.
 *
 * @typedef {Object} EquipmentRecord
 * @property {string} id - Unique archive identifier (e.g. "M-001")
 * @property {MissionIdentity} mission - Associated NASA mission
 * @property {EquipmentIdentity} equipment - Specific equipment left on surface
 * @property {"Moon" | "Mars"} destination - Planetary body
 * @property {string} operationalPeriod - Human-readable operational period (e.g. "1967", "1969–1972")
 * @property {string} operationalStatus - Operational status (e.g. "Inactive")
 * @property {string} physicalDisposition - Verified physical state on surface
 * @property {string | null} [landingDate] - Landing date if equipment was a direct landing vehicle, null if deployed
 * @property {string | null} [deploymentDate] - Surface deployment date if deployed after landing
 * @property {Object} location - Surface location information
 * @property {string} location.siteName - Formal landing site or geographical region
 * @property {CoordinatePoint | null} location.coordinates - Verified coordinates or null if unconfirmed
 * @property {HistoricalEvent[]} events - Verified chronological milestone events
 * @property {string} description - Brief summary of purpose and operation
 * @property {string} legacy - Scientific and historical legacy
 * @property {ReferenceLink[]} references - Official citations supporting facts
 * @property {MediaAsset} media - Primary visual asset record
 *
 * Backward-compatibility properties for existing UI components:
 * @property {string} name - Display name (matches existing UI)
 * @property {string} year - Operational period (matches existing UI)
 * @property {string} type - Equipment type (matches existing UI)
 * @property {string} status - Operational status (matches existing UI)
 * @property {string} image - Image path (matches existing UI)
 * @property {number} imageWidth - Image width (matches existing UI)
 * @property {number} imageHeight - Image height (matches existing UI)
 * @property {string} imageId - NASA Image ID (matches existing UI)
 * @property {string} imageTitle - NASA Image title (matches existing UI)
 * @property {string} imageDate - Image date (matches existing UI)
 * @property {string} imageSource - NASA Image record URL (matches existing UI)
 */

export {};
