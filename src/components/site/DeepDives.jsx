"use client";

// S8. Four alternating deep dives, each with its own small scroll-driven SVG.
import { useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { RevealText } from "@/components/ui/Motion";
import { SCOPE_BUCKETS } from "@/content/copy";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

function Split({ flip, eyebrow, title, body, children, id }) {
  return (
    <div id={id} className={`grid scroll-mt-24 items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <p className="eyebrow text-muted">{eyebrow}</p>
        <RevealText as="h3" className="display mt-3 text-[clamp(30px,3.4vw,44px)] leading-[1.04]">{title}</RevealText>
        <div className="lede mt-5 max-w-[470px]">{body}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

/* a) Interactive scope map */
function ScopeExplorer() {
  const [open, setOpen] = useState("must");
  const [tip, setTip] = useState(null);
  return (
    <div className="card p-5 sm:p-6">
      <p className="display mb-4 text-[19px]">Your Scope Map</p>
      <div className="space-y-2.5">
        {SCOPE_BUCKETS.map((b) => {
          const isOpen = open === b.key;
          return (
            <div key={b.key} className={`tint-${b.tint} rounded-2xl`}>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                aria-expanded={isOpen}
                aria-controls={`bucket-${b.key}`}
                onClick={() => {
                  setOpen(isOpen ? null : b.key);
                  setTip(null);
                }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/80">
                  {b.key === "must" ? <Check size={18} /> : b.key === "skip" ? <X size={18} /> : <span className="text-orange">∿</span>}
                </span>
                <span className="flex-1">
                  <b className="display block text-[15px]">{b.name}</b>
                  <small className="text-[12px] text-muted">{b.topics.length} topics</small>
                </span>
                <span className={`text-[22px] leading-none transition-transform ${isOpen ? "rotate-45" : ""}`} aria-hidden>+</span>
              </button>
              <div id={`bucket-${b.key}`} hidden={!isOpen} className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {b.topics.map((t) => (
                    <button
                      key={t.t}
                      type="button"
                      onClick={() => setTip(tip?.t === t.t ? null : t)}
                      onMouseEnter={() => setTip(t)}
                      aria-pressed={tip?.t === t.t}
                      className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition ${tip?.t === t.t ? "border-coal bg-coal text-white" : "border-coal/10 bg-white"}`}
                    >
                      {t.t}
                    </button>
                  ))}
                </div>
                {tip && b.topics.includes(tip) && (
                  <div className="mt-3 rounded-2xl bg-white p-4 text-[14px] shadow-sm" role="status">
                    <p><b>Why:</b> {tip.why}</p>
                    <p className="mt-1.5 text-muted"><b className="text-coal">Fallback:</b> {tip.fallback}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* b) Resume lines highlight; a question pops from each; an answer outline types out */
const PROBES = [
  { y: 74, q: "Walk me through the dashboard you built.", a: [] },
  { y: 128, q: "How did you handle failed API calls?", a: [] },
  {
    y: 182,
    q: "Why did you pick Context over Redux?",
    a: ["Small shared state, few writers", "Less boilerplate for a two-person team", "Would revisit it at a larger scale"],
  },
];
function ResumeProbe() {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 40%", scrub: 1 } });
      PROBES.forEach((_, i) => {
        tl.fromTo(`.rp-hl-${i}`, { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: 0.4 })
          .fromTo(`.rp-q-${i}`, { scale: 0, opacity: 0, transformOrigin: "0% 100%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, "<0.2")
          .to(`.rp-q-${i}`, { opacity: i < PROBES.length - 1 ? 0.25 : 1, duration: 0.2 }, "+=0.5");
      });
      tl.fromTo(".rp-ans li", { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.25, duration: 0.3 });
    },
    { scope: ref },
  );
  const last = PROBES[PROBES.length - 1];
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 580 300" className="w-full" aria-hidden>
        <rect x="20" y="20" width="250" height="260" rx="20" fill="#fff" />
        <rect x="44" y="42" width="110" height="10" rx="5" fill="#111312" />
        {[74, 92, 110, 128, 146, 164, 182, 200, 218, 236].map((y, i) => (
          <rect key={y} x="44" y={y} width={[180, 150, 170, 190, 140, 165, 185, 130, 160, 120][i]} height="6" rx="3" fill="#cfccc8" />
        ))}
        {PROBES.map((p, i) => (
          <rect key={i} className={`rp-hl-${i}`} x="40" y={p.y - 5} width="200" height="16" rx="4" fill="#D7FF1E" style={{ mixBlendMode: "multiply" }} />
        ))}
        {PROBES.map((p, i) => (
          <g key={i} className={`rp-q-${i}`}>
            <path d={`M262 ${p.y + 2} L282 ${p.y - 8} L282 ${p.y + 12} Z`} fill="#111312" />
            <rect x="280" y={p.y - 26} width="290" height="44" rx="16" fill="#111312" />
            <text x="296" y={p.y + 1} fontSize="12.5" fontWeight="700" fill="#fff">{p.q}</text>
          </g>
        ))}
      </svg>
      <div className="card -mt-2 ml-auto max-w-[360px] p-5">
        <p className="eyebrow text-muted">Answer outline</p>
        <p className="mt-1 text-[14px] font-semibold">“{last.q}”</p>
        <ul className="rp-ans mt-3 space-y-1.5 text-[14px]">
          {last.a.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime ring-2 ring-coal/10" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* c) Missing puzzle piece snaps in with a lime flash */
function GapPuzzle() {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", end: "center 45%", scrub: 1 } })
        .fromTo(".gp-card", { x: 80, opacity: 0, rotate: 8 }, { x: 0, opacity: 1, rotate: -3, duration: 1 })
        .fromTo(".gp-piece", { x: 150, y: -110, rotate: 40 }, { x: 0, y: 0, rotate: 0, duration: 1, ease: "power3.in" })
        .fromTo(".gp-flash", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 0.9, scale: 1.3, duration: 0.25 })
        .to(".gp-flash", { opacity: 0, duration: 0.3 });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="grid items-center gap-6 sm:grid-cols-[1fr_1.1fr]">
      <svg viewBox="0 0 260 260" className="mx-auto w-full max-w-[280px]" aria-hidden>
        <g transform="translate(38 38)">
          {[[0, 0], [92, 0], [0, 92]].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="92" height="92" rx="6" fill="#E6F8B8" stroke="#111312" strokeWidth="2" />
          ))}
          <rect x="92" y="92" width="92" height="92" rx="6" fill="none" stroke="#111312" strokeDasharray="6 6" strokeWidth="2" />
          <circle className="gp-flash" cx="138" cy="138" r="70" fill="#D7FF1E" opacity="0" />
          <g className="gp-piece">
            <path transform="translate(92 92)" d="M0 0 H34 C34 -14 58 -14 58 0 H92 V92 H0 Z" fill="#D7FF1E" stroke="#111312" strokeWidth="2.5" />
            <text x="138" y="143" textAnchor="middle" fontSize="15" fontWeight="800" fill="#111312">TS</text>
          </g>
        </g>
      </svg>
      <div className="gp-card card rotate-[-3deg] p-5">
        <p className="eyebrow text-muted">Honest-gap script · TypeScript</p>
        <ol className="serif-i mt-3 space-y-2 text-[18px] leading-snug">
          <li>“I haven’t used TypeScript in production yet.”</li>
          <li>“I document props with JSDoc, so typed thinking is familiar.”</li>
          <li>“In week one I’d type our API responses first, since that’s where bugs hide.”</li>
        </ol>
        <p className="mt-3 text-[13px] text-muted">Learn fast: interfaces, union types, typing a fetch response.</p>
      </div>
    </div>
  );
}

