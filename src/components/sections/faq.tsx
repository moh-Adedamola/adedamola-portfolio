"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { faq } from "@/data/faq";

function isTodo(s: string) {
  return s.startsWith("TODO");
}

export function Faq() {
  return (
    <section id="faq" className="bg-section-base section-y">
      <div className="mx-auto max-w-3xl px-4 md:px-6">

        <SectionHeading eyebrow="FAQ" title="Common questions." headingSize="xl" />

        <Accordion type="single" collapsible className="mt-10 w-full">
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
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}
