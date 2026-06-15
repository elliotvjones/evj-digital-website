import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initTrackRecord(reducedMotion: boolean): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('.timeline-item'));

  if (reducedMotion) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      toggleClass: 'is-visible',
    });
  });
}
