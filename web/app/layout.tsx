import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "base-new — ship on Base, win Base Batches",
  description:
    "Skills, light-paper drafter, and track-fit picker for Base Batches submissions. A Base-focused fork of solana-new.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-ink antialiased">
        <div className="mx-auto max-w-5xl px-6 py-8 md:py-12">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className="mb-12 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
        <span className="inline-block h-3 w-3 rounded-sm bg-base" />
        base-new
      </a>
      <div className="flex items-center gap-6 font-mono text-xs text-ink-muted">
        <a href="/draft" className="hover:text-ink">/draft</a>
        <a href="/track" className="hover:text-ink">/track</a>
        <a
          href="https://github.com/goheesheng/base-new"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink"
        >
          github
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/5 pt-6 font-mono text-xs text-ink-light">
      Fork of{" "}
      <a
        href="https://github.com/sendaifun/solana-new"
        target="_blank"
        rel="noreferrer"
        className="underline decoration-dotted hover:text-ink-muted"
      >
        sendaifun/solana-new
      </a>
      . MIT.
    </footer>
  );
}
