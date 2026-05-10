"use client";

import { useMemo, useState } from "react";
import { QUESTIONS, recommendTrack, TrackResult } from "@/lib/trackFit";

type Answer = number | "DQ" | undefined;
type Answers = Record<string, Answer>;

export default function TrackPage() {
  const [answers, setAnswers] = useState<Answers>({});

  const results = useMemo(() => recommendTrack(answers), [answers]);
  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined).length,
    [answers],
  );
  const showResults = answeredCount >= 4;

  return (
    <main className="space-y-10">
      <header className="space-y-4">
        <p className="label-mono">/track · fit picker</p>
        <h1 className="font-display text-6xl text-white md:text-7xl">
          which track? <span className="text-[#0052FF]">we&apos;ll score it.</span>
        </h1>
        <p className="max-w-2xl text-lg text-ink-muted">
          Answer the questions that apply. Disqualifiers (DQ) override score —
          if any DQ row triggers, that track is out regardless of how well you
          score elsewhere.
        </p>
      </header>

      <div className="rounded-lg border border-amber/30 bg-amber/[0.06] p-4 text-sm text-white/85">
        <strong className="text-white">Heads up:</strong> Base Batches 004
        hasn{`'`}t been announced. Tracks below reflect cohort 003. The next
        cohort{`'`}s structure may shift — verify at{" "}
        <a
          href="https://www.basebatches.xyz/"
          target="_blank"
          rel="noreferrer"
          className="text-amber underline decoration-dotted hover:text-amber/80"
        >
          basebatches.xyz
        </a>
        .
      </div>

      <div className="space-y-5">
        {QUESTIONS.map((q, idx) => (
          <Question
            key={q.id}
            idx={idx + 1}
            question={q.question}
            options={q.options}
            appliesTo={q.appliesTo}
            value={answers[q.id]}
            onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
          />
        ))}
      </div>

      {showResults ? (
        <Results results={results} answered={answeredCount} />
      ) : (
        <div className="card p-4 text-sm text-ink-muted">
          Answer at least 4 questions to see a recommendation.
        </div>
      )}
    </main>
  );
}

function Question({
  idx,
  question,
  options,
  appliesTo,
  value,
  onChange,
}: {
  idx: number;
  question: string;
  options: { value: number | "DQ"; label: string }[];
  appliesTo: "all" | "startup" | "student" | "robotics";
  value: Answer;
  onChange: (v: Answer) => void;
}) {
  const trackTag =
    appliesTo === "all"
      ? null
      : `<${appliesTo[0].toUpperCase() + appliesTo.slice(1)}>`;
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="flex items-baseline gap-3 text-base font-medium tracking-tight text-white">
          <span className="font-mono text-xs text-ink-dim">
            {String(idx).padStart(2, "0")}
          </span>
          {question}
        </h3>
        {trackTag && (
          <span className="rounded-full border border-ink-line bg-ink-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            {trackTag} only
          </span>
        )}
      </div>
      <div className="grid gap-2">
        {options.map((opt, i) => {
          const selected = value === opt.value;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(selected ? undefined : opt.value)}
              className={
                "flex items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition " +
                (selected
                  ? opt.value === "DQ"
                    ? "border-rose/60 bg-rose/[0.08] text-rose"
                    : "border-base/60 bg-base/[0.10] text-white"
                  : "border-ink-line bg-black/30 text-ink-muted hover:border-ink-line/80 hover:bg-ink-card")
              }
            >
              <span>{opt.label}</span>
              <span
                className={
                  "font-mono text-xs " +
                  (selected
                    ? opt.value === "DQ"
                      ? "text-rose"
                      : "text-base-400"
                    : "text-ink-dim")
                }
              >
                {opt.value === "DQ" ? "DQ" : `+${opt.value}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Results({
  results,
  answered,
}: {
  results: TrackResult[];
  answered: number;
}) {
  const top = results[0];
  const eligibleTops = results.filter((r) => !r.dq);
  return (
    <section className="sticky bottom-4 space-y-5 rounded-xl border border-ink-line bg-black/85 p-6 backdrop-blur-md">
      <div className="flex items-baseline justify-between">
        <p className="label-mono">recommendation</p>
        <span className="font-mono text-xs text-ink-dim">
          {answered} answered
        </span>
      </div>
      {eligibleTops.length === 0 ? (
        <p className="text-sm text-rose">
          You triggered a DQ on every track. Re-check your answers, or check
          the Base Batches FAQ — the rules can change between cohorts.
        </p>
      ) : (
        <p className="font-display text-3xl text-white md:text-4xl">
          best fit:{" "}
          <span className="text-[#0052FF]">{eligibleTops[0].label}</span>
          {top.track !== eligibleTops[0].track && (
            <span className="ml-3 align-middle font-mono text-xs text-ink-dim">
              ({top.label} scored higher but DQ&apos;d)
            </span>
          )}
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {results.map((r) => (
          <TrackCard key={r.track} r={r} />
        ))}
      </div>
      <p className="font-mono text-[11px] text-ink-dim">
        Next:{" "}
        <a href="/draft" className="underline decoration-dotted hover:text-white">
          /draft your light paper
        </a>{" "}
        — or install the CLI to run{" "}
        <code className="rounded bg-ink-card px-1 py-0.5 text-[10px] text-white">
          /submit-to-base-batches
        </code>{" "}
        end-to-end.
      </p>
    </section>
  );
}

function TrackCard({ r }: { r: TrackResult }) {
  const pct = r.maxScore ? Math.round((r.score / r.maxScore) * 100) : 0;
  return (
    <div
      className={
        "rounded-lg border p-4 " +
        (r.dq ? "border-rose/30 bg-rose/[0.05]" : "border-ink-line bg-ink-card")
      }
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-medium text-white">{r.label}</h3>
        <span className="font-mono text-xs text-ink-dim">
          {r.score} / {r.maxScore}
        </span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink-subtle">
        <div
          className={"h-full rounded-full " + (r.dq ? "bg-rose" : "bg-base")}
          style={{ width: `${pct}%` }}
        />
      </div>
      {r.dq && (
        <p className="mt-3 text-xs text-rose/90">
          DQ: {r.dqReasons.join("; ")}
        </p>
      )}
    </div>
  );
}
