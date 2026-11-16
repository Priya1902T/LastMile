// Scene 1 "The pile": topic chips float chaotically around the candidate at a laptop; the clock ticks.
// Owns the shared actors (cloud, chips, avatar, clock), which later scenes keep animating.
import { CHIPS, CLOUD_PATH, CLOUD_POS, INK, LIME } from "../data";

export function Clock() {
  return (
    <g id="st-clock" transform="translate(28 26) scale(0.62)">
      <circle cx="60" cy="60" r="54" fill="#fff" stroke={INK} strokeWidth="5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="60" y1="12" x2="60" y2={i % 3 ? 18 : 22} stroke={INK} strokeWidth="3" strokeLinecap="round" transform={`rotate(${i * 30} 60 60)`} />
      ))}
      <line className="st-hour" x1="60" y1="60" x2="60" y2="34" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <line className="st-min" x1="60" y1="60" x2="60" y2="22" stroke="#FF7A1F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="5" fill={LIME} stroke={INK} strokeWidth="2" />
    </g>
  );
}

export function Chips() {
  return (
    <g id="st-chips">
      {CHIPS.map((c, i) => {
        const [x, y, r] = CLOUD_POS[i];
        return (
          <g key={c.t} className={`st-chip st-b${c.b}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <g className="st-chip-in">
              <rect className="st-chip-bg" x="-60" y="-17" width="120" height="34" rx="17" fill="#fff" stroke={INK} strokeOpacity=".12" />
              <text className="st-chip-t" x="0" y="5.5" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK}>{c.t}</text>
              {c.b === 0 && (
                <g className="st-check" transform="translate(54 -14)" opacity="0">
                  <circle r="10" fill={LIME} stroke={INK} strokeWidth="1.5" />
                  <path d="M-4.5 0.5 L-1.2 3.8 L4.6 -3" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
              {c.b === 2 && (
                <g className="st-x" transform="translate(54 -14)" opacity="0">
                  <circle r="10" fill="#fff" stroke={INK} strokeWidth="1.5" />
                  <path d="M-3.5 -3.5 L3.5 3.5 M3.5 -3.5 L-3.5 3.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                </g>
              )}
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** Geometric candidate. `.st-ink` parts turn light on the dark final scene. */
export function Avatar() {
  return (
    <>
      <g id="st-sit" transform="translate(400 470)">
        {/* chair */}
        <rect className="st-ink" x="-58" y="-6" width="70" height="10" rx="5" fill={INK} opacity=".25" />
        {/* legs */}
        <path className="st-ink" d="M-30 0 L-32 54 M-8 0 L6 54" stroke={INK} strokeWidth="12" strokeLinecap="round" />
        {/* body */}
        <path className="st-ink" d="M-44 -6 C-46 -60 -30 -82 -10 -84 C10 -82 18 -60 16 -6 Z" fill={INK} />
        {/* head */}
        <circle className="st-ink" cx="-14" cy="-108" r="22" fill={INK} />
        <path d="M-34 -118 C-30 -136 2 -138 8 -116 C-6 -126 -22 -124 -34 -118 Z" fill={LIME} />
        {/* desk + laptop */}
        <rect className="st-ink" x="-6" y="-34" width="120" height="8" rx="4" fill={INK} />
        <g id="st-screen">
          <rect x="34" y="-88" width="72" height="54" rx="6" fill="#2a2d2b" stroke={INK} strokeWidth="3" />
          <rect x="44" y="-78" width="34" height="5" rx="2.5" fill={LIME} />
          <rect x="44" y="-68" width="50" height="4" rx="2" fill="#5a5d5b" />
          <rect x="44" y="-60" width="42" height="4" rx="2" fill="#5a5d5b" />
        </g>
        {/* arm */}
        <path className="st-ink" d="M2 -54 C18 -46 30 -40 44 -38" stroke={INK} strokeWidth="11" strokeLinecap="round" fill="none" />
      </g>
      <g id="st-stand" transform="translate(560 532)" opacity="0">
        <path className="st-ink" d="M-14 0 L-16 -74 M12 0 L14 -74" stroke={INK} strokeWidth="13" strokeLinecap="round" />
        <path className="st-ink" d="M-30 -70 C-34 -130 -18 -150 0 -152 C18 -150 34 -130 30 -70 Z" fill={INK} />
        <circle className="st-ink" cx="0" cy="-176" r="22" fill={INK} />
        <path d="M-20 -188 C-14 -204 16 -204 22 -186 C8 -194 -6 -194 -20 -188 Z" fill={LIME} />
        <path className="st-ink" d="M26 -132 C40 -118 46 -102 44 -86" stroke={INK} strokeWidth="11" strokeLinecap="round" fill="none" />
        {/* closed laptop under arm */}
        <rect x="30" y="-96" width="12" height="46" rx="3" fill="#2a2d2b" stroke={LIME} strokeWidth="2" />
      </g>
    </>
  );
}

export function Cloud() {
  return <path id="st-cloud" d={CLOUD_PATH} fill={LIME} fillOpacity=".18" stroke={INK} strokeOpacity=".08" strokeWidth="2" />;
}

export function build(tl, ctx) {
  const { gsap, q } = ctx;
  // Initial state (scene 1 is the resting state at label "pile").
  gsap.set(q(".st-hour, .st-min"), { svgOrigin: "60 60" });
  // The clock ticks across the whole story.
  tl.to(q(".st-min"), { rotation: 360 * 8, ease: "none", duration: 6 }, 0);
  tl.to(q(".st-hour"), { rotation: 240, ease: "none", duration: 6 }, 0);
}

/** Chaotic idle float for the chips while the story is in its first scenes (not scrubbed). */
export function floatChips(gsap, q) {
  return gsap.utils.toArray(q(".st-chip-in")).map((el, i) =>
    gsap.to(el, {
      x: gsap.utils.random(-14, 14),
      y: gsap.utils.random(-12, 12),
      rotation: gsap.utils.random(-6, 6),
      duration: gsap.utils.random(1.8, 3.2),
      delay: i * 0.05,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    }),
  );
}
