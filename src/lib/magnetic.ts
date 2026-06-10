const STRENGTH_X = 0.18;
const STRENGTH_Y = 0.3;

/**
 * Magnetic hover: element drifts toward the cursor, springs back on leave.
 */
export function initMagnetic(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * STRENGTH_X;
      const y = (event.clientY - rect.top - rect.height / 2) * STRENGTH_Y;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}
