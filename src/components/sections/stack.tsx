import { SectionHeading } from "@/components/section-heading";
import { stack } from "@/data/stack";

const CAT_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend:  "Backend",
  ai:       "AI",
  infra:    "Infrastructure",
  tools:    "Tools",
};

// Display order for categories
const CAT_ORDER = ["frontend", "backend", "ai", "infra", "tools"];

export function Stack() {
  // Group into ordered categories, skip empty ones
  const grouped = CAT_ORDER.reduce<Array<{ cat: string; items: typeof stack }>>(
    (acc, cat) => {
      const items = stack.filter((item) => item.category === cat);
      if (items.length > 0) acc.push({ cat, items });
      return acc;
    },
    []
  );

  // Anything without a category goes at the end
  const uncategorized = stack.filter((item) => !item.category);

  return (
    <section id="stack" className="bg-card py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading
          eyebrow="Stack"
          title="Tools I build with."
          intro="Only tools I've shipped real work in."
        />

        {/*
          dl is semantically correct: category label (dt) : tool list (dd).
          sm:grid-cols-[9rem_1fr] locks the label column so pills line up cleanly.
        */}
        <dl className="mt-12 space-y-7">
          {grouped.map(({ cat, items }) => (
            <div key={cat} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:pt-1.5">
                {CAT_LABELS[cat] ?? cat}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {item.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}

          {uncategorized.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:pt-1.5">
                Other
              </dt>
              <dd className="flex flex-wrap gap-2">
                {uncategorized.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {item.name}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

      </div>
    </section>
  );
}
