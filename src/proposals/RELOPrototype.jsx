import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Users, FileText, MapPin, Settings,
  Check, CheckCircle, Building, DollarSign, Globe,
  BookOpen, Heart, Truck, CreditCard, Shield,
  ChevronRight, ArrowLeft, Star,
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,     label: 'My Journey' },
  { icon: User,     label: 'Profile'    },
  { icon: Users,    label: 'Advisors'   },
  { icon: FileText, label: 'Documents'  },
  { icon: MapPin,   label: 'Destinations' },
  { icon: Settings, label: 'Settings'  },
];

const WHO_OPTIONS  = ['Just me', 'Couple', 'Family', 'Company team'];
const FROM_OPTIONS = ['New York', 'London', 'Dubai', 'Los Angeles'];
const TO_OPTIONS   = ['Miami', 'Palm Beach', 'Boca Raton', 'Fort Lauderdale'];

const REQUIREMENT_ITEMS = [
  { label: 'Real estate',       icon: Building  },
  { label: 'Tax planning',      icon: DollarSign },
  { label: 'Immigration / visas', icon: Globe   },
  { label: 'Schools',           icon: BookOpen  },
  { label: 'Banking',           icon: CreditCard },
  { label: 'Healthcare',        icon: Heart     },
  { label: 'Insurance',         icon: Shield    },
  { label: 'Move logistics',    icon: Truck     },
];

const COMPILE_STEPS = [
  'Analysing your profile',
  'Matching relocation requirements',
  'Building checklist',
  'Finding trusted advisors',
  'Preparing recommendations',
];

const CHECKLIST_ITEMS = [
  { label: 'Real estate',    sub: '3 recommended brokers',    icon: Building,   bgCls: 'bg-blue-50',    iconCls: 'text-blue-600',    isMain: true  },
  { label: 'Tax planning',   sub: '2 advisors matched',       icon: DollarSign, bgCls: 'bg-emerald-50', iconCls: 'text-emerald-600'               },
  { label: 'Immigration',    sub: 'Document checklist ready', icon: Globe,      bgCls: 'bg-violet-50',  iconCls: 'text-violet-600'               },
  { label: 'Schools',        sub: 'Shortlist available',      icon: BookOpen,   bgCls: 'bg-amber-50',   iconCls: 'text-amber-600'                },
  { label: 'Move logistics', sub: 'Timeline generated',       icon: Truck,      bgCls: 'bg-rose-50',    iconCls: 'text-rose-600'                 },
];

const BROKERS = [
  {
    name: 'Sarah Mitchell',
    title: "Luxury Buyer's Broker",
    area: 'Miami Beach & Coconut Grove',
    match: 'Waterfront expertise, HNW clients, relocation experience',
    initials: 'SM',
    avatarCls: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Daniel Reyes',
    title: 'Family Relocation Specialist',
    area: 'Boca Raton & Coral Gables',
    match: 'School zones, family homes, gated communities',
    initials: 'DR',
    avatarCls: 'from-emerald-400 to-emerald-600',
  },
  {
    name: 'Amanda Chen',
    title: 'Investment Property Advisor',
    area: 'Brickell & Downtown Miami',
    match: 'Rental yield, condo market, investor clients',
    initials: 'AC',
    avatarCls: 'from-violet-400 to-violet-600',
  },
];

// ── Sidebar ───────────────────────────────────────────────────

