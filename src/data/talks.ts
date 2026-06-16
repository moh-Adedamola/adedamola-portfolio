export interface Talk {
  id:           string;
  title:        string;
  type:         "topic" | "past";  // Offered topic vs. delivered talk
  description:  string;
  event?:       string;            // Past talks only — real event name
  date?:        string;            // ISO — past talks only
  url?:         string;            // Slides / recording — if real and public
}

// Past talks: only add if the talk actually happened and is attributable.
// Offered topics: fine to list what you'd speak on.
//
// TODO(content): fill in the topics you want to offer and any real past
// talks. The Speaking section renders a "invite me to speak" state when
// this array is empty, so empty is fine at launch.
export const talks: readonly Talk[] = [
  // TODO(content): example topic entry shape:
  // {
  //   id:          "ai-for-nigerian-smes",
  //   type:        "topic",
  //   title:       "TODO(content): your topic title",
  //   description: "TODO(content): one or two sentences on what you cover",
  // },
  //
  // TODO(content): example past talk shape (only if it happened):
  // {
  //   id:          "some-event-2025",
  //   type:        "past",
  //   title:       "TODO(content)",
  //   description: "TODO(content)",
  //   event:       "TODO(content): event name",
  //   date:        "TODO(content): ISO date — e.g. '2025-03-15'",
  //   url:         "TODO(content): link to slides or recording if public",
  // },
];
