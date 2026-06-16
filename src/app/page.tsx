import { Hero } from "@/components/sections/hero";
import { CapabilityMarquee } from "@/components/sections/capability-marquee";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityMarquee />
      <About />
    </>
  );
}
