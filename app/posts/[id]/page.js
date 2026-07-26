// app/posts/[id]/page.js
// Server Component - post + comments direct DB se fetch karta hai

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeletePostButton from "@/components/DeletePostButton";
import CommentForm from "@/components/CommentForm";

export default async function PostDetailPage({ params }) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const post = await prisma.post.findUnique({
    where: { id },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });

  if (!post) notFound();

  return (
    <main className="py-12 max-w-2xl">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
      >
        ← Back to ledger
      </Link>

      <article className="mt-6">
        <time className="font-mono text-xs text-mustard">
          {new Date(post.createdAt).toLocaleString()}
        </time>
        <h1 className="font-display text-3xl mt-2">{post.title}</h1>
        <p className="mt-4 leading-relaxed text-ink/90 whitespace-pre-wrap">
          {post.content}
        </p>

        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-line">
          <Link
            href={`/posts/${post.id}/edit`}
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
          >
            Edit
          </Link>
          <DeletePostButton postId={post.id} />
        </div>
      </article>

      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
          {post.comments.length}{" "}
          {post.comments.length === 1 ? "comment" : "comments"}
        </h2>

        <ul className="flex flex-col gap-5 mb-8">
          {post.comments.map((comment) => (
            <li key={comment.id} className="border-l-2 border-line pl-4">
              <p className="text-sm leading-relaxed">{comment.body}</p>
              <p className="font-mono text-xs text-muted mt-1">
                {comment.author} ·{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
          {post.comments.length === 0 && (
            <li className="text-muted text-sm">No comments yet.</li>
          )}
        </ul>

        <CommentForm postId={post.id} />
      </section>
    </main>
  );
}
