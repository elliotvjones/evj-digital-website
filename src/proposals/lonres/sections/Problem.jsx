import { PROBLEM } from '../content';
import { Section, SectionHeading, SubHeading, Prose, TwoCol } from './ui';
import WhatsAppThread from './WhatsAppThread';

// Places named in the messages, shown alongside the thread
const ASKED_ABOUT = ['Barcelona', 'Rome', 'Madrid', 'Malta', 'Porto Montenegro', 'New Haven', 'Italy', 'Europe'];

export default function Problem() {
  return (
    <Section id="problem" className="border-t border-zinc-200">
      <SectionHeading num="02" title={PROBLEM.heading} />
      <TwoCol
        aside={
          <p className="lr-display text-[26px] sm:text-[30px] leading-[1.25] text-zinc-900 max-w-[16ch]">
            There is no trusted place to go.
          </p>
        }
      >
        <Prose paragraphs={PROBLEM.paragraphs} />
      </TwoCol>

      <div className="mt-16 sm:mt-24 grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">
        <div>
          <SubHeading num="2.1">{PROBLEM.examplesHeading}</SubHeading>
          <Prose paragraphs={PROBLEM.examplesIntro} className="max-w-md" />

          <div className="mt-8">
            <div className="lr-label text-zinc-400 mb-3">Asked about in these messages alone</div>
            <ul className="flex flex-wrap gap-2 max-w-md">
              {ASKED_ABOUT.map((p) => (
                <li key={p} className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[13px] text-zinc-700">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {PROBLEM.context && <p className="mt-8 text-[16px] leading-relaxed text-zinc-600 max-w-md">{PROBLEM.context}</p>}
        </div>

        <WhatsAppThread messages={PROBLEM.thread} caption={PROBLEM.threadCaption} />
      </div>
    </Section>
  );
}
