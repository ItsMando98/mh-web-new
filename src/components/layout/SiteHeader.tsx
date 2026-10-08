import { LiveClock } from "@/components/hero/LiveClock";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="reveal fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-black"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between px-6 font-mono text-[11px] sm:text-xs md:px-12">
        <a href="#top" className="hidden tracking-[0.18em] sm:inline" aria-label="Back to top">
          MH
        </a>
        <nav aria-label="Primary">
          <ul className="flex gap-4 text-muted md:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="hidden items-center gap-3 text-muted md:flex">
          {profile.location}
          <span className="text-accent">
            <LiveClock timeZone={profile.timeZone} />
          </span>
        </span>
      </div>
    </header>
  );
}
