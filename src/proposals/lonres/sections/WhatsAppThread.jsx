import { useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Pause, Play, Paperclip, Mic, Smile, MoreVertical, Users } from 'lucide-react';

// A phone showing a recreated agent WhatsApp group. The thread scrolls slowly on a loop
// while in view; hovering, focusing or the pause button stops it. With reduced motion it
// is a static list the reader can scroll themselves.

function Text({ text }) {
  // "{hidden}" marks a phone number in the original message, shown as a blurred block
  const parts = text.split('{hidden}');
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && (
        <span role="img" className="lr-blur inline-block align-middle rounded bg-[#1f9d55]/30 w-[92px] h-[12px]" aria-label="phone number removed" />
      )}
    </span>
  ));
}

function Message({ m }) {
  return (
    <div className="flex items-start gap-1.5 pr-8">
      <div className="w-7 h-7 rounded-full bg-zinc-300 shrink-0 lr-blur" aria-hidden />
      <div className="min-w-0 space-y-[3px]">
        {m.lines.map((line, i) => (
          <div
            key={i}
            className={`relative bg-white shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] px-2.5 pt-1.5 pb-1 ${
              i === 0 ? 'rounded-lg rounded-tl-none' : 'rounded-lg'
            }`}
          >
            {i === 0 && (
              <div className="text-[12px] font-medium leading-tight mb-0.5" style={{ color: m.color }}>
                <span className="lr-blur select-none" aria-hidden>~ {m.alias}</span>
                <span className="sr-only">Agent (name removed)</span>
              </div>
            )}
            <p className="text-[13px] leading-[1.35] text-[#111b21] whitespace-pre-line">
              <Text text={line} />
              <span className="inline-block w-12" aria-hidden />
            </p>
            {i === m.lines.length - 1 && (
              <span className="absolute right-2 bottom-1 text-[10px] text-[#667781]">{m.time}</span>
            )}
          </div>
        ))}
        {m.reactions && (
          <div className="inline-flex -mt-1 ml-2 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] px-1.5 py-0.5 text-[11px] text-[#667781] relative z-10">
            {m.reactions}
          </div>
        )}
      </div>
    </div>
  );
}

function Thread({ messages }) {
  return (
    <div className="space-y-3 px-2.5 pb-3">
      {messages.map((m, i) => (
        <Message key={i} m={m} />
      ))}
    </div>
  );
}

export default function WhatsAppThread({ messages, caption }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const [paused, setPaused] = useState(false);
  const animate = !reduce;

  return (
    <figure className="flex flex-col items-center">
      <div ref={ref} className="w-[292px] sm:w-[310px] rounded-[46px] bg-zinc-950 p-[10px] shadow-2xl shadow-zinc-900/20">
        <div className="relative rounded-[37px] overflow-hidden bg-[#efeae2] h-[600px] flex flex-col">
          {/* Status bar */}
          <div className="bg-white flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-zinc-900" aria-hidden>
            <span>9:41</span>
            <span className="w-16 h-4 rounded-full bg-zinc-950 absolute left-1/2 -translate-x-1/2 top-2" />
            <span className="tracking-tighter">•••</span>
          </div>

          {/* Group header */}
          <div className="bg-white flex items-center gap-2 px-2.5 py-2 border-b border-black/5">
            <ArrowLeft className="w-4 h-4 text-zinc-700" aria-hidden />
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center" aria-hidden>
              <Users className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-zinc-900 truncate">
                <span className="lr-blur select-none" aria-hidden>International Agents Network</span>
                <span className="sr-only">Agent WhatsApp group (name removed)</span>
              </div>
              <div className="text-[10px] text-zinc-500">Group</div>
            </div>
            <MoreVertical className="w-4 h-4 text-zinc-600" aria-hidden />
          </div>

          {/* Messages */}
          <div
            className={`relative flex-1 min-h-0 pt-3 lr-thread ${animate ? 'overflow-hidden' : 'overflow-y-auto'}`}
            tabIndex={animate ? -1 : 0}
            aria-label="Messages from the group"
          >
            <div
              className={animate ? 'lr-thread-track' : ''}
              data-paused={!inView || paused ? 'true' : 'false'}
            >
              <Thread messages={messages} />
              {animate && (
                <div aria-hidden>
                  <Thread messages={messages} />
                </div>
              )}
            </div>
            {animate && <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#efeae2] to-transparent" />}
          </div>

          {/* Composer */}
          <div className="flex items-center gap-1.5 px-2 py-2" aria-hidden>
            <div className="flex-1 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[12px] text-zinc-400">
              <Smile className="w-4 h-4" />
              <span className="flex-1">Message</span>
              <Paperclip className="w-4 h-4" />
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1f9d55] flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 max-w-[310px] text-center">
        <p className="text-[12px] leading-relaxed text-zinc-500">{caption}</p>
        {animate && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-700 hover:border-zinc-400"
          >
            {paused ? <Play className="w-3.5 h-3.5" aria-hidden /> : <Pause className="w-3.5 h-3.5" aria-hidden />}
            {paused ? 'Play' : 'Pause'} the thread
          </button>
        )}
      </figcaption>
    </figure>
  );
}
