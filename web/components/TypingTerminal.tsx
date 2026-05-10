"use client";

import { useEffect, useReducer, useRef } from "react";

export type TermLine =
  | { kind: "ascii"; text: string }
  | { kind: "header"; text: string }
  | { kind: "system"; text: string; pauseAfter?: number }
  | { kind: "user"; text: string; pauseAfter?: number }
  | { kind: "assistant"; text: string; pauseAfter?: number }
  | { kind: "tool"; text: string; pauseAfter?: number };

interface State { idx: number; cursor: number }
type Action = { type: "tick" } | { type: "advance" };

function reducer(s: State, a: Action, total: number): State {
  if (a.type === "tick") return { ...s, cursor: s.cursor + 1 };
  // advance — wrap to start when finished
  return { idx: (s.idx + 1) % total, cursor: 0 };
}

export function TypingTerminal({
  lines,
  charsPerSecond = 70,
  loop = true,
}: {
  lines: TermLine[];
  charsPerSecond?: number;
  loop?: boolean;
}) {
  const total = lines.length;
  const [state, dispatch] = useReducer(
    (s: State, a: Action) => reducer(s, a, total),
    { idx: 0, cursor: 0 },
  );
  const reduced = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const cur = lines[state.idx];
    if (!cur) return;
    if (cur.kind === "ascii" || cur.kind === "header") {
      const t = setTimeout(() => dispatch({ type: "advance" }), 250);
      return () => clearTimeout(t);
    }
    if (state.cursor < cur.text.length) {
      const base = 1000 / charsPerSecond;
      const t = setTimeout(() => dispatch({ type: "tick" }), base * (0.7 + Math.random() * 0.7));
      return () => clearTimeout(t);
    }
    const pause = (cur as { pauseAfter?: number }).pauseAfter ?? 600;
    const isLast = state.idx === total - 1;
    if (isLast && !loop) return;
    const t = setTimeout(() => dispatch({ type: "advance" }), pause);
    return () => clearTimeout(t);
  }, [state.idx, state.cursor, lines, charsPerSecond, loop, total]);

  return (
    <div className="space-y-2 mono text-[12px] leading-[18px]">
      {lines.map((l, i) => {
        if (i > state.idx) return null;
        const isCurrent = i === state.idx;
        const shown = reduced.current
          ? l.text
          : isCurrent
            ? l.text.slice(0, state.cursor)
            : l.text;
        return (
          <Line
            key={i}
            kind={l.kind}
            text={shown}
            typing={isCurrent && !reduced.current}
          />
        );
      })}
    </div>
  );
}

function Line({
  kind,
  text,
  typing,
}: {
  kind: TermLine["kind"];
  text: string;
  typing: boolean;
}) {
  if (kind === "ascii") {
    return (
      <pre className="select-none whitespace-pre text-[8px] leading-[1.05] text-white/35 sm:text-[9px]">
        {text}
      </pre>
    );
  }
  if (kind === "header") {
    return (
      <p className="text-center text-[10px] uppercase tracking-[0.16em] text-white/45">
        {text}
      </p>
    );
  }
  if (kind === "user") {
    return (
      <p className="text-white">
        <span className="select-none text-white/40">{"› "}</span>
        {text}
        {typing && <Caret />}
      </p>
    );
  }
  if (kind === "assistant") {
    return (
      <p className="text-white/85">
        {text}
        {typing && <Caret />}
      </p>
    );
  }
  if (kind === "tool") {
    return (
      <p className="text-white/55">
        <span className="text-emerald-300">✓</span>{" "}
        {text.replace(/^✓\s*/, "")}
        {typing && <Caret />}
      </p>
    );
  }
  return (
    <p className="text-white/55">
      {text}
      {typing && <Caret />}
    </p>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1em] w-[0.5ch] -translate-y-[2px] animate-pulse bg-white/80 align-middle"
      style={{ animationDuration: "1s" }}
    />
  );
}
