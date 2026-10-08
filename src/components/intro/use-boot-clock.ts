"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Elapsed milliseconds since `isActive` turned true, advanced every animation
 * frame. `jumpTo` time-warps the clock (used to skip ahead to the transition).
 */
export function useBootClock(isActive: boolean) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const originRef = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    originRef.current = performance.now();
    let frameId = 0;
    const tick = (now: number) => {
      setElapsedMs(now - originRef.current);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isActive]);

  const jumpTo = useCallback((targetMs: number) => {
    originRef.current = performance.now() - targetMs;
  }, []);

  return { elapsedMs, jumpTo };
}
