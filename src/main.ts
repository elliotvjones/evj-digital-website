import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import './styles/tokens.css';
import './styles/base.css';
import './styles/sections/hero.css';
import './styles/sections/brands.css';
import './styles/sections/track-record.css';
import './styles/sections/orbit.css';
import './styles/sections/contact.css';

import { initHero } from './sections/hero';
import { initTrackRecord } from './sections/track-record';
import { initOrbit } from './sections/orbit';
import { initPortraitTravel } from './sections/portrait-travel';
import { initContact } from './sections/contact';

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

initHero(reducedMotion);
initTrackRecord(reducedMotion);
initOrbit(reducedMotion);
initPortraitTravel(reducedMotion);
initContact(reducedMotion);
