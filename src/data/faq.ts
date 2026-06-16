export interface Faq {
  question: string;
  answer:   string;  // Plain, honest. No fake guarantees. Per brand-context.md.
}

export const faq: readonly Faq[] = [
  {
    question: "What kind of work do you take on?",
    answer:
      "Custom software, AI agents, workflow automation, and CRMs — mostly " +
      "for businesses that have a specific problem and want it solved " +
      "properly rather than patched. Most of my clients are Lagos-based, " +
      "though I work with teams further afield too.",
  },
  {
    question: "What does it cost?",
    answer:
      "I don't publish fixed prices — every project is scoped to the actual " +
      "problem. Terms are flexible and agreed before any work starts. " +
      "Reach out and tell me what you're trying to solve; I'll tell you " +
      "whether it's something I can help with and what that looks like.",
  },
  {
    question: "How long does a project take?",
    // TODO(content): replace with your honest, experience-based answer.
    // Brand rule: realistic timelines only — no "30 days to X" framing.
    answer: "TODO(content)",
  },
  {
    question: "How does an engagement start?",
    // TODO(content): describe your real process — discovery call, brief, etc.
    answer: "TODO(content)",
  },
  {
    question: "Do you work with early-stage startups?",
    // TODO(content): your honest answer on who you work best with.
    answer: "TODO(content)",
  },
  {
    question: "Are you available for speaking?",
    answer:
      "Yes. If you have an event or topic in mind, get in touch at " +
      "hello@refacint.com and I'll let you know if it's a fit.",
  },
  // TODO(content): add any other questions prospects or organisers regularly
  // ask you. Real questions, honest answers — no manufactured urgency.
];
