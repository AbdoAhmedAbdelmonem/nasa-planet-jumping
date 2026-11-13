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
  name?: string;
  coordinates: string;
  lng: number;
  lat: number;
  zoom: number;
  pitch: number;
  bearing: number;
  video: string;
  orbitImage: string;
  aerialImage: string;
  surfaceImage: string;
  temperature: string;
  elevation?: string;
  atmosphere?: string;
}

export const EARTH_LANDING_ZONES: readonly EarthLandingZone[] = [
  {
    id: "sahara",
    region: "Sahara & Arabian Desert",
    name: "Great Sand Sea Sector Alpha",
    coordinates: "25.4000° N, 29.8000° E",
    lng: 29.8,
    lat: 25.4,
    zoom: 12.5,
    pitch: 58,
    bearing: 24,
    video: "/assets/videos/to_earth_sahara.mp4",
    orbitImage: "/assets/images/earth_01.jpg",
    aerialImage: "/assets/images/earth_aerial_sahara_1794472652548.jpg",
    surfaceImage: "/assets/images/earth_sahara_desert_1794458545792.jpg",
    temperature: "Arid desert zone (~38 °C by day, 15 °C global mean).",
    elevation: "182 m above sea level",
    atmosphere: "Hyper-arid, high visibility, thin cloud cover",
  },
  {
    id: "amazon",
    region: "Amazon Rainforest Basin",
    name: "Rio Negro Biosphere Gateway",
    coordinates: "3.4000° S, 62.2000° W",
    lng: -62.2,
    lat: -3.4,
    zoom: 12.0,
    pitch: 60,
    bearing: -15,
    video: "/assets/videos/to_earth_amazon.mp4",
    orbitImage: "/assets/images/earth_orbit_amazon_1794472647034.jpg",
    aerialImage: "/assets/images/earth_aerial_amazon_1794472646196.jpg",
    surfaceImage: "/assets/images/earth_amazon_jungle_1794458546185.jpg",
    temperature: "Equatorial tropical basin (~28 °C, high humidity).",
    elevation: "64 m above sea level",
    atmosphere: "Dense canopy transpiration, dense oxygen envelope",
  },
  {
    id: "arctic",
    region: "Arctic Glacial Fjord",
    name: "Svalbard Polar Archipelago",
    coordinates: "68.3000° N, 14.6000° E",
    lng: 14.6,
    lat: 68.3,
    zoom: 12.0,
    pitch: 64,
    bearing: 42,
    video: "/assets/videos/to_earth_arctic.mp4",
    orbitImage: "/assets/images/earth_orbit_arctic_1794472649949.jpg",
    aerialImage: "/assets/images/earth_aerial_arctic_1794472651964.jpg",
    surfaceImage: "/assets/images/earth_arctic_fjord_1794458546932.jpg",
    temperature: "Sub-polar glacial zone (-12 °C to 4 °C).",
    elevation: "320 m fjord elevation",
    atmosphere: "Crisp polar air, high atmospheric transparency",
  },
  {
    id: "savanna",
    region: "East African Rift Savanna",
    name: "Serengeti Caldera Approach",
    coordinates: "2.3000° S, 34.8000° E",
    lng: 34.8,
    lat: -2.3,
    zoom: 12.5,
    pitch: 55,
    bearing: 18,
    video: "/assets/videos/to_earth_savanna.mp4",
    orbitImage: "/assets/images/earth_01.jpg",
    aerialImage: "/assets/images/earth_savanna_surface.jpg",
    surfaceImage: "/assets/images/earth_savanna_surface.jpg",
    temperature: "Sub-tropical savanna (~24 °C, 15 °C global mean).",
    elevation: "1,530 m rift plateau",
    atmosphere: "Semi-arid continental airflow, open thermals",
  },
  {
    id: "kennedy",
    region: "NASA Kennedy Space Center",
    name: "Cape Canaveral Launch Complex 39A",
    coordinates: "28.5721° N, 80.6480° W",
    lng: -80.648,
    lat: 28.5721,
    zoom: 13.5,
    pitch: 62,
    bearing: -32,
    video: "/assets/videos/to_earth.mp4",
    orbitImage: "/assets/images/earth_01.jpg",
    aerialImage: "/assets/images/earth_aerial_sahara_1794472652548.jpg",
    surfaceImage: "/assets/images/earth_savanna_surface.jpg",
    temperature: "Subtropical coastal climate (~26 °C).",
    elevation: "3 m oceanfront spaceport",
    atmosphere: "Maritime coastal boundary layer, Atlantic trades",
  },
  {
    id: "mojave",
    region: "Mojave Air & Space Port",
    name: "Mojave Civilian Aerospace Test Center",
    coordinates: "35.0592° N, 118.1517° W",
    lng: -118.1517,
    lat: 35.0592,
    zoom: 13.0,
    pitch: 60,
    bearing: 45,
    video: "/assets/videos/to_earth.mp4",
    orbitImage: "/assets/images/earth_01.jpg",
    aerialImage: "/assets/images/earth_aerial_sahara_1794472652548.jpg",
    surfaceImage: "/assets/images/earth_sahara_desert_1794458545792.jpg",
    temperature: "High desert climate (~22 °C mean).",
    elevation: "851 m high desert plateau",
    atmosphere: "Low humidity, ultra-clear visual corridor",
  },
];

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export function createCustomLandingZone(
  lng: number,
  lat: number,
  name = "Custom Targeted Coordinates",
  options?: Partial<EarthLandingZone>,
): EarthLandingZone {
  const coords = formatCoordinates(lat, lng);
  return {
    id: `custom_${lat.toFixed(2)}_${lng.toFixed(2)}`.replace(/[^a-zA-Z0-9_]/g, ""),
    region: options?.region || name,
    name,
    coordinates: coords,
    lng,
    lat,
    zoom: options?.zoom ?? 12.5,
    pitch: options?.pitch ?? 60,
    bearing: options?.bearing ?? 20,
    video: options?.video || "/assets/videos/to_earth.mp4",
    orbitImage: options?.orbitImage || "/assets/images/earth_01.jpg",
    aerialImage: options?.aerialImage || "/assets/images/earth_aerial_sahara_1794472652548.jpg",
    surfaceImage: options?.surfaceImage || "/assets/images/earth_sahara_desert_1794458545792.jpg",
    temperature: options?.temperature || "Monitored planetary surface (~15 °C).",
    elevation: options?.elevation || "Sea level datum",
    atmosphere: options?.atmosphere || "Standard Earth atmosphere (1 atm, 78% N2, 21% O2)",
  };
}

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
