export type ProjectTag =
  | "custom-software"
  | "ai-agent"
  | "automation"
  | "crm"
  | "web"
  | "consulting";

export interface Project {
  slug:         string;
  name:         string;
  client:       string;
  summary:      string;       // One real sentence — what it is
  problem?:     string;       // TODO(content): real problem only
  approach?:    string;       // TODO(content): what was built
  outcome?:     string;       // TODO(content): verifiable result only — omit rather than invent
  tags:         ProjectTag[];
  year?:        string;       // "2024"
  imageUrl?:    string;       // /images/work/...
  liveUrl?:     string;       // Public URL if available
  linkLabel?:   string;       // Override link text, e.g. "Preview (in progress)"
  featured:     boolean;
  displayOrder: number;
}

export const projects: readonly Project[] = [
  {
    slug:         "molek-schools",
    name:         "MOLEK Schools",
    client:       "MOLEK Schools",
    summary:      "A secondary school runs its whole operation on a platform I built — even the exams, which work without internet. The manual stuff like attendance and grading just handles itself now. Still building with them under a retainer.",
    problem:      "MOLEK Schools ran core operations — attendance, grading, records — manually, which was slow and hard to keep consistent across the school.",
    approach:     "I built a full website with a student portal and an admin dashboard covering their school operations end to end, plus an offline computer-based testing (CBT) system that works without a reliable internet connection.",
    outcome:      "Tasks that used to be done by hand, like attendance and student grading, are now handled by the system. The engagement is ongoing under a retainer.",
    tags:         ["web", "custom-software"],
    year:         "2025",
    liveUrl:      "https://www.molekschool.com",
    featured:     true,
    displayOrder: 1,
  },
  {
    slug:         "klassrun-technologies",
    name:         "Klassrun Technologies",
    client:       "Klassrun Technologies",
    summary:      "Take what one school needs and build it for many. Klassrun is an AI-powered platform for running multiple schools at once. It's live as an MVP and signing up its first schools — I'm co-founder and CEO.",
    problem:      "Schools need a single system to run operations across the board, but most tools are built for one institution at a time and lack modern, AI-assisted workflows.",
    approach:     "Klassrun is a multi-school management platform with AI integrated into its workflows, built to serve many schools rather than one. It's live as an MVP, and we're onboarding users now.",
    outcome:      "Live MVP, actively onboarding schools. I'm co-founder and CEO.",
    tags:         ["ai-agent", "web"],
    year:         "2026",
    liveUrl:      "https://www.klassrun.com",
    featured:     true,
    displayOrder: 2,
  },
  {
    slug:         "eventiq",
    name:         "EventIQ",
    client:       "EventIQ",
    summary:      "Booking an event vendor usually means trusting a stranger with your deposit and hoping it works out. EventIQ fixes that — every vendor is verified, and the customer's money stays in escrow until the event actually happens. A client project I'm currently building, with escrow payments via Paystack.",
    problem:      "Booking event vendors in Lagos is risky — customers can't easily tell who's trustworthy, and there's no protection if a deposit is paid and something goes wrong.",
    approach:     "EventIQ verifies every vendor (identity, CAC where applicable, portfolio) before they appear, and holds deposits in escrow via Paystack — releasing payment to the vendor only after the customer confirms the event went well. A dispute-resolution process backs both sides.",
    outcome:      "Currently in development.",
    tags:         ["web", "custom-software"],
    year:         "2026",
    liveUrl:      "https://sphene-events.vercel.app",
    linkLabel:    "Preview (in progress)",
    featured:     true,
    displayOrder: 3,
  },
  {
    slug:         "refacint",
    name:         "Refacint Technologies",
    client:       "Refacint Technologies",
    summary:      "My software and AI agency. I build custom apps, CRMs, AI agents, and the automation that ties them together — for business owners who need software that fits how they work.",
    tags:         ["web", "custom-software", "ai-agent"],
    year:         "2026",
    liveUrl:      "https://refacint.com",
    featured:     true,
    displayOrder: 4,
  },
];
