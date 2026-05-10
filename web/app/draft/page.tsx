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
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore
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
      // ignore
    }
  };

  return (
    <main className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-light">
          /draft
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Light paper drafter
        </h1>
        <p className="max-w-2xl text-ink-muted">
          500-word ceiling. Section budgets are guidelines — total ≤ 500 is what
          matters. Saved automatically to your browser.
        </p>
      </header>

      <CounterBar
        total={total}
        overCeiling={overCeiling}
        inSweet={inSweet}
        ceiling={TOTAL_CEILING}
      />

      {whyBase.hasGenericPhrase && (
        <Callout tone="warn">
          Your <strong>Why Base</strong> contains a generic phrase ({"\""}fast,
          cheap, growing ecosystem{"\""}-style). Selectors flag this as the #1
          rejection signal. Name a specific primitive — Smart Wallet, MiniKit,
          OnchainKit, Basenames, Coinbase Verifications, x402, AgentKit, CDP.
        </Callout>
      )}
      {!whyBase.hasPrimitive && draft.why_base.trim().length > 50 && (
        <Callout tone="warn">
          <strong>Why Base</strong> doesn{"'"}t name a Base-specific primitive.
          If your product would behave identically on any L2, this section will
          fail. Add: Smart Wallet, MiniKit, OnchainKit, Basenames, Coinbase
          Verifications, x402, AgentKit, or CDP — and explain how the product
          depends on it.
        </Callout>
      )}
      {whyBase.hasPrimitive && !whyBase.hasGenericPhrase && (
        <Callout tone="ok">
          ✓ Why Base names a primitive ({whyBase.primitivesFound.join(", ")}).
        </Callout>
      )}

      <div className="space-y-6">
        {SECTIONS.map((s) => (
          <SectionEditor
            key={s.id}
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

      <div className="sticky bottom-4 mt-8 flex flex-col gap-3 rounded-xl border border-ink/10 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-sm">
          <span
            className={
              overCeiling
                ? "text-red-600"
                : inSweet
                  ? "text-emerald-600"
                  : "text-ink-muted"
            }
          >
            {total} / {TOTAL_CEILING} words
          </span>
          {overCeiling && (
            <span className="ml-2 text-red-600">
              over ceiling — cut {total - TOTAL_CEILING}
            </span>
          )}
          {!overCeiling && total > 0 && total < TOTAL_TARGET_LOW && (
            <span className="ml-2 text-ink-light">
              room for {TOTAL_TARGET_LOW - total} more
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm hover:bg-ink/[0.02]"
          >
            reset
          </button>
          <button
            type="button"
            onClick={onCopy}
            disabled={total === 0}
            className="rounded-md bg-base px-3 py-2 text-sm font-medium text-white hover:bg-base-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? "copied" : "copy as markdown"}
          </button>
        </div>
      </div>
    </main>
  );
}

function SectionEditor({
  id,
  label,
  hint,
  placeholder,
  value,
  onChange,
  count,
  budget,
}: {
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
    <div className="rounded-lg border border-ink/5 bg-white p-5">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label
          htmlFor={`field-${id}`}
          className="text-base font-semibold tracking-tight"
        >
          {label}
        </label>
        <span
          className={
            "font-mono text-xs " +
            (inBudget
              ? "text-emerald-600"
              : overBudget
                ? "text-amber-600"
                : "text-ink-light")
          }
        >
          {count} words · target {low}–{high}
        </span>
      </div>
      <p className="mb-3 text-sm text-ink-muted">{hint}</p>
      <textarea
        id={`field-${id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={Math.max(3, Math.min(8, Math.floor(value.length / 80) + 3))}
        className="block w-full resize-y rounded-md border border-ink/10 bg-white p-3 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-light/70 focus:border-base/40 focus:outline-none focus:ring-2 focus:ring-base/15"
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
    <div className="rounded-lg border border-ink/5 bg-ink/[0.02] p-4">
      <div className="mb-2 flex items-baseline justify-between font-mono text-xs">
        <span className="text-ink-muted">total · ≤ {ceiling}</span>
        <span
          className={
            overCeiling
              ? "text-red-600"
              : inSweet
                ? "text-emerald-600"
                : "text-ink"
          }
        >
          {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink/[0.06]">
        <div
          className={
            "h-full rounded-full transition-all " +
            (overCeiling
              ? "bg-red-500"
              : inSweet
                ? "bg-emerald-500"
                : "bg-base")
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
      ? "border-amber-300/40 bg-amber-50 text-amber-900"
      : "border-emerald-300/40 bg-emerald-50 text-emerald-900";
  return (
    <div className={"rounded-lg border p-4 text-sm " + cls}>{children}</div>
  );
}
