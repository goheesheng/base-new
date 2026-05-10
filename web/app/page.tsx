import { CopyableCommand } from "@/components/CopyableCommand";

export default function Home() {
  return (
    <main className="space-y-20">
      <Hero />
      <Wedge />
      <Tracks />
      <Skills />
      <CTA />
    </main>
  );
}

function Hero() {
  return (
    <section className="space-y-6">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
        Ship on Base. Win{" "}
        <span className="bg-gradient-to-r from-base to-base-600 bg-clip-text text-transparent">
          Base Batches
        </span>
        .
      </h1>
      <p className="max-w-2xl text-lg text-ink-muted">
        Skills, a light-paper drafter, and a track-fit picker for Base Batches
        submissions. Standalone — works on any project, with or without the CLI.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="/draft"
          className="inline-flex items-center justify-center rounded-md bg-base px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-base-600"
        >
          Draft your light paper →
        </a>
        <a
          href="/track"
          className="inline-flex items-center justify-center rounded-md border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink hover:bg-ink/[0.02]"
        >
          Pick the right track
        </a>
      </div>
      <div className="pt-4">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-light">
          or install the CLI
        </p>
        <CopyableCommand command="curl -fsSL https://base.new/setup.sh | bash" />
      </div>
    </section>
  );
}

function Wedge() {
  const items = [
    "500-word light paper drafter with a hard ceiling",
    "Track-fit rubric — Startup / Student / Robotics",
    "Standard founder + SME (technical) interview prep",
    "3-minute Demo Day pitch script",
    "Pre-submit checklist (demo URL, Basescan, README, repo)",
    "Single HTML artifact you copy-paste into the application",
  ];
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">The wedge skill</h2>
      <p className="max-w-2xl text-ink-muted">
        <code className="rounded bg-ink/[0.04] px-1.5 py-0.5 font-mono text-sm">
          /submit-to-base-batches
        </code>{" "}
        — the one skill that works standalone on any project.
      </p>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((it) => (
          <li
            key={it}
            className="flex gap-3 rounded-lg border border-ink/5 bg-ink/[0.02] p-4 text-sm"
          >
            <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-base" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Tracks() {
  const tracks = [
    {
      name: "Startup",
      who: "Pre-seed teams, raised < ~$250k",
      prize: "$10k grant + 8wk program · $50k from Base Ecosystem Fund (min 3)",
      window: "Feb 17 – Mar 9 · Program Mar 23 – May 15",
    },
    {
      name: "Student",
      who: "Undergrads worldwide, cross-university OK",
      prize: "Top 5 → flights to SF + Demo Day",
      window: "Feb 17 – Apr 27",
    },
    {
      name: "Robotics",
      who: "Robotics expertise or strong interest (by Virtuals)",
      prize: "10 teams · Unitree G1 access · top 3 → $50k from Virtuals Fund",
      window: "Feb 16 – Mar 30 · Program Apr 6 – May 1",
    },
  ];
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Three tracks</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tracks.map((t) => (
          <div
            key={t.name}
            className="rounded-lg border border-ink/5 bg-white p-5 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <span className="rounded-full bg-base/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-base">
                track
              </span>
            </div>
            <p className="text-sm text-ink-muted">{t.who}</p>
            <p className="mt-3 text-sm">{t.prize}</p>
            <p className="mt-3 font-mono text-xs text-ink-light">{t.window}</p>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-ink-light">
        Snapshot — verify dates at{" "}
        <a
          href="https://www.basebatches.xyz/"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-dotted hover:text-ink-muted"
        >
          basebatches.xyz
        </a>
        .
      </p>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: "submit-to-base-batches", phase: "launch", base: true },
    { name: "base-batches-copilot", phase: "idea", base: true },
    { name: "find-next-crypto-idea", phase: "idea" },
    { name: "validate-idea", phase: "idea" },
    { name: "competitive-landscape", phase: "idea" },
    { name: "defillama-research", phase: "idea" },
    { name: "scaffold-project", phase: "build" },
    { name: "build-with-claude", phase: "build" },
    { name: "review-and-iterate", phase: "build" },
    { name: "cso", phase: "build" },
    { name: "roast-my-product", phase: "build" },
    { name: "product-review", phase: "build" },
    { name: "frontend-design-guidelines", phase: "build" },
    { name: "create-pitch-deck", phase: "launch" },
    { name: "marketing-video", phase: "launch" },
  ];
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
      <p className="max-w-2xl text-sm text-ink-muted">
        Installed by the CLI into{" "}
        <code className="rounded bg-ink/[0.04] px-1 py-0.5 font-mono text-xs">
          ~/.claude/skills/
        </code>{" "}
        and{" "}
        <code className="rounded bg-ink/[0.04] px-1 py-0.5 font-mono text-xs">
          ~/.codex/skills/
        </code>
        . Base-native skills are highlighted; the rest are chain-agnostic or
        Solana-flavored guides pending Base rewrite.
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s.name}
            className={
              "rounded-full border px-3 py-1 font-mono text-xs " +
              (s.base
                ? "border-base/30 bg-base/5 text-base"
                : "border-ink/10 bg-white text-ink-muted")
            }
          >
            /{s.name}
          </span>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="rounded-2xl border border-ink/5 bg-gradient-to-br from-base/5 to-base/0 p-8 md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight">Start with the light paper</h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        Selectors read this first. 500 words. Specific Why Base. Real numbers.
        Draft it here in your browser, copy out, paste into the application.
      </p>
      <a
        href="/draft"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-ink/90"
      >
        Open the drafter →
      </a>
    </section>
  );
}
