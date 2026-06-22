export interface Service {
  id:           string;
  title:        string;
  description:  string;    // Founder voice — what it is, plain
  outcomes:     string[];  // 2-3 concrete real benefits; no invented metrics
  icon?:        string;    // lucide icon name
  displayOrder: number;
}

// Descriptions are grounded in the real Refacint service categories
// (brand-context.md). No fixed pricing — per brand-context.md rules.
export const services: readonly Service[] = [
  {
    id:          "ai-agents",
    title:       "AI agents",
    description:
      "I build agents that handle specific, repeatable decisions in your " +
      "business — lead qualification, document processing, notifications, " +
      "scheduling — without a human needed for each one.",
    outcomes: [
      "Tasks that used to need a staff member run on their own",
      "Available around the clock without overtime or additional hires",
      "Decisions happen at the same speed regardless of team size",
    ],
    icon:        "Bot",
    displayOrder: 1,
  },
  {
    id:          "custom-crms",
    title:       "Custom CRMs",
    description:
      "A CRM built around your actual sales process, not a generic one " +
      "you have to adapt yourself to fit.",
    outcomes: [
      "Pipeline visibility that matches how you actually sell",
      "Client and lead data in one place instead of scattered across sheets",
      "Follow-up reminders and status changes are automatic",
    ],
    icon:        "Users",
    displayOrder: 2,
  },
  {
    id:          "custom-software",
    title:       "Custom software",
    description:
      "Software for the specific problem you have — not a general tool " +
      "stretched to cover it.",
    outcomes: [
      "Built around your real process, not adapted from something generic",
      "No unnecessary features to work around",
      "Can grow and change as the business does",
    ],
    icon:        "Code2",
    displayOrder: 3,
  },
  {
    id:          "content-automation",
    title:       "Content automation",
    description:
      "Pipelines that generate, schedule, or repurpose content consistently " +
      "— so you're not starting from scratch every time.",
    outcomes: [
      "Consistent output without adding headcount",
      "One piece of content turns into several formats automatically",
      "Frees you from the day-to-day production grind",
    ],
    icon:        "FileText",
    displayOrder: 4,
  },
  {
    id:          "ai-consulting",
    title:       "AI consulting",
    description:
      "I help you work out what AI can realistically do for your business " +
      "and where to start.",
    outcomes: [
      "Clear picture of what's worth building vs. what's hype",
      "A starting point that fits your budget and team",
      "Avoid expensive experiments that don't ship",
    ],
    icon:        "Lightbulb",
    displayOrder: 5,
  },
];
