import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CARD_COUNT = 6;
const ELLIPSE_RY = 90;
const ELLIPSE_RX_VW = 0.38;
const ELLIPSE_RX_MAX = 520;
const ELLIPSE_CENTER_Y = 0.68;
const PIN_DISTANCE_VH = 4;

const MOBILE_QUERY = '(max-width: 860px)';

export function initOrbit(reducedMotion: boolean): void {
  const section = document.querySelector<HTMLElement>('.orbit');
  const stage = section?.querySelector<HTMLElement>('.orbit-stage');
  const cards = Array.from(section?.querySelectorAll<HTMLElement>('.orbit-card') ?? []);

  if (!section || !stage || cards.length !== CARD_COUNT) return;

  const isMobile = window.matchMedia(MOBILE_QUERY).matches;

  if (reducedMotion || isMobile) {
    cards.forEach((card) => card.classList.add('is-expanded'));
    return;
  }

  let lastSettled = -1;

  const update = (progress: number): void => {
    const rect = stage.getBoundingClientRect();
    const rx = Math.min(rect.width * ELLIPSE_RX_VW, ELLIPSE_RX_MAX);
    const ry = ELLIPSE_RY;
    const centerYOffset = rect.height * (ELLIPSE_CENTER_Y - 0.5);

    const rotation = progress * Math.PI * 2;

    cards.forEach((card, i) => {
      const baseAngle = Math.PI / 2 - i * ((Math.PI * 2) / CARD_COUNT);
      const angle = baseAngle + rotation;
      const depth = Math.sin(angle);

      const x = rx * Math.cos(angle);
      const y = centerYOffset + ry * depth;

      const scale = 0.8 + 0.2 * depth;
      const opacity = 0.75 + 0.25 * depth;
      const zIndex = Math.round(100 + 60 * depth);
      const blur = Math.max(0, 1 - depth);

      card.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = String(zIndex);
      card.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : 'none';
    });

    const settled = Math.round(progress * CARD_COUNT) % CARD_COUNT;
    if (settled !== lastSettled) {
      cards[lastSettled]?.classList.remove('is-expanded');
      cards[settled]?.classList.add('is-expanded');
      lastSettled = settled;
    }
  };

  update(0);

  ScrollTrigger.create({
    trigger: stage,
    start: 'top top',
    end: () => `+=${window.innerHeight * PIN_DISTANCE_VH}`,
    pin: true,
    scrub: 1,
    snap: 1 / CARD_COUNT,
    onUpdate: (self) => update(self.progress),
    onRefresh: (self) => update(self.progress),
  });
}
