export interface StackItem {
  name:      string;
  category?: "frontend" | "backend" | "ai" | "infra" | "tools";
}

// Only tools actually used in real delivered work.
// Source: this codebase + explicitly named tools in project context.
export const stack: readonly StackItem[] = [
  // Frontend
  { name: "Next.js",      category: "frontend" },
  { name: "React",        category: "frontend" },
  { name: "TypeScript",   category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "shadcn/ui",    category: "frontend" },

  // Backend
  { name: "Node.js",      category: "backend"  },
  { name: "Prisma",       category: "backend"  },
  { name: "PostgreSQL",   category: "backend"  },

  // AI
  { name: "OpenAI",       category: "ai"       },

  // Infra
  { name: "Vercel",       category: "infra"    },
  { name: "Neon",         category: "infra"    },
  { name: "Cloudinary",   category: "infra"    },

  // TODO(content): add any other tools you regularly build with
  // (e.g. specific automation platforms, other AI providers, etc.)
];
