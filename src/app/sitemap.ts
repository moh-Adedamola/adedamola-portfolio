import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { siteUrl } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await db.post.findMany({
    where:   { status: "PUBLISHED" },
    select:  { slug: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url:             `${siteUrl}/blog/${post.slug}`,
    lastModified:    post.updatedAt,
    changeFrequency: "monthly",
    priority:        0.7,
  }));

  return [
    {
      url:             siteUrl,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
    },
    {
      url:             `${siteUrl}/blog`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.8,
    },
    ...postEntries,
  ];
}
