import { InstallTerminal } from "@/components/CopyableCommand";
import { TypingTerminal, TermLine } from "@/components/TypingTerminal";

export default function Home() {
  return (
    <main className="space-y-28 md:space-y-40">
      <Hero />
      <Body />
      <Closing />
    </main>
  );
}

/* ─────────────────── HERO ─────────────────── */

function Hero() {
  return (
    <section className="relative">
      {/* Top meta row — basebatches-style time/city marker */}
      <div className="mb-8 flex items-center justify-between text-[11px] tracking-[0.16em] text-ink-60 md:mb-14">
        <span className="mono uppercase">2026·05·10 · base mainnet</span>
        <span className="mono uppercase">vol I · for builders</span>
      </div>

      {/* Pixel-block headline — mirrors basebatches.xyz "batches" treatment */}
      <h1 className="block-display select-none text-[26vw] leading-[0.85] sm:text-[22vw] md:text-[18vw]">
        base<span className="crit">.</span>new
      </h1>

      <div className="mt-10 grid grid-cols-12 gap-x-6 md:mt-14">
        <div className="col-span-12 md:col-span-7">
          <h2 className="text-[28px] font-semibold leading-[34px] tracking-tightish md:text-[40px] md:leading-[46px]">
            A Claude Code skill pack designed to help builders ship a{" "}
            <span className="crit">Base&nbsp;Batches</span> submission.
          </h2>
        </div>
        <div className="col-span-12 mt-6 md:col-span-5 md:mt-0">
          <p className="text-[15px] leading-[24px] text-ink-60">
            Drafts the 500-word light paper, picks your track, preps both
            interviews, runs the pre-submit checklist. Works with{" "}
            <span className="text-ink">Claude&nbsp;Code</span>,{" "}
            <span className="text-ink">Codex</span>, and Agents.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── BODY ─────────────────── */
/* One section: cohort note + install + skills index. Ends with track CTA. */

function Body() {
  return (
    <section className="space-y-16 md:space-y-20">
      {/* Cohort note + install row */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-4">
          <p className="label-mono">¶ status</p>
          <p className="mt-3 text-[18px] leading-[26px]">
            <span className="crit">Base&nbsp;Batches&nbsp;004</span> has not
            been announced yet.
          </p>
          <p className="mt-3 text-[14px] leading-[22px] text-ink-60">
            Tracks below reflect cohort 003. Use the skills now as
            preparation; verify dates at{" "}
            <a
              href="https://www.basebatches.xyz/"
              target="_blank"
              rel="noreferrer"
              className="pen"
            >
              basebatches.xyz
            </a>
            .
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <p className="label-mono">install</p>
          <div className="mt-3">
            <InstallTerminal />
          </div>
          <p className="mt-3 mono text-[11px] uppercase tracking-[0.16em] text-ink-40">
            installs to ~/.claude/skills · ~/.codex/skills · ~/.agents/skills
          </p>
        </div>
      </div>

      {/* Skills index + live side terminal */}
      <div className="grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 md:col-span-7">
          <p className="label-mono">skills</p>
          <ul className="mt-3 divide-y divide-ink-10 border-y border-ink-10">
            {SKILLS.map((s) => (
              <li
                key={s.name}
                className="grid grid-cols-12 items-baseline gap-x-4 py-4"
              >
                <p className="col-span-12 mono text-[13px] text-ink md:col-span-6">
                  /{s.name}
                  {s.crit && (
                    <span className="ml-2 align-baseline mono text-[10px] uppercase tracking-[0.16em] crit">
                      ◆ wedge
                    </span>
                  )}
                </p>
                <p className="col-span-12 text-[13px] leading-[20px] text-ink-60 md:col-span-6">
                  {s.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <aside className="col-span-12 md:col-span-5 md:sticky md:top-6 md:self-start">
          <SideTerminal />
        </aside>
      </div>
    </section>
  );
}

/* ─────────────── Live side terminal (typewriter) ─────────────── */

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
      text: "Build a Wise-style remittance Mini App on Base where users send USDC across borders with Smart Wallet passkey auth and on/off-ramps via Coinbase, distributed as a Farcaster Mini App.",
      pauseAfter: 600,
    },
    { kind: "tool", text: "✓ reading .basestack/build-context.md", pauseAfter: 350 },
    { kind: "tool", text: "✓ track fit: Startup (10/12)", pauseAfter: 350 },
    { kind: "tool", text: "✓ drafting light paper · 487 / 500 words", pauseAfter: 350 },
    { kind: "tool", text: "✓ generating SME interview brief", pauseAfter: 350 },
    { kind: "tool", text: "→ writing ./base-batches-submission.html", pauseAfter: 1800 },
  ];

  return (
    <div>
      <div className="border border-ink bg-white">
        {/* Title bar — Claude/Codex tabs + Opus chip */}
        <div className="flex items-center justify-between border-b border-ink-10 px-4 py-2.5">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-20" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-20" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-20" />
          </span>
          <span className="flex items-center gap-3 mono text-[10px] uppercase tracking-[0.16em]">
            <span className="rounded-sm bg-marker px-1.5 py-0.5 text-white">
              Claude
            </span>
            <span className="text-ink-40">Codex</span>
          </span>
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-ink-40">
            opus 4.7
          </span>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-marker text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 4l5 16h-3.5l-1-3.5h-4l-1 3.5H1L6 4h3zm-1.5 9.5l-1-3.5-1 3.5h2z" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <p className="text-[13px] font-semibold tracking-tightish text-ink">
                Claude Code
              </p>
              <p className="mono text-[10px] uppercase tracking-[0.16em] text-ink-40">
                Opus 4.7
              </p>
            </div>
          </div>
          <TypingTerminal lines={lines} charsPerSecond={70} loop />
        </div>
      </div>
      <p className="mt-3 mono text-center text-[10px] uppercase tracking-[0.16em] text-ink-40">
        live demo · install the cli to run{" "}
        <span className="crit">/submit-to-base-batches</span>
      </p>
    </div>
  );
}

const SKILLS: { name: string; desc: string; crit?: boolean }[] = [
  {
    name: "submit-to-base-batches",
    desc: "Reads your contexts, drafts the 500-word paper, pre-fills the application form, preps founder + SME interviews, writes a Demo-Day script, runs the pre-submit checklist, emits one self-contained HTML.",
    crit: true,
  },
  {
    name: "base-batches-copilot",
    desc: "Track-fit rubric (Startup / Student / Robotics) + cohort research + gap analysis.",
    crit: true,
  },
  {
    name: "find-next-crypto-idea",
    desc: "Six forcing questions about demand, status quo, narrowest wedge. Returns ranked ideas.",
  },
  {
    name: "validate-idea",
    desc: "Structured validation sprint — designed to either harden conviction or kill the idea cheap.",
  },
  {
    name: "scaffold-project",
    desc: "Workspace setup. Currently Solana-flavored — Base rewrite on the roadmap.",
  },
  {
    name: "review-and-iterate",
    desc: "Code review for quality, security, production readiness.",
  },
  {
    name: "cso",
    desc: "Infrastructure-first audit: secrets, dependencies, CI/CD, OWASP.",
  },
  {
    name: "create-pitch-deck",
    desc: "Pitch deck for Demo Day, VCs, or grants.",
  },
];

/* ─────────────────── CLOSING ─────────────────── */

function Closing() {
  return (
    <section className="border-t border-ink pt-10 md:pt-14">
      <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-6">
        <div className="col-span-12 md:col-span-8">
          <p className="label-mono">next</p>
          <h3 className="mt-3 text-[40px] font-semibold leading-[44px] tracking-tightish md:text-[64px] md:leading-[64px]">
            Score your team{" "}
            <span className="crit">honestly.</span>
          </h3>
          <p className="mt-4 max-w-[55ch] text-[15px] leading-[24px] text-ink-60">
            Twelve questions, three tracks, one DQ check. Skip the
            install — the rubric runs in the browser.
          </p>
        </div>
        <div className="col-span-12 flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <a className="pill-apply-blue" href="/track">
            Run /track ↗
          </a>
          <a
            className="pill-apply"
            href="https://github.com/goheesheng/base-new#install"
          >
            Install CLI ↗
          </a>
        </div>
      </div>
    </section>
  );
}
