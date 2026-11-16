// Scene 5 "The plan": the Scope Map shrinks to a corner, the Prep Plan card rises, its lime line draws down,
// dots pop and duration pills count up. A time ring splits the hours into arcs; the Resume Probe card ticks itself off.
import { INK, LIME, PLAN, arcPath } from "../data";

const RING = { cx: 612, cy: 338, r: 78 };

export function Layer() {
  const total = PLAN.reduce((a, b) => a + b.h, 0);
  let a = 0;
  return (
    <>
      <g id="st-probe" transform="translate(318 198) rotate(8)" opacity="0">
        <rect width="196" height="180" rx="24" fill="#F7F3EF" stroke="#fff" filter="url(#st-shadow)" />
        <text x="22" y="38" fontSize="15" fontWeight="800" fill={INK}>Resume Probe</text>
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(22 ${66 + k * 36})`}>
            <circle cx="11" cy="0" r="11" fill="#E7FF6D" />
            <path className="st-pcheck" d="M5.5 0.5 L9.5 4.5 L16.5 -4" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="32" y="-7" width="100" height="4" rx="2" fill="#aeb3b8" />
            <rect x="32" y="2" width="76" height="4" rx="2" fill="#aeb3b8" />
          </g>
        ))}
      </g>

      <g id="st-plan" transform="translate(84 140) rotate(-4)" opacity="0">
        <rect width="318" height="372" rx="28" fill="#F7F3EF" stroke="#fff" filter="url(#st-shadow)" />
        <text x="28" y="48" fontSize="20" fontWeight="800" fill={INK} letterSpacing="-0.5">Your Prep Plan</text>
        <line id="st-pline" x1="40" y1="94" x2="40" y2="318" stroke={LIME} strokeWidth="3" />
        {PLAN.map((p, i) => {
          const y = 94 + i * 56;
          return (
            <g key={p.label} className="st-prow">
              <circle className="st-pdot" cx="40" cy={y} r="7" fill={LIME} stroke={INK} strokeWidth="1.5" />
              <rect x="58" y={y - 15} width="62" height="30" rx="15" fill="#E9E6E3" />
              <text className={`st-pval st-pval-${i}`} x="89" y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK}>0.0 h</text>
              <text className="st-plabel" x="132" y={y + 5} fontSize="13.5" fill={INK}>{p.label}</text>
            </g>
          );
        })}
      </g>

      <g id="st-ring" opacity="0">
        <circle cx={RING.cx} cy={RING.cy} r={RING.r} fill="none" stroke="#E8E6E3" strokeWidth="22" />
        {PLAN.map((p) => {
          const span = (p.h / total) * 360;
          const d = arcPath(RING.cx, RING.cy, RING.r, a + 1.5, a + span - 1.5);
          a += span;
          return <path key={p.label} className="st-arc" d={d} fill="none" stroke={p.color} strokeWidth="22" strokeLinecap="butt" />;
        })}
        <text id="st-ring-num" x={RING.cx} y={RING.cy + 4} textAnchor="middle" fontSize="30" fontWeight="800" fill={INK} letterSpacing="-1">0.0 h</text>
        <text x={RING.cx} y={RING.cy + 26} textAnchor="middle" fontSize="12" fontWeight="600" fill="#3A3D3B">of focused prep</text>
      </g>
    </>
  );
}

export function build(tl, ctx) {
  const { gsap, q, at } = ctx;
  const t = at("plan") - 1;

  gsap.set(q("#st-pline"), { drawSVG: "0%" });
  gsap.set(q(".st-arc"), { drawSVG: "0%" });
  gsap.set(q(".st-pcheck"), { drawSVG: "0%" });

  // Scope map (cloud card + rows + chips) shrinks into the top-right corner.
  tl.to(q("#st-scope"), { scale: 0.34, x: 512, y: 16, transformOrigin: "0% 0%", duration: 0.25, ease: "power3.inOut" }, t + 0.02);

  tl.fromTo(q("#st-probe"), { opacity: 0, x: 420, y: 240 }, { opacity: 1, x: 318, y: 198, duration: 0.2 }, t + 0.18)
    .fromTo(q("#st-plan"), { opacity: 0, y: 260 }, { opacity: 1, y: 140, duration: 0.25, ease: "power3.out" }, t + 0.2)
    .to(q("#st-pline"), { drawSVG: "100%", duration: 0.3, ease: "power1.inOut" }, t + 0.38)
    .from(q(".st-pdot"), { scale: 0, transformOrigin: "50% 50%", stagger: 0.05, duration: 0.06, ease: "back.out(3)" }, t + 0.4)
    .from(q(".st-plabel"), { opacity: 0, x: -10, stagger: 0.05, duration: 0.08 }, t + 0.42);

  q(".st-pval").forEach((el, i) => {
    const o = { v: 0 };
    tl.to(o, { v: [2, 1.5, 1, 0.5, 1][i], duration: 0.12, ease: "none", onUpdate: () => (el.textContent = `${o.v.toFixed(1)} h`) }, t + 0.44 + i * 0.05);
  });

  tl.to(q("#st-ring"), { opacity: 1, duration: 0.1 }, t + 0.4)
    .to(q(".st-arc"), { drawSVG: "100%", duration: 0.1, stagger: 0.06, ease: "power1.inOut" }, t + 0.46);
  const ringNum = q("#st-ring-num")[0];
  const r = { v: 0 };
  tl.to(r, { v: 6, duration: 0.36, ease: "none", onUpdate: () => ringNum && (ringNum.textContent = `${r.v.toFixed(1)} h`) }, t + 0.46);

  tl.to(q(".st-pcheck"), { drawSVG: "100%", stagger: 0.07, duration: 0.08 }, t + 0.7);
}
