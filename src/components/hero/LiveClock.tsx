"use client";

import { useSyncExternalStore } from "react";

interface LiveClockProps {
  readonly timeZone: string;
}

const subscribeToSeconds = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);

  return () => clearInterval(id);
};

const getSecondSnapshot = () => Math.floor(Date.now() / 1000);

/** null on the server → the placeholder renders, no hydration mismatch. */
const getServerSnapshot = () => null;

export function LiveClock({ timeZone }: LiveClockProps) {
  const seconds = useSyncExternalStore(
    subscribeToSeconds,
    getSecondSnapshot,
    getServerSnapshot,
  );

  const formatted =
    seconds === null
      ? "--:--:--"
      : new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date(seconds * 1000));

  return (
    <time className="tabular-nums" dateTime={seconds ? new Date(seconds * 1000).toISOString() : undefined}>
      {formatted}
    </time>
  );
}
