// ============================================================
// RELO × Elliot Jones — Strategic Proposal Website
// React + Tailwind CSS + Framer Motion
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Check, MapPin, Users, BarChart2, Briefcase,
  Globe, Shield, TrendingUp, Zap, Target, FileText, Building,
  DollarSign, Clock, ChevronRight, Network, Search, UserCheck,
  Layers, RefreshCw, Settings, CheckCircle, X, ChevronDown,
  Star, Award, PieChart
} from 'lucide-react';
import RELOPrototype from './RELOPrototype';

// ============================================================
// SHARED ANIMATION VARIANTS
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

// ============================================================
// PROGRESS BAR — top of page, tracks scroll depth
// ============================================================
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-950 z-50 origin-left"
    />
  );
}

// ============================================================
// NAV SECTIONS — shared by Header + overlay
// ============================================================
const NAV_SECTIONS = [
  { id: 'hero',         label: 'Overview',       num: '01'  },
  { id: 'problem',      label: 'Market Problem',  num: '02'  },
  { id: 'gap',          label: 'Execution Gap',   num: '03'  },
  { id: 'role',         label: 'How I Operate',   num: '04'  },
  { id: 'whatido',      label: 'What I Do',       num: '05'  },
  { id: 'value',        label: 'Value',           num: '06'  },
  { id: 'product',      label: 'MVP Direction',   num: '07'  },
  { id: 'prototype',    label: 'Prototype',       num: '07b' },
  { id: 'how',          label: 'How It Works',    num: '08'  },
  { id: 'hypothesis',   label: 'Strategy',        num: '09'  },
  { id: 'loop',         label: 'Go-to-Market',    num: '10'  },
  { id: 'roadmap',      label: 'Roadmap',         num: '11'  },
  { id: 'deliverables', label: 'Deliverables',    num: '12'  },
  { id: 'commercial',   label: 'Commercial',      num: '13'  },
  { id: 'about',        label: 'About',           num: '14'  },
  { id: 'cta',          label: 'Next Steps',      num: '15'  },
];

