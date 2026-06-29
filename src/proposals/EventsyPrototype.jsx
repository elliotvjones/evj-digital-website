import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Users, DollarSign, Star, Bell, ChevronRight, Send, FileText, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react'

// ─── Phone shell ─────────────────────────────────────────────────────────────

export function PhoneMockup({ children, className = '' }) {
  return (
    <div className={`relative w-[280px] h-[580px] rounded-[44px] border border-white/10 bg-[#0D0D0D] overflow-hidden shadow-2xl ${className}`}>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
      <div className="absolute inset-0 pt-10 overflow-hidden">{children}</div>
    </div>
  )
}

// ─── Screen 1: Post An Event ──────────────────────────────────────────────────

export function PostEventScreen({ onNext }) {
  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col px-5 py-4">
      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3">New Event</p>
      <p className="text-white font-semibold text-base mb-5">Tell us about your event</p>

      <div className="space-y-3">
        <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3">
          <Calendar size={14} className="text-violet-400 shrink-0" />
          <div>
            <p className="text-white/40 text-[10px]">Date</p>
            <p className="text-white text-xs font-medium">Saturday, 14 June 2025</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3">
          <MapPin size={14} className="text-violet-400 shrink-0" />
          <div>
            <p className="text-white/40 text-[10px]">Location</p>
            <p className="text-white text-xs font-medium">London, E1</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3">
          <Users size={14} className="text-violet-400 shrink-0" />
          <div>
            <p className="text-white/40 text-[10px]">Guest count</p>
            <p className="text-white text-xs font-medium">120 guests</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3">
          <DollarSign size={14} className="text-violet-400 shrink-0" />
          <div>
            <p className="text-white/40 text-[10px]">Budget</p>
            <p className="text-white text-xs font-medium">£3,000 – £5,000</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl px-4 py-3">
          <p className="text-white/40 text-[10px] mb-2">Services needed</p>
          <div className="flex flex-wrap gap-1.5">
            {['DJ', 'Photographer', 'Catering', 'Venue'].map(s => (
              <span key={s} className="bg-violet-600/30 text-violet-300 text-[10px] px-2.5 py-1 rounded-full border border-violet-500/30">{s}</span>
            ))}
            <span className="bg-white/5 text-white/30 text-[10px] px-2.5 py-1 rounded-full">+ Add</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-auto bg-violet-600 active:bg-violet-700 text-white text-xs font-semibold py-3.5 rounded-2xl w-full transition-colors cursor-pointer"
      >
        Find Suppliers
      </button>
    </div>
  )
}

// ─── Screen 2: AI Matching ────────────────────────────────────────────────────

export function AIMatchingScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2200)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col items-center justify-center px-6 text-center">
      {/* Pulsing orb */}
      <div className="relative mb-8">
        <motion.div
          className="w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(124,58,237,0.1) 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles size={28} className="text-violet-400" />
        </div>
        {/* Rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-violet-500/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ margin: '-8px' }}
        />
      </div>

      <p className="text-white font-semibold text-base mb-2">Using AI to match you with DJs</p>
      <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">
        Scanning 200+ verified DJs in London for your date and budget
      </p>

      {/* Animated dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-violet-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Scanning list items */}
      <div className="mt-8 w-full space-y-2">
        {['Checking availability', 'Verifying reviews', 'Matching your budget'].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.4 }}
            className="flex items-center gap-2 bg-white/4 rounded-xl px-3 py-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
              className="w-3 h-3 rounded-full border border-violet-500 border-t-transparent shrink-0"
            />
            <p className="text-white/50 text-[10px]">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Screen 3: Supplier Match Results ─────────────────────────────────────────

const djSuppliers = [
  { name: 'Bass & Beats DJ', rating: 4.9, reviews: 87, price: '£400', tag: 'Best match', tagColor: 'bg-violet-600/30 text-violet-300' },
  { name: 'SoundWave DJs', rating: 4.7, reviews: 54, price: '£480', tag: 'Popular', tagColor: 'bg-amber-500/20 text-amber-300' },
  { name: 'Pulse Audio', rating: 4.8, reviews: 112, price: '£520', tag: 'Premium', tagColor: 'bg-white/8 text-white/50' },
]

