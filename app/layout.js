// app/layout.js
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Field Notes",
  description: "A running ledger of posts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts loaded via link tag instead of next/font to avoid
            Turbopack + Google Fonts fetch issues in dev */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-paper text-ink antialiased">
        <header className="border-b border-line">
          <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link href="/" className="font-display text-xl tracking-tight">
              Field Notes
            </Link>
            <Link
              href="/posts/new"
              className="font-mono text-xs uppercase tracking-widest text-teal hover:text-ink transition-colors"
            >
              + New entry
            </Link>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6">{children}</div>
        <footer className="max-w-3xl mx-auto px-6 py-10 mt-10 border-t border-line">
          <p className="font-mono text-xs text-muted">
            Field Notes — a running ledger.
          </p>
        </footer>
      </body>
    </html>
  );
}