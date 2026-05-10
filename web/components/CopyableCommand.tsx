"use client";

import { useState } from "react";

/**
 * Minimal install bar — black-bordered, white bg, monospace.
 * Single row: $ + command + copy button.
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
    <div className="flex w-full items-stretch border border-ink">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto px-4 py-3">
        <span className="mono select-none text-[12px] text-ink-40">$</span>
        <code className="mono whitespace-nowrap text-[13px] text-ink">
          {command}
        </code>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label="copy command"
        className="mono flex shrink-0 items-center justify-center border-l border-ink px-4 text-[11px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-white"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

export function CopyableCommand({ command }: { command: string }) {
  return <InstallTerminal command={command} />;
}