export function SupplierMatchScreen({ onSelectSupplier }) {
  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col px-5 py-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-white font-semibold text-base">12 DJs found</p>
        <span className="text-[10px] text-violet-400">London · Jun 14</span>
      </div>
      <p className="text-white/40 text-[10px] mb-4">Tap a DJ to start a conversation</p>

      <div className="space-y-2.5">
        {djSuppliers.map((s, i) => (
          <motion.button
            key={s.name}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.35 }}
            onClick={i === 0 ? onSelectSupplier : undefined}
            className={`w-full text-left rounded-2xl p-3.5 flex items-center gap-3 transition-all ${
              i === 0
                ? 'bg-violet-600/15 border border-violet-500/30 cursor-pointer active:scale-98'
                : 'bg-white/5 border border-transparent'
            }`}
            whileTap={i === 0 ? { scale: 0.97 } : {}}
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg shrink-0">
              🎧
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-white text-xs font-semibold truncate">{s.name}</p>
                {i === 0 && <span className="text-[8px] bg-violet-600/40 text-violet-300 px-1.5 py-0.5 rounded-full shrink-0">Tap to chat</span>}
              </div>
              <div className="flex items-center gap-1">
                <Star size={9} className="text-amber-400 fill-amber-400" />
                <span className="text-white/50 text-[10px]">{s.rating} · {s.reviews} reviews</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white text-xs font-semibold">{s.price}</p>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${s.tagColor}`}>{s.tag}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-3 bg-white/4 border border-white/8 rounded-2xl px-4 py-3 flex items-center gap-2">
        <Bell size={12} className="text-white/30 shrink-0" />
        <p className="text-white/40 text-[10px]">9 more suppliers notified — awaiting response</p>
      </div>
    </div>
  )
}

// ─── Screen 4: Message Thread ─────────────────────────────────────────────────

const messages = [
  { from: 'supplier', text: 'Hi! Thanks for the request. I\'m available on the 14th — happy to chat about your vibe.', time: '2:14 PM' },
  { from: 'organiser', text: 'Great! We\'re thinking house and tech. Can you do 6 hours?', time: '2:16 PM' },
  { from: 'supplier', text: 'Absolutely. I can do 6 hours for £450 including setup. Sound good?', time: '2:18 PM' },
]

