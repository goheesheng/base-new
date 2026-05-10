"use client";

import { useEffect, useRef, useState } from "react";
import { TypingTerminal, TermLine } from "./TypingTerminal";

type Agent = "claude" | "codex";

const ASCII_BANNER = [
  " ___   _   ___ ___ ___ _____ _   ___ _  __",
  "| _ ) /_\\ / __| __/ __|_   _/_\\ / __| |/ /",
  "| _ \\/ _ \\\\__ \\ _|\\__ \\ | |/ _ \\ (__| ' < ",
  "|___/_/ \\_\\___/___|___/ |_/_/ \\_\\___|_|\\_\\",
].join("\n");

function buildLines(agent: Agent): TermLine[] {
  const greeting =
    agent === "claude"
      ? "i'm your Base buddy by basestack."
      : "ready to ship your Base Batches submission.";
  return [
    { kind: "ascii", text: ASCII_BANNER },
    { kind: "header", text: "Ship on Base — Idea to Base Batches." },
    { kind: "assistant", text: greeting, pauseAfter: 700 },
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
}

interface AgentMeta {
  label: string;
  sub: string;
  badgeBg: string;
  outerHalo: string; // gradient painted as a blurred halo behind the whole frame
  logoSrc: string;
}

const AGENT_META: Record<Agent, AgentMeta> = {
  claude: {
    label: "Claude Code",
    sub: "Opus 4.7",
    badgeBg: "#cf5028",
    outerHalo:
      "radial-gradient(60% 60% at 50% 100%, rgba(207,80,40,0.40) 0%, rgba(207,80,40,0) 70%), radial-gradient(40% 60% at 100% 80%, rgba(255,158,107,0.32) 0%, rgba(255,158,107,0) 70%), radial-gradient(40% 60% at 0% 80%, rgba(255,221,178,0.22) 0%, rgba(255,221,178,0) 70%)",
    logoSrc: "/assets/ai/claude.png",
  },
  codex: {
    label: "OpenAI Codex",
    sub: "gpt 5.4",
    badgeBg: "#5E6DFF",
    outerHalo:
      "radial-gradient(60% 60% at 50% 100%, rgba(94,109,255,0.45) 0%, rgba(94,109,255,0) 70%), radial-gradient(40% 60% at 100% 80%, rgba(0,0,255,0.30) 0%, rgba(0,0,255,0) 70%), radial-gradient(40% 60% at 0% 80%, rgba(140,158,255,0.22) 0%, rgba(140,158,255,0) 70%)",
    logoSrc: "/assets/ai/codex.svg",
  },
};

export function SideTerminal() {
  const [agent, setAgent] = useState<Agent>("claude");
  const [runId, setRunId] = useState(0);
  const shimmerRef = useRef<HTMLDivElement | null>(null);

  // Re-fire the conic border sweep on every tab switch
  useEffect(() => {
    const el = shimmerRef.current;
    if (!el) return;
    el.classList.remove("is-animating");
    void el.offsetWidth;
    el.classList.add("is-animating");
  }, [agent]);

  const lines = buildLines(agent);
  const meta = AGENT_META[agent];

  return (
    <div className="relative">
      {/* Outer halo — blurred, swaps palette on tab switch with a 700ms transition */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[32px] blur-3xl transition-all duration-700"
        style={{ background: meta.outerHalo }}
      />

      {/* Border-shimmer wrapper — 1px conic stroke that sweeps once per click */}
      <div
        ref={shimmerRef}
        className="terminal-border-shimmer relative rounded-2xl p-px"
      >
        {/* Terminal body — DARK, like solana.new's */}
        <div className="relative overflow-hidden rounded-[15px] bg-[#0a0a0a]">
          {/* Title bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </span>
            <div className="flex items-center gap-1">
              <TabButton
                active={agent === "claude"}
                onClick={() => {
                  setAgent("claude");
                  setRunId((n) => n + 1);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/ai/claude.png"
                  alt="Claude"
                  width={16}
                  height={16}
                  className={
                    "h-4 w-4 rounded-full " +
                    (agent === "claude" ? "opacity-100" : "opacity-40")
                  }
                />
                <span>Claude</span>
              </TabButton>
              <TabButton
                active={agent === "codex"}
                onClick={() => {
                  setAgent("codex");
                  setRunId((n) => n + 1);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/ai/codex.svg"
                  alt="Codex"
                  width={16}
                  height={16}
                  className={
                    "h-4 w-4 rounded-full " +
                    (agent === "codex" ? "opacity-100" : "opacity-40")
                  }
                />
                <span>Codex</span>
              </TabButton>
            </div>
            <span className="mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              {meta.sub.toLowerCase()}
            </span>
          </div>

          {/* Body — fixed-height frame so the typewriter never resizes the terminal */}
          <div className="relative z-10 flex h-[440px] flex-col px-5 pb-8 pt-5">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="grid h-9 w-9 place-items-center rounded-md transition-colors duration-300"
                style={{ backgroundColor: meta.badgeBg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.logoSrc}
                  alt={meta.label}
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-sm"
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-[13px] font-semibold tracking-tightish text-white">
                  {meta.label}
                </p>
                <p className="mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  {meta.sub}
                </p>
              </div>
            </div>
            {/* Scrolling content area — fixed height, hidden overflow so the
                outer terminal frame never grows as text types. */}
            <div className="flex-1 overflow-hidden text-white">
              <TypingTerminal key={runId} lines={lines} charsPerSecond={70} loop />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 mono text-center text-[10px] uppercase tracking-[0.16em] text-ink-40">
        click <span className="text-ink">Claude</span> or{" "}
        <span className="text-ink">Codex</span> to switch — install the cli to
        run <span className="crit">/submit-to-base-batches</span>
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1 text-[12px] transition-colors " +
        (active
          ? "bg-[#1a1a1a] text-white"
          : "text-white/40 hover:text-white/70")
      }
    >
      {children}
    </button>
  );
}
