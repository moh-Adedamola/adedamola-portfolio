import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom type-scale utilities (globals.css) are font sizes, not colours.
// Without this, twMerge treats e.g. `text-label` + `text-muted-foreground`
// as conflicting colours and drops the size.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "display", "h2", "h3", "h4", "label", "body"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
