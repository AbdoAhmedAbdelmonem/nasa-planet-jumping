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
export const MARS_ORBIT = `${BASE_MEDIA_URL}/b30f64d9-1637-477a-83df-d0fc6461a422.mp4`;
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

export function resolveNextPlanet(current: PlanetKey, requestedTarget?: string | null): PlanetKey {
  if (requestedTarget) {
    const normalized = requestedTarget.toLowerCase() as PlanetKey;
    if (normalized in PLANET_STATES) {
      return normalized;
    }
  }
  return PLANET_STATES[current].next.toLowerCase() as PlanetKey;
}
