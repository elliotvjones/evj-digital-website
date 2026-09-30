import { FileText, Rss, Handshake, Sparkles } from 'lucide-react';
import { PHASE_2 } from '../content';
import { Section, SectionHeading } from './ui';

const ICONS = [FileText, Rss, Handshake, Sparkles];

// Illustrative: a London member's own website with the syndicated international section.
const LISTINGS = [
  { title: 'Villa, Sierra Blanca', city: 'Marbella', price: '€4,250,000', tone: 'from-stone-200 to-stone-300' },
  { title: 'Apartment, Saint-Germain', city: 'Paris', price: '€2,900,000', tone: 'from-zinc-200 to-zinc-300' },
  { title: 'Townhouse, Príncipe Real', city: 'Lisbon', price: '€1,850,000', tone: 'from-neutral-200 to-neutral-300' },
];

function SyndicatedSite() {
  return (
    <figure className="rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5 overflow-hidden" aria-label="Illustration: a London agency website with an international section powered by LonRes">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-100 bg-zinc-50" aria-hidden>
        <span className="w-2 h-2 rounded-full bg-zinc-300" />
        <span className="w-2 h-2 rounded-full bg-zinc-300" />
        <span className="w-2 h-2 rounded-full bg-zinc-300" />
        <span className="ml-3 flex-1 max-w-[260px] rounded-md bg-white border border-zinc-200 px-2.5 py-0.5 text-[10px] text-zinc-400 truncate">
          londonagency.example/international
        </span>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <span className="text-[15px] tracking-[0.2em] uppercase text-zinc-900 font-light">London Agency</span>
          <span className="hidden sm:flex gap-4 text-[11px] text-zinc-400" aria-hidden>
            <span>Sales</span><span>Lettings</span><span className="text-zinc-900 font-medium">International</span>
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 mb-4">
          <div className="lr-display text-[22px] text-zinc-950">International homes</div>
          <div className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400 shrink-0">
            Powered by
            <img src="/proposals/lonres/lonres-logo.png" alt="LonRes" className="w-4 h-4 rounded-[2px]" />
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LISTINGS.map((l) => (
            <li key={l.title} className="rounded-lg border border-zinc-200 overflow-hidden">
              <div className={`aspect-[4/3] bg-gradient-to-br ${l.tone}`} aria-hidden />
              <div className="p-3">
                <div className="text-[12px] font-semibold text-zinc-900">{l.title}</div>
                <div className="text-[11px] text-zinc-500">{l.city}</div>
                <div className="text-[12px] text-zinc-800 mt-1 tabular-nums">{l.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="px-4 sm:px-6 py-3 border-t border-zinc-100 text-[11px] text-zinc-400">
        Illustrative. Agency, website and listings are fictional.
      </figcaption>
    </figure>
  );
}

export default function Phase2() {
  return (
    <Section id="phase-2" className="border-t border-zinc-200">
      <SectionHeading num="07" eyebrow={PHASE_2.eyebrow} title={PHASE_2.heading} />
      <p className="lr-display text-[24px] sm:text-[30px] leading-[1.3] text-zinc-900 max-w-3xl mb-12 sm:mb-16">
        {PHASE_2.intro}
      </p>

      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start">
        <ol className="border-t border-zinc-200">
          {PHASE_2.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <li key={it.heading} className="py-6 border-b border-zinc-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="lr-label text-[color:var(--lr-accent)]">7.{i + 1}</span>
                  <Icon className="w-4 h-4 text-zinc-400" aria-hidden />
                  <h3 className="text-[18px] font-semibold text-zinc-950">{it.heading}</h3>
                </div>
                <p className="text-[16px] leading-[1.7] text-zinc-600">{it.body}</p>
                {it.note && (
                  <p className="mt-3 text-[14px] leading-relaxed text-zinc-800 border-l-2 border-[color:var(--lr-accent)] pl-3">
                    {it.note}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
        <div className="-mx-4 sm:mx-0 lg:sticky lg:top-24">
          <SyndicatedSite />
        </div>
      </div>
    </Section>
  );
}
