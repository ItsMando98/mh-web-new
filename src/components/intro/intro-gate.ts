/**
 * The intro state lives on <html data-intro="…"> so CSS can react to it before
 * React hydrates (no flash of content for returning visitors).
 *
 *  play   – intro is running, page is locked
 *  reveal – dissolve started, page content animates in underneath
 *  skip   – intro not shown (seen this session / reduced motion / storage error)
 *  done   – intro finished
 */
export type IntroState = "play" | "reveal" | "skip" | "done";

const STORAGE_KEY = "intro-seen";
const REPLAY_QUERY = "intro=replay";

/** Runs inline in <head> before first paint. Keep it ES5 and dependency-free. */
export const INTRO_GATE_SCRIPT = `(function(){var d=document.documentElement;try{var replay=location.search.indexOf("${REPLAY_QUERY}")!==-1;var reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;var seen=sessionStorage.getItem("${STORAGE_KEY}")==="1";d.dataset.intro=(reduced||(seen&&!replay))?"skip":"play"}catch(e){d.dataset.intro="skip"}})();`;

export const INTRO_SERVER_STATE: IntroState = "play";

export const readIntroState = (): IntroState =>
  (document.documentElement.dataset.intro as IntroState | undefined) ?? "skip";

export const setIntroState = (state: IntroState): void => {
  document.documentElement.dataset.intro = state;

  if (state !== "done") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage can be blocked (private mode) — the intro simply replays next visit.
  }
};

export const subscribeIntroState = (onChange: () => void): (() => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-intro"],
  });

  return () => observer.disconnect();
};
