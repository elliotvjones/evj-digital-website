import { SUMMARY } from '../content';
import { Section, SectionHeading } from './ui';

// Paragraphs, with the proposal's two parts as a numbered list
export default function Summary() {
  return (
    <Section id="summary" className="border-t border-zinc-200">
      <SectionHeading num="01" title={SUMMARY.heading} />
      <div className="max-w-2xl space-y-4 text-[16px] leading-[1.7] text-zinc-600">
        {SUMMARY.paragraphs.map((p, i) =>
          typeof p === 'string' ? (
            <p key={i}>{p}</p>
          ) : (
            <ol key={i} className="border-y border-zinc-200 divide-y divide-zinc-200 my-6">
              {p.list.map((item, n) => (
                <li key={item} className="flex gap-4 py-4">
                  <span className="lr-label text-[color:var(--lr-accent)] pt-[3px] w-6 shrink-0">0{n + 1}</span>
                  <span className="text-[17px] text-zinc-900">{item}</span>
                </li>
              ))}
            </ol>
          ),
        )}
      </div>
    </Section>
  );
}
