"use client";

import { useMemo, useState } from "react";
import { QUESTIONS, recommendTrack, TrackResult } from "@/lib/trackFit";

type Answer = number | "DQ" | undefined;
type Answers = Record<string, Answer>;

export default function TrackPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const results = useMemo(() => recommendTrack(answers), [answers]);
  const answered = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined).length,
    [answers],
  );
  const showResults = answered >= 4;

  return (
    <main className="space-y-16">
      <header>
        <p className="label-mono">№ 002 — track-fit rubric</p>
        <h1 className="mt-3 text-[44px] font-semibold leading-[48px] tracking-tightish md:text-[72px] md:leading-[72px]">
          Which track,{" "}
          <span className="crit">honestly?</span>
        </h1>
        <p className="mt-5 max-w-[60ch] text-[16px] leading-[26px] text-ink-60">
          Disqualifiers (DQ) override score — if any DQ row triggers, that
          track is out. Cohort 003 below;{" "}
          <span className="crit">Base&nbsp;Batches&nbsp;004</span> not
          announced — verify at{" "}
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
        <p className="mono mt-4 text-[11px] uppercase tracking-[0.16em] text-ink-40">
          {answered} / {QUESTIONS.length} answered
        </p>
      </header>

      <ol className="border-t border-ink-10">
        {QUESTIONS.map((q, idx) => (
          <Question
            key={q.id}
            idx={idx + 1}
            question={q.question}
            options={q.options}
            appliesTo={q.appliesTo}
            value={answers[q.id]}
            onChange={(v) => setAnswers((p) => ({ ...p, [q.id]: v }))}
          />
        ))}
      </ol>

      {showResults ? (
        <Results results={results} answered={answered} />
      ) : (
        <p className="text-[14px] text-ink-60">
          Answer at least four questions to see a recommendation.
        </p>
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
      : `<${appliesTo[0].toUpperCase() + appliesTo.slice(1)}> only`;
  return (
    <li className="grid grid-cols-12 items-baseline gap-x-6 border-b border-ink-10 py-7">
      <div className="col-span-2 md:col-span-1">
        <p className="mono text-[24px] tracking-tightish text-ink-40">
          {String(idx).padStart(2, "0")}
        </p>
      </div>
      <div className="col-span-10 space-y-3 md:col-span-11">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="max-w-[55ch] text-[20px] font-semibold leading-[26px] tracking-tightish">
            {question}
          </h3>
          {trackTag && (
            <span className="mono text-[10px] uppercase tracking-[0.16em] text-ink-40">
              {trackTag}
            </span>
          )}
        </div>
        <ul className="divide-y divide-ink-10 border-y border-ink-10">
          {options.map((opt, i) => {
            const selected = value === opt.value;
            const isDQ = opt.value === "DQ";
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => onChange(selected ? undefined : opt.value)}
                  className={
                    "flex w-full items-baseline gap-4 px-1 py-3 text-left transition " +
                    (selected
                      ? isDQ
                        ? "bg-ink-5"
                        : "bg-marker-fade"
                      : "hover:bg-ink-5")
                  }
                >
                  <span
                    className={
                      "mono shrink-0 text-[12px] uppercase tracking-[0.16em] " +
                      (selected
                        ? isDQ
                          ? "text-ink"
                          : "crit"
                        : "text-ink-40")
                    }
                  >
                    {selected ? "▣" : "▢"}
                  </span>
                  <span className="flex-1 text-[15px] leading-[22px] text-ink-80">
                    {opt.label}
                  </span>
                  <span
                    className={
                      "mono shrink-0 text-[11px] tracking-[0.12em] " +
                      (isDQ ? "text-ink" : selected ? "crit" : "text-ink-40")
                    }
                  >
                    {isDQ ? "DQ" : `+${opt.value}`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
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
  const eligible = results.filter((r) => !r.dq);
  return (
    <section className="border-t-2 border-ink pt-8">
      <div className="flex items-baseline justify-between">
        <p className="label-mono">recommendation</p>
        <p className="mono text-[11px] tracking-[0.16em] text-ink-40">
          {answered} answered
        </p>
      </div>
      {eligible.length === 0 ? (
        <p className="mt-4 max-w-[60ch] text-[20px] leading-[28px] text-ink">
          You triggered a DQ on every track. Re-check your answers, or
          read the FAQ at basebatches.xyz — rules can shift between
          cohorts.
        </p>
      ) : (
        <h3 className="mt-4 text-[40px] font-semibold leading-[44px] tracking-tightish md:text-[64px] md:leading-[64px]">
          Best fit:{" "}
          <span className="crit">{eligible[0].label}</span>
          {top.track !== eligible[0].track && (
            <span className="ml-3 align-baseline mono text-[12px] uppercase tracking-[0.16em] text-ink-40">
              ({top.label} scored higher but DQ&apos;d)
            </span>
          )}
        </h3>
      )}

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
        {results.map((r) => (
          <TrackCard key={r.track} r={r} />
        ))}
      </div>

      <p className="mt-10 max-w-[60ch] text-[14px] leading-[22px] text-ink-60">
        Next: install the CLI and run{" "}
        <span className="mono text-ink">/submit-to-base-batches</span> — it
        drafts the 500-word light paper, prepares both interviews, and
        emits the submission packet.
      </p>
    </section>
  );
}

function TrackCard({ r }: { r: TrackResult }) {
  const pct = r.maxScore ? (r.score / r.maxScore) * 100 : 0;
  return (
    <div className={"border-t pt-3 " + (r.dq ? "border-ink" : "border-marker")}>
      <div className="flex items-baseline justify-between">
        <h4 className="text-[18px] font-semibold tracking-tightish">{r.label}</h4>
        <p className="mono text-[12px] text-ink-40">
          {r.score} / {r.maxScore}
        </p>
      </div>
      <div className="mt-3 h-px w-full bg-ink-10">
        <div
          className={"h-px " + (r.dq ? "bg-ink-40" : "bg-marker")}
          style={{ width: `${pct}%` }}
        />
      </div>
      {r.dq ? (
        <p className="mt-3 text-[13px] leading-[20px] text-ink">
          DQ: {r.dqReasons.join("; ")}
        </p>
      ) : (
        <p className="mt-3 text-[13px] leading-[20px] text-ink-60">
          {pct >= 75
            ? "Strong fit. Apply this track."
            : pct >= 50
              ? "Plausible fit. Strengthen the weak rows."
              : "Weak fit. Consider a different track."}
        </p>
      )}
    </div>
  );
}
