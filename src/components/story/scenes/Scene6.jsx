// Scene 6 "The walk-in": the stage goes dark, the readiness gauge climbs to 92%, lime slashes and sparkles burst,
// the laptop closes, the candidate stands, and a door opens onto a lime light spill.
import { INK, LIME } from "../data";

const G = { cx: 270, cy: 330, r: 122 };
const CONFETTI = Array.from({ length: 16 }, (_, i) => {
  const ang = (i / 16) * Math.PI * 2;
  return { dx: Math.cos(ang) * (150 + (i % 3) * 40), dy: Math.sin(ang) * (120 + (i % 4) * 30), rot: (i * 47) % 360 };
});

export function Layer() {
  return (
    <>
      <g id="st-door" opacity="0">
        <polygon id="st-spill" points="636,532 742,532 800,600 560,600" fill={LIME} opacity="0" />
        <rect x="628" y="236" width="122" height="296" rx="6" fill="#0b0c0b" />
        <rect id="st-light" x="636" y="244" width="106" height="288" fill={LIME} opacity="0" />
        <g id="st-panel">
          <rect x="636" y="244" width="106" height="288" fill="#2a2d2b" stroke="#3b3e3c" strokeWidth="3" />
          <circle cx="726" cy="392" r="5" fill={LIME} />
        </g>
        <rect x="620" y="530" width="140" height="6" rx="3" fill="#3b3e3c" />
      </g>

      <g id="st-gauge" opacity="0">
        <path d={`M${G.cx - G.r} ${G.cy} A${G.r} ${G.r} 0 0 1 ${G.cx + G.r} ${G.cy}`} fill="none" stroke="#3a3d3b" strokeWidth="26" strokeLinecap="round" />
        <path id="st-garc" d={`M${G.cx - G.r} ${G.cy} A${G.r} ${G.r} 0 0 1 ${G.cx + G.r} ${G.cy}`} fill="none" stroke={LIME} strokeWidth="26" strokeLinecap="round" />
        <text x={G.cx} y={G.cy - 54} textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff" opacity=".8">Interview Readiness</text>
        <text id="st-gnum" x={G.cx} y={G.cy - 6} textAnchor="middle" fontSize="64" fill="#fff" fontFamily="var(--font-instrument), Georgia, serif">0%</text>
      </g>

      <g id="st-confetti" transform={`translate(${G.cx} ${G.cy - 40})`}>
        {CONFETTI.map((c, i) =>
          i % 3 === 0 ? (
            <path key={i} className="st-conf" data-dx={c.dx} data-dy={c.dy} data-rot={c.rot} d="M0 -9 C1 -3 3 -1 9 0 C3 1 1 3 0 9 C-1 3 -3 1 -9 0 C-3 -1 -1 -3 0 -9 Z" fill="#fff" opacity="0" />
          ) : (
            <path key={i} className="st-conf" data-dx={c.dx} data-dy={c.dy} data-rot={c.rot} d="M3 -9 L-3 9" stroke={LIME} strokeWidth="5" strokeLinecap="round" opacity="0" />
          ),
        )}
      </g>
    </>
  );
}

export function build(tl, ctx) {
  const { gsap, q, at, stage } = ctx;
  const t = at("walkin") - 1;
  gsap.set(q("#st-garc"), { drawSVG: "0%" });

  // Stage turns dark; everything from the plan clears out.
  if (stage) tl.to(stage, { backgroundColor: "#181A19", duration: 0.3, ease: "power2.inOut" }, t + 0.02);
  tl.to(q("#st-plan, #st-probe, #st-ring, #st-scope"), { opacity: 0, y: "-=30", duration: 0.18, stagger: 0.03 }, t + 0.02)
    .to(q("#st-clock"), { opacity: 0, duration: 0.15 }, t + 0.02)
    .to(q(".st-ink"), { fill: "#F7F3EE", stroke: "#F7F3EE", duration: 0.2 }, t + 0.1);

  // Candidate back at the desk, laptop closes, then they stand by the door.
  tl.fromTo(q("#st-sit"), { opacity: 0, x: 520 }, { opacity: 1, x: 500, duration: 0.12, immediateRender: false }, t + 0.18)
    .to(q("#st-screen"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.1, ease: "power2.in" }, t + 0.32)
    .to(q("#st-sit"), { opacity: 0, duration: 0.08 }, t + 0.46)
    .fromTo(q("#st-stand"), { opacity: 0, x: 500 }, { opacity: 1, x: 540, duration: 0.14 }, t + 0.46);

  // Door opens with light spilling out.
  tl.to(q("#st-door"), { opacity: 1, duration: 0.12 }, t + 0.25)
    .to(q("#st-panel"), { scaleX: 0.12, transformOrigin: "0% 50%", duration: 0.2, ease: "power2.inOut" }, t + 0.58)
    .to(q("#st-light"), { opacity: 1, duration: 0.16 }, t + 0.6)
    .to(q("#st-spill"), { opacity: 0.4, duration: 0.16 }, t + 0.62)
    .to(q("#st-stand"), { x: 600, duration: 0.2, ease: "power1.inOut" }, t + 0.72);

  // Gauge climbs to 92% with the number counting up.
  tl.to(q("#st-gauge"), { opacity: 1, duration: 0.1 }, t + 0.2)
    .to(q("#st-garc"), { drawSVG: "92%", duration: 0.45, ease: "power2.out" }, t + 0.28);
  const num = q("#st-gnum")[0];
  const o = { v: 0 };
  tl.to(o, { v: 92, duration: 0.45, ease: "power2.out", onUpdate: () => num && (num.textContent = `${Math.round(o.v)}%`) }, t + 0.28);

  // Burst of lime slashes and sparkles.
  q(".st-conf").forEach((el, i) => {
    tl.fromTo(
      el,
      { x: 0, y: 0, rotation: 0, opacity: 0, scale: 0.4 },
      { x: +el.dataset.dx, y: +el.dataset.dy, rotation: +el.dataset.rot, opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" },
      t + 0.72 + (i % 4) * 0.01,
    ).to(el, { opacity: 0.0, duration: 0.08 }, t + 0.94);
  });
}
