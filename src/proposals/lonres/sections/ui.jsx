// Layout primitives shared by the LonRes proposal sections.

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-20 px-4 sm:px-6 py-16 sm:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}

export function SectionHeading({ num, eyebrow, title, className = '' }) {
  return (
    <header className={`mb-8 sm:mb-12 ${className}`}>
      <div className="lr-label text-zinc-400 mb-3">
        <span className="text-[color:var(--lr-accent)]">{num}</span>
        {eyebrow && <span className="ml-3">{eyebrow}</span>}
      </div>
      <h2 className="lr-display text-[34px] leading-[1.1] sm:text-[48px] text-zinc-950">{title}</h2>
    </header>
  );
}

export function SubHeading({ num, children }) {
  return (
    <h3 className="flex items-baseline gap-3 text-[20px] sm:text-[22px] font-semibold tracking-tight text-zinc-950 mb-4">
      {num && <span className="lr-label text-zinc-400 font-normal">{num}</span>}
      <span>{children}</span>
    </h3>
  );
}

export function Prose({ paragraphs, className = '' }) {
  return (
    <div className={`space-y-4 text-[16px] leading-[1.7] text-zinc-600 ${className}`}>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)}>{p}</p>
      ))}
    </div>
  );
}

export function Lockup({ size = 'lg', onDark = false }) {
  const s = size === 'lg' ? { box: 'w-14 h-14 sm:w-16 sm:h-16', x: 'text-lg', pad: 'p-2 sm:p-2.5' } : { box: 'w-7 h-7', x: 'text-[11px]', pad: 'p-[3px]' };
  return (
    <div className="flex items-center gap-3" aria-label="LonRes x EVJ Digital" role="img">
      <img src="/proposals/lonres/lonres-logo.png" alt="" className={`${s.box} rounded-[3px]`} />
      <span className={`${s.x} text-zinc-400 font-light`} aria-hidden>
        ×
      </span>
      <div className={`${s.box} ${s.pad} bg-zinc-950 rounded-[3px] flex items-center justify-center ${onDark ? 'ring-1 ring-white/25' : ''}`}>
        <img src="/proposals/lonres/evj-lockup-white.png" alt="" className="h-full w-auto" />
      </div>
    </div>
  );
}

// Ideas in the doc that are not decided yet
export function ToDiscuss({ title = 'Options to discuss', items, note, className = '' }) {
  return (
    <div className={`rounded-xl border border-dashed border-zinc-300 bg-white/60 p-5 ${className}`}>
      <div className="lr-label text-zinc-400 mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--lr-accent)]" aria-hidden />
        {title}
      </div>
      {items && (
        <ul className="space-y-2.5">
          {items.map((it) => (
            <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-zinc-700">
              <span className="text-zinc-300 select-none" aria-hidden>○</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
      {note && <p className={`text-[14px] leading-relaxed text-zinc-500 ${items ? 'mt-4' : ''}`}>{note}</p>}
    </div>
  );
}

export function TwoCol({ aside, children, className = '' }) {
  return (
    <div className={`grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 ${className}`}>
      <div>{aside}</div>
      <div>{children}</div>
    </div>
  );
}
