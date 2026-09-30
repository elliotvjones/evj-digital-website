import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { META } from '../content';
import { CITIES } from '../prototype/mockData';
import { useStore } from '../prototype/store';
import { Lockup } from './ui';

// Abstract network: London at the centre, recommendation links out to the wealth hubs.
const LONDON = { x: 210, y: 112 };
const NODES = {
  Paris: { x: 290, y: 170, anchor: 'start' },
  Lisbon: { x: 58, y: 292, anchor: 'start' },
  Marbella: { x: 150, y: 350, anchor: 'start' },
  Mallorca: { x: 282, y: 312, anchor: 'start' },
  Dubai: { x: 470, y: 272, anchor: 'end' },
};

function curve(to) {
  const mx = (LONDON.x + to.x) / 2;
  const my = (LONDON.y + to.y) / 2 - 40;
  return `M ${LONDON.x} ${LONDON.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

function NetworkGraphic() {
  const reduce = useReducedMotion();
  const [state] = useStore();
  const perCity = Object.fromEntries(
    CITIES.map((c) => [c.name, state.agents.filter((a) => a.city === c.name).reduce((n, a) => n + a.recommendations.length, 0)]),
  );
  const start = 0.7;

  return (
    <svg viewBox="0 0 520 400" className="w-full h-auto" role="img" aria-label="Network diagram: London linked to Paris, Lisbon, Marbella, Mallorca and Dubai through member recommendations">
      {Object.entries(NODES).map(([name, n], i) => (
        <motion.path
          key={name}
          d={curve(n)}
          fill="none"
          stroke="#d4d4d8"
          strokeWidth="1.25"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: start + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {Object.entries(NODES).map(([name, n], i) => {
        const d = start + 0.55 + i * 0.12;
        const labelX = n.anchor === 'end' ? n.x - 12 : n.x + 12;
        return (
          <motion.g
            key={name}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d, duration: 0.4 }}
          >
            <circle cx={n.x} cy={n.y} r="5" fill="#0a0a0a" />
            <text x={labelX} y={n.y + 4} textAnchor={n.anchor} className="fill-zinc-900" style={{ font: '600 13px var(--font-body)' }}>
              {name}
            </text>
            <text x={labelX} y={n.y + 21} textAnchor={n.anchor} style={{ font: '500 11px var(--font-body)', fill: 'var(--lr-accent)' }}>
              {perCity[name]} recommendations
            </text>
          </motion.g>
        );
      })}

      <motion.g
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: start - 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${LONDON.x}px ${LONDON.y}px` }}
      >
        <circle cx={LONDON.x} cy={LONDON.y} r="22" fill="var(--lr-accent)" opacity="0.12" />
        <circle cx={LONDON.x} cy={LONDON.y} r="8" fill="var(--lr-accent)" />
        <text x={LONDON.x} y={LONDON.y - 32} textAnchor="middle" style={{ font: '700 11px var(--font-label)', letterSpacing: '0.14em', fill: '#0a0a0a' }}>
          LONDON MEMBERS
        </text>
      </motion.g>
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" className="px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-10 items-center">
        <div>
          <motion.div {...rise(0)}>
            <Lockup />
          </motion.div>

          <motion.div {...rise(0.1)} className="lr-label text-zinc-400 mt-10 mb-5">
            Proposal <span className="mx-2 text-zinc-300">·</span> {META.version} <span className="mx-2 text-zinc-300">·</span> {META.status}
          </motion.div>

          <motion.h1 {...rise(0.18)} className="lr-display text-[44px] leading-[1.02] sm:text-[64px] text-zinc-950">
            LonRes <em className="italic text-[color:var(--lr-accent)]">International</em> Network
          </motion.h1>

          <motion.p {...rise(0.28)} className="mt-6 text-[17px] sm:text-[19px] leading-[1.6] text-zinc-600 max-w-xl">
            {META.idea.split('trusted').map((part, i) => (
              <span key={i}>
                {i > 0 && <em className="lr-display italic text-[1.08em] text-[color:var(--lr-accent)]">trusted</em>}
                {part}
              </span>
            ))}
          </motion.p>

          <motion.dl {...rise(0.38)} className="mt-10 grid grid-cols-2 gap-6 max-w-md border-t border-zinc-200 pt-6">
            <div>
              <dt className="lr-label text-zinc-400">Prepared for</dt>
              <dd className="mt-1 text-[14px] text-zinc-800">{META.preparedFor}</dd>
            </div>
            <div>
              <dt className="lr-label text-zinc-400">Prepared by</dt>
              <dd className="mt-1 text-[14px] text-zinc-800">{META.preparedBy}</dd>
            </div>
          </motion.dl>

          <motion.a
            {...rise(0.46)}
            href="#model"
            className="mt-10 inline-flex items-center gap-2 text-[14px] font-semibold text-zinc-900 group"
          >
            Try the prototype
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
          </motion.a>
        </div>

        <div className="max-w-md mx-auto w-full lg:max-w-none">
          <NetworkGraphic />
          <p className="mt-2 text-center text-[11px] text-zinc-400">Illustrative recommendation counts from the prototype below.</p>
        </div>
      </div>
    </section>
  );
}
