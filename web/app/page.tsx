import { InstallTerminal } from "@/components/CopyableCommand";
import { TypingTerminal, TermLine } from "@/components/TypingTerminal";

export default function Home() {
  return (
    <main className="space-y-32">
      <Hero />
      <CohortStatusBanner />
      <FounderMode />
      <Skills />
      <CTA />
    </main>
  );
}

function CohortStatusBanner() {
  return (
    <section className="-my-16">
      <div className="mx-auto max-w-3xl rounded-xl border border-amber/30 bg-amber/[0.06] p-5 md:p-6">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber/40 bg-amber/10 font-mono text-amber"
          >
            !
          </span>
          <div className="space-y-2">
            <p className="label-mono text-amber/80">cohort status</p>
            <p className="text-sm leading-relaxed text-white/85 md:text-[15px]">
              <strong className="text-white">Base Batches 004 has not been announced yet.</strong>{" "}
              The dates, tracks, and prize structure shown across the site are
              from cohort 003 (now closed). Run{" "}
              <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-xs text-white">
                /submit-to-base-batches
              </code>{" "}
              in Claude Code to prep your light paper now — when 004 opens,
              you{`'`}ll be ready. Verify current dates at{" "}
              <a
                href="https://www.basebatches.xyz/"
                target="_blank"
                rel="noreferrer"
                className="text-amber underline decoration-dotted underline-offset-2 hover:text-amber/80"
              >
                basebatches.xyz
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center text-center">
      {/* Co-brand chip — solana.new shows "SendAI · Superteam"; we show the agents the install supports */}
      <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
        <AgentBadges />
      </div>

      <h1 className="font-display text-7xl text-white sm:text-8xl md:text-[8.5rem]">
        idea. build. submit.
      </h1>
      <p className="mt-4 max-w-xl text-xl leading-snug text-white/60 md:text-2xl">
        a Base Batches submission you{`'`}re actually proud of — using ai in a few hours.
      </p>

      {/* solana.new-style install bar */}
      <div className="mt-12 flex w-full flex-col items-center">
        <p className="label-mono mb-2">install command</p>
        <InstallTerminal />
        <p className="mt-3 text-[11px] text-white/40 sm:text-xs">
          using in-built skills, MCPs, and CLIs · works with{" "}
          <span className="text-white/70">Claude Code</span>,{" "}
          <span className="text-white/70">Codex</span>, and{" "}
          <span className="text-white/70">Agents</span>
        </p>
      </div>

      {/* In-browser shortcut row */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
        <span>or skip the install:</span>
        <a href="/track" className="pill">
          pick the right track →
        </a>
      </div>
    </section>
  );
}

function AgentBadges() {
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-white/70 sm:text-xs">
      <AnthropicGlyph />
      <span className="text-white">Claude Code</span>
      <span className="text-white/30">·</span>
      <OpenAIGlyph />
      <span className="text-white">Codex</span>
      <span className="text-white/30">·</span>
      <span className="text-white">Agents</span>
    </span>
  );
}

function AnthropicGlyph() {
  // Approximation of Anthropic's mark
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 4l5 16h-3.5l-1-3.5h-4l-1 3.5H1L6 4h3zm-1.5 9.5l-1-3.5-1 3.5h2zM18 20V4h3v16h-3z" />
    </svg>
  );
}

