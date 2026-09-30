import { MotionConfig } from 'framer-motion';
import ScrollProgress from '../shared/ScrollProgress';
import { StoreProvider } from './prototype/store';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Summary from './sections/Summary';
import Problem from './sections/Problem';
import Principle from './sections/Principle';
import Model from './sections/Model';
import Commercial from './sections/Commercial';
import Launch from './sections/Launch';
import Phase2 from './sections/Phase2';
import Contact from './sections/Contact';

export default function LonResProposal() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <div className="lr-root min-h-screen">
          <a
            href="#summary"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded-md focus:shadow"
          >
            Skip to content
          </a>
          <ScrollProgress className="bg-[color:var(--lr-accent)]" />
          <Header />
          <main>
            <Hero />
            <Summary />
            <Problem />
            <Principle />
            <Model />
            <Commercial />
            <Launch />
            <Phase2 />
            <Contact />
          </main>
        </div>
      </StoreProvider>
    </MotionConfig>
  );
}
