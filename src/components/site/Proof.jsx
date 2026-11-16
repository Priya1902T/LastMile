"use client";

// S10 Stats bento and S11 Testimonials. Both use PLACEHOLDER content and render nothing unless their flag is on
// (see src/content/flags.js and src/content/placeholders.js).
import { useRef } from "react";
import { Star, Users, Zap } from "lucide-react";
import { CountUp, RevealText } from "@/components/ui/Motion";
import { FLAGS } from "@/content/flags";
import { STATS, STAT_QUOTE, TESTIMONIALS } from "@/content/placeholders";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const ICON = { star: Star, zap: Zap, users: Users };

function TiltTile({ className = "", children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (prefersReducedMotion()) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: x * 8, rotateX: -y * 8, duration: 0.4, ease: "power2.out" });
  };
  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  return (
    <div className="[perspective:900px]">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`h-full rounded-[30px] p-7 [transform-style:preserve-3d] ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function Stats() {
  if (!FLAGS.SHOW_STATS) return null;
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8" aria-labelledby="stats-title">
      <p className="eyebrow text-muted">Results</p>
      <RevealText id="stats-title" className="display mt-3 text-[clamp(32px,4vw,50px)] leading-[1.03]">What a focused evening does.</RevealText>
      <div className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2">
        {STATS.map((s, i) => {
          const I = ICON[s.icon];
          return (
            <TiltTile key={s.label} className={`${["tint-green md:col-span-2", "bg-coal text-white", "tint-peach"][i]} min-h-[180px]`}>
              <I size={26} />
              <p className="display mt-6 text-[56px] leading-none">
                {s.prefix ? `${s.prefix}${s.value}` : <CountUp to={s.value} suffix={s.suffix} />}
              </p>
              <p className="mt-2 text-[15px] opacity-80">{s.label}</p>
            </TiltTile>
          );
        })}
        <TiltTile className="tint-white card md:col-span-4">
          <p className="serif-i text-[clamp(22px,2.4vw,32px)] leading-snug">“{STAT_QUOTE.text}”</p>
          <p className="mt-4 text-[14px] text-muted">{STAT_QUOTE.name} · {STAT_QUOTE.role}</p>
        </TiltTile>
      </div>
    </section>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (!FLAGS.SHOW_TESTIMONIALS || prefersReducedMotion()) return;
      const track = ref.current.querySelector(".tm-track");
      const cards = gsap.utils.toArray(ref.current.querySelectorAll(".tm-card"));
      const update = () => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        cards.forEach((c) => {
          const center = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.max(-1, Math.min(1, (center - mid) / c.offsetWidth));
          gsap.to(c, { rotate: d * 5, scale: 1 - Math.abs(d) * 0.05, duration: 0.4, overwrite: "auto" });
        });
      };
      update();
      track.addEventListener("scroll", update, { passive: true });
      return () => track.removeEventListener("scroll", update);
    },
    { scope: ref },
  );
  if (!FLAGS.SHOW_TESTIMONIALS) return null;
  return (
    <section ref={ref} className="py-20" aria-labelledby="tm-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="eyebrow text-muted">From candidates</p>
        <RevealText id="tm-title" className="display mt-3 text-[clamp(32px,4vw,50px)] leading-[1.03]">They walked in ready.</RevealText>
      </div>
      <div
        className="tm-track noscroll mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(20px,calc((100vw-1200px)/2+32px))] pb-10 pt-4"
        tabIndex={0}
        role="region"
        aria-label="Testimonials, scroll sideways"
      >
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className={`tm-card tint-${t.tint} w-[300px] shrink-0 snap-center rounded-[30px] p-7 shadow-[0_20px_40px_rgba(0,0,0,.08)] sm:w-[360px]`}>
            <blockquote className="serif-i text-[22px] leading-snug">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-coal text-[14px] font-bold text-lime">
                {t.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <span className="text-[13px] leading-tight">
                <b className="block">{t.name}</b>
                <span className="text-muted">{t.role}, {t.company}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
