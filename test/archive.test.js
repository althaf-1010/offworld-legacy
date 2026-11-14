import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { missions } from "../src/data/missions.js";
import { filterMissions, getDestinations, getMissionById, validateMissions } from "../src/data/schema.js";

test("the complete archive satisfies the canonical schema", () => {
  assert.deepEqual(validateMissions(missions), { valid: true, errors: [] });
});

test("archive filters and lookups use canonical records", () => {
  assert.deepEqual(getDestinations(missions), ["All", "Moon", "Mars"]);
  assert.equal(filterMissions(missions, "Moon").length, 3);
  assert.equal(filterMissions(missions, "Mars").length, 3);
  assert.equal(filterMissions(missions, "All").length, missions.length);
  assert.equal(getMissionById(missions, "M-006").equipment.name, "Opportunity Rover");
  assert.equal(getMissionById(missions, "unknown"), undefined);
});

test("calendar validation rejects impossible dates", () => {
  const invalid = structuredClone(missions[0]);
  invalid.events[1].date = "1967-02-29";
  assert.match(validateMissions([invalid]).errors.join(" "), /real ISO calendar date/);
});

test("event milestones must be chronological", () => {
  const invalid = structuredClone(missions[0]);
  [invalid.events[0], invalid.events[1]] = [invalid.events[1], invalid.events[0]];
  assert.match(validateMissions([invalid]).errors.join(" "), /chronological order/);
});

test("direct landing and later deployment dates cannot both describe one item", () => {
  const invalid = structuredClone(missions[0]);
  invalid.deploymentDate = "1967-04-21";
  assert.match(validateMissions([invalid]).errors.join(" "), /both a direct landingDate and deploymentDate/);
});

test("malformed events and references return validation errors instead of throwing", () => {
  const invalid = structuredClone(missions[0]);
  invalid.events[0] = null;
  invalid.references[0] = null;
  const result = validateMissions([invalid]);
  assert.ok(result.errors.some((error) => error.includes("Event must be an object")));
  assert.ok(result.errors.some((error) => error.includes("Reference must be an object")));
});

test("each archive ID is unique", () => {
  const duplicate = structuredClone(missions[1]);
  duplicate.id = missions[0].id;
  assert.match(validateMissions([...missions, duplicate]).errors.join(" "), /Duplicate archive ID/);
});

test("coordinates must be explicit: a point or null", () => {
  const invalid = structuredClone(missions[0]);
  delete invalid.location.coordinates;
  assert.match(validateMissions([invalid]).errors.join(" "), /coordinates must be an object or explicit null/);
});

test("record dates must agree with the corresponding timeline milestones", () => {
  const invalid = structuredClone(missions[0]);
  invalid.landingDate = "1967-04-21";
  assert.match(validateMissions([invalid]).errors.join(" "), /landingDate must match a landing event/);
});

test("every sourced archive image exists and matches its recorded dimensions", async (t) => {
  for (const mission of missions) {
    if (!mission.media.src) continue;
    await t.test(`${mission.id} ${mission.media.nasaId}`, async () => {
      const imagePath = path.resolve("public", `.${mission.media.src}`);
      await access(imagePath);
      const metadata = await sharp(imagePath).metadata();
      assert.equal(metadata.format, "webp");
      assert.equal(metadata.width, mission.media.width);
      assert.equal(metadata.height, mission.media.height);
      assert.equal(
        mission.media.sourceUrl.toLowerCase(),
        `https://images.nasa.gov/details/${mission.media.nasaId}`.toLowerCase()
      );
      assert.ok(mission.media.credit.length > 0);
    });
  }
});

test("payload records keep carrier landings in the timeline and equipment deployment in the profile", () => {
  for (const id of ["M-002", "M-003", "M-004", "M-006"]) {
    const record = getMissionById(missions, id);
    assert.equal(record.landingDate, null, `${id} is delivered by another landed vehicle`);
    assert.ok(record.deploymentDate, `${id} has a surface deployment date`);
  }
});
