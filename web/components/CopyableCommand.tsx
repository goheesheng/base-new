"use client";

import { useState } from "react";

export function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-md border border-ink/10 bg-ink text-white">
      <code className="flex-1 overflow-x-auto px-4 py-3 font-mono text-sm">
        <span className="text-ink-light">$</span> {command}
      </code>
      <button
        type="button"
        onClick={onCopy}
        className="px-4 py-3 font-mono text-xs text-ink-light hover:text-white"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
