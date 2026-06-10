# EVJ Digital — site build brief

A single-page portfolio site for EVJ Digital, the personal studio brand of Elliot Jones (London). The site's job is to make a visitor trust Elliot enough to work with him within sixty seconds of landing. The design thesis: Elliot is the fixed point of the site and everything orbits him. Strict black and white. Motion is the colour.

This brief is written to be handed to Claude Code. A working seed file for the hero already exists: `evj-digital-hero-v2.html` (self-contained, real logo and portrait embedded as base64). Port it into the project structure rather than rebuilding from scratch — the type, easing, choreography and copy in it are approved.

---

## 1. Brand system

**Palette.** Pure `#000000` page background. `#FFFFFF` ink. `#8A8A8A` muted text. `#555555` faint text. `#1C1C1C` hairlines. `#2E2E2E` ghost-button borders. No accent colour anywhere. The discipline is the brand.

**Logo.** The real EVJ Digital shield monogram exists as raster assets, white marks on transparent:

- `evj-logo-shield-transparent.png` (910x1200) — shield only, used in the nav and as the contact watermark
- `evj-logo-lockup-transparent.png` (1077x1600) — shield plus DIGITAL wordmark, for social and favicons

Source is a flat PNG, so the nav reveal is a fade-and-settle (opacity 0 to 1, scale 0.92 to 1, 1.0s) rather than a stroke draw-on. A vectorised SVG of the shield is a known backlog item (hand-trace or Vectorizer.ai); when it lands, upgrade the reveal to a stroke draw-on and swap the watermark to SVG. Until then use the PNGs at 2x display size for crispness.

**Typography.** Archivo variable (Google Fonts, `wdth` 62–125, `wght` 100–900). Display: weight 620, font-stretch 118%, letter-spacing -0.022em, line-height 0.99. Body: weight 400, 16px, line-height 1.65. Labels/eyebrows: 11px, weight 500, letter-spacing 0.38em, caps. No second typeface except one serif moment in the manifesto section (use `Newsreader` italic from Google Fonts, nowhere else).

**Copy voice.** Short punchy British English. No em dashes anywhere in site copy. Data-led where possible. Reads like a person, not a brochure.

