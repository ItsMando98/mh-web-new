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
  launchYear: 2026,
  // Placeholders — set the real address and profile URLs before launch.
  email: "hello@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
} as const;

export type Profile = typeof profile;