function OpenAIGlyph() {
  // Simple OpenAI-style hex outline
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5l8.66 5v9l-8.66 5-8.66-5v-9L12 2.5z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function FounderMode() {
  const tracks = [
    {
      tag: "<Track>",
      title: "find your fit",
      blurb:
        "Startup, Student, or Robotics? Our rubric scores your team against each, surfaces DQs.",
      href: "/track",
    },
    {
      tag: "<Draft>",
      title: "the 500-word paper",
      blurb:
        "Selectors read this first. Section budgets, hard ceiling, Why Base specificity check — enforced by the CLI skill.",
      href: "https://github.com/goheesheng/base-new/tree/master/skills/launch/submit-to-base-batches",
    },
    {
      tag: "<Build>",
      title: "ship the demo",
      blurb:
        "Smart Wallet, OnchainKit, Mini Apps via MiniKit, Basenames, x402 — primitives that win.",
      href: "https://github.com/goheesheng/base-new#install",
    },
    {
      tag: "<Submit>",
      title: "interview prep",
      blurb:
        "Standard founder + SME technical interview banks with sample answers from your build.",
      href: "https://github.com/goheesheng/base-new/tree/master/skills/launch/submit-to-base-batches/references",
    },
  ];
  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-3">
        <p className="label-mono">[01] · for founders</p>
        <h2 className="font-display text-6xl text-white md:text-7xl">
          <span>founder mode </span>
          <span className="whitespace-nowrap">
            <span className="text-white/25 line-through decoration-2">OFF.</span>{" "}
            <span className="text-[#0052FF]">ON.</span>
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tracks.map((t) => (
          <a
            key={t.tag}
            href={t.href}
            className="card group flex flex-col gap-3 p-5 transition"
          >
            <p className="font-mono text-xs text-white/50">{t.tag}</p>
            <h3 className="text-lg font-medium tracking-tight text-white">
              {t.title}
            </h3>
            <p className="text-sm leading-snug text-white/60">{t.blurb}</p>
            <span className="mt-auto pt-2 font-mono text-xs text-white/40 group-hover:text-white">
              open →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const items = [
    {
      glyph: "┌─┐\n│█│\n└─┘",
      color: "text-base-400",
      name: "submit-to-base-batches",
      desc: "the wedge — light paper, interviews, demo script, pre-submit checklist, single HTML output",
      base: true,
    },
    {
      glyph: "╔═╗\n║░║\n╚═╝",
      color: "text-mint",
      name: "base-batches-copilot",
      desc: "track-fit rubric (Startup / Student / Robotics) + cohort research",
      base: true,
    },
    {
      glyph: "◇◆◇\n◆◇◆\n◇◆◇",
      color: "text-violet",
      name: "find-next-crypto-idea",
      desc: "interview-driven idea discovery and ranking — no idea? start here",
    },
    {
      glyph: "▓░▓\n░▓░\n▓░▓",
      color: "text-peach",
      name: "validate-idea",
      desc: "structured validation sprint — stress-test your idea before committing",
    },
    {
      glyph: "┌┬┐\n├┼┤\n└┴┘",
      color: "text-amber",
      name: "scaffold-project",
      desc: "Foundry + OnchainKit + Smart Wallet workspace setup",
    },
    {
      glyph: "○─○\n│ │\n○─○",
      color: "text-teal",
      name: "review-and-iterate",
      desc: "code review for quality, security, production readiness",
    },
    {
      glyph: "▞▚▞\n▚▞▚\n▞▚▞",
      color: "text-rose",
      name: "cso",
      desc: "infra-first security audit — secrets, deps, CI/CD, OWASP",
    },
    {
      glyph: "█▒█\n▒█▒\n█▒█",
      color: "text-violet",
      name: "roast-my-product",
      desc: "harsh product critique — find every weakness before judges do",
    },
    {
      glyph: "├─┤\n│×│\n└─┘",
      color: "text-mint",
      name: "create-pitch-deck",
      desc: "Demo Day deck — 3-minute structure, investor-ready",
    },
    {
      glyph: "▤▥▤\n▥▤▥\n▤▥▤",
      color: "text-base-400",
      name: "marketing-video",
      desc: "Remotion + AI video pipelines",
    },
  ];
  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,440px)]">
      <div className="space-y-8">
        <div>
          <p className="label-mono">[02] · skills</p>
          <h2 className="mt-2 font-display text-6xl text-white md:text-7xl">
            build useful & tasteful
            <br />
            <span className="text-[#0052FF]">Base apps.</span>
          </h2>
        </div>
        <ul className="divide-y divide-white/[0.06]">
          {items.map((it) => (
            <li
              key={it.name}
              className="flex items-start gap-5 py-5 transition hover:bg-white/[0.02]"
            >
              <pre
                className={
                  "shrink-0 select-none whitespace-pre font-mono text-xs leading-[1.05] sm:text-sm " +
                  it.color
                }
              >
                {it.glyph}
              </pre>
              <div className="flex-1 space-y-1">
                <p className="flex items-baseline gap-2 font-mono text-sm text-white">
                  /{it.name}
                  {it.base && (
                    <span className="rounded-full border border-base/40 bg-base/10 px-1.5 py-px text-[10px] uppercase tracking-wider text-base-400">
                      base
                    </span>
                  )}
                </p>
                <p className="text-sm leading-snug text-white/60">
                  {it.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SideTerminal />
    </section>
  );
}

function SideTerminal() {
  const ascii = [
    " ___   _   ___ ___ ___ _____ _   ___ _  __",
    "| _ ) /_\\ / __| __/ __|_   _/_\\ / __| |/ /",
    "| _ \\/ _ \\\\__ \\ _|\\__ \\ | |/ _ \\ (__| ' < ",
    "|___/_/ \\_\\___/___|___/ |_/_/ \\_\\___|_|\\_\\",
  ].join("\n");

  const lines: TermLine[] = [
    { kind: "ascii", text: ascii },
    { kind: "header", text: "Ship on Base — Idea to Base Batches." },
    {
      kind: "assistant",
      text: "i'm your Base buddy — built to win Base Batches.",
      pauseAfter: 700,
    },
    {
      kind: "user",
      text: "Help me prep my Base Batches submission. We built a Mini App using Smart Wallet for passkey auth — invoicing for gig workers in Farcaster.",
      pauseAfter: 600,
    },
    { kind: "tool", text: "✓ reading .basestack/build-context.md", pauseAfter: 350 },
    { kind: "tool", text: "✓ track fit: Startup (10/12)", pauseAfter: 350 },
    { kind: "tool", text: "✓ drafting light paper · 487 / 500 words", pauseAfter: 350 },
    { kind: "tool", text: "✓ generating SME interview brief", pauseAfter: 350 },
    { kind: "tool", text: "→ writing ./base-batches-submission.html", pauseAfter: 1800 },
  ];

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="terminal">
        <div className="terminal-bar">
          <span className="terminal-dots">
            <span />
          </span>
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-wider text-white/70">
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-white">
              Claude
            </span>
            <span className="text-white/40">Codex</span>
          </div>
          <span className="font-mono text-[11px] text-white/40">opus 4.7</span>
        </div>
        <div className="terminal-body">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-base/15 text-base-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 4l5 16h-3.5l-1-3.5h-4l-1 3.5H1L6 4h3zm-1.5 9.5l-1-3.5-1 3.5h2z" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-white">Claude Code</p>
              <p className="font-mono text-[11px] text-white/40">Opus 4.7</p>
            </div>
          </div>
          <TypingTerminal lines={lines} charsPerSecond={70} loop />
        </div>
      </div>
      <p className="mt-3 px-1 text-center font-mono text-[11px] text-white/40">
        install the CLI to run{" "}
        <span className="text-white">/submit-to-base-batches</span> end-to-end.
      </p>
    </aside>
  );
}

function CTA() {
  return (
    <section className="card flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
      <div className="space-y-2">
        <p className="label-mono">your turn</p>
        <h2 className="font-display text-5xl text-white md:text-6xl">
          your agents are ready.
          <br />
          <span className="text-[#0052FF]">are you?</span>
        </h2>
        <p className="max-w-md text-white/60">
          500 words. Specific Why Base. Real numbers. The light paper is what
          selectors read first.
        </p>
      </div>
      <div className="flex gap-3">
        <a
          href="/track"
          className="pill border-white bg-white px-4 py-2 text-black hover:border-white hover:bg-white/90"
        >
          /track →
        </a>
        <a
          href="https://github.com/goheesheng/base-new#install"
          className="pill"
        >
          install the CLI
        </a>
      </div>
    </section>
  );
}
