"use client";

// S14. Final CTA bar from the reference: dark rounded container, lime glow, stats row with dividers, magnetic lime pill.
// The stats are honest product facts unless SHOW_STATS is on (then the PLACEHOLDER 5× / 90% / 1:1 are used).
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Star, Trash2, Users, Zap } from "lucide-react";
import { CountUp, FadeIn, Magnetic } from "@/components/ui/Motion";
import { FLAGS } from "@/content/flags";

const HONEST = [
  { icon: Clock, node: <><span>~</span><CountUp to={30} suffix="s" /></>, label: "From details to plan" },
  { icon: Trash2, node: "1 tap", label: "To delete your data" },
  { icon: ShieldCheck, node: "0", label: "Invented experience" },
];
// PLACEHOLDER: only used when FLAGS.SHOW_STATS is true.
const PLACEHOLDER = [
  { icon: Star, node: <CountUp to={5} suffix="×" />, label: "More focused prep" },
  { icon: Zap, node: <CountUp to={90} suffix="%" />, label: "Feel more confident" },
  { icon: Users, node: "1:1", label: "Personalized to you" },
];

export default function FinalCta() {
  const stats = FLAGS.SHOW_STATS ? PLACEHOLDER : HONEST;
  return (
    <section className="px-3 py-6 sm:px-5" aria-labelledby="cta-title">
      <FadeIn className="on-dark grain relative mx-auto max-w-[1220px] overflow-hidden rounded-[32px] bg-night px-7 py-9 text-white sm:px-12">
        <div className="pointer-events-none absolute -bottom-28 left-[28%] h-64 w-[55%] rounded-full bg-glow/30 blur-3xl" aria-hidden />
        <div className="relative z-[2] grid items-center gap-8 lg:grid-cols-[1.1fr_2fr_auto]">
          <div data-fade>
            <p className="eyebrow text-white/70" style={{ fontSize: 10.5 }}>Built for real candidates</p>
            <h2 id="cta-title" className="mt-2 text-[clamp(32px,3.2vw,40px)] font-medium leading-[1.04] tracking-[-0.02em]" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="italic">Short on time?</span>
              <br />
              <span className="font-extrabold italic text-lime">Get Scoped.</span>
            </h2>
          </div>
          <dl data-fade className="grid grid-cols-3 sm:divide-x sm:divide-white/25">
            {stats.map(({ icon: Icon, node, label }) => (
              <div key={label} className="px-2 sm:px-6">
                <dt className="flex items-center gap-2 text-[28px] font-medium leading-none">
                  <Icon size={22} strokeWidth={1.8} aria-hidden /> {node}
                </dt>
                <dd className="mt-1.5 text-[12px] text-white/75">{label}</dd>
              </div>
            ))}
          </dl>
          <div data-fade>
            <Magnetic>
              <Link href="/start" className="pill pill-lime">
                Start for Free <ArrowRight size={19} className="nudge-r" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
