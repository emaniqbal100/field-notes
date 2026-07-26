"use client";
// components/DeletePostButton.js

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/");
      router.refresh();
    } catch (err) {
      setLoading(false);
      setConfirming(false);
      alert(err.message);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="text-muted">Delete this entry for good?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="uppercase tracking-widest text-red-600 hover:text-red-800"
        >
          {loading ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="uppercase tracking-widest text-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="font-mono text-xs uppercase tracking-widest text-muted hover:text-red-600 transition-colors"
    >
      Delete
    </button>
  );
}
