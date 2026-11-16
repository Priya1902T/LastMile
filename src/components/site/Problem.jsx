"use client";

// S4. "The 48-hour panic": a big statement, ~40 drifting topic chips with parallax, a clock whose hands spin
// faster the faster you scroll, and an anxious sparkle doodle.
import { useMemo, useRef } from "react";
import Sparkles from "@/components/ui/Sparkles";
import { RevealText } from "@/components/ui/Motion";
import { PANIC_TOPICS } from "@/content/copy";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Deterministic pseudo-random so server and client render the same layout.
function rand(i, s) {
  const x = Math.sin(i * 9301 + s * 49297) * 233280;
  return x - Math.floor(x);
}

export function Clock({ className = "", size = 120, dark = false }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <circle cx="60" cy="60" r="54" fill={dark ? "#111312" : "#fff"} stroke="#111312" strokeWidth="5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="60" y1="12" x2="60" y2={i % 3 ? 18 : 22} stroke={dark ? "#fff" : "#111312"} strokeWidth="3" strokeLinecap="round" transform={`rotate(${i * 30} 60 60)`} />
      ))}
      <line className="clock-h" x1="60" y1="60" x2="60" y2="34" stroke={dark ? "#fff" : "#111312"} strokeWidth="6" strokeLinecap="round" />
      <line className="clock-m" x1="60" y1="60" x2="60" y2="22" stroke="#FF7A1F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="5" fill="#D7FF1E" stroke="#111312" strokeWidth="2" />
    </svg>
  );
}

export default function Problem() {
  const ref = useRef(null);
  const chips = useMemo(
    () =>
      PANIC_TOPICS.map((t, i) => ({
        t,
        // Rounded so the server and browser render identical values.
        left: Math.round((2 + rand(i, 1) * 88) * 10) / 10,
        top: Math.round((4 + rand(i, 2) * 86) * 10) / 10,
        rot: Math.round((rand(i, 3) - 0.5) * 22),
        speed: Math.round((0.15 + rand(i, 4) * 0.9) * 100) / 100,
        tint: ["#fff", "#E6F8B8", "#FFE3D1", "#E8E6E3"][i % 4],
      })),
    [],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // parallax drift per chip
      gsap.utils.toArray(".panic-chip").forEach((el) => {
        const s = parseFloat(el.dataset.speed);
        gsap.fromTo(el, { y: 120 * s }, { y: -160 * s, rotate: `+=${(s - 0.5) * 20}`, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
      // clock hands: base rotation from scroll position plus extra spin from scroll velocity
      const hands = { m: 0, h: 0 };
      const setM = gsap.quickSetter(".clock-m", "rotation", "deg");
      const setH = gsap.quickSetter(".clock-h", "rotation", "deg");
      gsap.set([".clock-m", ".clock-h"], { svgOrigin: "60 60" });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 400, 12);
          hands.m += 4 + v * 6;
          hands.h += (4 + v * 6) / 12;
          setM(hands.m);
          setH(hands.h);
        },
      });
      gsap.to(".anxious", { rotate: 6, x: 2, duration: 0.09, yoyo: true, repeat: -1, ease: "none", transformOrigin: "50% 100%" });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="panic-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {chips.map((c, i) => (
          <span
            key={c.t}
            className="panic-chip absolute whitespace-nowrap rounded-full border border-coal/10 px-4 py-2 text-[13px] font-semibold shadow-[0_8px_20px_rgba(0,0,0,.05)] sm:text-[14px]"
            data-speed={c.speed}
            style={{ left: `${c.left}%`, top: `${c.top}%`, transform: `rotate(${c.rot}deg)`, backgroundColor: c.tint, opacity: i % 3 === 0 ? "0.55" : "0.9" }}
          >
            {c.t}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-[820px] rounded-[40px] bg-paper/85 px-6 py-12 text-center shadow-[0_30px_80px_rgba(247,243,238,1)] backdrop-blur-sm sm:px-12">
          <p className="eyebrow text-muted">The 48-hour panic</p>
          <div className="relative mx-auto mt-6 w-fit">
            <Clock className="mx-auto" size={110} />
            <Sparkles className="anxious absolute -right-12 -top-3" width={48} />
          </div>
          <RevealText id="panic-title" className="display mt-8 text-[clamp(34px,5vw,64px)] leading-[1]">
            Your interview is in 2 days. The internet has <span className="serif-i">10,000</span> topics.
          </RevealText>
          <p className="lede mx-auto mt-6 max-w-[520px]">
            You can’t study all of it, and you shouldn’t try. The trick is knowing which twelve actually matter for this
            role, this round and this resume.
          </p>
        </div>
      </div>
    </section>
  );
}
