import { initMagnetic } from '../lib/magnetic';

export function initHero(reducedMotion: boolean): void {
  if (!reducedMotion) {
    initMagnetic();
  }
}
