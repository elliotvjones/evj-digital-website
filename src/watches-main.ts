import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import './styles/tokens.css';
import './styles/base.css';
import './styles/sections/hero.css';
import './styles/sections/watches-showcase.css';

import { initWatchesShowcase } from './sections/watches-showcase';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

initWatchesShowcase(reducedMotion);
