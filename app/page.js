// app/page.js
// Server Component - direct Prisma se DB read karta hai

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } },
  });

  const total = posts.length;

  return (
    <main className="py-12">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
          {total} {total === 1 ? "entry" : "entries"} logged
        </p>
        <h1 className="font-display text-3xl">The Ledger</h1>
      </div>

      {posts.length === 0 && (
        <div className="border border-dashed border-line rounded-md py-16 text-center">
          <p className="text-muted mb-4">Nothing logged yet.</p>
          <Link
            href="/posts/new"
            className="font-mono text-xs uppercase tracking-widest text-teal hover:text-ink transition-colors"
          >
            Write the first entry →
          </Link>
        </div>
      )}

      <ol className="relative border-l border-line ml-3">
        {posts.map((post, i) => (
          <li key={post.id} className="relative pl-8 pb-10 last:pb-0 group">
            <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-paper border-2 border-teal group-hover:bg-teal transition-colors" />
            <span className="font-mono text-xs text-mustard">
              {String(total - i).padStart(2, "0")}
            </span>
            <Link href={`/posts/${post.id}`} className="block group/link">
              <h2 className="font-display text-xl mt-1 group-hover/link:text-teal transition-colors">
                {post.title}
              </h2>
              <p className="text-muted mt-1 line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-3 mt-2 font-mono text-xs text-muted">
                <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                <span>·</span>
                <span>
                  {post._count.comments}{" "}
                  {post._count.comments === 1 ? "comment" : "comments"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
