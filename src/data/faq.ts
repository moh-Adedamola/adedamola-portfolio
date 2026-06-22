export interface Faq {
  question: string;
  answer:   string;  // Plain, honest. No fake guarantees. Per brand-context.md.
}

export const faq: readonly Faq[] = [
  {
    question: "What kind of work do you take on?",
    answer:
      "Custom software, AI agents, CRMs, and content automation — mostly " +
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
    answer:
      "Depends what you're building, but most projects start showing " +
      "real progress in weeks, not months. After we talk through what " +
      "you need, I'll give you a clear timeline up front — no vague " +
      "\"it'll be ready when it's ready.\" I work in weekly chunks, so " +
      "you see it taking shape as we go.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "With a conversation. You tell me what's slowing you down or what " +
      "you want built — you don't need to know the technical side. A " +
      "few days later I come back with a plan: what I'll build, how " +
      "long it'll take, what it costs. If it works for you, we start, " +
      "and I'm around after launch too.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yeah, a lot. I work with founders and small businesses who need " +
      "something real in people's hands without overbuilding. An MVP to " +
      "test an idea, a system to run your operations — I'd rather ship " +
      "you something that works and grows than something bloated you " +
      "didn't need yet.",
  },
  // TODO(content): add any other questions prospects or organisers regularly
  // ask you. Real questions, honest answers — no manufactured urgency.
];
