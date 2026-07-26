// app/posts/[id]/edit/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Entry not found");
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push(`/posts/${id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <p className="py-12 font-mono text-xs text-muted">Loading…</p>;
  }

  return (
    <main className="py-12 max-w-xl">
      <Link
        href={`/posts/${id}`}
        className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
      >
        ← Back to entry
      </Link>

      <h1 className="font-display text-3xl mt-4 mb-8">Edit entry</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-line bg-white/50 rounded-md px-4 py-3 font-display text-lg focus-visible:border-teal"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="border border-line bg-white/50 rounded-md px-4 py-3 leading-relaxed focus-visible:border-teal"
          />
        </div>

        {error && <p className="font-mono text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="self-start bg-ink text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-md hover:bg-teal transition-colors disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </form>
    </main>
  );
}
