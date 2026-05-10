"use client";

import { useEffect, useReducer, useRef } from "react";

export type TermLine =
  | { kind: "header"; text: string }
  | { kind: "ascii"; text: string }
  | { kind: "system"; text: string; pauseAfter?: number }
  | { kind: "user"; text: string; pauseAfter?: number }
  | { kind: "assistant"; text: string; pauseAfter?: number }
  | { kind: "tool"; text: string; pauseAfter?: number };

interface State {
  idx: number; // current line index
  cursor: number; // chars typed of current line
  finished: boolean;
}

type Action =
  | { type: "tick" }
  | { type: "advance" }
  | { type: "reset" };

function reducer(state: State, action: Action, total: number): State {
  switch (action.type) {
    case "tick":
      return { ...state, cursor: state.cursor + 1 };
    case "advance":
      if (state.idx + 1 >= total) {
        return { idx: 0, cursor: 0, finished: false };
      }
      return { idx: state.idx + 1, cursor: 0, finished: false };
    case "reset":
      return { idx: 0, cursor: 0, finished: false };
  }
}

export function TypingTerminal({
  lines,
  charsPerSecond = 60,
  loop = true,
}: {
  lines: TermLine[];
  charsPerSecond?: number;
  loop?: boolean;
}) {
  const total = lines.length;
  const [state, dispatch] = useReducer(
    (s: State, a: Action) => reducer(s, a, total),
    { idx: 0, cursor: 0, finished: false },
  );
  const reduced = useRef(false);

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      reduced.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const cur = lines[state.idx];
    if (!cur) return;

    // Header/ascii lines render instantly
    if (cur.kind === "header" || cur.kind === "ascii") {
      const t = setTimeout(() => dispatch({ type: "advance" }), 200);
      return () => clearTimeout(t);
    }

    if (state.cursor < cur.text.length) {
      const baseMs = 1000 / charsPerSecond;
      // Slight jitter so it feels human
      const jitter = baseMs * (0.7 + Math.random() * 0.7);
      const t = setTimeout(() => dispatch({ type: "tick" }), jitter);
      return () => clearTimeout(t);
    }

    // Line finished — pause then advance
    const pause = (cur as { pauseAfter?: number }).pauseAfter ?? 600;
    const isLast = state.idx === total - 1;
    if (isLast && !loop) return;
    const t = setTimeout(() => dispatch({ type: "advance" }), pause);
    return () => clearTimeout(t);
  }, [state.idx, state.cursor, lines, charsPerSecond, loop, total]);

  return (
    <div className="space-y-2 font-mono text-[12px] leading-relaxed">
      {lines.map((l, i) => {
        if (i > state.idx) return null;
        const isCurrent = i === state.idx;
        const shown = reduced.current
          ? l.text
          : isCurrent
            ? l.text.slice(0, state.cursor)
            : l.text;
        return (
          <Line key={i} kind={l.kind} text={shown} typing={isCurrent && !reduced.current} />
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
      <pre className="select-none whitespace-pre text-[8px] leading-[1.05] text-white/30 sm:text-[10px]">
        {text}
      </pre>
    );
  }
  if (kind === "header") {
    return <p className="text-center text-[11px] text-white/40">{text}</p>;
  }
  if (kind === "user") {
    return (
      <p className="text-white/90">
        <span className="select-none text-white/30">{"› "}</span>
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
        <ToolPrefix />
        <span className="ml-1">{stripPrefix(text)}</span>
        {typing && <Caret />}
      </p>
    );
  }
  // system
  return (
    <p className="text-white/45">
      {text}
      {typing && <Caret />}
    </p>
  );
}

function ToolPrefix() {
  return <span className="text-mint">✓</span>;
}

function stripPrefix(text: string): string {
  return text.replace(/^✓\s*/, "");
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1em] w-[0.5ch] -translate-y-[2px] animate-pulse bg-white/70 align-middle"
      style={{ animationDuration: "1s" }}
    />
  );
}
