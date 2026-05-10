import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "base.new — ship on Base, win Base Batches",
  description:
    "Skills, light-paper drafter, and track-fit picker for Base Batches submissions. A Base-focused fork of solana.new.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden text-ink antialiased">
        {/* Hero glow — sized box at the top viewport, not full inset.
            Multiple stacked radial blurs in a single bg-image. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1100px] bg-hero-glow opacity-90"
        />
        {/* Soft vignette toward bottom to fade glow into pure black */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[700px] -z-10 h-[600px] bg-gradient-to-b from-transparent to-black"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-6 pb-16 md:pt-8 md:pb-24">
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
      <a
        href="/"
        className="flex items-baseline gap-1.5 font-display text-2xl tracking-ultratight"
      >
        <span className="inline-block translate-y-[-2px] text-[#0052FF]">▸</span>
        <span className="text-white">base</span>
        <span className="text-ink-muted">.new</span>
      </a>
      <a
        href="https://github.com/goheesheng/base-new"
        target="_blank"
        rel="noreferrer"
        className="pill"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        github
      </a>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-line/60 pt-6 font-mono text-[11px] tracking-wider text-ink-dim">
      Fork of{" "}
      <a
        href="https://github.com/sendaifun/solana-new"
        target="_blank"
        rel="noreferrer"
        className="underline decoration-dotted hover:text-ink-muted"
      >
        sendaifun/solana-new
      </a>{" "}
      · MIT
    </footer>
  );
}
