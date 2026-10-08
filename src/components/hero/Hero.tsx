import { profile } from "@/content/profile";
import { LiveClock } from "./LiveClock";

/** Stagger helper: passes the delay to the `.reveal` animation via a CSS variable. */
const delay = (ms: number) => ({ "--reveal-delay": ms }) as React.CSSProperties;

export function Hero() {
  return (
    <main
      id="main"
      className="hero-grid relative flex min-h-dvh flex-col justify-between overflow-hidden px-6 py-6 font-mono text-sm md:px-12 md:py-8"
    >
      <header className="reveal flex items-start justify-between text-muted" style={delay(0)}>
        <span className="tracking-[0.18em] text-foreground">MH</span>
        <span className="flex items-center gap-3">
          <span className="hidden sm:inline">{profile.location}</span>
          <span className="text-accent">
            <LiveClock timeZone={profile.timeZone} />
          </span>
        </span>
      </header>

      <section className="max-w-[90rem]">
        <p className="reveal mb-6 text-xs tracking-[0.2em] text-muted" style={delay(150)}>
          SHEET 01 · IDENTITY
        </p>
        <p className="reveal mb-2 text-lg text-muted md:text-xl" style={delay(250)}>
          Hello, I&apos;m
        </p>
        <h1
          className="reveal font-sans text-[clamp(3.25rem,13vw,11rem)] font-semibold leading-[0.9] tracking-[-0.04em]"
          style={delay(350)}
        >
          {profile.firstName}
          <br />
          <span className="text-muted">{profile.lastName}</span>
        </h1>
        <p className="reveal mt-8 max-w-xl font-sans text-lg leading-relaxed text-foreground/80 md:text-xl" style={delay(550)}>
          {profile.tagline}
        </p>
      </section>

      <footer
        className="reveal flex flex-wrap items-end justify-between gap-4 text-xs text-muted"
        style={delay(750)}
      >
        <span>Fig 0.1 · {profile.coordinates}</span>
        <span className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" aria-hidden="true" />
          {profile.status}
        </span>
      </footer>
    </main>
  );
}
