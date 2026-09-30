import { Lock } from 'lucide-react';
import { MODEL } from '../content';
import LonResPrototype from '../prototype/LonResPrototype';
import { useStore } from '../prototype/store';
import { buyersIn } from '../prototype/RequirementRegister';
import { Section, SectionHeading, SubHeading, Prose, TwoCol } from './ui';

// 4.3: the doc's "[X] registered buyers looking in Spain right now", filled live.
function GatedContact() {
  const [state] = useStore();
  const [lead, quote] = MODEL.gated.paragraphs;
  const n = buyersIn(state.requirements, 'Spain');
  const [before, after] = quote.split('[X]');
  return (
    <TwoCol
      className="mt-20 sm:mt-28"
      aside={<SubHeading num="4.3">{MODEL.gated.heading}</SubHeading>}
    >
      <Prose paragraphs={[lead]} />
      <p className="mt-4 text-[16px] leading-[1.7] text-zinc-600">
        {before}
        <span className="font-semibold text-[color:var(--lr-accent)] tabular-nums">{n}</span>
        {after}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-zinc-200 bg-zinc-200">
        <div className="bg-white p-4 sm:p-5">
          <div className="lr-label text-zinc-400 mb-2">Open to everyone</div>
          <ul className="space-y-1.5 text-[14px] text-zinc-800">
            <li>That a requirement exists</li>
            <li>Where and what it is</li>
            <li>Profiles, recommendations, track record</li>
          </ul>
        </div>
        <div className="bg-zinc-950 p-4 sm:p-5 text-white">
          <div className="lr-label text-[color:var(--lr-accent)] mb-2 flex items-center gap-1.5">
            <Lock className="w-3 h-3" aria-hidden /> Members only
          </div>
          <ul className="space-y-1.5 text-[14px] text-zinc-200">
            <li>Who registered it</li>
            <li>Getting in touch</li>
            <li>Reaching the agent</li>
          </ul>
        </div>
      </div>
    </TwoCol>
  );
}

// 4.4: table on wide screens, stacked cards on phones. Where both columns say the
// same thing, the row shows one merged cell.
function FitTable() {
  const { heading, columns, rows } = MODEL.fit;
  return (
    <div className="mt-20 sm:mt-28">
      <SubHeading num="4.4">{heading}</SubHeading>
      <div className="hidden md:block mt-6 rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full text-left table-fixed">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[39%]" />
            <col className="w-[39%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-zinc-200">
              {columns.map((c, i) => (
                <th key={c} scope="col" className={`lr-label px-5 py-3.5 ${i === 0 ? 'text-zinc-400' : 'text-zinc-900'}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([feature, london, intl]) => (
              <tr key={feature} className="border-b border-zinc-100 last:border-0">
                <th scope="row" className="px-5 py-4 text-[14px] font-semibold text-zinc-900 align-top">{feature}</th>
                {london === intl ? (
                  <td colSpan={2} className="px-5 py-4 text-[14px] text-zinc-600 align-top text-center border-l border-dashed border-zinc-200">
                    {london}
                  </td>
                ) : (
                  <>
                    <td className="px-5 py-4 text-[14px] text-zinc-600 align-top">{london}</td>
                    <td className="px-5 py-4 text-[14px] text-zinc-600 align-top">{intl}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden mt-5 space-y-3">
        {rows.map(([feature, london, intl]) => (
          <div key={feature} className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-[15px] font-semibold text-zinc-900 mb-3">{feature}</div>
            <dl className="space-y-2.5">
              {london === intl ? (
                <div>
                  <dt className="lr-label text-zinc-400">{columns[1]} and {columns[2].toLowerCase()}</dt>
                  <dd className="text-[14px] text-zinc-600">{london}</dd>
                </div>
              ) : (
                <>
                  <div>
                    <dt className="lr-label text-zinc-400">{columns[1]}</dt>
                    <dd className="text-[14px] text-zinc-600">{london}</dd>
                  </div>
                  <div>
                    <dt className="lr-label text-zinc-400">{columns[2]}</dt>
                    <dd className="text-[14px] text-zinc-600">{intl}</dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Model() {
  return (
    <Section id="model" className="border-t border-zinc-200">
      <SectionHeading num="04" eyebrow={MODEL.eyebrow} title={MODEL.heading} />

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 mb-10">
        <div>
          <SubHeading num="4.1">{MODEL.directory.heading}</SubHeading>
        </div>
        <Prose paragraphs={MODEL.directory.paragraphs} />
      </div>

      <div className="-mx-4 sm:mx-0">
        <LonResPrototype initialTab="directory" />
      </div>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 mt-20 sm:mt-28 mb-10">
        <div>
          <SubHeading num="4.2">{MODEL.register.heading}</SubHeading>
          <p className="text-[14px] text-zinc-500 leading-relaxed lg:max-w-xs">
            Filter by market, register a requirement of your own, and switch between the free and member view to see what stays gated.
          </p>
        </div>
        <Prose paragraphs={MODEL.register.paragraphs} />
      </div>

      <div className="-mx-4 sm:mx-0">
        <LonResPrototype initialTab="register" />
      </div>

      <GatedContact />
      <FitTable />
    </Section>
  );
}
