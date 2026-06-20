import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";
import { site, siteUrl } from "@/data/site";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where:  { slug },
    select: { title: true, excerpt: true, status: true, publishedAt: true },
  });

  if (!post || post.status !== "PUBLISHED") return {};

  const description = post.excerpt ?? undefined;

  return {
    title:       post.title,
    description,
    alternates:  { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      type:          "article",
      siteName:      site.name,
      title:         post.title,
      description,
      publishedTime: post.publishedAt?.toISOString(),
      // og:image is auto-wired from opengraph-image.tsx in this route segment
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description,
      // twitter:image is auto-wired from the opengraph-image.tsx via Next.js
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      body: true,
      coverImage: true,
      publishedAt: true,
      updatedAt: true,
      status: true,
    },
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const postUrl = `${siteUrl}/blog/${slug}`;
  const articleSchema = {
    "@context":        "https://schema.org",
    "@type":           "BlogPosting",
    "headline":        post.title,
    ...(post.excerpt   ? { "description": post.excerpt } : {}),
    "datePublished":   post.publishedAt?.toISOString(),
    "dateModified":    post.updatedAt.toISOString(),
    "image":           post.coverImage ?? `${postUrl}/opengraph-image`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
    "author": {
      "@type": "Person",
      "@id":   `${siteUrl}/#person`,
      "name":  site.personName,
      "url":   siteUrl,
    },
    "publisher": {
      "@type": "Organization",
      "@id":   `${siteUrl}/#organization`,
      "name":  "Refacint Technologies",
      "url":   site.agencyUrl,
    },
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {post.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <header className="mb-8 space-y-2">
        {publishDate && (
          <p className="text-sm text-muted-foreground">{publishDate}</p>
        )}
        <h1 className="text-3xl font-semibold leading-tight">{post.title}</h1>
        {post.excerpt && (
          <p className="text-muted-foreground">{post.excerpt}</p>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </div>
    </article>
  );
}
