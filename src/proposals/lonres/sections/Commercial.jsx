import { ShieldCheck, CreditCard, Check } from 'lucide-react';
import { COMMERCIAL } from '../content';
import { Section, SectionHeading, SubHeading, Prose, TwoCol, ToDiscuss } from './ui';

// "An agent needs a recommendation and a subscription."
function Entry() {
  const Part = ({ icon: Icon, label, dark }) => (
    <div
      className={`sm:flex-1 rounded-xl border px-4 py-3.5 flex items-center gap-2.5 whitespace-nowrap ${
        dark ? 'bg-zinc-950 border-zinc-950 text-white' : 'bg-white border-zinc-200 text-zinc-900'
      }`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${dark ? 'text-[color:var(--lr-accent)]' : 'text-zinc-400'}`} aria-hidden />
      <span className="text-[14px] font-semibold">{label}</span>
    </div>
  );
  return (
    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3" aria-label="An agent needs a recommendation and a subscription to be listed">
      <Part icon={ShieldCheck} label="Recommendation" />
      <span className="text-center text-zinc-400 text-[18px]" aria-hidden>+</span>
      <Part icon={CreditCard} label="Subscription" />
      <span className="text-center text-zinc-400 text-[18px]" aria-hidden>=</span>
      <Part icon={Check} label="Listed" dark />
    </div>
  );
}

export default function Commercial() {
  const { whoPays, pipeline, renew } = COMMERCIAL;
  return (
    <Section id="commercial" className="border-t border-zinc-200">
      <SectionHeading num="05" title={COMMERCIAL.heading} />

      <TwoCol aside={<SubHeading num="5.1">{whoPays.heading}</SubHeading>}>
        <Prose paragraphs={whoPays.paragraphs} />
        <Entry />
        <ToDiscuss
          className="mt-6"
          title="To discuss: price anchored against"
          items={whoPays.anchorOptions}
        />
      </TwoCol>

      <TwoCol className="mt-20 sm:mt-28" aside={<SubHeading num="5.2">{pipeline.heading}</SubHeading>}>
        <Prose paragraphs={pipeline.paragraphs} />
        <ToDiscuss className="mt-5" items={pipeline.incentives} note={pipeline.alternative} />
      </TwoCol>

      <TwoCol className="mt-20 sm:mt-28" aside={<SubHeading num="5.3">{renew.heading}</SubHeading>}>
        {/* The paragraph's closing line is set large rather than repeated */}
        <Prose paragraphs={[renew.paragraphs[0].split(' The directory gets them in')[0]]} />
        <p className="mt-8 lr-display text-[24px] sm:text-[30px] leading-[1.3] text-zinc-950">
          The directory gets them in; the demand keeps them.
        </p>
      </TwoCol>
    </Section>
  );
}
