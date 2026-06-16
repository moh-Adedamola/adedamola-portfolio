import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { talks } from "@/data/talks";
import { site } from "@/data/site";

export function Speaking() {
  return (
    <section id="speaking" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading eyebrow="Speaking" title="Talks & workshops." />

        {talks.length === 0 ? (
          // Empty state: invite-to-speak panel.
          // Populate src/data/talks.ts to replace this with real talk cards.
          <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-dashed border-border p-8 md:flex-row md:items-start md:gap-8 md:p-12">
            <Mic
              className="h-8 w-8 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-5">
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Open to speaking engagements.
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Available for panels, workshops, and talks on AI, automation,
                  and building software for African businesses. Get in touch if
                  you'd like me at your event.
                </p>
              </div>
              <Button asChild className="w-fit">
                <a href={`mailto:${site.email}`}>Invite me to speak</a>
              </Button>
            </div>
          </div>
        ) : (
          /* TODO: render talk cards — offered topics first, then past talks */
          null
        )}

      </div>
    </section>
  );
}
