// Scene 4 "The sort": the cloud morphs into the Scope Map card, chips fly along curves into their buckets,
// must-know chips get lime checks, safe-to-skip chips shrink, grey out and get an X, and counters tick up.
import { CARD, CHIPS, INK, ROW_H, ROWS, bucketPos, roundRectPath } from "../data";

export function Layer() {
  return (
    <g id="st-rows" opacity="0">
      <text className="st-title" x={CARD.x + 32} y={CARD.y + 44} fontSize="21" fontWeight="800" fill={INK} letterSpacing="-0.6">
        Your Scope Map
      </text>
      {ROWS.map((r, i) => (
        <g key={r.label} className="st-row" transform={`translate(${CARD.x + 22} ${r.y})`}>
          <rect width={CARD.w - 44} height={ROW_H} rx="20" fill={r.fill} />
          <text x="20" y="32" fontSize="15" fontWeight="800" fill={INK}>{r.label}</text>
          <text className={`st-count st-count-${i}`} x={CARD.w - 64} y="32" textAnchor="end" fontSize="13" fontWeight="600" fill="#3A3D3B">
            0 topics
          </text>
        </g>
      ))}
    </g>
  );
}

export function build(tl, ctx) {
  const { gsap, q, at } = ctx;
  const t = at("sort") - 1;
  const targets = bucketPos(CHIPS);

  // Clear the triage props.
  tl.to(q("#st-form, #st-resume, #st-jd, #st-node, #st-streams"), { opacity: 0, scale: 0.92, transformOrigin: "50% 50%", duration: 0.15, stagger: 0.02 }, t + 0.02);

  // The chaotic cloud morphs into the neat card.
  tl.to(q("#st-cloud"), { morphSVG: roundRectPath(CARD), fill: "#ffffff", fillOpacity: 1, opacity: 1, strokeOpacity: 0, duration: 0.3, ease: "power2.inOut" }, t + 0.12)
    .to(q("#st-rows"), { opacity: 1, duration: 0.1 }, t + 0.32)
    .from(q(".st-row"), { scaleY: 0.4, opacity: 0, transformOrigin: "50% 0%", stagger: 0.05, duration: 0.12 }, t + 0.32);

  // Chips fly into buckets along a short arc.
  const chips = q(".st-chip");
  chips.forEach((el, i) => {
    const [tx, ty] = targets[i];
    const start = t + 0.4 + i * 0.022;
    const cur = gsap.getProperty(el, "x") || 0;
    tl.to(el, { opacity: 1, duration: 0.05 }, start).to(
      el,
      {
        motionPath: { path: [{ x: (cur + tx) / 2 + (i % 2 ? 60 : -60), y: Math.min(ty, 300) - 120 }, { x: tx, y: ty }], curviness: 1.2 },
        rotation: 0,
        scale: CHIPS[i].b === 2 ? 0.66 : 0.8,
        duration: 0.22,
        ease: "power2.inOut",
      },
      start,
    );
  });

  // Bucket treatments.
  tl.to(q(".st-b0 .st-check"), { opacity: 1, scale: 1, duration: 0.06, stagger: 0.03 }, t + 0.72)
    .to(q(".st-b2 .st-chip-bg"), { fill: "#E8E6E3", duration: 0.08 }, t + 0.72)
    .to(q(".st-b2"), { opacity: 0.55, duration: 0.08 }, t + 0.72)
    .to(q(".st-b2 .st-x"), { opacity: 1, duration: 0.06, stagger: 0.03 }, t + 0.74);

  // Counters tick up.
  [5, 4, 3].forEach((n, i) => {
    const el = q(`.st-count-${i}`)[0];
    const o = { v: 0 };
    tl.to(o, { v: n, duration: 0.18, ease: "none", onUpdate: () => el && (el.textContent = `${Math.round(o.v)} topics`) }, t + 0.5 + i * 0.08);
  });
}
