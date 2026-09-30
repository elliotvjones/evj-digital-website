import { Search, ListChecks, BarChart3, Home, Info } from 'lucide-react';
import { memberById } from './store';
import { VIEWER_ID } from './mockData';

export const TABS = [
  { id: 'directory', label: 'Directory', icon: Search },
  { id: 'register', label: 'Requirements', icon: ListChecks },
];

// Existing LonRes areas, shown for context only
const CONTEXT_NAV = [
  { label: 'Market data', icon: BarChart3 },
  { label: 'UK listings', icon: Home },
];

function Mark({ size = 'w-7 h-7' }) {
  return <img src="/proposals/lonres/lonres-logo.png" alt="" className={`${size} rounded-[3px]`} />;
}

function Sidebar({ tab, onTab, available }) {
  const viewer = memberById(VIEWER_ID);
  return (
    <div className="w-56 bg-white border-r border-zinc-100 flex flex-col h-full shrink-0">
      <div className="px-5 py-5 border-b border-zinc-100 flex items-center gap-2.5">
        <Mark />
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-zinc-900">LonRes</div>
          <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-[color:var(--lr-accent)]">International</div>
        </div>
      </div>

      <nav aria-label="Prototype sections" className="flex-1 px-3 py-4 space-y-0.5">
        {TABS.map((t) => {
          const active = t.id === tab;
          const enabled = available.includes(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => enabled && onTab(t.id)}
              disabled={!enabled}
              aria-current={active ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                active
                  ? 'bg-[color:var(--lr-accent-soft)]'
                  : enabled
                  ? 'hover:bg-zinc-50'
                  : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <t.icon className={`w-4 h-4 shrink-0 ${active ? 'text-[color:var(--lr-accent)]' : 'text-zinc-400'}`} aria-hidden />
              <span className={`text-[13px] ${active ? 'text-zinc-900 font-semibold' : 'text-zinc-600'}`}>{t.label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[color:var(--lr-accent)]" />}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-zinc-100 space-y-0.5" aria-hidden>
          {CONTEXT_NAV.map((n) => (
            <div key={n.label} className="flex items-center gap-3 px-3 py-2.5 opacity-40 select-none">
              <n.icon className="w-4 h-4 text-zinc-400" />
              <span className="text-[13px] text-zinc-500">{n.label}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="px-3 pb-5 border-t border-zinc-100 pt-4">
        <div className="flex items-center gap-2.5 px-3">
          <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-semibold">{viewer.initials}</span>
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-zinc-800 truncate">{viewer.name}</div>
            <div className="text-[10px] text-zinc-400 truncate">{viewer.agency}, LonRes member</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileBar({ tab, onTab, available }) {
  return (
    <div className="md:hidden bg-white border-b border-zinc-100">
      <div className="flex items-center gap-2 px-4 pt-3.5 pb-3">
        <Mark size="w-6 h-6" />
        <span className="text-[13px] font-semibold text-zinc-900">LonRes</span>
        <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[color:var(--lr-accent)]">International</span>
      </div>
      <div className="flex px-2" role="tablist" aria-label="Prototype sections">
        {TABS.map((t) => {
          const active = t.id === tab;
          const enabled = available.includes(t.id);
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={!enabled}
              onClick={() => enabled && onTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] border-b-2 transition-colors ${
                active
                  ? 'border-[color:var(--lr-accent)] text-zinc-900 font-semibold'
                  : enabled
                  ? 'border-transparent text-zinc-500'
                  : 'border-transparent text-zinc-300'
              }`}
            >
              <t.icon className="w-3.5 h-3.5" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// A framed LonRes "app" preview, in the spirit of RELOPrototype.
export default function AppFrame({ tab, onTab, available, title, children }) {
  return (
    <div className="sm:rounded-2xl border-y sm:border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5 overflow-hidden">
      <div className="flex md:h-[660px]">
        <div className="hidden md:flex">
          <Sidebar tab={tab} onTab={onTab} available={available} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
          <MobileBar tab={tab} onTab={onTab} available={available} />
          <div className="hidden md:flex items-center justify-between px-6 py-3.5 border-b border-zinc-100 bg-white shrink-0">
            <div className="text-[12px] text-zinc-400">
              International <span className="mx-1.5 text-zinc-300">/</span>
              <span className="text-zinc-700 font-medium">{title}</span>
            </div>
            <IllustrativeTag />
          </div>
          <div className="flex-1 md:overflow-y-auto" data-lr-scroll>{children}</div>
          <div className="md:hidden px-4 py-3 border-t border-zinc-100 bg-white">
            <IllustrativeTag />
          </div>
        </div>
      </div>
    </div>
  );
}

function IllustrativeTag() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
      <Info className="w-3.5 h-3.5" aria-hidden />
      Illustrative data. People, recommendations and deals are fictional.
    </span>
  );
}
