export interface Stat {
  value: string;  // A REAL, verifiable figure only — e.g. "3+", "2023"
  label: string;  // Short descriptor — e.g. "clients shipped"
}

// Empty until real, verifiable numbers are confirmed.
// Per content-model.md: never fabricate a metric.
// If this array stays empty, the Stats section does not render.
//
// TODO(content): add real figures you can stand behind publicly.
// Examples of acceptable stats: years building, named clients shipped,
// projects delivered. Do not add any number you cannot verify.
export const stats: readonly Stat[] = [];
