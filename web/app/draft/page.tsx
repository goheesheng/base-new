"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SECTIONS,
  SectionId,
  TOTAL_CEILING,
  TOTAL_TARGET_LOW,
  whyBaseDiagnostic,
  wordCount,
} from "@/lib/lightPaper";

const STORAGE_KEY = "base-new:draft:v1";

type Draft = Record<SectionId, string>;

const EMPTY: Draft = SECTIONS.reduce(
  (acc, s) => ({ ...acc, [s.id]: "" }),
  {} as Draft,
);

export default function DraftPage() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDraft({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
  }, [draft, hydrated]);

  const sectionCounts = useMemo(
    () =>
      Object.fromEntries(
        SECTIONS.map((s) => [s.id, wordCount(draft[s.id])]),
      ) as Record<SectionId, number>,
    [draft],
  );

  const total = useMemo(
    () => Object.values(sectionCounts).reduce((a, b) => a + b, 0),
    [sectionCounts],
  );

  const overCeiling = total > TOTAL_CEILING;
  const inSweet = total >= TOTAL_TARGET_LOW && total <= TOTAL_CEILING;
  const whyBase = whyBaseDiagnostic(draft.why_base);

  const update = (id: SectionId, value: string) =>
    setDraft((d) => ({ ...d, [id]: value }));

  const reset = () => {
    if (!confirm("Clear the entire draft?")) return;
    setDraft(EMPTY);
  };

  const exportMarkdown = () => {
    const lines: string[] = [];
    if (draft.title.trim()) {
      lines.push(`# ${draft.title.trim()}`, "");
    }
    for (const s of SECTIONS) {
      if (s.id === "title") continue;
      if (!draft[s.id].trim()) continue;
      lines.push(`## ${s.label}`, "", draft[s.id].trim(), "");
    }
    return lines.join("\n");
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="space-y-10">
      <header className="space-y-4">
        <p className="label-mono">/draft · light paper</p>
        <h1 className="font-display text-6xl text-white md:text-7xl">
          500 words. <span className="text-[#0052FF]">no more.</span>
        </h1>
        <p className="max-w-2xl text-lg text-ink-muted">
          Section budgets are guidelines. Total ≤ 500 is what matters.
          Saved automatically to your browser.
        </p>
      </header>

      <div className="rounded-lg border border-amber/30 bg-amber/[0.06] p-4 text-sm text-white/85">
        <strong className="text-white">Heads up:</strong> Base Batches 004
        hasn{`'`}t been announced. Drafting now is good prep — verify current
        dates at{" "}
        <a
          href="https://www.basebatches.xyz/"
          target="_blank"
          rel="noreferrer"
          className="text-amber underline decoration-dotted hover:text-amber/80"
        >
          basebatches.xyz
        </a>{" "}
        before you submit.
      </div>

      <CounterBar
        total={total}
        overCeiling={overCeiling}
        inSweet={inSweet}
        ceiling={TOTAL_CEILING}
      />

      <div className="space-y-3">
        {whyBase.hasGenericPhrase && (
          <Callout tone="warn">
            Your <strong>Why Base</strong> contains a generic phrase
            ({"\""}fast, cheap, growing ecosystem{"\""}-style). Selectors flag
            this as the #1 rejection signal. Name a specific primitive — Smart
            Wallet, MiniKit, OnchainKit, Basenames, Coinbase Verifications,
            x402, AgentKit, CDP.
          </Callout>
        )}
        {!whyBase.hasPrimitive && draft.why_base.trim().length > 50 && (
          <Callout tone="warn">
            <strong>Why Base</strong> doesn{"'"}t name a Base-specific
            primitive. If your product would behave identically on any L2, this
            section will fail. Add: Smart Wallet, MiniKit, OnchainKit,
            Basenames, Coinbase Verifications, x402, AgentKit, or CDP — and
            explain how the product depends on it.
          </Callout>
        )}
        {whyBase.hasPrimitive && !whyBase.hasGenericPhrase && (
          <Callout tone="ok">
            <span className="text-mint">✓</span>{" "}
            <strong>Why Base</strong> names a primitive ({whyBase.primitivesFound.join(", ")}).
          </Callout>
        )}
      </div>

      <div className="space-y-5">
        {SECTIONS.map((s, i) => (
          <SectionEditor
            key={s.id}
            idx={i + 1}
            id={s.id}
            label={s.label}
            hint={s.hint}
            placeholder={s.placeholder}
            value={draft[s.id]}
            onChange={(v) => update(s.id, v)}
            count={sectionCounts[s.id]}
            budget={s.budget}
          />
        ))}
      </div>

      <div className="sticky bottom-4 mt-8 flex flex-col gap-3 rounded-xl border border-ink-line/80 bg-black/80 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-sm">
          <span
            className={
              overCeiling
                ? "text-rose"
                : inSweet
                  ? "text-mint"
                  : "text-ink-muted"
            }
          >
            {total} / {TOTAL_CEILING} words
          </span>
          {overCeiling && (
            <span className="ml-2 text-rose">
              over ceiling — cut {total - TOTAL_CEILING}
            </span>
          )}
          {!overCeiling && total > 0 && total < TOTAL_TARGET_LOW && (
            <span className="ml-2 text-ink-dim">
              room for {TOTAL_TARGET_LOW - total} more
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="pill border-rose/30 hover:border-rose/60 hover:text-rose"
          >
            reset
          </button>
          <button
            type="button"
            onClick={onCopy}
            disabled={total === 0}
            className="pill border-white/30 bg-white text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "copied" : "copy as markdown"}
          </button>
        </div>
      </div>
    </main>
  );
}

function SectionEditor({
  idx,
  id,
  label,
  hint,
  placeholder,
  value,
  onChange,
  count,
  budget,
}: {
  idx: number;
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  count: number;
  budget: [number, number];
}) {
  const [low, high] = budget;
  const inBudget = count >= low && count <= high;
  const overBudget = count > high;

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <label
          htmlFor={`field-${id}`}
          className="flex items-baseline gap-3 text-base font-medium tracking-tight text-white"
        >
          <span className="font-mono text-xs text-ink-dim">
            {String(idx).padStart(2, "0")}
          </span>
          {label}
        </label>
        <span
          className={
            "font-mono text-xs " +
            (inBudget
              ? "text-mint"
              : overBudget
                ? "text-amber"
                : "text-ink-dim")
          }
        >
          {count} · {low}–{high}
        </span>
      </div>
      <p className="mb-3 text-sm text-ink-muted">{hint}</p>
      <textarea
        id={`field-${id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={Math.max(3, Math.min(8, Math.floor(value.length / 80) + 3))}
        className="block w-full resize-y rounded-md border border-ink-line bg-black/60 p-3 font-mono text-sm leading-relaxed text-white placeholder:text-ink-dim focus:border-base/60 focus:outline-none focus:ring-2 focus:ring-base/25"
      />
    </div>
  );
}

function CounterBar({
  total,
  overCeiling,
  inSweet,
  ceiling,
}: {
  total: number;
  overCeiling: boolean;
  inSweet: boolean;
  ceiling: number;
}) {
  const pct = Math.min(100, Math.round((total / ceiling) * 100));
  return (
    <div className="card p-4">
      <div className="mb-2 flex items-baseline justify-between font-mono text-xs">
        <span className="label-mono">total · ≤ {ceiling}</span>
        <span
          className={
            overCeiling
              ? "text-rose"
              : inSweet
                ? "text-mint"
                : "text-white"
          }
        >
          {total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-ink-subtle">
        <div
          className={
            "h-full rounded-full transition-all " +
            (overCeiling ? "bg-rose" : inSweet ? "bg-mint" : "bg-base")
          }
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Callout({
  tone,
  children,
}: {
  tone: "warn" | "ok";
  children: React.ReactNode;
}) {
  const cls =
    tone === "warn"
      ? "border-amber/40 bg-amber/[0.06] text-amber"
      : "border-mint/30 bg-mint/[0.05] text-mint";
  return (
    <div className={"rounded-lg border p-4 text-sm " + cls}>{children}</div>
  );
}
