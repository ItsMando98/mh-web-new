import { Section } from "@/components/section/Section";
import { ScrollReveal } from "@/components/section/ScrollReveal";
import { character, type CharacterStat } from "@/content/character";
import { profile } from "@/content/profile";

const BAR_SEGMENTS = 20;

const toFilledSegments = (value: number) => Math.round((value / 100) * BAR_SEGMENTS);

function StatRow({ stat }: { stat: CharacterStat }) {
  const filled = toFilledSegments(stat.value);

  return (
    <li className="grid grid-cols-[6.25rem_1fr_2rem] items-center gap-3 font-mono text-sm md:gap-4 md:grid-cols-[9rem_1fr_3rem]">
      <span className="text-muted">{stat.label}</span>
      <span
        role="meter"
        aria-label={stat.label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={stat.value}
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${BAR_SEGMENTS}, 1fr)` }}
      >
        {Array.from({ length: BAR_SEGMENTS }, (_, i) => (
          <span
            key={i}
            className={`h-3 ${i < filled ? "bg-accent" : "bg-white/10"}`}
          />
        ))}
      </span>
      <span className="text-right tabular-nums">{stat.value}</span>
    </li>
  );
}

function SubHeading({ children }: { children: string }) {
  return <h3 className="mb-5 font-mono text-xs tracking-[0.2em] text-muted">{children}</h3>;
}

export function CharacterSheet() {
  return (
    <Section
      id="about"
      sheet="05"
      eyebrow="CHARACTER SHEET"
      title="About"
      lead="The short version of me, as a character sheet. The long version is a conversation."
    >
      <ScrollReveal>
        <div className="grid border border-white/10 md:grid-cols-[22rem_1fr]">
          <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-10">
            <p className="font-mono text-xs tracking-[0.2em] text-accent">{character.playerLabel}</p>
            <p className="mt-6 font-sans text-4xl font-semibold leading-tight tracking-[-0.03em]">
              {profile.name}
            </p>
            <dl className="mt-10 space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-muted">CLASS</dt>
                <dd>{character.className}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-muted">LEVEL</dt>
                <dd>{character.level}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">BASE</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-12 p-8 md:p-12">
            <div>
              <SubHeading>ATTRIBUTES</SubHeading>
              <ul className="space-y-3">
                {character.stats.map((stat) => (
                  <StatRow key={stat.label} stat={stat} />
                ))}
              </ul>
            </div>

            <div>
              <SubHeading>INVENTORY</SubHeading>
              <ul className="flex flex-wrap gap-2">
                {character.inventory.map((item) => (
                  <li
                    key={item}
                    className="border border-white/15 px-3 py-1.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SubHeading>SPECIAL MOVE</SubHeading>
              <p className="font-sans text-2xl font-semibold tracking-tight">
                {character.specialMove.name}
              </p>
              <p className="mt-2 max-w-lg text-foreground/70">{character.specialMove.description}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
