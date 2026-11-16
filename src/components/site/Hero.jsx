"use client";

// S2. Hero, matched to the reference: copy left; portrait, shapes, scope map card, readiness gauge and AI Triage tag right.
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Activity, ArrowRight, ArrowUpRight, Check, Play, Target, X } from "lucide-react";
import Sparkles from "@/components/ui/Sparkles";
import { useLenis, scrollToTarget } from "@/components/site/SmoothScroll";
import { useParallax } from "@/components/ui/Motion";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const ROWS = [
  { tint: "tint-green", icon: Check, label: "Must Know", n: 5, color: "#4d7c0f" },
  { tint: "tint-peach", icon: Activity, label: "Likely Probed", n: 4, color: "#FF7A1F" },
  { tint: "tint-grey", icon: X, label: "Safe to Skip", n: 3, color: "#111312" },
];

export function ScopeMapCard({ className = "", counts = true }) {
  return (
    <div className={`glass rounded-[28px] p-5 ${className}`}>
      <p className="display mb-4 flex items-center gap-2.5 text-[19px]">
        <Target size={24} strokeWidth={2.2} /> Your Scope Map
      </p>
      <div className="space-y-2.5">
        {ROWS.map(({ tint, icon: Icon, label, n, color }) => (
          <div key={label} className={`scope-row flex items-center gap-3 rounded-2xl px-3.5 py-3 ${tint}`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/80" style={{ color }}>
              <Icon size={18} strokeWidth={2.4} />
            </span>
            <span className="flex-1 leading-tight">
              <b className="display block text-[15px] tracking-[-0.02em]">{label}</b>
              <small className="text-[12px] text-muted">
                <span className="scope-n" data-n={n}>{counts ? n : 0}</span> topics
              </small>
            </span>
            <ArrowRight size={19} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReadinessGauge({ className = "", value = 92 }) {
  // Semicircle r=60 → length ≈ 188.5
  return (
    <div className={`readiness relative grid h-[136px] w-[236px] place-items-center rounded-[22px] border border-white/20 bg-[#1b1d1c]/85 text-white shadow-[0_24px_50px_rgba(0,0,0,.3)] backdrop-blur-md ${className}`}>
      <svg viewBox="0 0 150 82" className="absolute left-1/2 top-2.5 w-[118px] -translate-x-1/2" aria-hidden>
        <path d="M15 76a60 60 0 0 1 120 0" fill="none" stroke="#4a4c4b" strokeWidth="11" strokeLinecap="round" />
        <path className="gauge-arc" d="M15 76a60 60 0 0 1 120 0" fill="none" stroke="#D7FF1E" strokeWidth="11" strokeLinecap="round" strokeDasharray="188.5" strokeDashoffset={188.5 * (1 - value / 100)} />
      </svg>
      <div className="mt-[66px] text-center leading-none">
        <span className="block text-[12px] text-white/80">Interview Readiness</span>
        <strong className="gauge-num mt-0.5 block font-serif text-[36px] font-normal" style={{ fontFamily: "var(--font-instrument), Georgia, serif" }}>
          {value}%
        </strong>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const lenis = useLenis();
  useParallax(ref);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(".hero-h1 .ln", { type: "lines", mask: "lines" });
      // Wait for the intro curtain when it is playing on this load.
      const tl = gsap.timeline({ delay: window.__scopedIntroPlaying ? 1.35 : 0.1 });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(split.lines, { yPercent: 105, duration: 1, stagger: 0.08, ease: "power4.out" }, "<0.1")
        .fromTo(".hero-h1 .marker", { "--wipe": 0 }, { "--wipe": 1, duration: 0.7, ease: "power2.inOut" }, "-=0.45")
        .from(".hero-copy-p, .hero-actions", { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.4")
        .from(".hero-portrait", { scale: 0.96, opacity: 0, duration: 1.1, ease: "power2.out" }, 0.1)
        .from(".hero-lime", { scale: 0.6, rotate: -20, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, 0.2)
        .from(".hero-orange", { scale: 0, duration: 0.9, ease: "back.out(1.7)" }, 0.45)
        .from(".hero-halftone", { opacity: 0, duration: 1 }, 0.4)
        .from(".hero-spark .spark", { drawSVG: "0%", duration: 0.4, stagger: 0.1 }, 0.9)
        .from(".hero-scope", { x: 60, rotate: 14, opacity: 0, duration: 1, ease: "power3.out" }, 0.75)
        .from(".hero-scope .scope-row", { x: 24, opacity: 0, stagger: 0.12, duration: 0.6 }, 1.05)
        .from(".hero-tag", { scale: 0, rotate: -40, duration: 0.7, ease: "back.out(2)" }, 1.3)
        .from(".hero-gauge", { y: 40, opacity: 0, duration: 0.9 }, 0.95)
        .from(".hero-gauge .gauge-arc", { strokeDashoffset: 188.5, duration: 1.6, ease: "power2.out" }, 1.1);
      // number + counters
      const g = { v: 0 };
      tl.to(g, { v: 92, duration: 1.6, ease: "power2.out", onUpdate: () => {
        const el = ref.current?.querySelector(".hero-gauge .gauge-num");
        if (el) el.textContent = `${Math.round(g.v)}%`;
      } }, 1.1);
      ref.current.querySelectorAll(".hero-scope .scope-n").forEach((el, i) => {
        const o = { v: 0 };
        tl.to(o, { v: Number(el.dataset.n), duration: 0.8, onUpdate: () => (el.textContent = Math.round(o.v)) }, 1.15 + i * 0.12);
      });
      // The line masks would clip the skewed marker bar, so release them once the reveal is done.
      tl.call(() => split.masks?.forEach((m) => (m.style.overflow = "visible")));
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative pt-[76px]" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1200px] items-center gap-4 px-5 pb-6 pt-6 sm:px-8 lg:min-h-[600px] lg:grid-cols-[44%_56%]">
        {/* Copy */}
        <div className="relative z-10 py-6">
          <p className="hero-eyebrow eyebrow">The last-mile<br />interview coach</p>
          <h1 id="hero-title" className="hero-h1 display mt-6 text-[clamp(44px,6vw,76px)] leading-[0.95]">
            <span className="ln block">Know what</span>
            <span className="ln block">to prepare.</span>
            <span className="ln block whitespace-nowrap pb-[0.06em] pl-[0.12em]">
              <span className="marker italic" style={{ "--wipe": 1 }}>Skip the rest.</span>
            </span>
          </h1>
          <p className="hero-copy-p lede mt-7 max-w-[420px] !text-[16.5px]">
            Scoped is an AI triage coach for job candidates who are short on prep time. Get a focused, personalized plan
            that tells you what to study, what’s likely to be asked and what you can safely skip.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-6">
            <Link href="/start" className="pill pill-dark">
              Start Your Prep <ArrowUpRight size={19} className="nudge" />
            </Link>
            <a
              href="#story"
              data-cursor="play"
              className="group inline-flex items-center gap-3 text-[15px] font-semibold"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(lenis, "#story");
              }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-[#dedbd6] bg-white transition group-hover:scale-110">
                <Play size={16} fill="currentColor" />
              </span>
              See how it works
            </a>
          </div>
        </div>

        {/* Art */}
        <div className="relative mx-auto h-[440px] w-full max-w-[640px] sm:h-[520px]" aria-hidden>
          <div data-speed="0.12" className="hero-halftone halftone absolute bottom-[-4%] right-[2%] h-[46%] w-[52%] rounded-[50%_50%_10%_50%] opacity-70" />
          <div data-speed="0.18" className="hero-lime halftone-lime absolute right-[8%] top-[2%] h-[74%] w-[52%] rounded-[55%_14%_52%_12%] [rotate:20deg]" />
          <div data-speed="0.3" className="absolute left-[4%] top-[50%] h-[150px] w-[150px]">
            <div className="hero-orange float-b h-full w-full rounded-full bg-orange" />
          </div>
          <div className="hero-portrait absolute left-0 top-0 h-[96%] w-[72%] overflow-hidden" style={{ maskImage: "linear-gradient(to bottom,#000 78%,transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom,#000 78%,transparent 100%)" }}>
            {/* ASSET: replace with a clean transparent B&W cutout of the portrait (see README). */}
            <Image src="/hero-person.png" alt="" fill priority sizes="(min-width:1024px) 460px, 70vw" className="object-cover object-[50%_10%] grayscale mix-blend-multiply" />
          </div>
          <Sparkles className="hero-spark absolute left-[30%] top-[-2%]" width={64} />
          <span className="hero-tag display absolute right-[2%] top-[13%] z-[6] rotate-[-9deg] rounded-[16px] bg-lime px-4 py-2.5 text-[15px] tracking-[-0.02em] shadow-[0_8px_20px_rgba(0,0,0,.08)]">
            AI Triage
          </span>
          <div data-speed="0.08" className="absolute right-0 top-[20%] z-[5] w-[min(300px,74%)]">
            <div className="float-a">
              <ScopeMapCard className="hero-scope rotate-[5deg]" counts />
            </div>
          </div>
          <div data-speed="0.22" className="absolute bottom-[5%] left-[16%] z-[6]">
            <div className="float-b">
              <ReadinessGauge className="hero-gauge rotate-[-5deg] scale-[.85] sm:scale-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
