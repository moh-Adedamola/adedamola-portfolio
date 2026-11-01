"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { faq } from "@/data/faq";

function isTodo(s: string) {
  return s.startsWith("TODO");
}

export function Faq() {
  return (
    <section id="faq" className="bg-section-raised section-y">
      <div className="shell"><div className="mx-auto max-w-3xl">

        <SectionHeading eyebrow="FAQ" title="Common questions." headingSize="xl" />

        <Reveal className="mt-10">
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {isTodo(item.answer) ? (
                  <span className="block rounded-lg border border-dashed border-border px-3 py-2 font-mono text-xs italic text-muted-foreground/50">
                    {/* TODO(content): add your answer to src/data/faq.ts */}
                    {item.answer}
                  </span>
                ) : (
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </Reveal>

      </div></div>
    </section>
  );
}
