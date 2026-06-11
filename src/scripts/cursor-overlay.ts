import { onScrollHit } from "./scroll-hit";

export function initCursorOverlay(opts: {
  overlay: HTMLElement;
  /** selector for elements that activate the overlay */
  target: string;
  setTarget: (target: HTMLElement | null) => void;
  /** lets the consumer pause scroll re-sync (e.g. while selecting text) */
  syncEnabled?: () => boolean;
}): ((x: number, y: number) => void) | null {
  if (
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  for (const img of opts.overlay.querySelectorAll("img")) {
    img.loading = "eager";
  }

  const moveTo = (x: number, y: number) => {
    opts.overlay.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  onScrollHit((hit, x, y) => {
    if (opts.syncEnabled && !opts.syncEnabled()) return;
    const target = hit?.closest<HTMLElement>(opts.target) ?? null;
    if (target) moveTo(x, y);
    opts.setTarget(target);
  });

  return moveTo;
}
