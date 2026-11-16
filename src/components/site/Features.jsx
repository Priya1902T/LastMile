"use client";

// S7. "What you get": tilted Prep Plan + Resume Probe cards on grainy blobs (left), heading + 2×3 feature grid (right).
// Feature icons draw themselves as each item enters.
import { useRef } from "react";
import { CalendarDays, FileText, Play, ShieldCheck, Target, Zap } from "lucide-react";
import { RevealText, useParallax } from "@/components/ui/Motion";
import { FEATURES, PLAN_ROWS } from "@/content/copy";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const ICONS = { target: Target, calendar: CalendarDays, file: FileText, zap: Zap, shield: ShieldCheck, play: Play };

export function PrepPlanCard({ className = "" }) {
  return (
    <div className={`rounded-[28px] border border-white bg-[#f7f3ef] p-7 shadow-[0_25px_50px_rgba(0,0,0,.14)] ${className}`}>
      <p className="display flex items-center gap-4 text-[19px]">
        <CalendarDays size={28} strokeWidth={2} /> Your Prep Plan
      </p>
      <div className="relative ml-3 mt-6">
        <svg className="absolute left-[-1px] top-1 h-[calc(100%-8px)] w-[3px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden>
          <line className="plan-line" x1="1" y1="0" x2="1" y2="100" stroke="#D7FF1E" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
        {PLAN_ROWS.map((r) => (
          <div key={r.label} className="plan-row relative flex items-center gap-3 pb-4 pl-6 last:pb-0">
            <span className="plan-dot absolute left-[-6px] top-[9px] h-3 w-3 rounded-full bg-lime" />
            <b className="rounded-full bg-[#e9e6e3] px-2.5 py-1.5 text-[12.5px] font-bold">{r.h.toFixed(1)} h</b>
            <span className="whitespace-nowrap text-[13px]">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProbeCard({ className = "" }) {
  return (
    <div className={`rounded-[28px] border border-white bg-[#f7f3ef] p-6 shadow-[0_25px_45px_rgba(0,0,0,.14)] ${className}`}>
      <p className="display text-[17px]">Resume Probe</p>
      {[0, 1, 2].map((k) => (
        <div key={k} className="mt-3.5 flex items-center gap-3.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e7ff6d]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path className="probe-check" d="M5 12.5l4.5 4.5L19 7.5" stroke="#111312" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="grid gap-1.5">
            <i className="block h-1 w-[100px] rounded bg-[#aeb3b8]" />
            <i className="block h-1 w-[78px] rounded bg-[#aeb3b8]" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Features() {
  const ref = useRef(null);
  useParallax(ref);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const st = { trigger: ".feat-visual", start: "top 75%", once: true };
      gsap.timeline({ scrollTrigger: st })
        .from(".feat-probe", { x: -60, rotate: -30, opacity: 0, duration: 1 })
        .from(".feat-plan", { y: 60, rotate: 4, opacity: 0, duration: 1 }, 0.15)
        .from(".feat-plan .plan-line", { drawSVG: "0%", duration: 1, ease: "power2.inOut" }, 0.5)
        .from(".feat-plan .plan-dot", { scale: 0, stagger: 0.12, duration: 0.4, ease: "back.out(3)" }, 0.6)
        .from(".feat-plan .plan-row b", { x: -12, opacity: 0, stagger: 0.12, duration: 0.5 }, 0.65)
        .from(".feat-probe .probe-check", { drawSVG: "0%", stagger: 0.2, duration: 0.4 }, 0.9);

      gsap.utils.toArray(".feat-item").forEach((item, i) => {
        const parts = item.querySelectorAll("svg path, svg circle, svg rect, svg line, svg polyline, svg polygon");
        gsap.timeline({ scrollTrigger: { trigger: item, start: "top 88%", once: true }, delay: (i % 2) * 0.12 })
          .from(item, { y: 26, opacity: 0, duration: 0.7 })
          .from(parts, { drawSVG: "0%", duration: 0.9, stagger: 0.05, ease: "power2.inOut" }, 0.1);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="product" className="relative scroll-mt-20" aria-labelledby="feat-title">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[46%_54%] lg:py-24">
        <div className="feat-visual relative mx-auto h-[400px] w-full max-w-[520px]" aria-hidden>
          <div data-speed="0.15" className="halftone-lime absolute left-[12%] top-[2%] h-[56%] w-[66%] rotate-[-32deg] rounded-[60px]" />
          <div data-speed="0.3" className="absolute bottom-[10%] left-[-2%] h-[120px] w-[120px] rounded-full bg-orange opacity-90" />
          <div data-speed="0.05" className="absolute left-0 top-[30%] z-[1] w-[250px]">
            <ProbeCard className="feat-probe float-b rotate-[-16deg] scale-[.92] sm:scale-100" />
          </div>
          <div data-speed="0.1" className="absolute right-[2%] top-[4%] z-[2]">
            <PrepPlanCard className="feat-plan float-a w-[330px] rotate-[-8deg] max-sm:w-[290px] max-sm:rotate-[-4deg]" />
          </div>
        </div>

        <div>
          <p className="eyebrow">What you get</p>
          <RevealText id="feat-title" className="display mt-3 text-[clamp(36px,4vw,50px)] leading-[1.03]">
            More than prep. A <span className="serif-i text-[1.1em]">targeted</span> game plan.
          </RevealText>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <li key={f.title} className="feat-item flex gap-4">
                  <Icon size={30} strokeWidth={1.9} className="mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <h3 className="display text-[15.5px] tracking-[-0.02em]">
                      {f.title} {f.soon && <span className="serif-i text-[15px] text-muted">(Soon)</span>}
                    </h3>
                    <p className="mt-1 text-[14px] leading-snug text-muted">{f.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