function Sidebar() {
  return (
    <div className="w-52 bg-white border-r border-zinc-100 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-[9px] font-black tracking-wider">R</span>
          </div>
          <span className="text-sm font-black tracking-[0.2em] uppercase text-zinc-900">RELO</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-hidden">
        {NAV_ITEMS.map((item, i) => {
          const active = i === 0;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg select-none transition-colors ${
                active ? 'bg-blue-50' : 'opacity-40'
              }`}
            >
              <item.icon
                className={`w-4 h-4 flex-shrink-0 ${active ? 'text-blue-600' : 'text-zinc-400'}`}
              />
              <span className={`text-[13px] ${active ? 'text-blue-700 font-medium' : 'text-zinc-500'}`}>
                {item.label}
              </span>
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </div>
          );
        })}
      </nav>

      {/* User slot */}
      <div className="px-3 pb-5 border-t border-zinc-100 pt-4">
        <div className="flex items-center gap-2.5 px-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-bold">EJ</span>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-zinc-800">New enquiry</div>
            <div className="text-[10px] text-zinc-400">Getting started</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step progress bar ─────────────────────────────────────────

function StepProgress({ step }) {
  const labels = ['Start', 'Profile', 'Requirements', 'Generating', 'Your Plan'];
  const idx = step >= 4 ? 4 : step;

  return (
    <div className="border-b border-zinc-100 px-6 py-3.5 bg-white flex-shrink-0">
      <div className="flex items-center">
        {labels.map((label, i) => (
          <div key={i} className="flex items-center flex-1 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-300 ${
                  i < idx
                    ? 'bg-blue-600 text-white'
                    : i === idx
                    ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                    : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                {i < idx ? <Check className="w-2.5 h-2.5" /> : String(i + 1)}
              </div>
              <span
                className={`text-[11px] font-medium truncate hidden lg:block ${
                  i === idx ? 'text-blue-700' : i < idx ? 'text-zinc-400' : 'text-zinc-300'
                }`}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div
                className={`flex-1 h-[1px] mx-2 transition-all duration-300 ${
                  i < idx ? 'bg-blue-300' : 'bg-zinc-100'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Welcome ───────────────────────────────────────────

function WelcomeScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full px-10 py-10"
    >
      <div className="max-w-md w-full">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-8 border border-blue-100">
          <Star className="w-3 h-3 fill-blue-500 text-blue-500" />
          Personalised for you
        </div>

        <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight mb-3">
          Build your relocation plan
        </h2>
        <p className="text-[13px] text-zinc-500 leading-relaxed mb-10">
          Answer a few quick questions and RELO will create your personalised checklist.
        </p>

        <button
          onClick={onNext}
          className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md mb-10"
        >
          Create my profile
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="space-y-3">
          {[
            'No forms to fill out — click only',
            'Takes about 2 minutes',
            'Personalised to your goals',
          ].map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-blue-600" />
              </div>
              <span className="text-[12px] text-zinc-500">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Screen: Profile ───────────────────────────────────────────

function OptionCard({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-xl border text-[13px] font-medium transition-all duration-150 ${
        selected
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
      }`}
    >
      {selected && (
        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2 align-middle mb-[1px]" />
      )}
      {label}
    </button>
  );
}

function ProfileScreen({ profile, setProfile, onNext }) {
  const set = (key, val) => setProfile((p) => ({ ...p, [key]: val }));
  const complete = !!(profile.who && profile.from && profile.to);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="px-8 py-7 overflow-auto h-full"
    >
      <div className="max-w-xl">
        <h2 className="text-xl font-black text-zinc-900 mb-1">Create your profile</h2>
        <p className="text-[12px] text-zinc-400 mb-7">Select one option per section</p>

        {[
          { title: 'Who are you relocating?', options: WHO_OPTIONS,  field: 'who'  },
          { title: 'Where are you moving from?', options: FROM_OPTIONS, field: 'from' },
          { title: 'Where are you relocating to?', options: TO_OPTIONS, field: 'to'   },
        ].map(({ title, options, field }) => (
          <div key={field} className="mb-6">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              {title}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => (
                <OptionCard
                  key={opt}
                  label={opt}
                  selected={profile[field] === opt}
                  onClick={() => set(field, opt)}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={complete ? onNext : undefined}
          className={`group flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            complete
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
              : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
          }`}
        >
          Continue to requirements
          <ChevronRight
            className={`w-4 h-4 ${complete ? 'group-hover:translate-x-0.5 transition-transform' : ''}`}
          />
        </button>
      </div>
    </motion.div>
  );
}

// ── Screen: Requirements ──────────────────────────────────────

function RequirementsScreen({ requirements, setRequirements, onNext }) {
  const toggle = (label) =>
    setRequirements((prev) => {
      const n = new Set(prev);
      n.has(label) ? n.delete(label) : n.add(label);
      return n;
    });

  const hasAny = requirements.size > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="px-8 py-7 overflow-auto h-full"
    >
      <div className="max-w-xl">
        <h2 className="text-xl font-black text-zinc-900 mb-1">What do you need help with?</h2>
        <p className="text-[12px] text-zinc-400 mb-6">Select all that apply</p>

        <div className="grid grid-cols-2 gap-2.5 mb-7">
          {REQUIREMENT_ITEMS.map((item) => {
            const sel = requirements.has(item.label);
            return (
              <button
                key={item.label}
                onClick={() => toggle(item.label)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-150 ${
                  sel
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    sel ? 'bg-blue-100' : 'bg-zinc-100'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${sel ? 'text-blue-600' : 'text-zinc-400'}`} />
                </div>
                <span className={`text-[13px] font-medium ${sel ? 'text-blue-700' : 'text-zinc-600'}`}>
                  {item.label}
                </span>
                {sel && (
                  <div className="ml-auto w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {hasAny && (
            <span className="text-[12px] text-zinc-400">{requirements.size} selected</span>
          )}
          <button
            onClick={hasAny ? onNext : undefined}
            className={`group flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              hasAny
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
            }`}
          >
            Generate my RELO checklist
            <ChevronRight
              className={`w-4 h-4 ${hasAny ? 'group-hover:translate-x-0.5 transition-transform' : ''}`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Screen: Compiling ─────────────────────────────────────────

function CompilingScreen({ onComplete }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setVisible(count);
      if (count >= COMPILE_STEPS.length) {
        clearInterval(id);
        setTimeout(onComplete, 650);
      }
    }, 660);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full px-10"
    >
      <div className="max-w-sm w-full">
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-zinc-100" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-300"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>

        <p className="text-center text-[15px] font-bold text-zinc-900 mb-7">
          Compiling your RELO checklist…
        </p>

        <div className="space-y-3.5">
          {COMPILE_STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -8 }}
              animate={i < visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  i < visible - 1
                    ? 'bg-blue-600'
                    : i === visible - 1
                    ? 'border-2 border-blue-600 bg-blue-50'
                    : 'border-2 border-zinc-200'
                }`}
              >
                {i < visible - 1 && <Check className="w-2.5 h-2.5 text-white" />}
                {i === visible - 1 && (
                  <motion.div
                    className="w-2 h-2 bg-blue-600 rounded-full"
                    animate={{ scale: [1, 0.55, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
              </div>
              <span
                className={`text-[13px] transition-colors ${
                  i < visible ? 'text-zinc-700' : 'text-zinc-300'
                }`}
              >
                {s}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Screen: Checklist ─────────────────────────────────────────

function ChecklistScreen({ onViewRecommendations }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="px-8 py-7 overflow-auto h-full"
    >
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <h2 className="text-xl font-black text-zinc-900">Your RELO plan is ready</h2>
        </div>
        <p className="text-[12px] text-zinc-400 mb-7 pl-9">5 areas identified · 10 advisors matched</p>

        <div className="space-y-2.5">
          {CHECKLIST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                item.isMain
                  ? 'border-blue-200 bg-blue-50/60'
                  : 'border-zinc-200 bg-white hover:bg-zinc-50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl ${item.bgCls} flex items-center justify-center flex-shrink-0`}
              >
                <item.icon className={`w-5 h-5 ${item.iconCls}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-[13px] font-semibold ${
                    item.isMain ? 'text-blue-900' : 'text-zinc-800'
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-[11px] text-zinc-400">{item.sub}</div>
              </div>

              {item.isMain && (
                <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium flex-shrink-0 mr-1">
                  Priority
                </span>
              )}

              <button
                onClick={item.isMain ? onViewRecommendations : undefined}
                className={`flex items-center gap-1 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-all flex-shrink-0 ${
                  item.isMain
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-zinc-400 bg-zinc-100 hover:bg-zinc-200'
                }`}
              >
                View
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Screen: Real Estate Brokers ───────────────────────────────

function BrokersScreen({ introduced, setIntroduced, onBack }) {
  const introduce = (name) => setIntroduced((prev) => new Set([...prev, name]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="px-8 py-7 overflow-auto h-full"
    >
      <div className="max-w-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] text-zinc-400 hover:text-zinc-700 mb-5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to checklist
        </button>

        <h2 className="text-xl font-black text-zinc-900 mb-1">Real estate recommendations</h2>
        <p className="text-[12px] text-zinc-400 mb-7">3 brokers matched to your profile</p>

        <div className="space-y-3">
          {BROKERS.map((broker, i) => {
            const done = introduced.has(broker.name);
            return (
              <motion.div
                key={broker.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.09, duration: 0.3 }}
                className={`p-5 rounded-xl border transition-all ${
                  done ? 'border-blue-200 bg-blue-50/60' : 'border-zinc-200 bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${broker.avatarCls} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white text-[11px] font-bold">{broker.initials}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name row */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <div className="text-[14px] font-bold text-zinc-900">{broker.name}</div>
                        <div className="text-[12px] text-zinc-500">{broker.title}</div>
                        <div className="text-[11px] text-zinc-400">{broker.area}</div>
                      </div>

                      {done ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg flex-shrink-0">
                          <Check className="w-3 h-3" />
                          Introduction requested
                        </div>
                      ) : (
                        <button
                          onClick={() => introduce(broker.name)}
                          className="text-[12px] font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg transition-colors flex-shrink-0"
                        >
                          Introduce me
                        </button>
                      )}
                    </div>

                    {/* Match reason */}
                    <div className="flex items-start gap-1.5">
                      <div className="w-1 h-1 bg-zinc-400 rounded-full mt-[6px] flex-shrink-0" />
                      <span className="text-[11px] text-zinc-500">
                        <span className="text-zinc-600 font-medium">Matched because: </span>
                        {broker.match}
                      </span>
                    </div>

                    {/* Success message */}
                    <AnimatePresence>
                      {done && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-2 text-[11px] text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            Your RELO advisor will coordinate the next step.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── Root export ───────────────────────────────────────────────

export default function RELOPrototype() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ who: null, from: null, to: null });
  const [requirements, setRequirements] = useState(new Set());
  const [introduced, setIntroduced] = useState(new Set());

  return (
    <div className="flex h-[620px] rounded-2xl border border-zinc-200 shadow-xl overflow-hidden">
      {/* Sidebar — hidden on small screens */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
        <StepProgress step={step} />

        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <WelcomeScreen key="welcome" onNext={() => setStep(1)} />
            )}
            {step === 1 && (
              <ProfileScreen
                key="profile"
                profile={profile}
                setProfile={setProfile}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <RequirementsScreen
                key="requirements"
                requirements={requirements}
                setRequirements={setRequirements}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <CompilingScreen key="compiling" onComplete={() => setStep(4)} />
            )}
            {step === 4 && (
              <ChecklistScreen
                key="checklist"
                onViewRecommendations={() => setStep(5)}
              />
            )}
            {step === 5 && (
              <BrokersScreen
                key="brokers"
                introduced={introduced}
                setIntroduced={setIntroduced}
                onBack={() => setStep(4)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
