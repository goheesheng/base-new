"use client";

import { useState } from "react";

/**
 * solana.new-style install bar:
 * - flat rounded rectangle, white/12 background
 * - mono curl text, copy button on right (no traffic-light chrome)
 * - eyebrow "install command" label sits OUTSIDE the bar (caller renders)
 */
export function InstallTerminal({
  command = "curl -fsSL https://base.new/setup.sh | bash",
}: {
  command?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="flex w-full max-w-2xl items-stretch gap-1">
      <div className="min-w-0 flex-1 overflow-x-auto rounded-l-md bg-white/[0.10] px-4 py-3.5 flex items-center">
        <code className="block whitespace-nowrap font-mono text-xs text-white sm:text-sm">
          <span className="text-white/40">$ </span>
          {command}
        </code>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy install command"
        className="flex items-center justify-center rounded-r-md bg-white/[0.10] px-4 text-white transition hover:bg-white/[0.18]"
      >
        {copied ? (
          <span className="font-mono text-[11px] text-mint">copied</span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect
              x="9"
              y="9"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M5 15V6a2 2 0 0 1 2-2h9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export function CopyableCommand({ command }: { command: string }) {
  return <InstallTerminal command={command} />;
}
