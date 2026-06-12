
type ScrollHitHandler = (hit: Element | null, x: number, y: number) => void;

const handlers = new Set<ScrollHitHandler>();

let lastX: number | undefined;
let lastY: number | undefined;
let rafPending = false;

window.addEventListener(
  "pointermove",
  (event) => {
    lastX = event.clientX;
    lastY = event.clientY;
  },
  { passive: true },
);

window.addEventListener(
  "scroll",
  () => {
    const x = lastX;
    const y = lastY;
    if (handlers.size === 0 || x === undefined || y === undefined || rafPending)
      return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const hit = document.elementFromPoint(x, y);
      for (const handler of handlers) handler(hit, x, y);
    });
  },
  { passive: true },
);

export function onScrollHit(handler: ScrollHitHandler) {
  handlers.add(handler);
}