// ============================================================
// HEADER + BURGER MENU
// ============================================================
function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('hero');

  // Track scroll position + active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const mid = window.scrollY + window.innerHeight * 0.35;
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el && el.offsetTop <= mid) { setActive(NAV_SECTIONS[i].id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navigate = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const dark = menuOpen;

  return (
    <>
      {/* ── Sticky header bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          dark
            ? 'bg-zinc-950'
            : scrolled
            ? 'bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-zinc-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('hero')} className="flex items-center gap-3">
            <span className={`text-sm font-black tracking-[0.25em] uppercase transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-950'}`}>
              RELO
            </span>
            <span className={`font-light transition-colors duration-300 ${dark ? 'text-zinc-700' : 'text-zinc-300'}`}>×</span>
            <span className={`text-sm tracking-[0.2em] uppercase font-light transition-colors duration-300 ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Elliot Jones
            </span>
          </button>

          {/* Burger button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`block w-6 h-[1.5px] origin-center transition-colors duration-300 ${dark ? 'bg-white' : 'bg-zinc-950'}`}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className={`block w-6 h-[1.5px] transition-colors duration-300 ${dark ? 'bg-white' : 'bg-zinc-950'}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`block w-6 h-[1.5px] origin-center transition-colors duration-300 ${dark ? 'bg-white' : 'bg-zinc-950'}`}
            />
          </button>
        </div>
      </header>

      {/* ── Full-screen nav overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-950 overflow-auto"
          >
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
                {NAV_SECTIONS.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.025 + 0.05 }}
                    onClick={() => navigate(s.id)}
                    className={`flex items-center gap-5 px-6 py-5 text-left group transition-colors bg-zinc-950 hover:bg-zinc-900 ${
                      active === s.id ? 'bg-zinc-900' : ''
                    }`}
                  >
                    <span className="text-[11px] font-black tracking-[0.2em] text-zinc-600 w-8 flex-shrink-0">
                      {s.num}
                    </span>
                    <span className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-150 ${
                      active === s.id ? 'text-white' : 'text-zinc-500 group-hover:text-white'
                    }`}>
                      {s.label}
                    </span>
                    {active === s.id && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// SECTION 01 — HERO
// ============================================================
function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-[#F8F7F4] relative overflow-hidden flex flex-col"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 pt-32 pb-16 w-full">
        {/* Document label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="w-8 h-[1px] bg-zinc-400" />
          <span className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
            Strategic Proposal — 2026
          </span>
        </motion.div>

        {/* Primary headline */}
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[clamp(2.8rem,8vw,7rem)] font-black tracking-tight leading-[0.88] mb-10 max-w-5xl"
        >
          The infrastructure for
          <br />
          global relocation
          <br />
          <span className="text-zinc-400">is broken.</span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="max-w-2xl mb-10 space-y-5"
        >
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-light">
            For founders, investors and globally mobile families, relocation remains fragmented
            across advisors, inboxes, spreadsheets and disconnected workflows. The operational
            complexity is high, coordination is manual, and there is no unified system managing
            the journey end-to-end.
          </p>
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-light">
            RELO has the opportunity to become the coordination infrastructure layer for modern
            global relocation — streamlining workflows, aligning advisors and creating a single
            operational system for high-stakes moves.
          </p>
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-light">
            My role is to help operationalise that vision: translating founder insight into a
            focused product, validating demand, structuring the MVP and building the commercial
            systems required to scale.
          </p>
        </motion.div>

        {/* Quote block */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-l-2 border-zinc-950 pl-6 mb-12 max-w-xl"
        >
          <p className="text-sm md:text-base text-zinc-600 italic leading-relaxed font-light">
            "A move can look smart on paper and still fail in real life. The best relocation
            is not just technically correct, it has to work as a life."
          </p>
        </motion.blockquote>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all duration-300"
          >
            View Proposal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => document.getElementById('commercial')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-3 border border-zinc-950 text-zinc-950 px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-950 hover:text-white transition-all duration-300"
          >
            Commercial Structure
          </button>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <div className="max-w-7xl mx-auto px-6 pb-8 w-full flex items-center justify-between">
        <span className="text-[10px] text-zinc-400 tracking-[0.25em] uppercase">
          The Coordination Infrastructure
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 02 — THE MARKET PROBLEM
// Hub-and-spoke diagrams: scattered vs coordinated
// ============================================================
function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const advisors = [
    { label: 'Tax Advisor', icon: DollarSign },
    { label: 'Immigration', icon: Globe },
    { label: 'Real Estate', icon: Building },
    { label: 'Schools', icon: FileText },
    { label: 'Private Bank', icon: Shield },
    { label: 'WhatsApp', icon: Users },
  ];

  const scatterPos = [
    { top: '8%', left: '12%' },
    { top: '4%', right: '10%' },
    { top: '42%', left: '4%' },
    { top: '55%', right: '8%' },
    { bottom: '8%', left: '18%' },
    { bottom: '12%', right: '20%' },
  ];

  return (
    <section id="problem" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">02</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">The Market Problem</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl"
        >
          The infrastructure for global relocation is broken.
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-600 mb-16 max-w-2xl font-light leading-relaxed"
        >
          Today, relocation decisions happen across WhatsApp, inboxes, spreadsheets, advisor
          silos and fragmented research. This is the current state of the market — not a product
          gap, but an infrastructure gap. RELO's opportunity is to become the coordination layer
          that fixes it.
        </motion.p>

        {/* Split screen */}
        <div className="grid md:grid-cols-2 gap-0 border border-zinc-200">
          {/* LEFT — Market Today */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-zinc-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-zinc-300 rounded-full" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-400">The Market Today</span>
            </div>
            <h3 className="text-xl font-black tracking-tight mb-1">Scattered Intelligence</h3>
            <p className="text-sm text-zinc-500 mb-8">High Friction</p>

            <div className="relative h-64">
              {advisors.map((a, i) => (
                <div
                  key={i}
                  style={{ position: 'absolute', ...scatterPos[i] }}
                  className="flex flex-col items-center gap-1.5 opacity-50"
                >
                  <div className="w-11 h-11 border border-dashed border-zinc-300 rounded-full flex items-center justify-center bg-white">
                    <a.icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <span className="text-[9px] text-zinc-400 text-center">{a.label}</span>
                </div>
              ))}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="18%" y1="22%" x2="72%" y2="12%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4,6" />
                <line x1="18%" y1="22%" x2="55%" y2="68%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4,6" />
                <line x1="72%" y1="12%" x2="82%" y2="62%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4,6" />
                <line x1="12%" y1="52%" x2="75%" y2="80%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4,6" />
                <line x1="25%" y1="82%" x2="82%" y2="62%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4,6" />
                <line x1="72%" y1="12%" x2="25%" y2="82%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4,6" />
              </svg>
            </div>

            <div className="mt-6 space-y-2">
              {['Repeated client onboarding', 'Misaligned advisors', 'Client overwhelm', 'No single source of truth'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <X className="w-3 h-3 text-zinc-300 flex-shrink-0" />
                  <span className="text-xs text-zinc-500">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — RELO's Opportunity */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="p-8 md:p-10 bg-zinc-950 text-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">RELO's Opportunity</span>
            </div>
            <h3 className="text-xl font-black tracking-tight mb-1 text-white">Coordinated Infrastructure</h3>
            <p className="text-sm text-zinc-500 mb-8">Zero Friction</p>

            <div className="relative h-64 flex items-center justify-center">
              {/* Centre hub */}
              <div className="absolute z-10 bg-white text-zinc-950 px-4 py-2 text-xs font-black tracking-[0.2em] uppercase shadow-lg">
                RELO
              </div>
              {/* Spoke nodes */}
              {advisors.map((a, i) => {
                const angle = i * 60 - 90;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 36 * Math.cos(rad);
                const y = 50 + 36 * Math.sin(rad);
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: `${y}%`,
                      left: `${x}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-10 h-10 border border-zinc-700 rounded-full flex items-center justify-center bg-zinc-900">
                      <a.icon className="w-4 h-4 text-zinc-400" />
                    </div>
                    <span className="text-[9px] text-zinc-500 text-center whitespace-nowrap">{a.label}</span>
                  </div>
                );
              })}
              {/* Spoke lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {advisors.map((_, i) => {
                  const angle = i * 60 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + 36 * Math.cos(rad);
                  const y = 50 + 36 * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1="50%" y1="50%"
                      x2={`${x}%`} y2={`${y}%`}
                      stroke="#3f3f46" strokeWidth="1"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="mt-6 space-y-2">
              {['Single structured client profile', 'All advisors aligned in real-time', 'Clear, managed client journey', 'Full coordination across the move'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                  <span className="text-xs text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 03 — THE EXECUTION OPPORTUNITY
// ============================================================
function ExecutionGap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const foundation = [
    'Strong founder vision and funding',
    'Early brand positioning and PR',
    'Technical resource in place',
    'Deep domain expertise',
  ];
  const gap = [
    'A clearly defined, monetisable product offering',
    'Validated customer demand and willingness to pay',
    'Repeatable, systemised acquisition channels',
    'A tightly scoped MVP',
    'An operating system for growth',
  ];

  return (
    <section id="gap" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">03</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">The Execution Opportunity</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-16 max-w-3xl"
        >
          The foundation is strong.
          <br />
          <span className="text-zinc-400">The execution gap is real.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Foundation */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-zinc-950 rounded-full" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">Current Foundation at RELO</span>
            </div>
            <div className="space-y-2">
              {foundation.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07 + 0.2 }}
                  className="flex items-start gap-4 p-4 border border-zinc-200 bg-white"
                >
                  <CheckCircle className="w-4 h-4 text-zinc-950 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-zinc-700 leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Gap */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 border border-zinc-300 rounded-full" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">What Needs to Be Built</span>
            </div>
            <div className="space-y-2">
              {gap.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07 + 0.3 }}
                  className="flex items-start gap-4 p-4 border border-dashed border-zinc-300"
                >
                  <div className="w-4 h-4 border border-zinc-300 rounded-full mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-zinc-600 leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 04 — HOW I OPERATE (Venn diagram)
// ============================================================
function ProposedRole() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section id="role" ref={ref} className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">04</span>
          <div className="w-8 h-[1px] bg-zinc-800" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">How I Operate</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white"
        >
          Embedded Execution Partner
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-400 mb-20 max-w-2xl font-light leading-relaxed"
        >
          Working directly alongside Rudy Metta and Jamie Marshall — not as an external
          consultant, but as an embedded operator responsible for product direction, growth
          systems and commercial structure.
        </motion.p>

        {/* Venn diagram */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center mb-16"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Top circle — Product Direction */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-52 md:w-64 md:h-64 rounded-full border border-zinc-700 bg-zinc-900/40 flex flex-col items-center justify-start pt-8 md:pt-10">
              <Layers className="w-5 h-5 text-zinc-500 mb-2" />
              <span className="text-xs font-bold text-zinc-300 tracking-wide">Product Direction</span>
              <span className="text-[10px] text-zinc-600 text-center px-6 mt-1">roadmap · scope · delivery</span>
            </div>
            {/* Bottom-left — Growth Systems */}
            <div className="absolute bottom-0 left-0 w-52 h-52 md:w-64 md:h-64 rounded-full border border-zinc-700 bg-zinc-900/40 flex flex-col items-center justify-end pb-8 md:pb-10">
              <TrendingUp className="w-5 h-5 text-zinc-500 mb-2" />
              <span className="text-xs font-bold text-zinc-300 tracking-wide">Growth Systems</span>
              <span className="text-[10px] text-zinc-600 text-center px-6 mt-1">acquisition · CRM · partnerships</span>
            </div>
            {/* Bottom-right — Commercial Structure */}
            <div className="absolute bottom-0 right-0 w-52 h-52 md:w-64 md:h-64 rounded-full border border-zinc-700 bg-zinc-900/40 flex flex-col items-center justify-end pb-8 md:pb-10">
              <DollarSign className="w-5 h-5 text-zinc-500 mb-2" />
              <span className="text-xs font-bold text-zinc-300 tracking-wide">Commercial Structure</span>
              <span className="text-[10px] text-zinc-600 text-center px-6 mt-1">monetisation · reporting · narrative</span>
            </div>
            {/* Centre label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 bg-zinc-950 border border-zinc-800 px-4 py-3">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white">Elliot Jones</p>
              <p className="text-[9px] text-zinc-500 mt-0.5">Embedded Operator</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 05 — WHAT I ACTUALLY DO
// ============================================================
function WhatIDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const quadrants = [
    {
      icon: Layers,
      title: 'Product Execution',
      items: [
        'Translate founder vision into scoped MVP',
        'Prioritise features against business goals',
        'Manage product direction and delivery',
        'Structure user journeys and workflows',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Growth Systems',
      items: [
        'Design and build acquisition channels',
        'CRM setup, automation and lead funnels',
        'Outbound workflow and partnership pipeline',
        'Referral attribution and conversion tracking',
      ],
    },
    {
      icon: BarChart2,
      title: 'Commercial Infrastructure',
      items: [
        'Validate pricing and willingness to pay',
        'Design monetisation architecture',
        'Build investor narrative and reporting',
        'Create operational metrics dashboard',
      ],
    },
    {
      icon: RefreshCw,
      title: 'Founder Leverage',
      items: [
        'Remove execution bottlenecks',
        'Coordinate cross-functional priorities',
        'Establish operating cadence',
        'Maintain momentum between decisions',
      ],
    },
  ];

  return (
    <section id="whatido" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">05</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">What I Actually Do</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl"
        >
          Operational, not advisory.
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-600 mb-16 max-w-2xl font-light leading-relaxed"
        >
          Not a consultant who presents decks. An operator who builds systems, drives decisions
          and maintains momentum — across product, growth and commercial.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-px bg-zinc-200">
          {quadrants.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.1 }}
              className="bg-[#F8F7F4] p-8 md:p-10 group hover:bg-zinc-950 transition-all duration-500 cursor-default"
            >
              <div className="flex items-center gap-4 mb-6">
                <q.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-400 transition-colors" />
                <h3 className="text-sm font-black tracking-tight group-hover:text-white transition-colors duration-300">
                  {q.title}
                </h3>
              </div>
              <div className="space-y-2.5">
                {q.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-3 h-[1px] bg-zinc-400 group-hover:bg-zinc-600 mt-2.5 flex-shrink-0 transition-colors" />
                    <span className="text-sm text-zinc-600 group-hover:text-zinc-400 leading-relaxed transition-colors duration-300 font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 06 — WHAT I BRING (6-card grid)
// ============================================================
function ValueCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const cards = [
    {
      icon: Target,
      title: 'Clarifying the Product',
      body: 'Not speculating about the future platform. Deciding what to build first, and why — translating vision into a concrete, monetisable product with clear scope and commercial logic.',
    },
    {
      icon: Search,
      title: 'Market Validation',
      body: 'Direct engagement with prospective customers to isolate pain points, decision triggers and willingness to pay.',
    },
    {
      icon: Zap,
      title: 'MVP Scope & Leadership',
      body: 'Defining a tight, high-value MVP and keeping delivery focused on what generates early signal.',
    },
    {
      icon: TrendingUp,
      title: 'Growth & Demand',
      body: 'Building referral partnerships with immigration firms, brokers, architects and family office networks. Outbound CRM, automated lead funnels and partnership-led acquisition.',
    },
    {
      icon: BarChart2,
      title: 'Commercial Model',
      body: 'Designing a scalable revenue architecture across advisory fees, subscriptions, referral commissions and corporate services.',
    },
    {
      icon: FileText,
      title: 'Investor Narrative',
      body: 'Engineering a concise strategic deck articulating market opportunity, unit economics and the growth roadmap for future capital.',
    },
  ];

  return (
    <section id="value" ref={ref} className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">06</span>
          <div className="w-8 h-[1px] bg-zinc-800" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">What I Bring</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-16 max-w-3xl"
        >
          Six capabilities.
          <br />
          <span className="text-zinc-500">One mandate: execution.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.1 }}
              className="bg-zinc-950 p-8 group hover:bg-zinc-900 transition-all duration-500 cursor-default"
            >
              <div className="mb-6">
                <card.icon className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <h3 className="text-sm font-bold tracking-tight mb-3 text-white">
                {card.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300 font-light">
                {card.body}
              </p>
              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-5 h-[1px] bg-zinc-700" />
                <span className="text-[9px] text-zinc-600 tracking-widest uppercase">Core Focus</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRODUCT MOCKUP COMPONENTS
// ============================================================

function IntakeFormMockup() {
  return (
    <div className="bg-white border border-zinc-200 p-5 w-full shadow-sm text-xs">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-zinc-100">
        <div className="w-2 h-2 bg-zinc-950 rounded-full" />
        <span className="font-black tracking-[0.2em] uppercase text-[10px] text-zinc-700">Relocation Intake</span>
        <span className="ml-auto text-[9px] bg-zinc-100 text-zinc-500 px-2 py-0.5">Step 2 of 5</span>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-[10px] text-zinc-400 mb-1.5 tracking-widest uppercase">Family Profile</div>
          <div className="border border-zinc-200 px-3 py-2 text-zinc-700 bg-zinc-50 text-[11px]">
            2 adults, 2 children (ages 8, 11)
          </div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400 mb-1.5 tracking-widest uppercase">Primary Driver</div>
          <div className="flex gap-2 flex-wrap">
            <div className="border border-zinc-950 px-3 py-1.5 text-[10px] font-bold bg-zinc-950 text-white">Tax efficiency</div>
            <div className="border border-zinc-200 px-3 py-1.5 text-[10px] text-zinc-400">Lifestyle</div>
            <div className="border border-zinc-200 px-3 py-1.5 text-[10px] text-zinc-400">Business access</div>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-400 mb-1.5 uppercase">Target Destinations</div>
          <div className="flex gap-2 flex-wrap">
            {['Miami', 'Dubai', 'Palm Beach'].map((d) => (
              <div key={d} className="bg-zinc-950 text-white px-3 py-1 text-[10px] font-medium">{d}</div>
            ))}
            <div className="border border-dashed border-zinc-300 px-3 py-1 text-[10px] text-zinc-400">+ Add</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
            <span>Profile completion</span><span className="font-bold text-zinc-700">75%</span>
          </div>
          <div className="w-full bg-zinc-100 h-1.5">
            <div className="bg-zinc-950 h-1.5" style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvisorMockup() {
  const advisors = [
    { name: 'James Chen', role: 'Tax Structuring', status: 'Active', flag: '🇺🇸' },
    { name: 'Sarah Al-Hassan', role: 'Immigration Law', status: 'Intro sent', flag: '🇦🇪' },
    { name: 'Mark Davies', role: 'Real Estate', status: 'Pending', flag: '🇬🇧' },
  ];
  return (
    <div className="bg-white border border-zinc-200 p-5 w-full shadow-sm text-xs">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-zinc-100">
        <Users className="w-3.5 h-3.5 text-zinc-950" />
        <span className="font-black tracking-[0.2em] uppercase text-[10px] text-zinc-700">Advisor Hub</span>
        <span className="ml-auto text-[9px] text-zinc-400">3 matched</span>
      </div>
      <div className="space-y-2">
        {advisors.map((a) => (
          <div key={a.name} className="flex items-center justify-between p-2.5 border border-zinc-100 hover:border-zinc-300 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-zinc-100 rounded-full flex items-center justify-center text-sm">
                {a.flag}
              </div>
              <div>
                <div className="font-bold text-[10px] text-zinc-800">{a.name}</div>
                <div className="text-[9px] text-zinc-400">{a.role}</div>
              </div>
            </div>
            <span className={`text-[9px] px-2 py-0.5 rounded-full ${
              a.status === 'Active'
                ? 'bg-zinc-950 text-white'
                : a.status === 'Intro sent'
                ? 'bg-zinc-200 text-zinc-600'
                : 'border border-zinc-200 text-zinc-400'
            }`}>
              {a.status}
            </span>
          </div>
        ))}
        <div className="pt-1">
          <button className="w-full border border-dashed border-zinc-200 text-[10px] text-zinc-400 py-2 hover:border-zinc-400 transition-colors">
            + Add Specialist
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkspaceMockup() {
  const tasks = [
    { label: 'Submit tax domicile filing', done: true, due: 'Done' },
    { label: 'School applications — Miami', done: true, due: 'Done' },
    { label: 'Sign lease — Brickell apartment', done: false, due: 'Jan 15' },
    { label: 'Open Chase Private Client account', done: false, due: 'Jan 20' },
    { label: 'Finalise Florida residency paperwork', done: false, due: 'Feb 1' },
  ];
  return (
    <div className="bg-white border border-zinc-200 p-5 w-full shadow-sm text-xs">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-zinc-100">
        <Briefcase className="w-3.5 h-3.5 text-zinc-950" />
        <span className="font-black tracking-[0.2em] uppercase text-[10px] text-zinc-700">Client Workspace</span>
        <span className="ml-auto text-[9px] bg-zinc-100 px-2 py-0.5 text-zinc-500">60% complete</span>
      </div>
      <div className="space-y-1">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-2.5 py-1.5 border-b border-zinc-50 last:border-0">
            <div className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
              t.done ? 'bg-zinc-950 border-zinc-950' : 'border-zinc-300'
            }`}>
              {t.done && <Check className="w-2 h-2 text-white" />}
            </div>
            <span className={`flex-1 text-[10px] leading-snug ${t.done ? 'line-through text-zinc-300' : 'text-zinc-700'}`}>
              {t.label}
            </span>
            <span className={`text-[9px] whitespace-nowrap ${t.done ? 'text-zinc-300' : 'text-zinc-500'}`}>{t.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrchestrationMockup() {
  const flows = [
    { from: 'Intake complete', to: 'Advisor matched', status: 'done' },
    { from: 'Advisor matched', to: 'Profile shared', status: 'done' },
    { from: 'Profile shared', to: 'Timeline set', status: 'active' },
    { from: 'Timeline set', to: 'Milestone 1', status: 'pending' },
  ];
  return (
    <div className="bg-white border border-zinc-200 p-5 w-full shadow-sm text-xs">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-zinc-100">
        <Network className="w-3.5 h-3.5 text-zinc-950" />
        <span className="font-black tracking-[0.2em] uppercase text-[10px] text-zinc-700">Workflow Orchestration</span>
        <span className="ml-auto text-[9px] bg-zinc-100 px-2 py-0.5 text-zinc-500">In progress</span>
      </div>
      <div className="space-y-2">
        {flows.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              f.status === 'done' ? 'bg-zinc-950' :
              f.status === 'active' ? 'bg-zinc-500 ring-2 ring-zinc-200' :
              'border border-zinc-300 bg-white'
            }`} />
            <span className={`text-[10px] flex-1 ${f.status === 'done' ? 'text-zinc-400 line-through' : f.status === 'active' ? 'text-zinc-800 font-medium' : 'text-zinc-400'}`}>
              {f.from}
            </span>
            <span className="text-zinc-300 text-[9px]">→</span>
            <span className={`text-[10px] ${f.status === 'done' ? 'text-zinc-400' : f.status === 'active' ? 'text-zinc-600' : 'text-zinc-300'}`}>
              {f.to}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
        <span className="text-[9px] text-zinc-400">Next: Assign tax advisor to milestone 2</span>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 07 — INITIAL PRODUCT HYPOTHESIS (4 modules)
// ============================================================
function ProductVision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  const modules = [
    {
      letter: 'A',
      title: 'Structured Intake',
      description:
        'Capture family, business, tax, lifestyle and timing requirements through a guided onboarding flow. Build a structured client profile — the foundation that every advisor and workflow step depends on.',
      features: ['Family & lifestyle profiling', 'Complexity scoring', 'Advisor needs mapping', 'Structured client record'],
      mockup: <IntakeFormMockup />,
    },
    {
      letter: 'B',
      title: 'Advisor Coordination Hub',
      description:
        'Match clients with vetted specialists across tax, legal, immigration, real estate and banking. Every advisor works from the same structured client profile — no repeated onboarding, no misalignment.',
      features: ['Vetted advisor matching', 'Shared client profile', 'Status & responsibility tracking', 'No repeated onboarding'],
      mockup: <AdvisorMockup />,
    },
    {
      letter: 'C',
      title: 'Client Workspace',
      description:
        'Central dashboard for the full relocation journey. Tasks, documents, timelines and decisions — one shared source of truth for client and advisors.',
      features: ['Task & milestone tracking', 'Document management', 'Shared timeline', 'Clear next steps'],
      mockup: <WorkspaceMockup />,
    },
    {
      letter: 'D',
      title: 'Workflow Orchestration',
      description:
        'The operational backbone that connects intake, advisors and client — tracking what needs to happen, who is responsible and what is blocking progress. This is the core infrastructure that makes RELO\'s coordination model work.',
      features: ['Structured task and status tracking', 'Advisor responsibility assignment', 'Milestone and deadline management', 'Clear escalation and next-step logic'],
      mockup: <OrchestrationMockup />,
    },
  ];

  return (
    <section id="product" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">07</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">Initial Product Hypothesis</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl"
        >
          The minimum
          <br />
          <span className="text-zinc-400">viable product.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-600 mb-20 max-w-2xl font-light leading-relaxed"
        >
          This is my recommended MVP direction — the core operational workflows that need to be
          validated first. Not the full platform vision. The product is not the dashboard.
          The product is the coordination layer.
        </motion.p>

        {/* Product modules — stacked rows */}
        <div className="space-y-px bg-zinc-200">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.1 }}
              className="bg-[#F8F7F4] grid md:grid-cols-2 gap-0"
            >
              <div className={`p-8 md:p-12 ${i % 2 === 0 ? 'md:border-r' : 'md:order-2'} border-zinc-200`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 bg-zinc-950 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[11px] font-black">{mod.letter}</span>
                  </div>
                  <h3 className="text-base font-black tracking-tight">{mod.title}</h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-light">{mod.description}</p>
                <div className="space-y-2">
                  {mod.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-3 h-[1px] bg-zinc-400 flex-shrink-0" />
                      <span className="text-xs text-zinc-600">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`p-8 flex items-center bg-zinc-50 ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                {mod.mockup}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future-state callout */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-8 border border-dashed border-zinc-300 p-6 flex items-start gap-4"
        >
          <div className="w-1 h-full min-h-[2rem] bg-zinc-300 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-400 mb-1">Future State</p>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Everything else — destination intelligence, referral engine, reporting and analytics —
              is future-state. The MVP is the coordination workflow.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 07b — PROTOTYPE CONCEPT
// ============================================================
function PrototypeDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <section id="prototype" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">07b</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">Prototype Concept</span>
        </motion.div>

        <div className="flex flex-wrap items-start gap-5 mb-4">
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl"
          >
            The workflow,
            <br />
            <span className="text-zinc-400">brought to life.</span>
          </motion.h2>
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="flex items-center gap-2 bg-zinc-950 text-white px-4 py-2 mt-2"
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Try me</span>
          </motion.div>
        </div>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-600 mb-12 max-w-2xl font-light leading-relaxed"
        >
          This lightweight prototype illustrates how RELO could simplify and coordinate the
          relocation process through a single workflow-driven experience. It is intentionally
          illustrative — a concept demo, not a live product.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          <RELOPrototype />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 08 — HOW IT WORKS (5-step journey)
// ============================================================
function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const [hovered, setHovered] = useState(null);

  const steps = [
    { num: '01', title: 'Share Goals', icon: FileText, body: 'Client completes guided intake across family, business, tax and lifestyle priorities.' },
    { num: '02', title: 'Build Profile', icon: UserCheck, body: "RELO structures the client's needs, urgency, complexity and advisor requirements." },
    { num: '03', title: 'Coordinate Advisors', icon: Network, body: 'RELO connects and aligns the right specialists around a single shared client profile.' },
    { num: '04', title: 'Execute Workflow', icon: Settings, body: 'Tasks, responsibilities and milestones are tracked across advisors and client through one workspace.' },
    { num: '05', title: 'Complete Move', icon: CheckCircle, body: 'Client reaches completion with full visibility and documentation across every step.' },
  ];

  return (
    <section id="how" ref={ref} className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">08</span>
          <div className="w-8 h-[1px] bg-zinc-800" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">How It Works</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-16"
        >
          From first contact to
          <br />
          <span className="text-zinc-500">executed move.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-zinc-800">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.1 }}
              className="bg-zinc-950 p-6 group hover:bg-zinc-900 transition-colors duration-300 cursor-default"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="mb-6">
                <span className="text-[3rem] font-black leading-none text-zinc-800 group-hover:text-zinc-700 transition-colors">
                  {step.num}
                </span>
              </div>
              <step.icon className="w-5 h-5 text-zinc-600 group-hover:text-zinc-300 transition-colors mb-4" />
              <h3 className="text-sm font-bold text-white mb-2 tracking-tight">{step.title}</h3>
              <p className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex gap-px">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 h-[2px] bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full bg-white origin-left"
                animate={{ scaleX: hovered !== null && i <= hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 09 — TARGET SEGMENT
// ============================================================
function StrategicHypothesis() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const triggers = ['Tax efficiency', 'Investment positioning', 'Lifestyle upgrade', 'Family trajectory', 'Business access'];
  const why = [
    'High lifetime value — complex moves command premium advisory fees',
    'Complex decision making that requires trusted, coordinated advisors',
    'Reachable via professional referral networks and targeted outbound',
    'Generates secondary referrals across property, legal, tax and finance',
    'Earliest adopters who will advocate within their networks',
  ];

  return (
    <section id="hypothesis" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">09</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">Target Segment</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-16 max-w-3xl"
        >
          Start with the highest-value,
          <br />
          <span className="text-zinc-400">highest-complexity client.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-px bg-zinc-200">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="bg-[#F8F7F4] p-8"
          >
            <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">Target Segment</div>
            <p className="text-lg font-black leading-snug tracking-tight">
              High-net-worth entrepreneurs, investors and globally mobile families
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="bg-[#F8F7F4] p-8"
          >
            <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-4">Decision Triggers</div>
            <div className="space-y-2.5">
              {triggers.map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full flex-shrink-0" />
                  <span className="text-sm text-zinc-700">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="bg-zinc-950 text-white p-8"
          >
            <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-4">Why This Segment</div>
            <div className="space-y-3">
              {why.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-3 h-[1px] bg-zinc-600 mt-2.5 flex-shrink-0" />
                  <span className="text-xs text-zinc-400 leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 10 — GO-TO-MARKET STRATEGY
// ============================================================
function AcquisitionLoop() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const stages = [
    {
      num: '01',
      title: 'Partnership-Led Distribution',
      body: 'Build referral relationships with the professionals who already advise clients on the move: immigration firms, tax advisors, real estate brokers, architects, private client bankers, family office networks and wealth managers.',
      icon: Target,
    },
    {
      num: '02',
      title: 'Qualified Intake & CRM',
      body: 'Structured intake captures intent, complexity and requirements. Every lead enters a CRM funnel with automated qualification, scoring and sequenced follow-up. No manual admin.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'Concierge Workflow Delivery',
      body: 'Execute the relocation cleanly. Founder-led relationship management for high-value clients. Operational delivery through the coordination platform.',
      icon: Settings,
    },
    {
      num: '04',
      title: 'Referral & Network Compounding',
      body: 'Each successful engagement generates referrals across the network — to advisors, to peer clients, back into the professional partner ecosystem.',
      icon: RefreshCw,
    },
  ];

  const channels = [
    'Referral partnerships — immigration, tax, legal, real estate',
    'Family office and private client networks',
    'Wealth manager introductions',
    'Targeted outbound to founder and investor communities',
    'Automated CRM sequences and lead qualification',
    'High-intent relocation content — LinkedIn, niche media',
    'Architect and interior design referral network',
    'Founder community events and peer networks',
  ];

  return (
    <section id="loop" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">10</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">Go-to-Market Strategy</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl"
        >
          Practical distribution.
          <br />
          <span className="text-zinc-400">Specific channels. Commercial traction.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-600 mb-20 max-w-2xl font-light leading-relaxed"
        >
          The acquisition model is not reliant on brand awareness or organic search. It is built
          on referral partnerships, targeted outbound and CRM-driven follow-up — the channels
          that reach high-intent, high-value clients.
        </motion.p>

        {/* 2×2 loop grid */}
        <div className="relative mb-8">
          <div className="grid md:grid-cols-2 gap-px bg-zinc-200">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 + 0.1 }}
                className="bg-[#F8F7F4] p-8 md:p-10 group hover:bg-zinc-950 transition-all duration-500 cursor-default relative"
              >
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
                    {i !== 1 && (
                      <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-700" />
                    )}
                  </div>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-black text-zinc-200 group-hover:text-zinc-700 transition-colors leading-none">
                    {stage.num}
                  </span>
                  <stage.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-400 transition-colors" />
                </div>
                <h3 className="text-sm font-black tracking-tight mb-2 group-hover:text-white transition-colors">
                  {stage.title}
                </h3>
                <p className="text-sm text-zinc-600 group-hover:text-zinc-400 transition-colors font-light leading-relaxed">
                  {stage.body}
                </p>
                {i === 3 && (
                  <div className="mt-6 flex items-center gap-2">
                    <RefreshCw className="w-3 h-3 text-zinc-300 group-hover:text-zinc-600" />
                    <span className="text-[9px] tracking-widest uppercase text-zinc-400 group-hover:text-zinc-500">Loop repeats</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Distribution channels */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="border border-zinc-200 p-8"
        >
          <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-6">Distribution Channels</div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {channels.map((ch, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-3 h-[1px] bg-zinc-400 mt-2.5 flex-shrink-0" />
                <span className="text-sm text-zinc-600 font-light leading-relaxed">{ch}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 11 — FOUR-MONTH EXECUTION ROADMAP
// ============================================================
function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const stages = [
    {
      num: '01', title: 'Discovery & Validation', duration: 'Month 1',
      items: ['Founder workshops', 'Competitive analysis', 'Customer interviews', 'Market research', 'Offer definition', 'Initial messaging'],
    },
    {
      num: '02', title: 'Product & GTM Definition', duration: 'Month 2',
      items: ['MVP specification', 'Customer journey mapping', 'CRM setup', 'Acquisition plan', 'Partnership outreach'],
    },
    {
      num: '03', title: 'Build & Launch Preparation', duration: 'Month 3',
      items: ['Product oversight', 'Funnel implementation', 'Automation setup', 'Analytics configuration', 'Beta client onboarding'],
    },
    {
      num: '04', title: 'Early Traction', duration: 'Month 4',
      items: ['Pilot launch', 'Usage monitoring', 'Conversion optimisation', 'Pricing refinement', 'Investor deck development'],
    },
  ];

  return (
    <section id="roadmap" ref={ref} className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">11</span>
          <div className="w-8 h-[1px] bg-zinc-800" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">Four-Month Execution Roadmap</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-16"
        >
          From validation to
          <br />
          <span className="text-zinc-500">early traction.</span>
        </motion.h2>

        <div className="relative mb-8">
          <div className="hidden md:block absolute top-5 left-0 right-0 h-[1px] bg-zinc-800 pointer-events-none" />

          <div className="grid md:grid-cols-4 gap-px bg-zinc-800">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.1 }}
                className="bg-zinc-950 p-6 md:p-8 group hover:bg-zinc-900 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full border-2 border-zinc-700 group-hover:border-zinc-400 transition-colors bg-zinc-950 relative z-10" />
                  <span className="text-[10px] text-zinc-600">{stage.duration}</span>
                </div>
                <span className="text-[2.5rem] font-black leading-none text-zinc-800 group-hover:text-zinc-700 transition-colors block mb-4">
                  {stage.num}
                </span>
                <h3 className="text-sm font-black text-white mb-5 tracking-tight">{stage.title}</h3>
                <div className="space-y-2">
                  {stage.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-zinc-700 rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-[11px] text-zinc-500 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 12 — END-OF-ENGAGEMENT DELIVERABLES
// ============================================================
function Deliverables() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const items = [
    'Clearly defined and validated product strategy',
    'Mapped ideal customer profiles and behavioural insights',
    'Prioritised MVP scope',
    'Live acquisition channels and CRM systems',
    'Tested commercial revenue model',
    'Live performance dashboard for leadership',
    'Investor deck for future capital raising',
  ];

  return (
    <section id="deliverables" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">12</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">End-of-Engagement Deliverables</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 max-w-lg">
              What RELO will have
              <br />
              at the end of four months.
            </h2>
            <p className="text-zinc-600 font-light leading-relaxed">
              Not outputs. Commercial infrastructure. Each deliverable is a compounding
              asset for the next stage of growth.
            </p>
          </motion.div>

          <div className="space-y-2">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="flex items-start gap-4 p-4 border border-zinc-200 bg-white group hover:border-zinc-950 transition-all duration-300"
              >
                <div className="w-5 h-5 bg-zinc-950 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-sm text-zinc-700 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 13 — COMMERCIAL STRUCTURE (3 pricing cards)
// ============================================================
function Commercial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const options = [
    {
      label: 'Option 1',
      name: 'Balanced',
      preferred: true,
      monthly: '£1,500',
      equity: '5%',
      details: ['£1,500 per month retainer', '5% equity stake', '4-year vesting schedule', '12-month cliff'],
      note: 'Balances immediate capital preservation with long-term alignment.',
    },
    {
      label: 'Option 2',
      name: 'Equity Heavy',
      preferred: false,
      monthly: '£500',
      equity: '10%',
      details: ['£500 per month retainer', '10% equity stake', 'Subject to scope and commitment', 'Higher operational involvement'],
      note: 'Maximises cash runway for RELO and reflects higher operational involvement.',
    },
    {
      label: 'Option 3',
      name: 'Project Based',
      preferred: false,
      monthly: 'Fixed',
      equity: 'Optional',
      details: ['Fixed 4-month engagement fee', 'Equity participation optional', 'Clean, fixed-cost engagement', 'Initial build and validation phase'],
      note: 'Clean, fixed-cost engagement for the initial build and validation phase.',
    },
  ];

  return (
    <section id="commercial" ref={ref} className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">13</span>
          <div className="w-8 h-[1px] bg-zinc-800" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">Commercial Structure</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4"
        >
          Three structures.
          <br />
          <span className="text-zinc-500">One mandate.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-400 mb-16 max-w-xl font-light leading-relaxed"
        >
          Designed to align incentives and suit the current stage of RELO's capital strategy.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-4">
          {options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.1 }}
              className={`relative p-8 border transition-all duration-300 ${
                opt.preferred
                  ? 'border-white bg-white text-zinc-950'
                  : 'border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {opt.preferred && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-zinc-950 text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 border border-zinc-700">
                    Preferred
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`text-[9px] tracking-[0.25em] uppercase mb-1 ${opt.preferred ? 'text-zinc-500' : 'text-zinc-600'}`}>
                  {opt.label}
                </div>
                <h3 className={`text-xl font-black tracking-tight ${opt.preferred ? 'text-zinc-950' : 'text-white'}`}>
                  {opt.name}
                </h3>
              </div>

              <div className="flex items-end gap-5 mb-8">
                <div>
                  <div className={`text-3xl font-black leading-none ${opt.preferred ? 'text-zinc-950' : 'text-white'}`}>
                    {opt.monthly}
                  </div>
                  <div className={`text-[10px] mt-1 ${opt.preferred ? 'text-zinc-400' : 'text-zinc-600'}`}>/ month</div>
                </div>
                <div className={`text-base pb-0.5 ${opt.preferred ? 'text-zinc-300' : 'text-zinc-700'}`}>+</div>
                <div>
                  <div className={`text-3xl font-black leading-none ${opt.preferred ? 'text-zinc-950' : 'text-white'}`}>
                    {opt.equity}
                  </div>
                  <div className={`text-[10px] mt-1 ${opt.preferred ? 'text-zinc-400' : 'text-zinc-600'}`}>equity</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {opt.details.map((d, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${opt.preferred ? 'bg-zinc-400' : 'bg-zinc-700'}`} />
                    <span className={`text-xs leading-relaxed ${opt.preferred ? 'text-zinc-600' : 'text-zinc-400'}`}>{d}</span>
                  </div>
                ))}
              </div>

              <p className={`text-xs italic leading-relaxed border-t pt-4 ${
                opt.preferred ? 'border-zinc-200 text-zinc-500' : 'border-zinc-800 text-zinc-500'
              }`}>
                {opt.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Engineering add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}
          className="mt-4 border border-dashed border-zinc-700 p-6 flex flex-col md:flex-row md:items-center gap-6"
        >
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-[9px] tracking-[0.25em] uppercase text-zinc-600">Add-on</div>
            <div className="text-2xl font-black text-white leading-none">£1,000</div>
            <div className="text-[10px] text-zinc-600">/ month</div>
          </div>
          <div className="w-px h-8 bg-zinc-800 hidden md:block flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-bold text-white mb-1">Engineering Support</div>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Optional access to Elliot's engineering team for build support, technical
              implementation and product delivery — available as a monthly add-on to any structure above.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 14 — ABOUT ELLIOT
// ============================================================
function AboutElliot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const credentials = [
    { org: 'ADVSR.ai', detail: 'Architected and scaled digital platforms and AI-powered marketplace infrastructure.', tag: 'Founder' },
    { org: 'Knight Frank LLP', detail: 'Led digital initiatives and growth strategy across one of the world\'s leading real estate advisors.', tag: 'Strategy' },
    { org: 'Hamptons International', detail: 'Strategic product development and operational leadership across premium residential markets.', tag: 'Product' },
    { org: 'Countrywide PLC', detail: 'Digital transformation and operational leadership at significant scale.', tag: 'Leadership' },
  ];

  const competencies = [
    'Marketplace development',
    'Growth marketing',
    'CRM automation',
    'AI workflows',
    'Relocation-adjacent PropTech',
  ];

  return (
    <section id="about" ref={ref} className="bg-[#F8F7F4] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">14</span>
          <div className="w-8 h-[1px] bg-zinc-300" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400">About Elliot Jones</span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 max-w-3xl"
        >
          An operator,
          <br />
          <span className="text-zinc-400">not a consultant.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-zinc-600 mb-16 max-w-2xl font-light leading-relaxed"
        >
          Background in building and scaling product across real estate technology and
          high-net-worth advisory. What that means for RELO: I know what good product looks
          like in this space, I know how to structure acquisition at the high end, and I know
          how to build operational systems that compound over time.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Track record */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-6">Track Record</div>
            <div className="space-y-3">
              {credentials.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="p-5 border border-zinc-200 bg-white group hover:border-zinc-950 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-black tracking-tight">{c.org}</span>
                    <span className="text-[9px] bg-zinc-100 text-zinc-500 px-2 py-0.5 uppercase">{c.tag}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{c.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Competencies + contact */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-6">Core Competencies</div>
            <div className="space-y-2 mb-8">
              {competencies.map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-zinc-200 bg-white">
                  <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full flex-shrink-0" />
                  <span className="text-sm text-zinc-700">{c}</span>
                </div>
              ))}
            </div>

            <div className="bg-zinc-950 text-white p-6">
              <div className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-4">Contact</div>
              <p className="text-sm text-zinc-200 font-light mb-1">elliot@evjdigital.com</p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Available for a 90-minute working session at short notice.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 15 — FINAL CTA
// ============================================================
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section id="cta" ref={ref} className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">15</span>
            <div className="w-8 h-[1px] bg-zinc-800" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">Next Steps</span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-4xl md:text-6xl font-black tracking-tight mb-12 leading-[0.92]"
          >
            Suggested next step:
            <br />
            a 90-minute
            <br />
            working session.
          </motion.h2>

          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="space-y-5 mb-14"
          >
            {[
              'Align on vision and immediate priorities',
              'Agree scope and commercial structure',
              'Define the precise 30-day execution plan',
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-5">
                <span className="text-zinc-700 text-sm font-black w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-zinc-300 text-sm leading-relaxed font-light">{obj}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <a
              href="mailto:elliot@evjdigital.com?subject=RELO%20x%20Elliot%20Jones%20%E2%80%94%20Working%20Session"
              className="group inline-flex items-center gap-3 bg-white text-zinc-950 px-10 py-5 text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-100 transition-all duration-300"
            >
              Book Working Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-black tracking-[0.25em] uppercase text-white">RELO</span>
            <span className="text-zinc-700">×</span>
            <span className="text-sm tracking-[0.2em] uppercase text-zinc-500 font-light">Elliot Jones</span>
          </div>
          <span className="text-[10px] text-zinc-700 tracking-widest">
            The Coordination Infrastructure · Strategic Proposal · 2026
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ROOT APP — assembles all sections
// ============================================================
export default function App() {
  return (
    <div className="bg-[#F8F7F4] antialiased">
      <ProgressBar />
      <Header />
      <Hero />
      <Problem />
      <ExecutionGap />
      <ProposedRole />
      <WhatIDo />
      <ValueCards />
      <ProductVision />
      <PrototypeDemo />
      <HowItWorks />
      <StrategicHypothesis />
      <AcquisitionLoop />
      <Roadmap />
      <Deliverables />
      <Commercial />
      <AboutElliot />
      <FinalCTA />
    </div>
  );
}
