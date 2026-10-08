/** PLACEHOLDER CONTENT — replace with the real character sheet. */
export interface CharacterStat {
  readonly label: string;
  /** 0..100 */
  readonly value: number;
}

export interface Character {
  readonly playerLabel: string;
  readonly className: string;
  readonly level: number;
  readonly stats: readonly CharacterStat[];
  readonly inventory: readonly string[];
  readonly specialMove: { readonly name: string; readonly description: string };
}

export const character: Character = {
  playerLabel: "PLAYER 1",
  className: "Builder",
  level: 10,
  stats: [
    { label: "Strategy", value: 80 },
    { label: "Engineering", value: 90 },
    { label: "Design sense", value: 70 },
    { label: "Shipping speed", value: 85 },
    { label: "Coffee", value: 100 },
  ],
  inventory: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Node.js", "Figma"],
  specialMove: {
    name: "Zero to one",
    description: "Turns a vague idea into something people can actually use.",
  },
};
