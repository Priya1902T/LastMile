// Scene 2 "The details": chips fade back, the form card slides in and its fields type themselves,
// then the resume and the job description fly in on curved paths and dock beside it.
import { FORM_FIELDS, INK, LIME, PAPER } from "../data";

function Sheet({ id, title, w, h, lines, accent }) {
  return (
    <g id={id} opacity="0">
      <rect width={w} height={h} rx="14" fill="#fff" filter="url(#st-shadow)" />
      <rect x="16" y="16" width={w * 0.42} height="9" rx="4.5" fill={accent} />
      <text x="16" y="44" fontSize="11" fontWeight="700" fill={INK} opacity=".55">{title}</text>
      {lines.map((lw, i) => (
        <g key={i} transform={`translate(16 ${60 + i * 17})`}>
          <rect className="st-hl" x="-3" y="-4" width={(w - 32) * lw + 6} height="12" rx="3" fill={LIME} opacity=".9" transform="scale(0 1)" />
          <rect width={(w - 32) * lw} height="5" y="0" rx="2.5" fill="#c9c6c1" />
        </g>
      ))}
    </g>
  );
}

export function Layer() {
  return (
    <>
      <g id="st-form" transform="translate(64 108)" opacity="0">
        <rect width="300" height="392" rx="26" fill="#fff" filter="url(#st-shadow)" />
        <text x="24" y="42" fontSize="19" fontWeight="800" fill={INK} letterSpacing="-0.5">Your interview</text>
        {FORM_FIELDS.map(([label, value], i) => {
          const y = 70 + i * 62;
          return (
            <g key={label} transform={`translate(24 ${y})`}>
              <text fontSize="11.5" fontWeight="600" fill="#3A3D3B">{label}</text>
              <rect y="9" width="252" height="34" rx="10" fill={PAPER} />
              <clipPath id={`st-clip-${i}`}>
                <rect className="st-clip" x="10" y="9" width="0" height="34" />
              </clipPath>
              <text className="st-val" x="12" y="31" fontSize="14.5" fontWeight="700" fill={INK} clipPath={`url(#st-clip-${i})`}>
                {value}
              </text>
            </g>
          );
        })}
        <rect id="st-caret" x="0" y="0" width="2" height="18" fill={INK} opacity="0" />
      </g>
      <Sheet id="st-resume" title="Resume" w={164} h={214} accent={INK} lines={[0.9, 0.7, 0.84, 0.6, 0.76, 0.5, 0.82, 0.66]} />
      <Sheet id="st-jd" title="Job description" w={150} h={200} accent="#FF7A1F" lines={[0.86, 0.62, 0.9, 0.7, 0.55, 0.8, 0.6]} />
    </>
  );
}

export function build(tl, ctx) {
  const { gsap, q, at } = ctx;
  const t = at("details") - 1; // scene window [t, t+1]

  gsap.set(q("#st-resume"), { x: 820, y: -260 });
  gsap.set(q("#st-jd"), { x: 860, y: -200 });

  tl.to(q(".st-chip"), { opacity: 0.12, duration: 0.3, stagger: 0.01 }, t + 0.02)
    .to(q("#st-cloud"), { opacity: 0.25, duration: 0.3 }, t + 0.02)
    .to(q("#st-sit"), { opacity: 0, x: "-=40", duration: 0.25 }, t + 0.02)
    .fromTo(q("#st-form"), { opacity: 0, x: -30, y: 140 }, { opacity: 1, x: 64, y: 108, duration: 0.3, ease: "power3.out" }, t + 0.12);

  // Fields "type" themselves; the caret follows the end of each value.
  const vals = q(".st-val");
  const clips = q(".st-clip");
  vals.forEach((v, i) => {
    let w = 160;
    try {
      w = v.getComputedTextLength();
    } catch {}
    const start = t + 0.3 + i * 0.075;
    tl.set(q("#st-caret"), { opacity: 1, x: 36, y: 70 + i * 62 + 15 }, start)
      .to(clips[i], { attr: { width: w + 4 }, duration: 0.07, ease: "steps(12)" }, start)
      .to(q("#st-caret"), { x: 24 + 12 + w + 3, duration: 0.07, ease: "steps(12)" }, start);
  });
  tl.to(q("#st-caret"), { opacity: 0, duration: 0.02 }, t + 0.7);

  // Resume and JD arrive on curved motion paths.
  tl.to(q("#st-resume"), { opacity: 1, duration: 0.05 }, t + 0.55)
    .to(q("#st-resume"), { motionPath: { path: [{ x: 820, y: -260 }, { x: 690, y: -40 }, { x: 412, y: 112 }], curviness: 1.4 }, rotation: -3, duration: 0.3, ease: "power2.out" }, t + 0.55)
    .to(q("#st-jd"), { opacity: 1, duration: 0.05 }, t + 0.66)
    .to(q("#st-jd"), { motionPath: { path: [{ x: 860, y: -200 }, { x: 760, y: 20 }, { x: 600, y: 150 }], curviness: 1.4 }, rotation: 4, duration: 0.3, ease: "power2.out" }, t + 0.66);
}
