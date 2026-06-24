export interface Faq {
  question: string;
  answer:   string;  // Plain, honest. No fake guarantees. Per brand-context.md.
}

export const faq: readonly Faq[] = [
  {
    question: "What kind of work do you take on?",
    answer:
      "Custom software and web applications, AI agents, CRMs, and content automation — mostly " +
      "for businesses that have a specific problem and want it solved " +
      "properly rather than patched over.  " ,
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on what you're building — a focused tool and a full " +
      "platform aren't the same job. I'll give you a clear quote before " +
      "any work starts, so there are no surprises. If your budget's " +
      "tight, tell me; I'd rather scope something that fits than " +
      "overpromise.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A small, focused build can take a few weeks; something larger " +
      "runs longer. I'll give you a realistic timeline up front, and " +
      "I'd rather quote honestly than promise a date I can't hit. " +
      "You'll see progress as we go, not just at the end.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "We talk through the problem first — what's broken, what you've " +
      "tried, what \"solved\" looks like for you. If it's a fit, I scope " +
      "it properly (use cases, how it should work) before writing any " +
      "code. No long contracts to start; we agree on the first piece " +
      "and go from there.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes — a lot of my work is with founders building their first " +
      "real version of something. I'll be straight with you about " +
      "what's worth building now versus later, so you spend your " +
      "runway on what actually moves things forward.",
  },
  // TODO(content): add any other questions prospects or organisers regularly
  // ask you. Real questions, honest answers — no manufactured urgency.
];
