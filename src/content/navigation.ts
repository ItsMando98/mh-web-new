export interface NavItem {
  readonly label: string;
  readonly href: `#${string}`;
}

export const navigation: readonly NavItem[] = [
  { label: "Career", href: "#career" },
  { label: "Ventures", href: "#ventures" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
