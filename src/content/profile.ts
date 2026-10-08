/** Single source of truth for personal data. Replace placeholders with real copy. */
export const profile = {
  name: "Mathis Hoffmann",
  firstName: "Mathis",
  lastName: "Hoffmann",
  location: "Hamburg, Germany",
  /** 53°33′N 9°59′E */
  coordinates: "53°33′N  9°59′E",
  timeZone: "Europe/Berlin",
  // Placeholder copy — to be replaced with the real positioning statement.
  role: "Builder & founder",
  tagline: "Building products, ventures and projects from Hamburg.",
  status: "Open for interesting work",
} as const;

export type Profile = typeof profile;
