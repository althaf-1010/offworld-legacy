import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { missions } from "../src/data/missions.js";
import { filterMissions, getDestinations, getMissionById, validateMissions } from "../src/data/schema.js";
import { projectCoordinates } from "../src/data/coordinates.js";

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

  const missingSource = structuredClone(missions[0]);
  missingSource.location.coordinateSource = null;
  assert.match(validateMissions([missingSource]).errors.join(" "), /coordinateSource/);
});

test("coordinate plot maps poles and prime meridian inside its frame", () => {
  assert.deepEqual(projectCoordinates(90, -180), { x: 48, y: 30 });
  assert.deepEqual(projectCoordinates(-90, 180), { x: 672, y: 330 });
  assert.deepEqual(projectCoordinates(0, 0), { x: 360, y: 180 });
  for (const mission of missions) {
    const coordinates = mission.location.coordinates;
    if (!coordinates) continue;
    const point = projectCoordinates(coordinates.latitude, coordinates.longitude);
    assert.ok(point.x >= 48 && point.x <= 672 && point.y >= 30 && point.y <= 330, mission.id);
  }
  assert.equal(getMissionById(missions, "M-006").location.coordinates, null);
  for (const mission of missions.filter((record) => record.location.coordinates)) {
    assert.ok(mission.location.coordinateMeaning, mission.id);
    assert.ok(mission.references.some((reference) => reference.url === mission.location.coordinateSource), mission.id);
  }
  assert.equal(getMissionById(missions, "M-006").location.coordinateSource, null);
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

test("Sojourner data, final signal, and Pathfinder mission closure remain distinct", () => {
  const record = getMissionById(missions, "M-002");
  assert.ok(record.events.some((event) => event.type === "last_data" && event.date === "1997-09-27"));
  assert.ok(record.events.some((event) => event.type === "contact_loss" && event.date === "1997-10-07"));
  assert.ok(record.events.some((event) => event.type === "carrier_closure" && event.date === "1998-03-10"));
});

test("Viking and Opportunity separate last contact from formal mission closure", () => {
  const viking = getMissionById(missions, "M-005");
  assert.ok(viking.events.some((event) => event.type === "milestone" && event.date === "1982-11-11"));
  assert.ok(viking.events.some((event) => event.type === "contact_loss" && event.date === "1982-11-13"));
  assert.ok(viking.events.some((event) => event.type === "mission_closure" && event.date === "1983-05-21"));

  const opportunity = getMissionById(missions, "M-006");
  assert.ok(opportunity.events.some((event) => event.type === "contact_loss" && event.date === "2018-06-10"));
  assert.ok(opportunity.events.some((event) => event.type === "mission_closure" && event.date === "2019-02-13"));
});

test("Apollo 15 television downlink failure is not classified as rover shutdown", () => {
  const lrv = getMissionById(missions, "M-004");
  const failure = lrv.events.find((event) => event.type === "subsystem_failure");
  assert.equal(failure.date, "1971-08-05");
  assert.match(failure.description, /not a failure or last communication of the LRV itself/);
});

test("the recovery overview uses explicit, conservative recovery categories", () => {
  assert.equal(missions.filter((mission) => mission.recoveryStatus === "partial").length, 1);
  assert.equal(missions.filter((mission) => mission.recoveryStatus === "none-reported").length, 5);
  const invalid = structuredClone(missions[0]);
  invalid.recoveryStatus = "intact";
  assert.match(validateMissions([invalid]).errors.join(" "), /recoveryStatus/);
});
