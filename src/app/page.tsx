import { Hero } from "@/components/sections/hero";
import { CapabilityMarquee } from "@/components/sections/capability-marquee";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Why } from "@/components/sections/why";
import { Consulting } from "@/components/sections/consulting";
import { Stack } from "@/components/sections/stack";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityMarquee />
      <About />
      <Work />
      <Why />
      <Consulting />
      <Stack />
    </>
  );
}
