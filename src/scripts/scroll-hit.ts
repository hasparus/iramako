
type ScrollHitHandler = (hit: Element | null, x: number, y: number) => void;

const handlers = new Set<ScrollHitHandler>();

let lastX: number | undefined;
let lastY: number | undefined;
let rafPending = false;
let listening = false;

function listen() {
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
      if (lastX === undefined || lastY === undefined || rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const hit = document.elementFromPoint(lastX!, lastY!);
        for (const handler of handlers) handler(hit, lastX!, lastY!);
      });
    },
    { passive: true },
  );
}

export function onScrollHit(handler: ScrollHitHandler) {
  if (!listening) {
    listening = true;
    listen();
  }
  handlers.add(handler);
}
