import { ArrowUpRight, Mail } from 'lucide-react';
import { META, CONTACT } from '../content';
import { Lockup } from './ui';

export default function Contact() {
  const { cta } = CONTACT;
  return (
    <>
      <section id="contact" className="bg-zinc-950 text-white px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="lr-display text-[40px] sm:text-[64px] leading-[1.05]">{cta.heading}</h2>
          <a
            href={`mailto:${META.email}?subject=${encodeURIComponent('LonRes International Network')}`}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--lr-accent)] hover:bg-[color:var(--lr-accent-hover)] text-white pl-5 pr-4 py-3.5 text-[15px] font-semibold transition-colors group"
          >
            <Mail className="w-4 h-4" aria-hidden />
            {META.email}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>

          <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 max-w-2xl border-t border-white/10">
            {META.links.map((l) => {
              const external = l.href.startsWith('http');
              return (
                <div key={l.label} className="flex items-baseline justify-between gap-4 py-4 border-b border-white/10">
                  <dt className="lr-label text-zinc-500">{l.label}</dt>
                  <dd className="min-w-0">
                    <a
                      href={l.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[15px] text-zinc-200 hover:text-white underline-offset-4 hover:underline break-words"
                    >
                      {l.value}
                      {external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <footer className="bg-zinc-950 text-zinc-500 border-t border-white/10 px-4 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Lockup size="sm" onDark />
            <span className="text-[12px]">Prepared by {META.preparedBy}</span>
          </div>
          <div className="text-[12px]">
            {META.version} · {META.status} · Prototype people, recommendations and deals are fictional
          </div>
        </div>
      </footer>
    </>
  );
}
