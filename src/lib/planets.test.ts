import test from "node:test";
import assert from "node:assert/strict";
import { PLANETS, PLANET_STATES, resolveNextPlanet, TO_EARTH, TO_MARS, TO_MOON } from "./planets";

test("planet list contains only Mars, Earth, and Moon in order", () => {
  assert.deepEqual(PLANETS, ["Mars", "Earth", "Moon"]);
});

test("sequential portal transitions cycle Mars -> Earth -> Moon -> Mars", () => {
  const fromMars = resolveNextPlanet("mars");
  assert.equal(fromMars, "earth");
  assert.equal(PLANET_STATES.mars.portal, TO_EARTH);

  const fromEarth = resolveNextPlanet("earth");
  assert.equal(fromEarth, "moon");
  assert.equal(PLANET_STATES.earth.portal, TO_MOON);

  const fromMoon = resolveNextPlanet("moon");
  assert.equal(fromMoon, "mars");
  assert.equal(PLANET_STATES.moon.portal, TO_MARS);
});

test("direct selection from left planet list resolves target planet and arrival animation video", () => {
  assert.equal(resolveNextPlanet("mars", "moon"), "moon");
  assert.equal(PLANET_STATES.moon.arrival, TO_MOON);
  assert.equal(PLANET_STATES.moon.facts.length, 4);
  assert.equal(PLANET_STATES.moon.name.toUpperCase(), "MOON");
});
