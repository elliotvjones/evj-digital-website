import { LAUNCH } from '../content';
import { Section, SectionHeading, SubHeading, Prose, TwoCol, ToDiscuss } from './ui';

export default function Launch() {
  const { seeding, integrity } = LAUNCH;
  return (
    <Section id="launch" className="border-t border-zinc-200">
      <SectionHeading num="06" title={LAUNCH.heading} />

      <TwoCol aside={<SubHeading num="6.1">{seeding.heading}</SubHeading>}>
        <Prose paragraphs={seeding.paragraphs} />
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Proposed starting markets">
          {seeding.markets.map((m) => (
            <li key={m} className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[14px] text-zinc-800">
              {m}
            </li>
          ))}
        </ul>
        <ToDiscuss className="mt-6" title="To agree" note={seeding.marketsNote} />
      </TwoCol>

      <TwoCol className="mt-20 sm:mt-28" aside={<SubHeading num="6.2">{integrity.heading}</SubHeading>}>
        <ol className="border-t border-zinc-200">
          {integrity.rules.map((r, i) => (
            <li key={r} className="flex gap-4 py-5 border-b border-zinc-200">
              <span className="lr-label text-[color:var(--lr-accent)] pt-1">0{i + 1}</span>
              <p className="text-[16px] leading-[1.7] text-zinc-700">{r}</p>
            </li>
          ))}
        </ol>
        <ToDiscuss className="mt-6" items={integrity.options} />
      </TwoCol>
    </Section>
  );
}
