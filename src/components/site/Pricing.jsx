"use client";

// S12. Pricing. With SHOW_PRICING_TIERS off (default) it shows one honest "free during early access" card.
// With it on, it shows the three PLACEHOLDER tiers from src/content/placeholders.js with a monthly/one-time toggle.
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/Motion";
import { FLAGS } from "@/content/flags";
import { PRICING } from "@/content/placeholders";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

function DrawCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#D7FF1E" />
      <path className="pr-check" d="M7 12.5l3.2 3.2L17 9" stroke="#111312" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const EARLY = ["Scope map with reasons and fallbacks", "Time-boxed plan for your hours", "Resume probe questions + outlines", "Honest-gap scripts and a fear drill", "Encrypted resume, one-tap delete"];

export default function Pricing() {
  const ref = useRef(null);
  const [mode, setMode] = useState("monthly");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray(ref.current.querySelectorAll(".pr-card")).forEach((card) => {
        gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", once: true } })
          .from(card, { y: 40, opacity: 0, duration: 0.8 })
          .from(card.querySelectorAll(".pr-check"), { drawSVG: "0%", stagger: 0.08, duration: 0.35 }, 0.3);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="pricing" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8" aria-labelledby="pr-title">
      <div className="text-center">
        <p className="eyebrow text-muted">Pricing</p>
        <RevealText id="pr-title" className="display mx-auto mt-3 max-w-[640px] text-[clamp(32px,4vw,52px)] leading-[1.03]">
          Cheaper than <span className="serif-i">one</span> more panicked evening.
        </RevealText>
      </div>

      {FLAGS.SHOW_PRICING_TIERS ? (
        <>
          <div className="mt-8 flex justify-center">
            <div className="relative grid grid-cols-2 rounded-full bg-fog p-1 text-[14px] font-semibold" role="radiogroup" aria-label="Billing">
              <span className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-coal transition-transform duration-300" style={{ transform: mode === "once" ? "translateX(100%)" : "none" }} aria-hidden />
              {[["monthly", "Monthly"], ["once", "One-time"]].map(([k, l]) => (
                <button key={k} type="button" role="radio" aria-checked={mode === k} onClick={() => setMode(k)} className={`relative z-[1] rounded-full px-6 py-2.5 transition-colors ${mode === k ? "text-white" : ""}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {/* PLACEHOLDER prices: see src/content/placeholders.js */}
            {PRICING.map((p) => (
              <div key={p.name} className={`pr-card lift relative rounded-[32px] p-7 ${p.popular ? "border-2 border-lime bg-white shadow-[0_0_0_4px_rgba(215,255,30,.25),0_30px_60px_rgba(0,0,0,.12)]" : "border border-coal/10 bg-white/70"}`}>
                {p.popular && <span className="display absolute -top-4 right-6 rotate-[-6deg] rounded-[12px] bg-lime px-3 py-1.5 text-[13px]">Most Popular</span>}
                <p className="display text-[22px]">{p.name}</p>
                <p className="text-[14px] text-muted">{p.tagline}</p>
                <p className="display mt-6 text-[48px] leading-none">
                  {mode === "monthly" ? p.monthly : p.once}
                  <span className="text-[15px] font-semibold text-muted">{p.period ?? ""}</span>
                </p>
                <ul className="mt-6 space-y-2.5 text-[14.5px]">
                  {p.features.map((f) => <li key={f} className="flex gap-2.5"><DrawCheck />{f}</li>)}
                </ul>
                <Link href="/start" className={`pill mt-8 w-full ${p.popular ? "pill-lime" : "pill-dark"}`}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="pr-card relative mx-auto mt-12 max-w-[520px] rounded-[32px] border-2 border-lime bg-white p-8 shadow-[0_0_0_4px_rgba(215,255,30,.25),0_30px_60px_rgba(0,0,0,.12)]">
          <span className="display absolute -top-4 right-6 rotate-[-6deg] rounded-[12px] bg-lime px-3 py-1.5 text-[13px]">Early access</span>
          <p className="display text-[22px]">Free while we’re in early access</p>
          <p className="mt-1 text-[14px] text-muted">No card, no account. Paid plans come later, and we’ll say so clearly before anything changes.</p>
          <ul className="mt-6 space-y-2.5 text-[14.5px]">
            {EARLY.map((f) => <li key={f} className="flex gap-2.5"><DrawCheck />{f}</li>)}
          </ul>
          <Link href="/start" className="pill pill-dark mt-8 w-full">Start Your Prep <ArrowUpRight size={18} className="nudge" /></Link>
        </div>
      )}
    </section>
  );
}
