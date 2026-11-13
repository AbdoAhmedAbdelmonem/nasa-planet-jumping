export type PlanetKey = "mars" | "earth" | "moon";

export interface PlanetState {
  name: string;
  next: "Earth" | "Moon" | "Mars";
  number: string;
  portal?: string;
  image?: string;
  surfaceImage?: string;
  arrival: string;
  background: string;
  facts: [string, string][];
}

export const BASE_MEDIA_URL =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";
export const TO_MARS = `${BASE_MEDIA_URL}/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4`;
export const TO_EARTH = `${BASE_MEDIA_URL}/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4`;
export const MARS_ORBIT = "/assets/videos/to_mars.mp4";
export const TO_MOON = "/assets/videos/to_moon.mp4";
export const MOON_ORBIT = "/assets/images/moon_orbit_portal_1794350272270.jpg";
export const MOON_SURFACE = "/assets/images/moon_surface_bg_1794350272226.jpg";

export const PLANETS: readonly string[] = ["Mars", "Earth", "Moon"];

export const PLANET_STATES: Record<PlanetKey, PlanetState> = {
  mars: {
    name: "Mars",
    next: "Earth",
    number: "[03]",
    portal: TO_EARTH,
    arrival: MARS_ORBIT,
    background: "mars-background",
    facts: [
      ["Distance:", "About 228 million km (1.5 astronomical units)."],
      ["Year:", "One Martian year is equal to 687 Earth days."],
      ["Temperature:", "Around -60 °C, dropping to -125 °C at the poles in winter."],
      ["Atmosphere:", "Very thin, consisting of 95% carbon dioxide, with frequent dust storms."],
    ],
  },
  earth: {
    name: "Earth",
    next: "Moon",
    number: "[02]",
    portal: TO_MOON,
    image: MOON_ORBIT,
    arrival: TO_EARTH,
    background: "earth-background",
    facts: [
      ["Distance:", "149.6 million km from the Sun."],
      ["Year:", "365.25 Earth days."],
      ["Temperature:", "Average surface temperature around 15 °C."],
      ["Atmosphere:", "Mostly nitrogen and oxygen, supporting life and liquid water."],
    ],
  },
  moon: {
    name: "Moon",
    next: "Mars",
    number: "[01]",
    portal: MARS_ORBIT,
    surfaceImage: MOON_SURFACE,
    arrival: TO_MOON,
    background: "moon-background",
    facts: [
      ["Distance:", "About 384,400 km from Earth (0.00257 AU)."],
      ["Year:", "27.3 Earth days (synchronous orbital period)."],
      ["Temperature:", "Around 127 °C by day, dropping to -173 °C at night."],
      ["Atmosphere:", "Extremely thin exosphere, nearly a vacuum with no weather."],
    ],
  },
};

export interface EarthLandingZone {
  id: string;
  region: string;
  coordinates: string;
  video: string;
  orbitImage: string;
  aerialImage: string;
  surfaceImage: string;
  temperature: string;
}

export const EARTH_LANDING_ZONES: readonly EarthLandingZone[] = [
  {
    id: "sahara",
    region: "Sahara & Arabian Desert",
    coordinates: "25.4° N, 29.8° E",
    video: "/assets/videos/to_earth_sahara.mp4",
    orbitImage: "/assets/images/earth_01.jpg",
    aerialImage: "/assets/images/earth_aerial_sahara_1794472652548.jpg",
    surfaceImage: "/assets/images/earth_sahara_desert_1794458545792.jpg",
    temperature: "Arid desert zone (~38 °C by day, 15 °C global mean).",
  },
  {
    id: "amazon",
    region: "Amazon Rainforest Basin",
    coordinates: "3.4° S, 62.2° W",
    video: "/assets/videos/to_earth_amazon.mp4",
    orbitImage: "/assets/images/earth_orbit_amazon_1794472647034.jpg",
    aerialImage: "/assets/images/earth_aerial_amazon_1794472646196.jpg",
    surfaceImage: "/assets/images/earth_amazon_jungle_1794458546185.jpg",
    temperature: "Equatorial tropical basin (~28 °C, high humidity).",
  },
  {
    id: "arctic",
    region: "Arctic Glacial Fjord",
    coordinates: "68.3° N, 14.6° E",
    video: "/assets/videos/to_earth_arctic.mp4",
    orbitImage: "/assets/images/earth_orbit_arctic_1794472649949.jpg",
    aerialImage: "/assets/images/earth_aerial_arctic_1794472651964.jpg",
    surfaceImage: "/assets/images/earth_arctic_fjord_1794458546932.jpg",
    temperature: "Sub-polar glacial zone (-12 °C to 4 °C).",
  },
  {
    id: "savanna",
    region: "East African Rift Savanna",
    coordinates: "2.3° S, 34.8° E",
    video: "/assets/videos/to_earth_savanna.mp4",
    orbitImage: "/assets/images/earth_01.jpg",
    aerialImage: "/assets/images/earth_savanna_surface.jpg",
    surfaceImage: "/assets/images/earth_savanna_surface.jpg",
    temperature: "Sub-tropical savanna (~24 °C, 15 °C global mean).",
  },
];

export function pickRandomEarthLandingZone(
  previousId?: string | null,
  randomFn: () => number = Math.random,
): EarthLandingZone {
  const candidates = previousId
    ? EARTH_LANDING_ZONES.filter((z) => z.id !== previousId)
    : EARTH_LANDING_ZONES;
  const idx = Math.min(candidates.length - 1, Math.floor(randomFn() * candidates.length));
  return candidates[idx];
}

export function resolveNextPlanet(current: PlanetKey, requestedTarget?: string | null): PlanetKey {
  if (requestedTarget) {
    const normalized = requestedTarget.toLowerCase() as PlanetKey;
    if (normalized in PLANET_STATES) {
      return normalized;
    }
  }
  return PLANET_STATES[current].next.toLowerCase() as PlanetKey;
}
