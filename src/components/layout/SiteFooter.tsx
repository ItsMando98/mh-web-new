import { LiveClock } from "@/components/hero/LiveClock";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 font-mono text-xs text-muted md:px-12">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4">
        <span>
          © {profile.launchYear} {profile.name}
        </span>
        <span className="flex items-center gap-2">
          {profile.location}
          <span className="text-accent">
            <LiveClock timeZone={profile.timeZone} />
          </span>
        </span>
        <a href="#top" className="transition-colors hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
