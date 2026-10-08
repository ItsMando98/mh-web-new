import { Hero } from "@/components/hero/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { CharacterSheet } from "@/components/sections/CharacterSheet";
import { Contact } from "@/components/sections/Contact";
import { Projects } from "@/components/sections/Projects";
import { Ventures } from "@/components/sections/Ventures";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <CareerTimeline />
        <Ventures />
        <Projects />
        <CharacterSheet />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
