import { motion, useScroll } from 'framer-motion';

// Thin reading-progress bar pinned to the top of the page.
// Same pattern as the RELO proposal's ProgressBar, with the colour made configurable.
export default function ScrollProgress({ className = 'bg-zinc-950' }) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className={`fixed top-0 left-0 right-0 h-[2px] z-50 origin-left ${className}`}
    />
  );
}
