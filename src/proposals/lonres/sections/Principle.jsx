import { PRINCIPLE } from '../content';
import { Section, SectionHeading, Prose, TwoCol } from './ui';

export default function Principle() {
  const [groups, why, ...rest] = PRINCIPLE.paragraphs;
  return (
    <Section id="principle" className="border-t border-zinc-200">
      <SectionHeading num="03" title={PRINCIPLE.heading} />
      <TwoCol
        aside={
          <div>
            <div className="lr-label text-zinc-400 mb-3">Already connecting agents across borders</div>
            <ul className="flex flex-wrap gap-2">
              {PRINCIPLE.groups.map((g) => (
                <li key={g} className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[13px] text-zinc-600">
                  {g}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Prose paragraphs={[groups, why]} />
      </TwoCol>

      <blockquote className="my-14 sm:my-20 border-l-2 border-[color:var(--lr-accent)] pl-5 sm:pl-8 max-w-3xl">
        <p className="lr-display text-[28px] sm:text-[40px] leading-[1.2] text-zinc-950">
          That makes quality the product.
        </p>
      </blockquote>

      <TwoCol aside={null}>
        <Prose paragraphs={rest} />
      </TwoCol>
    </Section>
  );
}
