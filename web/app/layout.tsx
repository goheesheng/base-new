import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "base.new — basestack for Base Batches",
  description:
    "Skills and a track-fit picker for Base Batches submissions. A Base-focused fork of solana.new.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-ink">
        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-5 md:px-10 md:pt-7">
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
    <nav className="mb-16 flex items-center justify-between md:mb-24">
      <div className="flex items-center gap-3">
        <span className="label-mono">basestack — vol I</span>
      </div>
      <a href="/" className="absolute left-1/2 -translate-x-1/2">
        <span className="text-[15px] font-semibold tracking-tightish">
          base<span className="crit">.</span>new
        </span>
      </a>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/goheesheng/base-new"
          target="_blank"
          rel="noreferrer"
          className="pill-apply"
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-10 pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-6">
        <div>
          <p className="label-mono">colophon</p>
          <p className="mt-2 text-[13px] leading-[20px] text-ink-60">
            Plus Jakarta Sans + JetBrains Mono + VT323. Static Next.js export.
            No tracking.
          </p>
        </div>
        <div className="text-right">
          <p className="label-mono">edition</p>
          <p className="mono mt-2 text-[12px] text-ink-60">
            mit · vol i · <span className="text-ink">2026·05·10</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