/* d) Wobbly worry cloud calms into a circle; breathing ring */
function FearCalm() {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".fc-ring", { scale: 1.16, transformOrigin: "50% 50%", duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap
        .timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center 40%", scrub: 1 } })
        .to(".fc-cloud", { morphSVG: ".fc-circle", fill: "#D7FF1E", duration: 1 })
        .to(".fc-word", { opacity: 0, duration: 0.4 }, 0.2)
        .to(".fc-calm", { opacity: 1, duration: 0.4 }, 0.6);
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="grid items-center gap-6 sm:grid-cols-[1fr_1.1fr]">
      <svg viewBox="0 0 260 260" className="mx-auto w-full max-w-[280px]" aria-hidden>
        <circle className="fc-ring" cx="130" cy="130" r="104" fill="none" stroke="#111312" strokeOpacity=".2" strokeWidth="2" strokeDasharray="4 8" />
        <path className="fc-circle" d="M130 62 C168 62 198 92 198 130 C198 168 168 198 130 198 C92 198 62 168 62 130 C62 92 92 62 130 62 Z" fill="none" />
        <path className="fc-cloud" d="M70 140 C40 110 70 70 104 82 C110 50 160 48 170 80 C210 70 226 120 196 140 C226 170 188 210 160 192 C150 222 100 220 96 192 C60 206 40 166 70 140 Z" fill="#FF7A1F" />
        <text className="fc-word" x="130" y="136" textAnchor="middle" fontSize="17" fontWeight="800" fill="#111312">freezing?</text>
        <text className="fc-calm" x="130" y="136" textAnchor="middle" fontSize="17" fontWeight="800" fill="#111312" opacity="0">breathe</text>
      </svg>
      <div className="card p-5">
        <p className="eyebrow text-muted">Your drill · Freezing</p>
        <p className="display mt-2 text-[20px]">Pause. Restate. Two parts.</p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[14.5px]">
          <li>Pause for three full seconds. It feels long; it isn’t.</li>
          <li>Restate the question in your own words.</li>
          <li>Answer in two parts: what you’d do first, then why.</li>
        </ol>
        <p className="mt-3 text-[13px] text-muted">Practise it out loud twice tonight with any question from your plan.</p>
      </div>
    </div>
  );
}

export default function DeepDives() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 sm:px-8" aria-label="Deep dives">
      <Split
        id="scope-map"
        eyebrow="Scope Map"
        title="See the whole interview in three piles."
        body={<p>Every topic gets a pile and a reason. Tap a pile, then a topic, to see why it’s there and the one-line fallback if it comes up anyway.</p>}
      >
        <ScopeExplorer />
      </Split>
      <Split
        flip
        id="probe"
        eyebrow="Resume Probe Questions"
        title="Know what they’ll ask about YOUR resume."
        body={<p>Interviewers open with your own work. Scoped reads your resume the way they will, flags the lines that invite questions, and gives you an outline (not a script) for each.</p>}
      >
        <ResumeProbe />
      </Split>
      <Split
        id="gaps"
        eyebrow="Honest-Gap Scripts"
        title="Missing a skill? Say it honestly. Say it well."
        body={<p>Bluffing is easy to spot. A calm, honest answer that shows how you’d close the gap is not. Each script comes with the fastest thing to learn first.</p>}
      >
        <GapPuzzle />
      </Split>
      <Split
        flip
        id="fear"
        eyebrow="Fear Tip"
        title="Name your worry. Get one drill."
        body={<p>Freezing, rambling, salary questions, a stack you haven’t used. Pick the one that scares you most and get one concrete drill, not a pep talk.</p>}
      >
        <FearCalm />
      </Split>
    </section>
  );
}
