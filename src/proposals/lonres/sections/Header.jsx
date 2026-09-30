import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV } from '../content';
import { Lockup } from './ui';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors ${
        scrolled || open ? 'bg-[#F8F7F4]/90 backdrop-blur border-b border-zinc-200/70' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" className={`transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} tabIndex={scrolled ? 0 : -1}>
          <Lockup size="sm" />
        </a>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="lr-contents"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-3.5 py-1.5 text-[12px] font-medium text-zinc-800 hover:border-zinc-400"
        >
          {open ? <X className="w-3.5 h-3.5" aria-hidden /> : <Menu className="w-3.5 h-3.5" aria-hidden />}
          Contents
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="lr-contents"
            aria-label="Proposal contents"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="border-t border-zinc-200 bg-[color:var(--evj-paper)]"
          >
            <ol className="max-w-5xl mx-auto px-4 sm:px-6 py-4 grid sm:grid-cols-2 gap-x-10">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-3 border-b border-zinc-200 text-[15px] text-zinc-800 hover:text-zinc-950"
                  >
                    <span className="lr-label text-[color:var(--lr-accent)]">{n.num}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
