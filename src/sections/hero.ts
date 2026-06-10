import { initCountUp } from '../lib/countup';
import { initMagnetic } from '../lib/magnetic';

export function initHero(reducedMotion: boolean): void {
  initCountUp(reducedMotion);

  if (!reducedMotion) {
    initMagnetic();
  }
}
