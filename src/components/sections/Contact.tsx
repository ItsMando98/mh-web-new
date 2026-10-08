import { Section } from "@/components/section/Section";
import { ScrollReveal } from "@/components/section/ScrollReveal";
import { profile } from "@/content/profile";
import { CopyButton } from "./CopyButton";

export function Contact() {
  return (
    <Section id="contact" sheet="06" eyebrow="SAY HELLO" title="Contact">
      <ScrollReveal>
        <p className="max-w-4xl font-sans text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Have something worth building? <span className="text-muted">Let&apos;s talk.</span>
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <CopyButton value={profile.email} />
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            Write an email ↗
          </a>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </Section>
  );
}