export function ChatScreen() {
  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col">
      <div className="px-4 pt-4 pb-3 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-violet-600/30 flex items-center justify-center text-sm shrink-0">🎧</div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold">Bass & Beats DJ</p>
          <p className="text-emerald-400 text-[10px]">● Online now</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-[10px]">£400 · Jun 14</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`flex ${m.from === 'organiser' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[78%] rounded-2xl px-3 py-2 ${m.from === 'organiser' ? 'bg-violet-600 rounded-br-sm' : 'bg-white/8 rounded-bl-sm'}`}>
              <p className="text-white text-[11px] leading-relaxed">{m.text}</p>
              <p className={`text-[9px] mt-1 ${m.from === 'organiser' ? 'text-white/50' : 'text-white/30'}`}>{m.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="bg-white/8 rounded-2xl px-4 py-3 flex items-center gap-3">
          <p className="text-white/25 text-xs flex-1">Message Bass & Beats…</p>
          <div className="w-7 h-7 bg-violet-600 rounded-xl flex items-center justify-center shrink-0">
            <Send size={12} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 5: Compare Quotes ─────────────────────────────────────────────────

const quotes = [
  { name: 'Bass & Beats', price: '£400', delivery: 'Includes setup', tag: 'Best value', tagColor: 'bg-emerald-500/20 text-emerald-400', highlight: true },
  { name: 'SoundWave DJs', price: '£480', delivery: '4hr set', tag: 'Most reviews', tagColor: 'bg-amber-500/20 text-amber-400', highlight: false },
  { name: 'Pulse Audio', price: '£520', delivery: '6hr set', tag: 'Premium', tagColor: 'bg-violet-500/20 text-violet-400', highlight: false },
]

export function QuoteCompareScreen() {
  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col px-5 py-4">
      <p className="text-white font-semibold text-base mb-1">Compare DJ Quotes</p>
      <p className="text-white/40 text-[10px] mb-4">3 quotes · updated just now</p>

      <div className="space-y-2.5">
        {quotes.map((q) => (
          <div key={q.name} className={`rounded-2xl p-4 border ${q.highlight ? 'border-violet-500/40 bg-violet-600/10' : 'border-white/5 bg-white/5'}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-white text-xs font-semibold">{q.name}</p>
                <p className="text-white/40 text-[10px]">{q.delivery}</p>
              </div>
              <p className="text-white text-sm font-bold">{q.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${q.tagColor}`}>{q.tag}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={9} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-auto bg-violet-600 text-white text-xs font-semibold py-3.5 rounded-2xl w-full flex items-center justify-center gap-2">
        Select Bass & Beats <ChevronRight size={14} />
      </button>
    </div>
  )
}

// ─── Screen 6: Secure The Booking ─────────────────────────────────────────────

export function BookingScreen() {
  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col px-5 py-4">
      <p className="text-white font-semibold text-base mb-1">Confirm Booking</p>
      <p className="text-white/40 text-[10px] mb-4">Bass & Beats DJ · 14 June 2025</p>

      <div className="space-y-2.5">
        <div className="bg-white/5 rounded-2xl px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white/50 text-[11px]">Service</p>
            <p className="text-white text-xs font-medium">DJ — 6 hour set</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-white/50 text-[11px]">Total agreed</p>
            <p className="text-white text-xs font-medium">£450</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-white/50 text-[11px]">Deposit (25%)</p>
            <p className="text-violet-400 text-xs font-semibold">£112.50</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={12} className="text-violet-400" />
            <p className="text-white text-xs font-medium">Standard supplier agreement</p>
          </div>
          <p className="text-white/40 text-[10px]">Cancellation terms, liability, and payment schedule included</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-3 flex items-center gap-2">
          <CheckCircle size={14} className="text-emerald-400 shrink-0" />
          <p className="text-white/70 text-[10px]">Supplier confirmed availability on your date</p>
        </div>
      </div>

      <button className="mt-auto bg-violet-600 text-white text-xs font-semibold py-3.5 rounded-2xl w-full flex items-center justify-center gap-2">
        Pay Deposit & Confirm <ChevronRight size={14} />
      </button>
    </div>
  )
}

// ─── Screen 7: Event Control Centre ──────────────────────────────────────────

const controlSuppliers = [
  { name: 'Bass & Beats DJ', status: 'Confirmed', paid: '£112.50', remaining: '£337.50', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { name: 'Lumière Studios', status: 'Deposit paid', paid: '£187.50', remaining: '£562.50', color: 'text-amber-400', dot: 'bg-amber-400' },
  { name: 'Savour Catering', status: 'Pending reply', paid: '—', remaining: '—', color: 'text-white/40', dot: 'bg-white/20' },
]

export function PaymentsScreen() {
  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col px-5 py-4">
      <p className="text-white font-semibold text-base mb-1">Event Control Centre</p>
      <p className="text-white/40 text-[10px] mb-4">14 June 2025 · 47 days to go</p>

      <div className="bg-white/5 rounded-2xl px-4 py-3 mb-3">
        <div className="flex justify-between mb-2">
          <p className="text-white/50 text-[10px]">Total budget</p>
          <p className="text-white text-xs font-semibold">£4,200</p>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-white/50 text-[10px]">Committed</p>
          <p className="text-violet-400 text-xs font-semibold">£2,150</p>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full" style={{ width: '51%' }} />
        </div>
      </div>

      <div className="space-y-2">
        {controlSuppliers.map((s) => (
          <div key={s.name} className="bg-white/5 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11px] font-medium truncate">{s.name}</p>
              <p className={`text-[10px] ${s.color}`}>{s.status}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white text-[11px] font-medium">{s.paid}</p>
              <p className="text-white/30 text-[9px]">rem. {s.remaining}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
