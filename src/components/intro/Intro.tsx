"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import "./intro.css";
import {
  TRANSITION_DURATION,
  TRANSITION_START_MS,
  getBootFrame,
  type BootLineFrame,
} from "./boot-sequence";
import {
  INTRO_SERVER_STATE,
  readIntroState,
  setIntroState,
  subscribeIntroState,
} from "./intro-gate";
import { DISSOLVE_COLS, DISSOLVE_ROWS, buildDissolveCells } from "./transition-grid";
import { useBootClock } from "./use-boot-clock";

const CELL_FADE_MS = 260;
const BAR_SEGMENTS = 10;

function ProgressBar({ progress }: { progress: number }) {
  const filled = Math.floor(progress * BAR_SEGMENTS);

  return (
    <span className="intro-bar" aria-hidden="true">
      {Array.from({ length: BAR_SEGMENTS }, (_, i) => (
        <span key={i} data-filled={i < filled} />
      ))}
    </span>
  );
}

function BootLine({ line, hasCursor }: { line: BootLineFrame; hasCursor: boolean }) {
  const cursor = hasCursor ? <span className="intro-cursor" /> : null;

  if (line.kind === "title") {
    return <div className="intro-title">{line.visibleText}{cursor}</div>;
  }
  if (line.kind === "meta") {
    return <div className="intro-meta">{line.visibleText}{cursor}</div>;
  }

  const progress = line.progress ?? 0;

  return (
    <div className="intro-task">
      <span className="intro-task-label">{line.visibleText}{cursor}</span>
      {progress > 0 && <ProgressBar progress={progress} />}
      {progress > 0 && (
        <span className="intro-status" data-ok={line.isComplete}>
          {line.isComplete ? "[ OK ]" : `${Math.round(progress * 100)}%`}
        </span>
      )}
    </div>
  );
}

const DISSOLVE_CELLS = buildDissolveCells();
const DELAY_RANGE_MS = TRANSITION_DURATION - CELL_FADE_MS;

function DissolveGrid() {

  return (
    <div
      className="intro-dissolve"
      aria-hidden="true"
      style={{
        gridTemplateColumns: `repeat(${DISSOLVE_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${DISSOLVE_ROWS}, 1fr)`,
      }}
    >
      {DISSOLVE_CELLS.map((cell) => (
        <div
          key={cell.key}
          className="intro-cell"
          style={{
            animationDuration: `${CELL_FADE_MS}ms`,
            animationDelay: `${Math.round(cell.delay * DELAY_RANGE_MS)}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function Intro() {
  const introState = useSyncExternalStore(
    subscribeIntroState,
    readIntroState,
    () => INTRO_SERVER_STATE,
  );
  const isRunning = introState === "play" || introState === "reveal";
  const { elapsedMs, jumpTo } = useBootClock(isRunning);
  const [isSkipped, setIsSkipped] = useState(false);

  const frame = getBootFrame(elapsedMs);
  const isBooting = frame.phase === "boot";

  const skip = useCallback(() => {
    if (!isBooting) return;
    setIsSkipped(true);
    jumpTo(TRANSITION_START_MS);
  }, [isBooting, jumpTo]);

  useEffect(() => {
    if (introState === "play" && frame.phase !== "boot") setIntroState("reveal");
    if (isRunning && frame.phase === "done") setIntroState("done");
  }, [introState, isRunning, frame.phase]);

  useEffect(() => {
    if (!isRunning) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isRunning, skip]);

  if (!isRunning) return null;

  const lastStartedIndex = frame.lines.findLastIndex((line) => line.hasStarted);

  return (
    <div
      className="intro-root"
      role="dialog"
      aria-modal="true"
      aria-label="Intro: Mathis Hoffmann, Hamburg, Germany. Loading."
      data-phase={frame.phase}
      onClick={skip}
    >
      <div className="intro-scanlines" aria-hidden="true" />
      <div
        className="intro-terminal"
        aria-hidden="true"
        data-glitch={!isBooting}
        hidden={isSkipped}
      >
        {frame.lines.map((line, index) => (
          <BootLine
            key={line.id}
            line={line}
            hasCursor={isBooting && index === lastStartedIndex}
          />
        ))}
      </div>
      {!isBooting && <DissolveGrid />}
      {isBooting && (
        <button
          type="button"
          className="intro-skip"
          onClick={(event) => {
            event.stopPropagation();
            skip();
          }}
        >
          Skip intro <kbd>Esc</kbd>
        </button>
      )}
    </div>
  );
}
