import { onScrollHit } from "./scroll-hit";

const OVERLAY_MEDIA =
  "(hover: hover) and (pointer: fine) and (min-width: 64rem)";

export function initCursorOverlay(opts: {
  overlay: HTMLElement;
  /** element whose pointer events drive the overlay */
  root: HTMLElement;
  /** selector for elements that activate the overlay */
  target: string;
  setTarget: (target: HTMLElement | null) => void;
  /** lets the consumer pause syncing (e.g. while selecting text) */
  enabled?: () => boolean;
  onActivate?: (sync: (hit: Element | null, x: number, y: number) => void) => void;
}): void {
  const activate = () => {
    for (const img of opts.overlay.querySelectorAll("img")) {
      img.loading = "eager";
    }

    const moveTo = (x: number, y: number) => {
      opts.overlay.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const sync = (hit: Element | null, x: number, y: number) => {
      if (opts.enabled && !opts.enabled()) return;
      const target = hit?.closest<HTMLElement>(opts.target) ?? null;
      if (target) moveTo(x, y);
      opts.setTarget(target);
    };

    onScrollHit(sync);

    opts.root.addEventListener("pointermove", (event) => {
      sync(
        event.target instanceof Element ? event.target : null,
        event.clientX,
        event.clientY,
      );
    });
    opts.root.addEventListener("pointerleave", () => opts.setTarget(null));

    opts.onActivate?.(sync);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const media = window.matchMedia(OVERLAY_MEDIA);
  if (media.matches) {
    activate();
  } else {
    media.addEventListener(
      "change",
      (event) => {
        if (event.matches) activate();
      },
      { once: true },
    );
  }
}
