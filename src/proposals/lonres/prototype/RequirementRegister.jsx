import { useId, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Plus, X, MapPin, Wallet, Check, Eye } from 'lucide-react';
import { CITIES, BUDGET_BANDS, TIMINGS, PROPERTY_TYPES, EARLIER_BUYERS, VIEWER_ID } from './mockData';
import { useStore, memberById } from './store';
import { Avatar } from './DirectorySearch';

const NUMBER_WORDS = ['', 'one', 'two', 'three', 'four', 'five', 'six'];
const COUNTRIES = ['Spain', 'UAE', 'France', 'Portugal'];
const countryName = (c) => (c === 'UAE' ? 'the UAE' : c);

export const requirementTitle = (r) => `${r.city}, ${NUMBER_WORDS[r.beds]}-bed ${r.type.toLowerCase()}`;

// Live headline count: earlier requirements plus buyers in the feed.
export const buyersIn = (requirements, country) =>
  (EARLIER_BUYERS[country] || 0) + requirements.filter((r) => r.country === country && r.side === 'Buying').length;

function Ticker({ value }) {
  return (
    <span className="relative inline-flex overflow-hidden tabular-nums align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-60%', opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Requirement card ─────────────────────────────────────────

function RequirementCard({ r, memberView }) {
  const [gated, setGated] = useState(false);
  const mine = r.by === VIEWER_ID;
  const who = memberById(r.by);
  const visible = mine || memberView;

  return (
    <motion.li
      layout
      initial={r.isNew ? { opacity: 0, y: -12, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className={`list-none rounded-xl border bg-white p-4 ${mine ? 'border-[color:var(--lr-accent-line)]' : 'border-zinc-200'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-zinc-900 leading-snug">{requirementTitle(r)}</div>
          <div className={`text-[12px] mt-0.5 ${r.side === 'Buying' ? 'text-zinc-700 font-medium' : 'text-zinc-500'}`}>
            {r.side} {r.timing}
          </div>
        </div>
        <span className="text-[11px] text-zinc-400 shrink-0">{mine && r.isNew ? 'Just now' : r.age}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-zinc-600">
        <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-zinc-400" aria-hidden />{r.city}, {r.country}</span>
        <span className="inline-flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-zinc-400" aria-hidden />{r.budget}</span>
      </div>

      {/* Registered by: the gated part */}
      <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center gap-2.5">
        {visible ? (
          <>
            <Avatar initials={who.initials} size="w-6 h-6 text-[9px]" tone="light" />
            <span className="text-[12px] text-zinc-600 min-w-0">
              {mine ? (
                <>Registered by <span className="font-semibold text-zinc-900">you</span>, {who.agency}</>
              ) : (
                <>Registered by <span className="font-semibold text-zinc-900">{who.name}</span>, {who.agency}, London</>
              )}
            </span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 rounded-full bg-zinc-200 shrink-0" aria-hidden />
            <span className="text-[12px] text-zinc-600 min-w-0 truncate">
              Registered by{' '}
              <span className="lr-blur" aria-hidden>
                {who.name}, {who.agency}
              </span>
              <span className="sr-only">a LonRes member (hidden)</span>
            </span>
            <button
              type="button"
              onClick={() => setGated((g) => !g)}
              aria-expanded={gated}
              className="ml-auto shrink-0 inline-flex items-center gap-1 rounded-md text-[11px] font-semibold text-[color:var(--lr-accent)] hover:bg-[color:var(--lr-accent-soft)] px-2 py-1 transition-colors"
            >
              <Lock className="w-3 h-3" aria-hidden />
              Who?
            </button>
          </>
        )}
      </div>

      <AnimatePresence initial={false}>
        {gated && !visible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
            role="status"
          >
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-3">
              <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5 text-white" aria-hidden />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-zinc-900">Members see who registered this</div>
                <p className="text-[12px] text-zinc-500 leading-snug">
                  Anyone can see the requirement. Who registered it, and how to reach them, is for LonRes members and subscribed international agents.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// ── Register form ────────────────────────────────────────────

function Segmented({ label, options, value, onChange, format = (o) => o }) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-[11px] font-medium text-zinc-500 mb-1.5">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`text-[12px] rounded-lg border px-3 py-1.5 transition-colors ${
              value === o ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
            }`}
          >
            {format(o)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function RegisterForm({ onDone, onCancel }) {
  const [, dispatch] = useStore();
  const [city, setCity] = useState('Marbella');
  const [side, setSide] = useState('Buying');
  const [beds, setBeds] = useState(2);
  const [type, setType] = useState('Townhouse');
  const [budget, setBudget] = useState(BUDGET_BANDS[1]);
  const [timing, setTiming] = useState(TIMINGS[1]);
  const cityId = useId();

  const draft = { city, side, beds, type, budget, timing, country: CITIES.find((c) => c.name === city).country };

  const submit = (e) => {
    e.preventDefault();
    dispatch({ type: 'register', requirement: { ...draft, id: `new-${Date.now()}`, by: VIEWER_ID, age: 'Just now' } });
    onDone(draft.country);
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
      aria-label="Register a requirement"
    >
      <div className="rounded-xl border border-zinc-200 bg-white p-4 mb-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[14px] font-semibold text-zinc-900">Register a requirement</div>
            <p className="text-[12px] text-zinc-500">Visible across the network. Only members see it came from you.</p>
          </div>
          <button type="button" onClick={onCancel} className="p-1 rounded text-zinc-400 hover:text-zinc-700" aria-label="Cancel">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="min-w-0">
            <label htmlFor={cityId} className="block text-[11px] font-medium text-zinc-500 mb-1.5">Location</label>
            <select
              id={cityId}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[16px] sm:text-[13px] text-zinc-900 outline-none focus:border-[color:var(--lr-accent)]"
            >
              {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}, {c.country}</option>)}
            </select>
          </div>
          <Segmented label="Client is" options={['Buying', 'Selling']} value={side} onChange={setSide} />
          <Segmented label="Bedrooms" options={[1, 2, 3, 4, 5]} value={beds} onChange={setBeds} />
          <Segmented label="Type" options={PROPERTY_TYPES} value={type} onChange={setType} />
          <Segmented label="Budget" options={BUDGET_BANDS} value={budget} onChange={setBudget} />
          <Segmented label="Timing" options={TIMINGS} value={timing} onChange={setTiming} format={(t) => t.replace('within ', 'Within ')} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          <div className="flex-1 min-w-0 text-[12px] text-zinc-500">
            Preview: <span className="text-zinc-900 font-medium">“{requirementTitle(draft)}, {side.toLowerCase()} {timing}”</span>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[color:var(--lr-accent)] hover:bg-[color:var(--lr-accent-hover)] text-white text-[12px] font-semibold px-4 py-2.5 transition-colors shrink-0"
          >
            <Check className="w-3.5 h-3.5" aria-hidden />
            Register
          </button>
        </div>
      </div>
    </motion.form>
  );
}

// ── View ─────────────────────────────────────────────────────

export default function RequirementRegister() {
  const [state] = useStore();
  const [country, setCountry] = useState('Spain');
  const [memberView, setMemberView] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const feed = useMemo(
    () => state.requirements.filter((r) => country === 'All' || r.country === country),
    [state.requirements, country],
  );
  const buyers = country === 'All'
    ? COUNTRIES.reduce((n, c) => n + buyersIn(state.requirements, c), 0)
    : buyersIn(state.requirements, country);

  return (
    <div className="px-4 py-5 sm:px-6 sm:py-6">
      <h3 className="text-[18px] font-semibold text-zinc-900 tracking-tight">International requirements</h3>
      <p className="text-[12px] text-zinc-500 mb-4">Live demand registered by LonRes members and international agents.</p>

      {/* Headline counter */}
      <div className="rounded-xl bg-zinc-950 text-white p-4 sm:p-5">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--lr-accent)]" aria-hidden />
          Right now
        </div>
        <p className="text-[20px] sm:text-[24px] leading-tight font-semibold tracking-tight" aria-live="polite">
          <span className="text-[color:var(--lr-accent)]"><Ticker value={buyers} /></span> registered buyers looking in{' '}
          {country === 'All' ? 'these markets' : countryName(country)}
        </p>
        <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-1.5 overflow-x-auto lr-scroll-x" aria-label="Filter by country">
          {['Spain', 'UAE', 'France', 'Portugal', 'All'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCountry(c)}
              aria-pressed={country === c}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                country === c ? 'bg-white text-zinc-950' : 'bg-white/10 text-zinc-300 hover:bg-white/15'
              }`}
            >
              {c === 'All' ? 'All markets' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-5 mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] font-semibold text-zinc-900">
          Latest requirements <span className="text-zinc-400 font-normal">({feed.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400" aria-hidden>View as</span>
          <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5" role="group" aria-label="View as">
            {[
              { v: false, label: 'Free' },
              { v: true, label: 'Member' },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setMemberView(o.v)}
                aria-pressed={memberView === o.v}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  memberView === o.v ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {o.v ? <Eye className="w-3 h-3" aria-hidden /> : <Lock className="w-3 h-3" aria-hidden />}
                {o.label}
              </button>
            ))}
          </div>
          {!formOpen && (
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--lr-accent)] hover:bg-[color:var(--lr-accent-hover)] text-white text-[12px] font-semibold px-3 py-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden />
              Register
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {formOpen && (
          <RegisterForm
            key="form"
            onCancel={() => setFormOpen(false)}
            onDone={(c) => {
              setFormOpen(false);
              if (country !== 'All') setCountry(c);
            }}
          />
        )}
      </AnimatePresence>

      <ul className="space-y-2.5">
        <AnimatePresence initial={false}>
          {feed.map((r) => (
            <RequirementCard key={r.id} r={r} memberView={memberView} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
