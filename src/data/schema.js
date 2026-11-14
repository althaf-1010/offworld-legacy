/**
 * @fileoverview OFFWORLD LEGACY — Mission Data Validation and Query Utilities
 */

const VALID_DESTINATIONS = ["Moon", "Mars"];
const VALID_EVENT_TYPES = [
  "launch",
  "landing",
  "deployment",
  "milestone",
  "shutdown",
  "contact_loss",
  "crew_visit",
];
const ARCHIVE_ID_REGEX = /^M-\d{3}$/;
const ISO_DATE_REGEX = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/;
const NASA_IMAGE_URL = "https://images.nasa.gov/details/";

function validDate(value) {
  if (typeof value !== "string") return false;
  const match = value.match(ISO_DATE_REGEX);
  if (!match) return false;

  const year = Number(match[1]);
  const month = match[2] ? Number(match[2]) : null;
  const day = match[3] ? Number(match[3]) : null;
  if (year < 1) return false;
  if (month === null) return true;
  if (month < 1 || month > 12) return false;
  if (day === null) return true;

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysPerMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= daysPerMonth[month - 1];
}

function validHttpsUrl(value) {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Validates a single equipment record.
 *
 * @param {import("./types.js").EquipmentRecord} record
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateRecord(record) {
  const errors = [];

  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return { valid: false, errors: ["Record must be a non-null object."] };
  }

  if (!ARCHIVE_ID_REGEX.test(record.id ?? "")) {
    errors.push(`Invalid record ID: "${record.id}". Must match format M-001.`);
  }
  if (!VALID_DESTINATIONS.includes(record.destination)) {
    errors.push(`Invalid destination: "${record.destination}". Must be one of: ${VALID_DESTINATIONS.join(", ")}.`);
  }

  if (!record.mission || typeof record.mission.name !== "string" || !record.mission.name.trim()) {
    errors.push(`Record ${record.id}: Missing or invalid mission identity.`);
  } else {
    if (!record.mission.program) errors.push(`Record ${record.id}: Missing mission program.`);
    if (!validDate(record.mission.launchDate)) errors.push(`Record ${record.id}: Invalid mission launch date.`);
  }
  if (!record.equipment || typeof record.equipment.name !== "string" || !record.equipment.name.trim()) {
    errors.push(`Record ${record.id}: Missing or invalid equipment identity.`);
  }
  if (!record.operationalStatus || typeof record.operationalStatus !== "string") {
    errors.push(`Record ${record.id}: Missing operationalStatus.`);
  }
  if (!record.operationalPeriod || typeof record.operationalPeriod !== "string") {
    errors.push(`Record ${record.id}: Missing operationalPeriod.`);
  }
  if (!record.physicalDisposition || typeof record.physicalDisposition !== "string") {
    errors.push(`Record ${record.id}: Missing physicalDisposition.`);
  }
  if (!record.description || typeof record.description !== "string") {
    errors.push(`Record ${record.id}: Missing description.`);
  }
  if (!record.legacy || typeof record.legacy !== "string") {
    errors.push(`Record ${record.id}: Missing legacy summary.`);
  }

  for (const field of ["landingDate", "deploymentDate"]) {
    if (record[field] !== null && !validDate(record[field])) {
      errors.push(`Record ${record.id}: ${field} must be a valid ISO date or null.`);
    }
  }
  if (record.landingDate && record.deploymentDate) {
    errors.push(`Record ${record.id}: A piece of equipment cannot have both a direct landingDate and deploymentDate.`);
  }

  if (!record.location || typeof record.location.siteName !== "string" || !record.location.siteName.trim()) {
    errors.push(`Record ${record.id}: Missing location siteName.`);
  } else {
    const coords = record.location.coordinates;
    if (!("coordinates" in record.location)) {
      errors.push(`Record ${record.id}: location.coordinates must be an object or explicit null.`);
    }
    if (coords !== null && coords !== undefined) {
      if (!Number.isFinite(coords.latitude) || coords.latitude < -90 || coords.latitude > 90) {
        errors.push(`Record ${record.id}: Latitude must be a finite number between -90 and 90.`);
      }
      if (!Number.isFinite(coords.longitude) || coords.longitude < -180 || coords.longitude > 180) {
        errors.push(`Record ${record.id}: Longitude must be a finite number between -180 and 180.`);
      }
      if (typeof coords.display !== "string" || !coords.display.trim()) {
        errors.push(`Record ${record.id}: Coordinates must include a formatted display string.`);
      }
    }
  }

  if (!Array.isArray(record.events) || record.events.length === 0) {
    errors.push(`Record ${record.id}: Must contain at least one historical event milestone.`);
  } else {
    let previousDate = "";
    record.events.forEach((event, idx) => {
      if (!event || typeof event !== "object" || Array.isArray(event)) {
        errors.push(`Record ${record.id}, Event ${idx}: Event must be an object.`);
        return;
      }
      if (!validDate(event.date)) {
        errors.push(`Record ${record.id}, Event ${idx}: Date "${event.date}" must be a real ISO calendar date.`);
      } else if (event.date < previousDate) {
        errors.push(`Record ${record.id}, Event ${idx}: Events must be in chronological order.`);
      } else {
        previousDate = event.date;
      }
      if (!VALID_EVENT_TYPES.includes(event.type)) {
        errors.push(`Record ${record.id}, Event ${idx}: Invalid event type "${event.type}".`);
      }
      if (typeof event.description !== "string" || !event.description.trim()) {
        errors.push(`Record ${record.id}, Event ${idx}: Missing event description.`);
      }
      if (event.reference && !validHttpsUrl(event.reference)) {
        errors.push(`Record ${record.id}, Event ${idx}: Reference must be a valid HTTPS URL.`);
      }
    });
  }

  if (Array.isArray(record.events)) {
    if (record.mission?.launchDate && !record.events.some((event) => event?.type === "launch" && event.date === record.mission.launchDate)) {
      errors.push(`Record ${record.id}: Mission launchDate must match a launch event.`);
    }
    if (record.landingDate && !record.events.some((event) => event?.type === "landing" && event.date === record.landingDate)) {
      errors.push(`Record ${record.id}: Equipment landingDate must match a landing event.`);
    }
    if (record.deploymentDate && !record.events.some((event) => event?.type === "deployment" && event.date === record.deploymentDate)) {
      errors.push(`Record ${record.id}: deploymentDate must match a deployment event.`);
    }
  }

  if (!record.media || typeof record.media !== "object") {
    errors.push(`Record ${record.id}: Missing media object.`);
  } else {
    const { src, width, height, nasaId, title, date, credit, sourceUrl } = record.media;
    if (src !== null && (typeof src !== "string" || !src.startsWith("/images/") || !src.endsWith(".webp"))) {
      errors.push(`Record ${record.id}: Media src must be a local .webp path or null.`);
    }
    if (src === null && (width !== null || height !== null)) {
      errors.push(`Record ${record.id}: Unsourced media must have null dimensions.`);
    }
    if (src !== null && (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0)) {
      errors.push(`Record ${record.id}: Sourced media must have positive integer dimensions.`);
    }
    if (typeof nasaId !== "string" || !nasaId.trim()) errors.push(`Record ${record.id}: Missing NASA image ID.`);
    if (typeof title !== "string" || !title.trim()) errors.push(`Record ${record.id}: Missing NASA image title.`);
    if (typeof date !== "string" || !date.trim()) errors.push(`Record ${record.id}: Missing NASA image date.`);
    if (typeof credit !== "string" || !credit.trim()) errors.push(`Record ${record.id}: Missing image credit.`);
    if (!validHttpsUrl(sourceUrl) || !sourceUrl.startsWith(NASA_IMAGE_URL)) {
      errors.push(`Record ${record.id}: Media sourceUrl must be an images.nasa.gov details URL.`);
    } else if (nasaId && !sourceUrl.slice(NASA_IMAGE_URL.length).toLowerCase().startsWith(nasaId.toLowerCase())) {
      errors.push(`Record ${record.id}: NASA image ID does not match its source URL.`);
    }
  }

  if (!Array.isArray(record.references) || record.references.length === 0) {
    errors.push(`Record ${record.id}: Must contain at least one authoritative reference.`);
  } else {
    record.references.forEach((ref, idx) => {
      if (!ref || typeof ref !== "object" || Array.isArray(ref)) {
        errors.push(`Record ${record.id}, Ref ${idx}: Reference must be an object.`);
        return;
      }
      if (!validHttpsUrl(ref.url)) errors.push(`Record ${record.id}, Ref ${idx}: Reference URL must be HTTPS.`);
      if (!ref.label || !ref.claim) errors.push(`Record ${record.id}, Ref ${idx}: Reference needs a label and factual claim.`);
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates an entire collection of equipment records.
 *
 * @param {import("./types.js").EquipmentRecord[]} missions
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateMissions(missions) {
  const errors = [];
  const seenIds = new Set();

  if (!Array.isArray(missions)) return { valid: false, errors: ["Missions collection must be an array."] };

  missions.forEach((record) => {
    if (record?.id) {
      if (seenIds.has(record.id)) errors.push(`Duplicate archive ID encountered: "${record.id}".`);
      seenIds.add(record.id);
    }
    const result = validateRecord(record);
    errors.push(...result.errors);
  });

  return { valid: errors.length === 0, errors };
}

/** Returns distinct destinations, prefixed with "All". */
export function getDestinations(missions) {
  return ["All", ...new Set(missions.map((mission) => mission.destination).filter(Boolean))];
}

/** Filters records by destination; "All" returns every record. */
export function filterMissions(missions, filter) {
  if (!filter || filter === "All") return missions;
  return missions.filter((mission) => mission.destination === filter);
}

/** Retrieves a record by archive ID. */
export function getMissionById(missions, id) {
  return missions.find((mission) => mission.id === id);
}
