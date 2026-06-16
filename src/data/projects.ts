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
  featured:     boolean;
  displayOrder: number;
}

export const projects: readonly Project[] = [
  {
    slug:         "molek-schools",
    name:         "MOLEK Schools",
    client:       "MOLEK Schools",
    // TODO(content): one sentence — what did you build for them?
    summary:      "TODO(content)",
    // TODO(content): problem  — the real problem you were solving
    // TODO(content): approach — what you built and how
    // TODO(content): outcome  — only add a verifiable result; omit if unsure
    // TODO(content): tags     — adjust from default
    tags:         ["custom-software"],
    // TODO(content): year     — e.g. "2024"
    // TODO(content): imageUrl — e.g. "/images/work/molek.webp"
    // TODO(content): liveUrl  — if the site/app is publicly accessible
    featured:     true,
    displayOrder: 1,
  },
  {
    slug:         "klassrun-technologies",
    name:         "Klassrun Technologies",
    client:       "Klassrun Technologies",
    // TODO(content): one sentence — what did you build for them?
    summary:      "TODO(content)",
    // TODO(content): problem, approach, outcome, tags, year, imageUrl, liveUrl
    tags:         ["custom-software"],
    featured:     true,
    displayOrder: 2,
  },
  {
    slug:         "tenderville-school",
    name:         "Tenderville School",
    client:       "Tenderville School",
    // TODO(content): one sentence — what did you build for them?
    summary:      "TODO(content)",
    // TODO(content): problem, approach, outcome, tags, year, imageUrl, liveUrl
    tags:         ["custom-software"],
    featured:     true,
    displayOrder: 3,
  },
  {
    slug:         "refacint",
    name:         "Refacint Technologies",
    client:       "Refacint Technologies",
    // TODO(content): one sentence on what the agency site itself is
    summary:      "TODO(content)",
    // TODO(content): tags, year, imageUrl
    tags:         ["web", "custom-software"],
    liveUrl:      "https://refacint.com",
    featured:     true,
    displayOrder: 4,
  },
];
