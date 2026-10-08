"use client";

import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

const STATUS_RESET_MS = 2000;

const STATUS_TEXT: Record<CopyStatus, string> = {
  idle: "Click to copy",
  copied: "Copied!",
  failed: "Copy failed — select it manually",
};

export function CopyButton({ value }: { readonly value: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch (error) {
      console.error("Clipboard write failed", error);
      setStatus("failed");
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("idle"), STATUS_RESET_MS);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex flex-col items-start gap-1 border border-white/15 px-6 py-4 text-left transition-colors hover:border-accent focus-visible:border-accent focus-visible:outline-none"
    >
      <span className="font-sans text-xl font-semibold tracking-tight md:text-2xl">{value}</span>
      <span
        aria-live="polite"
        className={`font-mono text-xs ${status === "idle" ? "text-muted" : "text-accent"}`}
      >
        {STATUS_TEXT[status]}
      </span>
    </button>
  );
}
