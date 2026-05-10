"use client";

import { useMemo, useState } from "react";
import {
  QUESTIONS,
  recommendTrack,
  TrackResult,
} from "@/lib/trackFit";

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
    <main className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-light">
          /track
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Track-fit picker
        </h1>
        <p className="max-w-2xl text-ink-muted">
          Answer the questions that apply. Disqualifiers (DQ) override score —
          if any DQ row triggers a track, that track is out regardless of how
          well you score elsewhere.
        </p>
      </header>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <Question
            key={q.id}
            idx={idx + 1}
            question={q.question}
            options={q.options}
            appliesTo={q.appliesTo}
            value={answers[q.id]}
            onChange={(v) =>
              setAnswers((prev) => ({ ...prev, [q.id]: v }))
            }
          />
        ))}
      </div>

      {showResults && (
        <Results results={results} answered={answeredCount} />
      )}

      {!showResults && (
        <div className="rounded-lg border border-ink/5 bg-ink/[0.02] p-4 text-sm text-ink-muted">
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
      : appliesTo[0].toUpperCase() + appliesTo.slice(1);
  return (
    <div className="rounded-lg border border-ink/5 bg-white p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">
          <span className="mr-2 font-mono text-xs text-ink-light">
            {String(idx).padStart(2, "0")}
          </span>
          {question}
        </h3>
        {trackTag && (
          <span className="rounded-full bg-ink/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
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
                    ? "border-red-400 bg-red-50 text-red-900"
                    : "border-base bg-base/5 text-base"
                  : "border-ink/10 bg-white hover:bg-ink/[0.02]")
              }
            >
              <span>{opt.label}</span>
              <span
                className={
                  "font-mono text-xs " +
                  (selected
                    ? opt.value === "DQ"
                      ? "text-red-600"
                      : "text-base"
                    : "text-ink-light")
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
    <section className="sticky bottom-4 space-y-4 rounded-xl border border-ink/10 bg-white/95 p-6 shadow-lg backdrop-blur">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recommendation</h2>
        <span className="font-mono text-xs text-ink-light">
          {answered} answered
        </span>
      </div>
      {eligibleTops.length === 0 ? (
        <p className="text-sm text-red-700">
          You triggered a DQ on every track. Re-check your answers, or check the
          Base Batches FAQ to confirm — the rules can change between cohorts.
        </p>
      ) : (
        <p className="text-sm">
          Best fit:{" "}
          <strong className="text-base">{eligibleTops[0].label}</strong>
          {top.track !== eligibleTops[0].track && (
            <span className="ml-2 text-ink-muted">
              (top scorer was {top.label} but is DQ&apos;d)
            </span>
          )}
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {results.map((r) => (
          <TrackCard key={r.track} r={r} />
        ))}
      </div>
      <p className="font-mono text-xs text-ink-light">
        Next:{" "}
        <a href="/draft" className="underline decoration-dotted hover:text-ink">
          /draft your light paper
        </a>{" "}
        — or install the CLI to run{" "}
        <code className="rounded bg-ink/[0.04] px-1 py-0.5 text-[10px]">
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
        (r.dq
          ? "border-red-300/40 bg-red-50/40"
          : "border-ink/5 bg-white shadow-sm")
      }
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">{r.label}</h3>
        <span className="font-mono text-xs text-ink-light">
          {r.score} / {r.maxScore}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
        <div
          className={
            "h-full rounded-full " + (r.dq ? "bg-red-400" : "bg-base")
          }
          style={{ width: `${pct}%` }}
        />
      </div>
      {r.dq && (
        <p className="mt-3 text-xs text-red-700">
          DQ: {r.dqReasons.join("; ")}
        </p>
      )}
    </div>
  );
}
