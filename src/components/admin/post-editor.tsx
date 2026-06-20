"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";

interface PostEditorProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    coverImage: string;
    status: "DRAFT" | "PUBLISHED";
  };
}

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [body, setBody] = useState(initialData?.body ?? "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    initialData?.status ?? "DRAFT"
  );
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    const payload = { title, slug, excerpt, body, coverImage, status };
    const url = isEditing
      ? `/api/admin/posts/${initialData.id}`
      : "/api/admin/posts";
    const method = isEditing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setUploadError("");

    const sigRes = await fetch("/api/admin/upload-signature", { method: "POST" });
    if (!sigRes.ok) {
      setUploadError("Failed to get upload signature.");
      setUploading(false);
      return;
    }

    const { signature, timestamp, apiKey, cloudName, folder } =
      await sigRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", apiKey);
    form.append("timestamp", String(timestamp));
    form.append("signature", signature);
    form.append("folder", folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: form }
    );

    setUploading(false);

    if (!uploadRes.ok) {
      setUploadError("Upload failed. Please try again.");
      return;
    }

    const data = await uploadRes.json();
    setCoverImage(data.secure_url);
  }

  async function handleDelete() {
    if (!isEditing) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;

    const res = await fetch(`/api/admin/posts/${initialData.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setError("Failed to delete post.");
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <input
          className="w-full border rounded-md px-3 py-2 text-sm bg-background"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!isEditing) setSlug(generateSlug(e.target.value));
          }}
          placeholder="Post title"
        />
      </div>

      {/* Slug */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Slug</label>
        <input
          className="w-full border rounded-md px-3 py-2 text-sm bg-background font-mono"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="post-slug"
        />
      </div>

      {/* Excerpt */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Excerpt</label>
        <input
          className="w-full border rounded-md px-3 py-2 text-sm bg-background"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short description shown in blog index"
        />
      </div>

      {/* Cover image */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Cover image</label>

        {coverImage ? (
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt="Cover preview"
              className="h-24 w-40 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={() => setCoverImage("")}
              className="text-xs text-red-500 hover:underline mt-1"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <label className="cursor-pointer border rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              {uploading ? "Uploading…" : "Choose image"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </label>
            {uploading && (
              <span className="text-xs text-muted-foreground">Uploading…</span>
            )}
          </div>
        )}

        {uploadError && (
          <p className="text-xs text-red-500">{uploadError}</p>
        )}
      </div>

      {/* Body */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Body (Markdown)</label>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="text-xs underline text-muted-foreground"
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>

        {preview ? (
          <div className="prose prose-sm dark:prose-invert max-w-none border rounded-md p-4 min-h-64">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm bg-background font-mono min-h-64 resize-y"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your post in markdown..."
          />
        )}
      </div>

      {/* Status */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Status</label>
        <select
          className="border rounded-md px-3 py-2 text-sm bg-background"
          value={status}
          onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save changes" : "Create post"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm text-red-500 hover:underline"
          >
            Delete post
          </button>
        )}
      </div>
    </div>
  );
}
