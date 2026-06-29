import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smartphone, Zap, Globe, TrendingUp, CheckCircle, X, ArrowRight, Music, Camera, Home, Utensils, Sparkles, Star, Users, ChevronDown } from 'lucide-react'
import {
  PhoneMockup,
  PostEventScreen,
  AIMatchingScreen,
  SupplierMatchScreen,
  QuoteCompareScreen,
  ChatScreen,
  BookingScreen,
  PaymentsScreen,
} from './EventsyPrototype'

gsap.registerPlugin(ScrollTrigger)

// ─── Design tokens ────────────────────────────────────────────────────────────

const V = {
  accent: '#7C3AED',
  accentLight: '#A78BFA',
  bg: '#000000',
  surface: '#0D0D0D',
  border: 'rgba(255,255,255,0.08)',
}

// ─── Framer Motion variants ───────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerFade({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-black/70 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold tracking-widest text-sm uppercase">Eventsy</span>
        <div className="flex items-center gap-3">

        </div>
      </div>
    </header>
  )
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroPhone({ screen, style, delay }) {
  const screens = {
    post: <PostEventScreen />,
    supplier: <SupplierMatchScreen />,
    payment: <PaymentsScreen />,
  }
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <PhoneMockup>{screens[screen]}</PhoneMockup>
      </motion.div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-xs uppercase tracking-widest mb-8"
        >
          Eventsy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-bold leading-[0.9] mb-8"
          style={{ fontSize: 'clamp(2.4rem, 7.2vw, 6rem)' }}
        >
          The operating system
          <br />
          for the{' '}
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            events industry.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          A mobile-first marketplace connecting event organisers with suppliers —
          from discovery to payment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('walkthrough')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl text-white font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
          >
            View Prototype
          </button>
          <button
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl text-white font-medium border border-white/15 hover:bg-white/5 transition-all"
          >
            Investor Overview
          </button>
        </motion.div>
      </div>

      {/* Floating phones — hidden on small screens */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <HeroPhone screen="post" style={{ left: '8%', top: '50%', transform: 'translateY(-50%) rotate(-8deg)', opacity: 0.7 }} delay={0.7} />
        <HeroPhone screen="supplier" style={{ right: '8%', top: '50%', transform: 'translateY(-50%) rotate(8deg)', opacity: 0.7 }} delay={0.9} />
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={20} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Section 2: The Problem ───────────────────────────────────────────────────

const problemFrames = [
  { stat: '17', tab: '17 tabs', label: 'browser tabs open at once', sub: 'Sourcing suppliers means Google, Instagram, Facebook groups, WhatsApp, and prayer.' },
  { stat: '∞', tab: '∞ DMs', label: 'WhatsApp conversations', sub: 'Pricing. Availability. Changes. All buried in your DMs.' },
  { stat: '£0', tab: '£0 pricing', label: 'pricing transparency', sub: 'No standard rates. No benchmarks. Just vibes and guesswork.' },
  { stat: '0', tab: '0 workflow', label: 'central workflow', sub: 'No single place to manage quotes, contracts, communication, or payments.' },
  { stat: '?', tab: '? sourcing', label: 'supplier discovered via Instagram DM', sub: 'The events industry runs on word of mouth and luck.' },
]

function Problem() {
  const [activeFrame, setActiveFrame] = useState(0)

  return (
    <section id="problem" className="bg-black py-32">
      <div className="w-full max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The problem</p>
          <h2
            className="text-white font-bold mb-16"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            The broken status quo
          </h2>
        </FadeUp>

        {/* Tab strip */}
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {problemFrames.map((frame, i) => (
              <button
                key={i}
                onClick={() => setActiveFrame(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  i === activeFrame
                    ? 'bg-violet-500 text-white'
                    : 'bg-white/8 text-white/40 hover:bg-white/12 hover:text-white/70'
                }`}
              >
                {frame.tab}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Active stat detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFrame}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <p
              className="font-black text-white leading-none mb-4"
              style={{ fontSize: 'clamp(4rem, 14.4vw, 11.2rem)' }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {problemFrames[activeFrame].stat}
              </span>
            </p>
            <p className="text-white text-xl md:text-3xl font-semibold mb-4">
              {problemFrames[activeFrame].label}
            </p>
            <p className="text-white/40 text-base md:text-lg max-w-lg mx-auto">
              {problemFrames[activeFrame].sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Closing line */}
        <p
          className="font-bold text-white mt-20"
          style={{ fontSize: 'clamp(1.2rem, 3.2vw, 2.4rem)' }}
        >
          Event planning has evolved.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The infrastructure behind it hasn&apos;t.
          </span>
        </p>
      </div>
    </section>
  )
}

// ─── Section 3: The Shift / Why Now ──────────────────────────────────────────

const shiftCards = [
  {
    icon: <Smartphone size={22} className="text-violet-400" />,
    title: 'Mobile-first generation',
    body: 'People expect instant, seamless experiences. Booking a supplier should feel like ordering a taxi, not sending a cold email.',
  },
  {
    icon: <Sparkles size={22} className="text-violet-400" />,
    title: 'Creator economy explosion',
    body: 'Events are becoming more experiential and content-driven. The demand for quality suppliers has never been higher.',
  },
  {
    icon: <Globe size={22} className="text-violet-400" />,
    title: 'Trust marketplaces win',
    body: 'Consumers already trust Uber, Airbnb, and Deliveroo. The events industry is the last major vertical without one.',
  },
]

function Shift() {
  return (
    <section id="shift" className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Why now</p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            Consumer behaviour has changed.
          </h2>
        </FadeUp>

        <StaggerFade className="grid md:grid-cols-3 gap-6">
          {shiftCards.map(card => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="border border-white/8 rounded-3xl p-8 hover:border-violet-500/40 transition-colors duration-300"
              style={{ background: V.surface }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-5">{card.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-3">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </StaggerFade>

        <FadeUp delay={0.3} className="text-center mt-20">
          <p
            className="text-white/60 font-light"
            style={{ fontSize: 'clamp(0.88rem, 2vw, 1.28rem)' }}
          >
            The events industry is overdue for a unified platform.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Section 4: Introducing Eventsy ──────────────────────────────────────────

const suppliers4 = [
  { label: 'DJs', angle: 0, icon: '🎧' },
  { label: 'Photographers', angle: 60, icon: '📸' },
  { label: 'Venues', angle: 120, icon: '🏛️' },
  { label: 'Caterers', angle: 180, icon: '🍽️' },
  { label: 'Decorators', angle: 240, icon: '🌸' },
  { label: 'Entertainment', angle: 300, icon: '🎭' },
]

function EcosystemDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const cx = 200
  const cy = 200
  const r = 130

  return (
    <div ref={ref} className="relative w-full flex justify-center">
      <svg width="400" height="400" viewBox="0 0 400 400" className="max-w-full">
        {/* Connecting lines */}
        {suppliers4.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180
          const x2 = cx + r * Math.cos(rad)
          const y2 = cy + r * Math.sin(rad)
          return (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="#7C3AED"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="200"
              initial={{ strokeDashoffset: 200 }}
              animate={inView ? { strokeDashoffset: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
            />
          )
        })}

        {/* Centre node */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={36}
          fill="#7C3AED"
          fillOpacity="0.15"
          stroke="#7C3AED"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <text x={cx} y={cy + 5} textAnchor="middle" fill="#A78BFA" fontSize="12" fontWeight="700" fontFamily="Inter">
          EVENTSY
        </text>

        {/* Supplier nodes */}
        {suppliers4.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180
          const x = cx + r * Math.cos(rad)
          const y = cy + r * Math.sin(rad)
          const lx = cx + (r + 52) * Math.cos(rad)
          const ly = cy + (r + 52) * Math.sin(rad)
          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r={22}
                fill="#0D0D0D"
                stroke="#7C3AED"
                strokeWidth="1"
                strokeOpacity="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
              <text x={x} y={y + 6} textAnchor="middle" fontSize="16">{s.icon}</text>
              <motion.text
                x={lx}
                y={ly + 4}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="9"
                fontFamily="Inter"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.08 }}
              >
                {s.label}
              </motion.text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Introducing() {
  return (
    <section id="introducing" className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The platform</p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            One platform for the entire booking journey.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15} className="text-center mb-20">
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Eventsy connects organisers with trusted suppliers — while managing
            communication, quotes, bookings, and payments in one place.
          </p>
        </FadeUp>

        <EcosystemDiagram />
      </div>
    </section>
  )
}

// ─── Section 5: Product Walkthrough ──────────────────────────────────────────

const STEPS = [
  { label: 'Post an event', desc: 'Describe your event once — date, location, guests, budget, and services.' },
  { label: 'AI matches suppliers', desc: 'Eventsy scans 200+ verified DJs and finds the best matches for you.' },
  { label: 'Choose a supplier', desc: 'Browse your matches. Tap any card to open a direct conversation.' },
  { label: 'Message thread', desc: 'Negotiate, ask questions, and agree terms — all in one place.' },
  { label: 'Compare quotes', desc: 'See all offers side by side with pricing, reviews, and availability.' },
  { label: 'Secure the booking', desc: 'Confirm, sign off on terms, and pay your deposit in one flow.' },
  { label: 'Event control centre', desc: 'Track every supplier, payment, and deadline from one dashboard.' },
]

function WalkthroughPhone({ step, onAdvance }) {
  switch (step) {
    case 0: return <PostEventScreen onNext={onAdvance} />
    case 1: return <AIMatchingScreen onComplete={onAdvance} />
    case 2: return <SupplierMatchScreen onSelectSupplier={onAdvance} />
    case 3: return <ChatScreen />
    case 4: return <QuoteCompareScreen />
    case 5: return <BookingScreen />
    case 6: return <PaymentsScreen />
    default: return <PostEventScreen onNext={onAdvance} />
  }
}

function Walkthrough() {
  const [activeStep, setActiveStep] = useState(0)

  const advance = () => setActiveStep(s => Math.min(s + 1, STEPS.length - 1))

  return (
    <section id="walkthrough" className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Product demo</p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            See how it works.
          </h2>
        </FadeUp>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">

          {/* Phone */}
          <div className="shrink-0 lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <PhoneMockup>
                  <WalkthroughPhone step={activeStep} onAdvance={advance} />
                </PhoneMockup>
              </motion.div>
            </AnimatePresence>

            {/* Step hint below phone */}
            <p className="text-white/25 text-xs text-center mt-4">
              {activeStep === 0 && 'Tap "Find Suppliers" to continue'}
              {activeStep === 1 && 'Matching in progress…'}
              {activeStep === 2 && 'Tap Bass & Beats to open chat'}
              {activeStep > 2 && `Step ${activeStep + 1} of ${STEPS.length}`}
            </p>
          </div>

          {/* Step list */}
          <div className="flex-1 w-full">
            {STEPS.map((step, i) => {
              const isActive = i === activeStep
              const isDone = i < activeStep
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left flex items-start gap-5 py-5 border-b transition-all duration-300 ${
                    isActive ? 'border-white/10' : 'border-white/5'
                  }`}
                >
                  {/* Indicator */}
                  <div className="shrink-0 mt-0.5">
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                        isActive
                          ? 'border-violet-500 bg-violet-500/20 text-violet-400'
                          : isDone
                          ? 'border-violet-800/60 bg-violet-900/20 text-violet-700'
                          : 'border-white/12 text-white/20'
                      }`}
                    >
                      {isDone
                        ? <CheckCircle size={13} className="text-violet-600" />
                        : <span>{String(i + 1).padStart(2, '0')}</span>
                      }
                    </div>
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p
                      className={`font-semibold text-base transition-colors duration-300 ${
                        isActive ? 'text-white' : isDone ? 'text-white/40' : 'text-white/25'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-sm mt-1 leading-relaxed transition-colors duration-300 ${
                        isActive ? 'text-white/55' : 'text-white/0'
                      }`}
                      style={{ maxHeight: isActive ? '60px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </button>
              )
            })}

            {/* Reset */}
            {activeStep === STEPS.length - 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setActiveStep(0)}
                className="mt-6 text-violet-400/70 text-sm hover:text-violet-400 transition-colors"
              >
                ↩ Start over
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


// ─── Section 6b: Market Opportunity ──────────────────────────────────────────

const budgetRows = [
  { label: 'Venue & AV',           pct: 30 },
  { label: 'Catering',             pct: 25 },
  { label: 'Decor & Rentals',      pct: 12 },
  { label: 'Entertainment',        pct:  8 },
  { label: 'Photo & Video',        pct:  8 },
  { label: 'Event Planner',        pct:  8 },
]

function MarketOpportunity() {
  return (
    <section id="market" className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The opportunity</p>
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            A £61.65 billion industry{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              still running on spreadsheets.
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-2xl mx-auto">
            The UK events industry is one of the country's largest service sectors — yet sourcing, booking, and managing suppliers still happens across emails, DMs, and PDFs.
          </p>
        </FadeUp>

        {/* TAM / SAM / SOM cards */}
        <StaggerFade className="grid md:grid-cols-3 gap-4 mb-20">
          {[
            {
              stat: '£61.65bn',
              label: 'Total Addressable Market',
              sub: 'UK events industry — VisitBritain',
              large: true,
            },
            {
              stat: '£33.6bn',
              label: 'Serviceable Market',
              sub: 'UK business events: conferences, exhibitions, corporate meetings',
              large: false,
            },
            {
              stat: 'London',
              label: 'Where we launch',
              sub: 'Corporate events & supplier marketplace — the highest-value, highest-frequency segment',
              large: false,
            },
          ].map(item => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="rounded-2xl border border-white/5 p-8 flex flex-col gap-3"
              style={{ background: V.surface }}
            >
              <p
                className="font-black leading-none"
                style={{
                  fontSize: item.large ? 'clamp(2rem, 5vw, 3.2rem)' : 'clamp(1.6rem, 4vw, 2.4rem)',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {item.stat}
              </p>
              <p className="text-white font-semibold text-sm uppercase tracking-widest">{item.label}</p>
              <p className="text-white/40 text-sm leading-relaxed">{item.sub}</p>
            </motion.div>
          ))}
        </StaggerFade>

        {/* Budget breakdown */}
        <FadeUp>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Where event budgets are spent</p>
          <p className="text-white font-semibold mb-8" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
            Every one of these categories is a transaction Eventsy can own.
          </p>
          <div className="space-y-3">
            {budgetRows.map(row => (
              <div key={row.label} className="flex items-center gap-4">
                <span className="text-white/40 text-sm w-36 shrink-0 text-right">{row.label}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)', width: `${row.pct * 2.8}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct * 2.8}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="text-white/40 text-sm w-8 shrink-0">{row.pct}%</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Strategy callout */}
        <FadeUp delay={0.2}>
          <p
            className="text-center text-white/50 font-light mt-20 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            We start with London corporate — the highest-value, highest-frequency segment —{' '}
            <span className="text-white font-medium">then expand market by market.</span>
          </p>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── Section 7: Competitive Positioning ──────────────────────────────────────

const before = ['Directories & static listings', 'Desktop-first experiences', 'No pricing transparency', 'Fragmented communication', 'No booking workflow']
const after = ['Mobile-native from day one', 'Workflow-driven booking flow', 'Instant quote model', 'Unified communication layer', 'AI-assisted recommendations (roadmap)', 'Add to Event integration (coming soon)']

function CompetitivePositioning() {
  return (
    <section id="positioning" className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Differentiation</p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            Built for modern event planning.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <FadeUp>
            <div className="rounded-3xl p-8 border border-white/5" style={{ background: V.surface }}>
              <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-6">Before Eventsy</p>
              <div className="space-y-4">
                {before.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <X size={14} className="text-red-500/50 shrink-0" />
                    <span className="text-white/35 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* After */}
          <FadeUp delay={0.1}>
            <div
              className="rounded-3xl p-8 border border-violet-500/20"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(13,13,13,1) 60%)' }}
            >
              <p
                className="text-sm font-medium uppercase tracking-wider mb-6"
                style={{ color: '#A78BFA' }}
              >
                Eventsy
              </p>
              <div className="space-y-4">
                {after.map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className={`shrink-0 ${i >= after.length - 2 ? 'text-violet-600/50' : 'text-violet-400'}`} />
                    <span className={`text-sm ${i >= after.length - 2 ? 'text-white/40' : 'text-white'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Section 7b: Business Model ───────────────────────────────────────────────

const revenuePhases = [
  {
    phase: 'Near-term',
    title: 'Transaction revenue',
    body: 'Commission on confirmed bookings — proves marketplace demand and aligns incentives with suppliers. No win, no fee.',
  },
  {
    phase: 'Mid-term',
    title: 'Recurring revenue',
    body: 'Supplier subscription plans layered on top of commission — predictable SaaS income that grows with the marketplace.',
  },
  {
    phase: 'Long-term',
    title: 'Platform revenue',
    body: 'Payments processing and workflow software — high-margin as Eventsy becomes the operating system for event planning.',
  },
]

const commissionRates = [
  { category: 'Venues',         rate: '5–10%'   },
  { category: 'Catering',       rate: '10–15%'  },
  { category: 'Entertainment',  rate: '10–15%'  },
  { category: 'Equipment hire', rate: '10–15%'  },
]

const supplierPlans = [
  {
    name: 'Free',
    price: '£0',
    features: ['Basic profile', 'Limited enquiries', 'Standard ranking'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '£49–99',
    per: '/mo',
    features: ['Priority placement', 'Enhanced profile & analytics', 'AI-generated proposals', 'More enquiries'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '£199–499',
    per: '/mo',
    features: ['Featured placement', 'CRM tools', 'Booking automation', 'Team accounts & API'],
    highlight: false,
  },
]

function BusinessModel() {
  return (
    <section id="business-model" className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The business model</p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            Built to make money{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              at every stage.
            </span>
          </h2>
        </FadeUp>

        {/* Revenue phase cards */}
        <StaggerFade className="grid md:grid-cols-3 gap-4 mb-20">
          {revenuePhases.map(item => (
            <motion.div
              key={item.phase}
              variants={fadeUp}
              className="rounded-2xl border border-white/5 p-7 flex flex-col gap-3"
              style={{ background: V.surface }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {item.phase}
              </p>
              <p className="text-white font-semibold text-base">{item.title}</p>
              <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </StaggerFade>

        {/* Commission rates + example */}
        <FadeUp className="mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-8">Phase 1 — Launch model</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="grid grid-cols-2 gap-3">
              {commissionRates.map(item => (
                <div
                  key={item.category}
                  className="rounded-xl border border-white/5 p-4"
                  style={{ background: V.surface }}
                >
                  <p className="text-white/40 text-xs mb-1">{item.category}</p>
                  <p
                    className="font-bold text-lg"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {item.rate}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl border border-violet-500/20 p-7"
              style={{ background: 'rgba(109,40,217,0.08)' }}
            >
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Example booking</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Event value</span>
                  <span className="text-white font-semibold">£5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Eventsy commission</span>
                  <span className="text-white font-semibold">10%</span>
                </div>
                <div className="h-px bg-white/8" />
                <div className="flex justify-between">
                  <span className="text-white/50">Eventsy revenue</span>
                  <span
                    className="font-bold text-base"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    £500
                  </span>
                </div>
              </div>
              <p className="text-white/30 text-xs mt-5">Suppliers only pay when they win business.</p>
            </div>
          </div>
        </FadeUp>

        {/* Supplier plans */}
        <FadeUp className="mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-8">Phase 2 — Supplier plans</p>
          <div className="grid md:grid-cols-3 gap-4">
            {supplierPlans.map(plan => (
              <div
                key={plan.name}
                className="rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: plan.highlight ? 'rgba(109,40,217,0.12)' : V.surface,
                  border: plan.highlight ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div>
                  <p className="text-white font-semibold text-base mb-1">{plan.name}</p>
                  <p className="leading-none">
                    <span
                      className="font-black text-2xl"
                      style={plan.highlight ? {
                        background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      } : { color: 'rgba(255,255,255,0.9)' }}
                    >
                      {plan.price}
                    </span>
                    {plan.per && <span className="text-white/30 text-sm ml-1">{plan.per}</span>}
                  </p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ background: plan.highlight ? '#7C3AED' : 'rgba(255,255,255,0.2)' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Closing investor line */}
        <FadeUp>
          <p className="text-center text-white/40 text-sm leading-relaxed max-w-2xl mx-auto">
            Eventsy generates revenue through supplier commissions on confirmed bookings, recurring supplier subscriptions, and workflow software for event professionals.{' '}
            <span className="text-white/60">Over time, payments and financial services become additional high-margin revenue streams.</span>
          </p>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── Section 8: Team ──────────────────────────────────────────────────────────

const teamMembers = [
  {
    initials: 'OA',
    name: 'Osama',
    role: 'Founder & CEO',
    bio: 'Osama built and scaled a successful 360 camera business through social media, content, and audience-first growth — accumulating a significant following and learning exactly how attention converts to revenue. After experiencing firsthand how fragmented event supplier discovery was, the vision for Eventsy was born.',
    stats: null,
    photo: null,
  },
  {
    initials: 'EJ',
    name: 'Elliot Jones',
    role: 'Technology',
    bio: 'From leading social strategy at Coca-Cola to heading digital at Knight Frank and Countrywide PLC, Elliot has shaped how major brands operate online. As founder of PropTech startup ADVSR.ai, he bridges blue-chip rigour with startup execution — bringing the product vision and technology leadership that turns Eventsy from idea into platform.',
    stats: null,
    photo: new URL('./assets/elliot.jpg', import.meta.url).href,
  },
  {
    initials: 'MA',
    name: 'Madyan',
    role: 'Marketing',
    bio: 'With nearly 20 years across international organisations — including eight years as Marketing Manager at the Dubai Gold & Commodities Exchange — Madyan brings deep B2B marketing and event industry expertise to Eventsy. A specialist in marketing automation, audience segmentation, and brand strategy, he builds the systems that convert awareness into pipeline.',
    stats: null,
    photo: new URL('./assets/madyan.png', import.meta.url).href,
  },
]

function TeamAvatar({ member }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.name}
        className="w-20 h-20 rounded-full object-cover object-top mx-auto mb-5 ring-2 ring-white/10"
      />
    )
  }
  return (
    <div
      className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-white font-bold text-lg ring-2 ring-white/10"
      style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)' }}
    >
      {member.initials}
    </div>
  )
}

function FounderStory() {
  return (
    <section id="founder" className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The team</p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            Built by operators who understand{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              modern attention.
            </span>
          </h2>
        </FadeUp>

        <StaggerFade className="grid md:grid-cols-3 gap-6">
          {teamMembers.map(member => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className="rounded-2xl border border-white/5 p-8 flex flex-col"
              style={{ background: V.surface }}
            >
              <TeamAvatar member={member} />
              <p className="text-white font-semibold text-lg text-center mb-1">{member.name}</p>
              <p
                className="text-xs font-medium uppercase tracking-widest text-center mb-5 pb-5 border-b border-white/5"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {member.role}
              </p>
              <p className="text-white/50 text-sm leading-relaxed flex-1">{member.bio}</p>
              {member.stats && (
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
                  {member.stats.map(item => (
                    <div key={item.stat} className="text-center">
                      <p
                        className="font-bold text-sm mb-0.5"
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {item.stat}
                      </p>
                      <p className="text-white/30 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </StaggerFade>
      </div>
    </section>
  )
}

// ─── Section 9: Roadmap ───────────────────────────────────────────────────────

const phases = [
  {
    phase: 'Phase 1',
    title: 'Marketplace Launch',
    desc: 'Supplier discovery, quote requests, and messaging.',
    status: 'Now',
  },
  {
    phase: 'Phase 2',
    title: 'Bookings & Payments',
    desc: 'Contracts, deposits, and full payment workflows.',
    status: 'Q3 2025',
  },
  {
    phase: 'Phase 3',
    title: 'Planning Tools',
    desc: 'Budgets, timelines, and guest management.',
    status: 'Q1 2026',
  },
  {
    phase: 'Phase 4',
    title: 'AI Event Assistant',
    desc: 'Smart vendor recommendations, planning automation, budget suggestions.',
    status: '2026',
  },
]

function Roadmap() {
  return (
    <section id="roadmap" className="bg-black py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">What&apos;s coming</p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          >
            The platform expands over time.
          </h2>
        </FadeUp>

        {/* Desktop horizontal */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-white/8" />
            <div className="grid grid-cols-4 gap-8">
              {phases.map((p, i) => (
                <FadeUp key={p.phase} delay={i * 0.1}>
                  <div className="relative pt-0">
                    <PhaseNode index={i} label={p.status} />
                    <div className="mt-6">
                      <p className="text-violet-400 text-xs font-medium uppercase tracking-wider mb-1">{p.phase}</p>
                      <h3 className="text-white font-semibold text-base mb-2">{p.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-8">
          {phases.map((p, i) => (
            <FadeUp key={p.phase} delay={i * 0.1}>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <PhaseNode index={i} label={p.status} />
                  {i < phases.length - 1 && <div className="w-px flex-1 mt-2 bg-white/8" />}
                </div>
                <div className="pb-8">
                  <p className="text-violet-400 text-xs font-medium uppercase tracking-wider mb-1">{p.phase}</p>
                  <h3 className="text-white font-semibold text-base mb-2">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} className="text-center mt-20">
          <p
            className="font-semibold"
            style={{
              fontSize: 'clamp(0.88rem, 2vw, 1.2rem)',
              background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Eventsy evolves from marketplace to infrastructure.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

function PhaseNode({ index, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.12, type: 'spring', stiffness: 200 }}
        className="w-12 h-12 rounded-full border-2 border-violet-500 flex items-center justify-center"
        style={{ background: inView ? 'rgba(124,58,237,0.15)' : 'transparent' }}
      >
        <span className="text-violet-400 font-bold text-sm">0{index + 1}</span>
      </motion.div>
      <span className="text-white/30 text-xs">{label}</span>
    </div>
  )
}

// ─── Section 10: Future Vision ────────────────────────────────────────────────

function FutureVision() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const words = text.querySelectorAll('.vision-word')
    gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === section) t.kill()
    })
  }, [])

  const headline = 'Every event starts with Eventsy.'
  const words = headline.split(' ')

  return (
    <section ref={sectionRef} id="vision" className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Top glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 70%)' }}
      />

      <div ref={textRef} className="text-center max-w-5xl mx-auto relative z-10">
        <h2
          className="font-black leading-[0.88] mb-10"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 7.2rem)' }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="vision-word inline-block mr-[0.2em] opacity-0"
              style={
                word === 'Eventsy.' || word === 'Eventsy'
                  ? {
                      background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : { color: '#FFFFFF' }
              }
            >
              {word}
            </span>
          ))}
        </h2>

        <FadeUp delay={0.6}>
          <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto">
            From birthdays to festivals, Eventsy is building the infrastructure layer
            behind modern event planning.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Section 11: Final CTA ────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section id="cta" className="bg-black py-32 px-6 relative overflow-hidden">
      {/* Violet top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)' }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeUp>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Invest</p>
          <h2
            className="text-white font-bold mb-8"
            style={{ fontSize: 'clamp(2rem, 5.6vw, 4.4rem)' }}
          >
            Join us at the beginning.
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            We&apos;re raising a pre-seed round to launch the Eventsy marketplace.
            We&apos;d love to show you what we&apos;re building.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:info@eventsy.uk?subject=Investor%20Demo"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all"
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
            >
              Request Investment Demo Call
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('walkthrough')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl text-white font-medium border border-white/15 hover:bg-white/5 transition-all"
            >
              View Prototype
            </motion.button>
          </div>

          <div className="mt-6">
            <a
              href="mailto:info@eventsy.uk"
              className="text-white/40 text-sm hover:text-white/70 transition-colors"
            >
              info@eventsy.uk — Contact the founder directly
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white/30 font-bold tracking-widest text-xs uppercase">Eventsy</span>
        <p className="text-white/20 text-xs">© 2025 Eventsy. All rights reserved.</p>
        <p className="text-white/20 text-xs">Investor materials — confidential</p>
      </div>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function EventsyInvestors() {
  return (
    <div style={{ background: V.bg, minHeight: '100vh' }}>
      <Header />
      <Hero />
      <Problem />
      <Shift />
      <Introducing />
      <Walkthrough />
      <CompetitivePositioning />
      <MarketOpportunity />
      <BusinessModel />
      <FounderStory />
      <Roadmap />
      <FutureVision />
      <FinalCTA />
      <Footer />
    </div>
  )
}
