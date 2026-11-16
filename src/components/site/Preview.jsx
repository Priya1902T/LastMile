"use client";

// S9. "How it feels": a browser frame that tilts flat as you scroll while its screens crossfade
// intake → building → results, with lime annotation tags pointing at features.
import { useRef } from "react";
import { Check } from "lucide-react";
import { RevealText } from "@/components/ui/Motion";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

function Intake() {
  return (
    <div className="grid h-full place-items-center bg-paper p-6">
      <div className="w-full max-w-[360px] rounded-[24px] bg-white p-6 shadow-sm">
        <p className="eyebrow text-muted">Question 2 of 3</p>
        <p className="display mt-3 text-[24px] leading-tight">How many hours can you really spend?</p>
        <div className="mt-5 flex flex-wrap gap-2 text-[13px] font-semibold">
          {["Under 3 hours", "3 to 12 hours", "1 to 3 days", "4 to 14 days"].map((o, i) => (
            <span key={o} className={`rounded-full border px-3.5 py-2 ${i === 1 ? "border-coal bg-coal text-white" : "border-coal/15"}`}>{o}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
function Building() {
  return (
    <div className="grid h-full place-items-center bg-paper">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 animate-spin rounded-full [animation-duration:2.5s] [background:conic-gradient(#D7FF1E,#fff,#FF7A1F,#fff,#D7FF1E)] [mask:radial-gradient(circle,transparent_54%,#000_56%)]" />
        <p className="display mt-6 text-[22px]">Ranking what matters</p>
        <p className="mt-1 text-[13px] text-muted">About 30 seconds</p>
      </div>
    </div>
  );
}
function Results() {
  return (
    <div className="grid h-full gap-3 bg-paper p-5 sm:grid-cols-[1.1fr_1fr]">
      <div className="space-y-2.5">
        <p className="display text-[22px]">Your plan</p>
        <div className="rounded-2xl bg-coal p-3.5 text-white"><b className="text-[13px] text-lime">You won’t freeze if you have a fallback.</b><p className="mt-1 text-[12px] text-white/75">Pause, restate, answer in two parts.</p></div>
        {[["Must know", "tint-green", ["React hooks", "REST APIs"]], ["Likely probed", "tint-peach", ["TypeScript"]], ["Safe to skip", "tint-grey", ["GraphQL"]]].map(([n, c, ts]) => (
          <div key={n} className={`${c} rounded-2xl p-3`}>
            <b className="text-[12px]">{n}</b>
            <div className="mt-1.5 flex flex-wrap gap-1.5">{ts.map((t) => <span key={t} className="rounded-full bg-white px-2.5 py-1 text-[11.5px] font-semibold">{t}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="hidden space-y-2 sm:block">
        {[["2h", "Hooks + state, out loud"], ["1.5h", "Fetching & error states"], ["1h", "Your project questions"], ["0.5h", "TypeScript basics"]].map(([h, t], i) => (
          <div key={t} className={`flex items-center gap-2.5 rounded-2xl bg-white p-3 text-[12.5px] ${i === 0 ? "opacity-50" : ""}`}>
            <span className={`grid h-5 w-5 place-items-center rounded-md border ${i === 0 ? "border-coal bg-coal text-white" : "border-coal/30"}`}>{i === 0 && <Check size={12} />}</span>
            <span className={`flex-1 ${i === 0 ? "line-through" : ""}`}>{t}</span>
            <b className="text-muted">{h}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

const TAGS = [
  { text: "3 quick questions", cls: "left-[4%] top-[22%]", screen: 0 },
  { text: "~30 seconds", cls: "right-[6%] top-[30%]", screen: 1 },
  { text: "Three piles, with reasons", cls: "left-[2%] top-[58%]", screen: 2 },
  { text: "Tick blocks off as you go", cls: "right-[3%] top-[18%]", screen: 2 },
];

export default function Preview() {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 60%", end: "bottom 80%", scrub: 1 } });
      tl.fromTo(".pv-frame", { rotateX: 12, y: 40, scale: 0.94 }, { rotateX: 0, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        .to(".pv-s0", { opacity: 0, duration: 0.3 }, 0.9)
        .to(".pv-s1", { opacity: 1, duration: 0.3 }, 0.9)
        .to(".pv-s1", { opacity: 0, duration: 0.3 }, 1.6)
        .to(".pv-s2", { opacity: 1, duration: 0.3 }, 1.6)
        .fromTo(".pv-tag-0", { scale: 0 }, { scale: 1, duration: 0.2, ease: "back.out(2)" }, 0.3)
        .to(".pv-tag-0", { opacity: 0, duration: 0.15 }, 0.9)
        .fromTo(".pv-tag-1", { scale: 0 }, { scale: 1, duration: 0.2, ease: "back.out(2)" }, 1.0)
        .to(".pv-tag-1", { opacity: 0, duration: 0.15 }, 1.6)
        .fromTo(".pv-tag-2, .pv-tag-3", { scale: 0 }, { scale: 1, duration: 0.2, stagger: 0.1, ease: "back.out(2)" }, 1.8);
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="relative py-20 lg:min-h-[180vh]" aria-labelledby="pv-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:sticky lg:top-[90px]">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow text-muted">How it feels</p>
          <RevealText id="pv-title" className="display mt-3 text-[clamp(32px,4vw,52px)] leading-[1.03]">
            Three taps in. <span className="serif-i">One plan</span> out.
          </RevealText>
        </div>
        <div className="relative mx-auto mt-10 max-w-[940px] [perspective:1400px]">
          <div className="pv-frame overflow-hidden rounded-[22px] border border-coal/10 bg-white shadow-[0_40px_80px_rgba(0,0,0,.16)] [transform-origin:50%_0%]">
            <div className="flex items-center gap-2 border-b border-coal/10 bg-[#f1ede7] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate rounded-full bg-white px-4 py-1 text-[12px] text-muted">scoped.app/start</span>
            </div>
            <div className="relative h-[380px] sm:h-[460px]">
              <div className="pv-s0 absolute inset-0"><Intake /></div>
              <div className="pv-s1 absolute inset-0 opacity-0"><Building /></div>
              <div className="pv-s2 absolute inset-0 opacity-0"><Results /></div>
            </div>
          </div>
          {TAGS.map((t, i) => (
            <span key={t.text} className={`pv-tag-${i} display absolute z-10 hidden rotate-[-6deg] rounded-[14px] bg-lime px-3.5 py-2 text-[13px] shadow-[0_10px_24px_rgba(0,0,0,.12)] sm:block ${t.cls}`} aria-hidden>
              {t.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
