"use client";
// app/posts/new/page.js

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="py-12 max-w-xl">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
      >
        ← Back to ledger
      </Link>

      <h1 className="font-display text-3xl mt-4 mb-8">New entry</h1>

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
            placeholder="Give it a name"
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
            placeholder="Write it out"
            className="border border-line bg-white/50 rounded-md px-4 py-3 leading-relaxed focus-visible:border-teal"
          />
        </div>

        {error && (
          <p className="font-mono text-xs text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="self-start bg-ink text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-md hover:bg-teal transition-colors disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save entry"}
        </button>
      </form>
    </main>
  );
}
