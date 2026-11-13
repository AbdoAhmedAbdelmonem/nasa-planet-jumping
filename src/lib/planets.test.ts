import test from "node:test";
import assert from "node:assert/strict";
import {
  EARTH_LANDING_ZONES,
  MARS_ORBIT,
  MOON_ORBIT,
  MOON_SURFACE,
  pickRandomEarthLandingZone,
  PLANETS,
  PLANET_STATES,
  resolveNextPlanet,
  TO_EARTH,
  TO_MOON,
} from "./planets";

test("planet list contains only Mars, Earth, and Moon in order", () => {
  assert.deepEqual(PLANETS, ["Mars", "Earth", "Moon"]);
});

test("sequential portal transitions cycle Mars -> Earth -> Moon -> Mars with real Moon assets", () => {
  const fromMars = resolveNextPlanet("mars");
  assert.equal(fromMars, "earth");
  assert.equal(PLANET_STATES.mars.portal, TO_EARTH);

  const fromEarth = resolveNextPlanet("earth");
  assert.equal(fromEarth, "moon");
  assert.equal(PLANET_STATES.earth.portal, TO_MOON);
  assert.equal(PLANET_STATES.earth.image, MOON_ORBIT);

  const fromMoon = resolveNextPlanet("moon");
  assert.equal(fromMoon, "mars");
  assert.equal(PLANET_STATES.moon.portal, MARS_ORBIT);
  assert.equal(PLANET_STATES.mars.arrival, MARS_ORBIT);
  assert.equal(PLANET_STATES.moon.surfaceImage, MOON_SURFACE);
});

test("direct selection from left planet list resolves target planet and Moon video asset", () => {
  assert.equal(resolveNextPlanet("mars", "moon"), "moon");
  assert.equal(PLANET_STATES.moon.arrival, TO_MOON);
  assert.equal(PLANET_STATES.moon.facts.length, 4);
  assert.equal(PLANET_STATES.moon.name.toUpperCase(), "MOON");
});

test("Earth landing zones cover multiple distinct geographic regions and never repeat consecutively", () => {
  assert.ok(EARTH_LANDING_ZONES.length >= 4);
  const first = pickRandomEarthLandingZone(null, () => 0);
  const second = pickRandomEarthLandingZone(first.id, () => 0);
  assert.notEqual(first.id, second.id);
});
