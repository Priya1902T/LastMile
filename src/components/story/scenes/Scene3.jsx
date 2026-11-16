// Scene 3 "The triage": a lime scanner sweeps the resume and JD, matching lines get marker-swiped,
// sparkles burst on matches, and dashed data streams flow into a glowing NVIDIA NIM node.
import { INK, LIME } from "../data";

const SPARKS = [
  [470, 190], [540, 252], [640, 222], [700, 300],
];

export function Layer() {
  return (
    <>
      <g id="st-streams" opacity="0" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="7 9" strokeLinecap="round">
        <path className="st-stream" d="M364 330 C430 360 470 420 540 470" />
        <path className="st-stream" d="M494 330 C500 380 520 430 556 458" />
        <path className="st-stream" d="M676 350 C680 400 650 440 612 462" />
      </g>
      <g id="st-node" transform="translate(580 488)" opacity="0">
        <circle className="st-glow" r="70" fill={LIME} opacity=".35" filter="url(#st-blur)" />
        <circle r="44" fill={LIME} stroke={INK} strokeWidth="2.5" />
        <text y="-3" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK}>NVIDIA</text>
        <text y="13" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK}>NIM</text>
      </g>
      <rect id="st-beam" x="0" y="0" width="30" height="270" rx="15" fill={LIME} opacity="0" style={{ mixBlendMode: "multiply" }} />
      {SPARKS.map(([x, y], i) => (
        <path
          key={i}
          className="st-spark"
          transform={`translate(${x} ${y}) scale(0)`}
          d="M0 -14 C2 -4 4 -2 14 0 C4 2 2 4 0 14 C-2 4 -4 2 -14 0 C-4 -2 -2 -4 0 -14 Z"
          fill={INK}
        />
      ))}
    </>
  );
}

export function build(tl, ctx) {
  const { gsap, q, at } = ctx;
  const t = at("triage") - 1;

  gsap.set(q("#st-beam"), { x: 396, y: 92 });
  tl.to(q("#st-beam"), { opacity: 0.55, duration: 0.05 }, t + 0.06)
    .to(q("#st-beam"), { x: 770, duration: 0.55, ease: "power1.inOut" }, t + 0.06)
    .to(q("#st-beam"), { opacity: 0, duration: 0.06 }, t + 0.6);

  // Marker-swipe the matching lines as the beam passes (resume first, then JD).
  const hl = q(".st-hl");
  tl.to(hl, { scaleX: 1, transformOrigin: "0% 50%", duration: 0.08, stagger: { each: 0.035, from: "start" } }, t + 0.12);
  tl.to(hl, { opacity: (i) => (i % 3 === 1 ? 0 : 0.9), duration: 0.05 }, t + 0.7);

  tl.to(q(".st-spark"), { scale: 1, rotation: 90, transformOrigin: "50% 50%", duration: 0.08, stagger: 0.09, ease: "back.out(3)" }, t + 0.2)
    .to(q(".st-spark"), { scale: 0, rotation: 180, duration: 0.08, stagger: 0.09 }, t + 0.36);

  tl.to(q("#st-streams"), { opacity: 1, duration: 0.1 }, t + 0.45)
    .fromTo(q(".st-stream"), { strokeDashoffset: 0 }, { strokeDashoffset: -160, duration: 0.9, ease: "none" }, t + 0.45)
    .fromTo(q("#st-node"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, t + 0.5)
    .to(q(".st-glow"), { scale: 1.25, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, t + 0.7);
}
