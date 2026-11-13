import test from "node:test";
import assert from "node:assert/strict";
import {
  createCustomLandingZone,
  EARTH_LANDING_ZONES,
  formatCoordinates,
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

test("Each Earth landing zone has valid numeric lng (-180 to 180) and lat (-90 to 90) for MapLibre GL", () => {
  for (const zone of EARTH_LANDING_ZONES) {
    assert.equal(typeof zone.lng, "number");
    assert.equal(typeof zone.lat, "number");
    assert.ok(zone.lng >= -180 && zone.lng <= 180, `${zone.id} lng out of bounds`);
    assert.ok(zone.lat >= -90 && zone.lat <= 90, `${zone.id} lat out of bounds`);
    assert.ok(zone.zoom >= 10 && zone.zoom <= 18, `${zone.id} zoom level`);
  }
});

test("formatCoordinates produces valid N/S E/W formatting and createCustomLandingZone works for arbitrary coordinates", () => {
  const formatted = formatCoordinates(28.5721, -80.648);
  assert.equal(formatted, "28.5721° N, 80.6480° W");

  const custom = createCustomLandingZone(31.1342, 29.9792, "Giza Plateau");
  assert.equal(custom.lng, 31.1342);
  assert.equal(custom.lat, 29.9792);
  assert.equal(custom.coordinates, "29.9792° N, 31.1342° E");
});
