import { useId, useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { MapPin, Search, ShieldCheck, Briefcase, Lock, ChevronDown, X } from 'lucide-react';
import { CITIES } from './mockData';
import { useStore, memberById, trackRecordOf, rankAgents } from './store';

const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const SUGGESTIONS = CITIES.flatMap((c) => [
  { city: c.name, area: null, label: c.name, sub: c.country },
  ...c.areas.map((a) => ({ city: c.name, area: a, label: a, sub: c.name })),
]);

// ── Small pieces ─────────────────────────────────────────────

export function Avatar({ initials, size = 'w-10 h-10 text-[12px]', tone = 'dark', ring = false }) {
  const tones = {
    dark: 'bg-zinc-900 text-white',
    light: 'bg-zinc-100 text-zinc-600',
  };
  return (
    <div
      className={`${size} ${tones[tone]} rounded-full flex items-center justify-center font-semibold shrink-0 ${
        ring ? 'ring-2 ring-white' : ''
      }`}
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function RecommenderStack({ recommendations, max = 4 }) {
  const shown = recommendations.slice(0, max);
  return (
    <div className="flex -space-x-1.5 shrink-0" aria-hidden>
      {shown.map((v, i) => {
        const m = memberById(v.by);
        return (
          <Avatar key={`${v.by}-${i}`} initials={m.initials} size="w-7 h-7 text-[9px]" tone="light" ring />
        );
      })}
      {recommendations.length > max && (
        <div className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-600 text-[9px] font-semibold flex items-center justify-center ring-2 ring-white">
          +{recommendations.length - max}
        </div>
      )}
    </div>
  );
}

export function RecommendationCount({ count, compact = false }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[color:var(--lr-accent-soft)] text-[color:var(--lr-accent)] px-2.5 py-1 shrink-0">
      <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          className="text-[12px] font-semibold tabular-nums"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      {compact ? (
        <span className="sr-only">{count === 1 ? 'recommendation' : 'recommendations'}</span>
      ) : (
        <span className="text-[11px] font-medium">{count === 1 ? 'recommendation' : 'recommendations'}</span>
      )}
    </div>
  );
}

export function recommendedByLine(agent) {
  const first = memberById(agent.recommendations[0].by);
  const others = agent.recommendations.length - 1;
  return { first, others };
}

// ── Agent card ───────────────────────────────────────────────

function AgentCard({ agent, rank }) {
  const [open, setOpen] = useState(false);
  const [gated, setGated] = useState(false);
  const record = trackRecordOf(agent);
  const { first, others } = recommendedByLine(agent);
  const detailsId = useId();

  return (
    <motion.li
      layout
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className={`list-none bg-white rounded-xl border p-4 sm:p-5 ${
        rank === 0 ? 'border-[color:var(--lr-accent-line)]' : 'border-zinc-200'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <Avatar initials={agent.initials} />
        <div className="flex-1 min-w-0 flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-zinc-900 leading-snug">{agent.name}</div>
            <div className="text-[12px] text-zinc-500">{agent.agency}</div>
          </div>
          <RecommendationCount count={agent.recommendations.length} />
        </div>
      </div>

      <div className="sm:pl-14">
          <div className="flex items-start gap-1 text-[11px] text-zinc-400 mt-2">
            <MapPin className="w-3 h-3 shrink-0 mt-[2px]" aria-hidden />
            <span>{agent.areas.join(', ')}, {agent.city}</span>
          </div>

          {/* Recommended by */}
          <div className="mt-3.5 flex items-center gap-2.5">
            <RecommenderStack recommendations={agent.recommendations} />
            <p className="text-[12px] text-zinc-600 leading-snug min-w-0">
              Recommended by <span className="font-semibold text-zinc-900">{first.name}</span>, {first.agency}, London
              {others > 0 && <span className="text-zinc-400"> and {others} other {others === 1 ? 'member' : 'members'}</span>}
            </p>
          </div>

          {/* Track record, top entry */}
          {record.length > 0 && (
            <div className="mt-3 flex items-start gap-2 text-[12px] text-zinc-600">
              <Briefcase className="w-3.5 h-3.5 mt-[2px] text-zinc-400 shrink-0" aria-hidden />
              <span>
                {record[0].deal}, {record[0].year}
              </span>
            </div>
          )}

          {/* Expanded profile */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={detailsId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-zinc-100 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 mb-2">Recommended by</div>
                    <ul className="space-y-2">
                      {agent.recommendations.map((v, i) => {
                        const m = memberById(v.by);
                        return (
                          <li key={i} className="flex items-center gap-2 text-[12px] text-zinc-700">
                            <Avatar initials={m.initials} size="w-5 h-5 text-[8px]" tone="light" />
                            <span className="min-w-0">
                              {m.name}, <span className="text-zinc-400">{m.agency}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 mb-2">Track record</div>
                    {record.length ? (
                      <ul className="space-y-2">
                        {record.map((r, i) => (
                          <li key={i} className="text-[12px] text-zinc-700 leading-snug">
                            {r.deal}, {r.year}
                            <span className="block text-[11px] text-zinc-400">via {r.member.name}, {r.member.agency}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[12px] text-zinc-400">No deals recorded yet. A recommendation alone is enough to be listed.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setGated((g) => !g)}
              aria-expanded={gated}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--lr-accent)] hover:bg-[color:var(--lr-accent-hover)] text-white text-[12px] font-semibold px-3.5 py-2 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" aria-hidden />
              Contact agent
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="inline-flex items-center gap-1 rounded-lg text-[12px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 px-3 py-2 transition-colors"
            >
              {open ? 'Hide profile' : 'View profile'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {gated && (
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
                    <div className="text-[13px] font-semibold text-zinc-900">Available to members</div>
                    <p className="text-[12px] text-zinc-500 leading-snug">
                      Profiles, recommendations and track record are open. Reaching {agent.name.split(' ')[0]} is for LonRes members and subscribed international agents.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGated(false)}
                    className="ml-auto p-1 rounded text-zinc-400 hover:text-zinc-700"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </motion.li>
  );
}

// ── Search ───────────────────────────────────────────────────

function CitySearch({ onPick }) {
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(false);
  const [hi, setHi] = useState(0);
  const listId = useId();

  const matches = useMemo(() => {
    const f = fold(q.trim());
    if (!f) return [];
    return SUGGESTIONS.filter((s) => fold(s.label).includes(f) || fold(s.sub).startsWith(f)).slice(0, 6);
  }, [q]);

  const pick = (s) => {
    onPick(s.city, s.area);
    setQ('');
    setHi(0);
  };

  const onKeyDown = (e) => {
    if (!matches.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => (h + 1) % matches.length); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => (h - 1 + matches.length) % matches.length); }
    if (e.key === 'Enter') { e.preventDefault(); pick(matches[hi]); }
    if (e.key === 'Escape') setQ('');
  };

  const open = focused && matches.length > 0;

  return (
    <div className="relative">
      <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
      <input
        type="text"
        value={q}
        onChange={(e) => { setQ(e.target.value); setHi(0); }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        onKeyDown={onKeyDown}
        placeholder="Search a city or neighbourhood"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open ? `${listId}-${hi}` : undefined}
        aria-label="Search the international directory by city or neighbourhood"
        className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 py-3 text-[16px] sm:text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:border-[color:var(--lr-accent)] outline-none transition-colors"
      />
      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 left-0 right-0 mt-1.5 rounded-xl border border-zinc-200 bg-white shadow-lg py-1.5 overflow-hidden"
        >
          {matches.map((s, i) => (
            <li
              key={`${s.city}-${s.area}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === hi}
              onMouseDown={(e) => { e.preventDefault(); pick(s); }}
              onMouseEnter={() => setHi(i)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer ${i === hi ? 'bg-zinc-50' : ''}`}
            >
              <MapPin className="w-3.5 h-3.5 text-zinc-400" aria-hidden />
              <span className="text-[13px] text-zinc-900">{s.label}</span>
              <span className="text-[12px] text-zinc-400">{s.sub}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
        active
          ? 'border-zinc-900 bg-zinc-900 text-white'
          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
      }`}
    >
      {children}
    </button>
  );
}

export default function DirectorySearch() {
  const [state] = useStore();
  const [city, setCity] = useState('Marbella');
  const [area, setArea] = useState(null);

  const cityInfo = CITIES.find((c) => c.name === city);
  const results = useMemo(() => {
    const inCity = state.agents.filter((a) => a.city === city && (!area || a.areas.includes(area)));
    return rankAgents(inCity);
  }, [state.agents, city, area]);

  const choose = (c, a = null) => {
    setCity(c);
    setArea(a);
  };

  return (
    <div className="px-4 py-5 sm:px-6 sm:py-6">
      <h3 className="text-[18px] font-semibold text-zinc-900 tracking-tight">Find a trusted agent</h3>
      <p className="text-[12px] text-zinc-500 mb-4">Every agent here is recommended by a LonRes member.</p>

      <CitySearch onPick={choose} />

      <div className="mt-3 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto lr-scroll-x pb-1" aria-label="Cities">
        {CITIES.map((c) => (
          <Chip key={c.name} active={c.name === city} onClick={() => choose(c.name)}>
            {c.name}
          </Chip>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto lr-scroll-x -mx-4 px-4 sm:mx-0 sm:px-0 pb-1" aria-label="Neighbourhoods">
        <span className="text-[11px] text-zinc-400 shrink-0">Area</span>
        <button
          type="button"
          onClick={() => setArea(null)}
          aria-pressed={!area}
          className={`shrink-0 text-[12px] px-2.5 py-1 rounded-md transition-colors ${
            !area ? 'text-[color:var(--lr-accent)] font-semibold bg-[color:var(--lr-accent-soft)]' : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          All areas
        </button>
        {cityInfo.areas.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setArea(a === area ? null : a)}
            aria-pressed={a === area}
            className={`shrink-0 text-[12px] px-2.5 py-1 rounded-md transition-colors ${
              a === area ? 'text-[color:var(--lr-accent)] font-semibold bg-[color:var(--lr-accent-soft)]' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-5 mb-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3" aria-live="polite">
        <div className="text-[12px] text-zinc-500">
          <span className="font-semibold text-zinc-900">{results.length}</span> recommended{' '}
          {results.length === 1 ? 'agent' : 'agents'} in {area ? `${area}, ` : ''}{city}
        </div>
        <div className="text-[11px] text-zinc-400 shrink-0">Ranked by recommendations</div>
      </div>

      <LayoutGroup>
        <ul className="space-y-3">
          {results.map((a, i) => (
            <AgentCard key={a.id} agent={a} rank={i} />
          ))}
        </ul>
      </LayoutGroup>

      {results.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-5 py-8 text-center">
          <p className="text-[13px] text-zinc-700 font-medium">No recommended agents in {area} yet.</p>
          <p className="text-[12px] text-zinc-500 mt-1">When a member recommends someone here, they appear straight away.</p>
          <button type="button" onClick={() => setArea(null)} className="mt-3 text-[12px] font-semibold text-[color:var(--lr-accent)]">
            Show all of {city}
          </button>
        </div>
      )}
    </div>
  );
}
