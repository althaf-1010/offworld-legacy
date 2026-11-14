/**
 * @fileoverview OFFWORLD LEGACY — Mission Data Validation and Query Utilities
 */

const VALID_DESTINATIONS = ["Moon", "Mars"];
const ARCHIVE_ID_REGEX = /^M-\d{3}$/;
const ISO_DATE_REGEX = /^\d{4}(-\d{2}(-\d{2})?)?$/;

/**
 * Validates a single equipment record.
 *
 * @param {import("./types.js").EquipmentRecord} record
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateRecord(record) {
  const errors = [];

  if (!record || typeof record !== "object") {
    return { valid: false, errors: ["Record must be a non-null object."] };
  }

  // ID validation
  if (!record.id || !ARCHIVE_ID_REGEX.test(record.id)) {
    errors.push(`Invalid record ID: "${record.id}". Must match format M-001.`);
  }

  // Destination validation
  if (!VALID_DESTINATIONS.includes(record.destination)) {
    errors.push(
      `Invalid destination: "${record.destination}". Must be one of: ${VALID_DESTINATIONS.join(", ")}.`
    );
  }

  // Mission & Equipment separation
  if (!record.mission || typeof record.mission !== "object" || !record.mission.name) {
    errors.push(`Record ${record.id}: Missing or invalid mission identity object.`);
  }
  if (!record.equipment || typeof record.equipment !== "object" || !record.equipment.name) {
    errors.push(`Record ${record.id}: Missing or invalid equipment identity object.`);
  }

  // Operational status & physical disposition separation
  if (!record.operationalStatus || typeof record.operationalStatus !== "string") {
    errors.push(`Record ${record.id}: Missing operationalStatus.`);
  }
  if (!record.physicalDisposition || typeof record.physicalDisposition !== "string") {
    errors.push(`Record ${record.id}: Missing physicalDisposition.`);
  }

  // Coordinates validation (allow null, but validate if provided)
  if (record.location) {
    const coords = record.location.coordinates;
    if (coords !== null && coords !== undefined) {
      if (typeof coords.latitude !== "number" || coords.latitude < -90 || coords.latitude > 90) {
        errors.push(`Record ${record.id}: Latitude must be a number between -90 and 90.`);
      }
      if (typeof coords.longitude !== "number" || coords.longitude < -180 || coords.longitude > 180) {
        errors.push(`Record ${record.id}: Longitude must be a number between -180 and 180.`);
      }
      if (!coords.display || typeof coords.display !== "string") {
        errors.push(`Record ${record.id}: Coordinates must include a formatted display string.`);
      }
    }
  } else {
    errors.push(`Record ${record.id}: Missing location object.`);
  }

  // Events validation
  if (!Array.isArray(record.events) || record.events.length === 0) {
    errors.push(`Record ${record.id}: Must contain at least one historical event milestone.`);
  } else {
    record.events.forEach((event, idx) => {
      if (!event.date || !ISO_DATE_REGEX.test(event.date)) {
        errors.push(
          `Record ${record.id}, Event ${idx}: Date "${event.date}" must be a valid ISO format (YYYY, YYYY-MM, or YYYY-MM-DD).`
        );
      }
      if (!event.description || typeof event.description !== "string") {
        errors.push(`Record ${record.id}, Event ${idx}: Missing event description.`);
      }
      if (!event.type) {
        errors.push(`Record ${record.id}, Event ${idx}: Missing event type.`);
      }
    });
  }

  // Media asset validation
  if (!record.media || typeof record.media !== "object") {
    errors.push(`Record ${record.id}: Missing media object.`);
  } else {
    if (!record.media.src || !record.media.src.startsWith("/images/")) {
      errors.push(`Record ${record.id}: Media src must be a valid internal path starting with /images/.`);
    }
    if (!record.media.src.endsWith(".webp")) {
      errors.push(`Record ${record.id}: Media src must reference an optimized .webp asset.`);
    }
    if (typeof record.media.width !== "number" || record.media.width <= 0) {
      errors.push(`Record ${record.id}: Media width must be a positive number.`);
    }
    if (typeof record.media.height !== "number" || record.media.height <= 0) {
      errors.push(`Record ${record.id}: Media height must be a positive number.`);
    }
    if (!record.media.sourceUrl || !record.media.sourceUrl.startsWith("https://")) {
      errors.push(`Record ${record.id}: Media sourceUrl must be a secure HTTPS NASA URL.`);
    }
  }

  // References validation
  if (!Array.isArray(record.references) || record.references.length === 0) {
    errors.push(`Record ${record.id}: Must contain at least one authoritative NASA reference.`);
  } else {
    record.references.forEach((ref, idx) => {
      if (!ref.url || !ref.url.startsWith("https://")) {
        errors.push(`Record ${record.id}, Ref ${idx}: Reference URL must be a secure HTTPS URL.`);
      }
      if (!ref.label) {
        errors.push(`Record ${record.id}, Ref ${idx}: Missing reference label.`);
      }
      if (!ref.claim) {
        errors.push(`Record ${record.id}, Ref ${idx}: Reference must state the specific factual claim it supports.`);
      }
    });
  }

  // Backward-compatibility properties check (needed for current App.jsx)
  const compatKeys = [
    "name",
    "year",
    "type",
    "status",
    "image",
    "imageWidth",
    "imageHeight",
    "imageId",
    "imageTitle",
    "imageDate",
    "imageSource",
    "description",
    "legacy",
  ];
  compatKeys.forEach((key) => {
    if (record[key] === undefined || record[key] === null) {
      errors.push(`Record ${record.id}: Missing backward-compatibility property "${key}".`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates an entire collection of equipment records.
 * Ensures uniqueness of IDs and collection-level invariants.
 *
 * @param {import("./types.js").EquipmentRecord[]} missions
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateMissions(missions) {
  const errors = [];
  const seenIds = new Set();

  if (!Array.isArray(missions)) {
    return { valid: false, errors: ["Missions collection must be an array."] };
  }

  missions.forEach((record) => {
    if (record && record.id) {
      if (seenIds.has(record.id)) {
        errors.push(`Duplicate archive ID encountered: "${record.id}".`);
      }
      seenIds.add(record.id);
    }
    const single = validateRecord(record);
    if (!single.valid) {
      errors.push(...single.errors);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Returns list of distinct destinations for filtering, prefixed with "All".
 *
 * @param {import("./types.js").EquipmentRecord[]} missions
 * @returns {string[]}
 */
export function getDestinations(missions) {
  const set = new Set();
  missions.forEach((m) => {
    if (m.destination) set.add(m.destination);
  });
  return ["All", ...Array.from(set)];
}

/**
 * Filters missions by destination ("All" returns all missions).
 *
 * @param {import("./types.js").EquipmentRecord[]} missions
 * @param {string} filter
 * @returns {import("./types.js").EquipmentRecord[]}
 */
export function filterMissions(missions, filter) {
  if (!filter || filter === "All") {
    return missions;
  }
  return missions.filter((m) => m.destination === filter);
}

/**
 * Retrieves a single mission record by its archive ID.
 *
 * @param {import("./types.js").EquipmentRecord[]} missions
 * @param {string} id
 * @returns {import("./types.js").EquipmentRecord | undefined}
 */
export function getMissionById(missions, id) {
  return missions.find((m) => m.id === id);
}
