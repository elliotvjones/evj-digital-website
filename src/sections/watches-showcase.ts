import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initWatchesShowcase(reducedMotion: boolean): void {
  const panels = Array.from(document.querySelectorAll<HTMLElement>('.watches-showcase-panel'));

  if (reducedMotion) {
    panels.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  panels.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      toggleClass: 'is-visible',
    });
  });
}
