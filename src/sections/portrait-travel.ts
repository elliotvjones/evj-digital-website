import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PIN_DISTANCE_VH = 4; // matches orbit.ts PIN_DISTANCE_VH
const PORTRAIT_RATIO = 933 / 1250; // width / height of the hero portrait image
const MOBILE_QUERY = '(max-width: 860px)';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export function initPortraitTravel(reducedMotion: boolean): void {
  if (reducedMotion || window.matchMedia(MOBILE_QUERY).matches) return;

  const hero = document.querySelector<HTMLElement>('.hero');
  const brands = document.querySelector<HTMLElement>('.brands');
  const trackRecord = document.querySelector<HTMLElement>('.track-record');
  const portrait = document.querySelector<HTMLElement>('.portrait');
  const orbitFigure = document.querySelector<HTMLElement>('.orbit-figure');
  const picture = portrait?.querySelector<HTMLElement>('picture');
  const img = portrait?.querySelector<HTMLImageElement>('img');

  if (!hero || !portrait || !orbitFigure || !picture || !img) return;

  let sourceRect: Rect | null = null;
  let docked = false;

  const setStyles = (rect: Rect): void => {
    img.style.top = `${rect.top}px`;
    img.style.left = `${rect.left}px`;
    img.style.width = `${rect.width}px`;
    img.style.height = `${rect.height}px`;
  };

  const measureSourceRect = (): Rect => {
    const rect = img.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  const computeTargetRect = (): Rect => {
    const height = window.innerHeight * 0.92;
    const width = height * PORTRAIT_RATIO;
    return {
      top: window.innerHeight - height,
      left: window.innerWidth / 2 - width / 2,
      width,
      height,
    };
  };

  const update = (progress: number): void => {
    if (!sourceRect) return;

    const preOrbitHeight = hero.offsetHeight + (brands?.offsetHeight ?? 0) + (trackRecord?.offsetHeight ?? 0);
    const dockDistance = window.innerHeight * PIN_DISTANCE_VH;
    const travelEnd = preOrbitHeight / (preOrbitHeight + dockDistance);
    const t = Math.min(Math.max(progress / travelEnd, 0), 1);

    if (t >= 1) {
      if (!docked) {
        docked = true;
        img.classList.remove('is-traveling');
        img.style.cssText = '';
        orbitFigure.appendChild(picture);
      }
      return;
    }

    if (docked) {
      docked = false;
      portrait.appendChild(picture);
    }

    if (t <= 0) {
      img.classList.remove('is-traveling');
      img.style.cssText = '';
      return;
    }

    const target = computeTargetRect();
    img.classList.add('is-traveling');
    setStyles({
      top: lerp(sourceRect.top, target.top, t),
      left: lerp(sourceRect.left, target.left, t),
      width: lerp(sourceRect.width, target.width, t),
      height: lerp(sourceRect.height, target.height, t),
    });
  };

  const trigger = ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: () => `+=${hero.offsetHeight + (brands?.offsetHeight ?? 0) + (trackRecord?.offsetHeight ?? 0) + window.innerHeight * PIN_DISTANCE_VH}`,
    scrub: true,
    onRefreshInit: () => {
      if (!docked && !img.classList.contains('is-traveling')) {
        sourceRect = measureSourceRect();
      }
    },
    onUpdate: (self) => update(self.progress),
    onRefresh: (self) => update(self.progress),
  });

  sourceRect = measureSourceRect();
  trigger.refresh();

  // Re-measure after the hero's entrance animation settles.
  window.setTimeout(() => trigger.refresh(), 2500);
}
