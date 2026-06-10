const START_DELAY = 1700;
const DURATION = 1400;

const quartOut = (t: number): number => 1 - Math.pow(1 - t, 4);

/**
 * Animates every [data-count] element from 0 to its target value.
 * Falls back to the final value instantly when reduced motion is requested.
 */
export function initCountUp(reducedMotion: boolean, root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count ?? '0', 10);
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';

    if (reducedMotion) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const start = performance.now() + START_DELAY;

    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / DURATION, 0), 1);
      el.textContent = `${prefix}${Math.round(target * quartOut(t))}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}
