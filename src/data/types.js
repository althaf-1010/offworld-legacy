/**
 * @fileoverview JSDoc definitions for the canonical OFFWORLD LEGACY archive.
 */

/** @typedef {{ latitude: number, longitude: number, display: string }} CoordinatePoint */

/**
 * @typedef {Object} HistoricalEvent
 * @property {"launch" | "landing" | "deployment" | "milestone" | "shutdown" | "contact_loss" | "crew_visit"} type
 * @property {string} date - Real ISO calendar date, with no time-zone ambiguity.
 * @property {string} description
 * @property {string} [reference] - HTTPS source URL for this event.
 */

/**
 * @typedef {Object} ReferenceLink
 * @property {string} label
 * @property {string} url - HTTPS authoritative source.
 * @property {string} claim - Specific factual claim supported by this reference.
 * @property {string} [nssdcId]
 */

/**
 * @typedef {Object} MediaAsset
 * @property {string | null} src - Local optimized WebP path, null if not yet sourced.
 * @property {number | null} width - Intrinsic width, null when src is null.
 * @property {number | null} height - Intrinsic height, null when src is null.
 * @property {string} nasaId
 * @property {string} title
 * @property {string} date - Capture date or explicit archive-date description.
 * @property {string} credit - Credit shown by the authoritative image source.
 * @property {string} sourceUrl - Official NASA Images details URL.
 */

/**
 * @typedef {Object} MissionIdentity
 * @property {string} name
 * @property {string} program
 * @property {string} [spacecraftId]
 * @property {string} launchDate
 */

/**
 * @typedef {Object} EquipmentIdentity
 * @property {string} name
 * @property {"Lunar lander" | "Mars rover" | "Science instruments" | "Lunar rover" | "Mars lander" | "Descent stage"} type
 * @property {string} [designation]
 */

/**
 * Canonical record for an item left on an off-world surface.
 *
 * `landingDate` is the landing date of the equipment represented by this
 * record. It is null for equipment carried down by a separate lander; in that
 * case `deploymentDate` is when the equipment reached the surface. Carrier
 * landing dates remain in the event timeline. `operationalPeriod` describes
 * the equipment's active surface operations, not later administrative closure
 * or visits by another mission.
 *
 * @typedef {Object} EquipmentRecord
 * @property {string} id
 * @property {MissionIdentity} mission
 * @property {EquipmentIdentity} equipment
 * @property {"Moon" | "Mars"} destination
 * @property {string} operationalPeriod
 * @property {string} operationalStatus
 * @property {string} physicalDisposition
 * @property {string | null} landingDate - Direct landing of this equipment, else null.
 * @property {string | null} deploymentDate - Surface deployment when carried by another vehicle, else null.
 * @property {{ siteName: string, coordinates: CoordinatePoint | null }} location
 * @property {HistoricalEvent[]} events
 * @property {string} description
 * @property {string} legacy
 * @property {ReferenceLink[]} references
 * @property {MediaAsset} media
 */

export {};
