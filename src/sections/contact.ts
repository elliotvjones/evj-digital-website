import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initContact(reducedMotion: boolean): void {
  const section = document.querySelector<HTMLElement>('.contact');
  if (!section) return;

  if (reducedMotion) {
    section.classList.add('is-visible');
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    toggleClass: 'is-visible',
  });
}