**Easing.** One curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`. No exceptions. Durations: micro-interactions 0.3s, element reveals 0.8–1.0s, section transitions 1.2–1.6s, stagger interval 80ms.

---

## 2. Tech stack

- Vite + TypeScript, no framework. The site is one page with heavy choreography; a component framework adds weight without value here.
- GSAP 3 with ScrollTrigger (registered plugin) for all scroll-driven animation and pinning.
- Lenis for smooth scroll, synced to GSAP's ticker.
- Plain CSS with custom properties (the token set in section 1). No Tailwind.
- Deploy target: Cloudflare Pages or Vercel, whichever Elliot prefers. Static output, no server.

```
evj-digital/
├── index.html
├── src/
│   ├── main.ts            entry, Lenis + GSAP setup, reduced-motion gate
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   └── sections/      one file per section
│   ├── sections/
│   │   ├── hero.ts
│   │   ├── orbit.ts       the orbit engine (section 3)
│   │   ├── manifesto.ts
│   │   └── contact.ts
│   └── lib/
│       ├── magnetic.ts    magnetic button hover
│       └── countup.ts
├── public/
│   ├── images/            portrait grades + cutouts (section 6)
│   └── fonts/             self-host Archivo after v1 for performance
└── package.json
```

---

## 3. Page structure and the orbit engine

The page has five zones. Zone 1 is the approved hero. Zones 2–4 run inside one pinned orbit container. Zone 5 is the contact close.

**Zone 1 — Hero.** Port `evj-digital-hero.html` exactly: shield draw-on (1.3s, stroke-dasharray), headline mask rise (two lines, 0.55s/0.68s delays), spotlight portrait emerging (1.6s), stats counting up (1.4s, quart ease-out), magnetic CTAs, scroll cue with dripping tick.

**Zones 2–4 — The orbit.** This is the signature of the site.

The orbit container pins for ~400vh of scroll. Elliot's full-length cutout stands fixed at centre (until the reshoot, use the waist-up cutout anchored to the bottom edge). Content cards travel an elliptical path around him: `rx` ≈ 38vw clamped to 520px, `ry` ≈ 90px, centre slightly below his waistline.

Depth model, no WebGL: for each card at angle `a`, depth `d = sin(a)` in [-1, 1]. Scale maps `d` to [0.6, 1.0], opacity to [0.3, 1.0], z-index to [40, 160] with the figure at z 100, and a `blur()` filter maps `d` to [2px, 0] so rear cards soften. Cards therefore pass behind him at the top of the loop and in front at the bottom.

Scroll behaviour: ScrollTrigger scrub drives the orbit angle, with `snap` to each card's front position (`d = 1`). On settle, the front card expands: width animates from 280px to ~560px and its full content fades in (case study summary, capability detail, stat with source line). Swirl between, stillness within. While settled, the figure leans 2 degrees toward the front card (CSS rotate on the cutout, 0.8s).

Orbit content, in scroll order:

1. Growth and marketing — 100+ campaigns shipped, multi-channel, expands to a three-line capability summary
2. Product and build — platforms, pipelines and automation
3. AI systems — applied AI shipped to production
4. ADVSR — flagship case study, expands with one-line outcome and a "Read the case" link
5. Case slot 02 — placeholder card, same treatment
6. $278M+ — platform value analysed, expands with the source line

Stat figures are placeholders carried over from ADVSR work. Confirm final claims with Elliot before launch; do not invent numbers.

**Zone 5 — Manifesto and contact.** After the orbit unpins: the single serif moment, a one-line manifesto quote fading in word by word, above a continuously drifting marquee of tools (pauses on hover). Then the close: oversized `elliot@evjdigital.com` (clamp(32px, 6vw, 72px)) with a white wipe on hover and one-click copy, a small circular portrait crop beside a "Work with Elliot" line, and the shield watermark at 15% opacity rotating with scroll velocity. Footer line: EVJ DIGITAL · London.

---

## 4. Interaction inventory

- Magnetic buttons: translate toward cursor at 0.18x horizontal, 0.3x vertical, spring back on leave (already in the seed file).
- Capability cards invert to white-on-black... correction for this site: cards are white, so hover lifts 6px and the leading icon plays a one-shot micro-animation.
- Email copy: click copies to clipboard, label swaps to "Copied" for 1.5s.
- Nav links: muted to white on hover, 0.3s.
- No custom cursor. No preloader longer than the hero choreography itself.

---

## 5. Accessibility, mobile, performance

**Reduced motion.** `prefers-reduced-motion: reduce` disables all animation. The orbit becomes a vertical stack of the six cards in scroll order, fully readable. The seed file already implements this pattern for the hero; extend it.

**Mobile (≤860px).** No orbit. Elliot pins as a smaller anchor in the top third, cards slide vertically through the front position one at a time with the same settle-and-expand behaviour. Hero stacks: copy, then portrait, then proof strip (already handled in the seed file).

**Performance.** Self-host fonts after v1. Portrait images as AVIF with JPEG fallback, max 1600px on the long edge. The base64-embedded portrait in the seed file gets replaced with a real image file at port time. Targets: Lighthouse 95+ performance, CLS under 0.05, LCP under 2.0s on 4G. Keyboard focus visible on every interactive element (1px white outline, 4px offset, as in the seed).

---

## 6. Image pipeline

Three graded portraits exist from the current shoot: `elliot_bw_classic.jpg`, `elliot_bw_editorial.jpg`, `elliot_bw_hero_dark.jpg` (approved for the hero). The spotlight treatment recipe, for regrading any future photo:

1. Greyscale, autocontrast at 0.5% cutoff
2. Blacks crush: `v * 1.07 - 0.10`, clipped to [0, 1]
3. Radial fade to black: centre at (0.5, 0.42) of frame, normalised radius `r` with x scaled by 0.46 and y by 0.60, multiply by `clamp((1.0 - r) / 0.55, 0, 1) ^ 2.4`

For the orbit, a clean cutout is needed (cards must pass behind him). The grey seamless backdrop masks easily; use `rembg` or equivalent in the build pipeline, then apply the editorial grade to the cutout.

**Reshoot shot list (full-length, for orbit v2).** Grey seamless backdrop, single key light high and slightly camera-left to match the existing grade, no fill, full length with shoes in frame, camera at chest height, 50mm equivalent. Wardrobe: the existing grey gilet, white shirt, dark jeans. Four poses: hands behind back (matching the approved shot), arms crossed, one hand in pocket looking off-axis, mid-gesture as if explaining. Deliver RAW plus 4000px+ JPEG, subject occupying ~75% of frame height.

---

## 7. Build phases

**Phase 1.** Scaffold, tokens, port the hero from the seed file, deploy preview. Acceptance: hero choreography identical to the seed, Lighthouse 95+.

**Phase 2.** Orbit engine with placeholder cards: pin, scrub, depth model, snap-and-settle. Acceptance: smooth at 60fps on a mid-range laptop, snap never strands between cards, reduced-motion fallback works.

**Phase 3.** Real orbit content, figure lean, card expansion states, manifesto and contact zones.

**Phase 4.** Mobile behaviour, image pipeline (cutout + AVIF), self-hosted fonts, copy pass with Elliot, final claims confirmed, launch.

Anything ambiguous in this brief: prefer restraint. One signature (the orbit), everything else quiet.
