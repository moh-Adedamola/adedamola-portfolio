import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_UNPOOLED! });
const db = new PrismaClient({ adapter });

async function main() {
  await db.post.upsert({
    where: { slug: "hello-world" },
    update: {},
    create: {
      title: "Hello World",
      slug: "hello-world",
      excerpt: "My first post — testing the blog pipeline.",
      body: "# Hello World\n\nThis is a seed post. Replace this with real content.",
      status: "DRAFT",
    },
  });
  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
