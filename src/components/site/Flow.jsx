"use client";

// S6. Dark band from the reference. Pinned for about one viewport while the lime highlight passes 01 → 02 → 03.
// The active card's icon loops (pen writes, sparkle twinkles, layers stack).
import { Fragment, useRef, useState } from "react";
import { ArrowRight, Layers, PenLine, Sparkles as SparkleIcon } from "lucide-react";
import Wave from "@/components/ui/Wave";
import { FLOW_STEPS } from "@/content/copy";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const ICONS = { pen: PenLine, sparkle: SparkleIcon, layers: Layers };
const LOOPS = { pen: "flow-pen", sparkle: "flow-twinkle", layers: "flow-stack" };

export default function Flow({ pin = true }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".flow-edge", { yPercent: 60, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 60%", scrub: true } });
      gsap.from(".flow-head, .flow-card", { y: 40, opacity: 0, stagger: 0.1, duration: 0.9, scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (!pin) return;
        ScrollTrigger.create({
          trigger: ".flow-pin",
          start: "center center",
          end: "+=100%",
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => setActive(Math.min(2, Math.floor(self.progress * 3))),
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray(".flow-card").forEach((card, i) =>
          ScrollTrigger.create({ trigger: card, start: "top 65%", end: "bottom 35%", onToggle: (s) => s.isActive && setActive(i) }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="how" className="on-dark relative scroll-mt-20 text-white" aria-labelledby="flow-title">
      <div className="flow-edge">
        <Wave fill="#181A19" />
      </div>
      <div className="grain -mt-px bg-night">
        <div className="flow-pin relative z-[2] mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[29%_71%] lg:py-20">
          <div className="flow-head">
            <p className="eyebrow text-white/70" style={{ fontSize: 10.5 }}>From input to interview-ready</p>
            <h2 id="flow-title" className="mt-4 text-[clamp(28px,3vw,36px)] font-medium leading-[1.08] tracking-[-0.03em]" style={{ fontFamily: "var(--font-jakarta)" }}>
              A focused prep flow
              <br />
              that <span className="serif-i text-[1.12em] text-lime">works backwards</span>
              <br />
              from your interview.
            </h2>
          </div>
          <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {FLOW_STEPS.map((s, i) => {
              const Icon = ICONS[s.icon];
              const on = i === active;
              return (
                <Fragment key={s.n}>
                  <li
                    className={`flow-card relative flex flex-1 gap-3.5 rounded-[26px] border p-5 transition-[border-color,box-shadow,transform] duration-500 md:min-h-[150px] ${
                      on ? "-translate-y-1 border-lime shadow-[0_0_0_1px_#D7FF1E,0_0_40px_rgba(200,245,26,.25)]" : "border-white/35"
                    }`}
                    aria-current={on ? "step" : undefined}
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] transition-colors duration-500 ${on ? "bg-[#3d4720] text-lime" : "bg-white/15 text-white"}`}>
                      <Icon size={22} className={on ? LOOPS[s.icon] : ""} />
                    </span>
                    <div>
                      <span className="text-[15px] text-white/85">{s.n}</span>
                      <h3 className="mt-1 text-[14px] font-bold">{s.title}</h3>
                      <p className="mt-2 text-[12.5px] leading-snug text-white/75">{s.desc}</p>
                    </div>
                  </li>
                  {i < 2 && <ArrowRight className={`mx-auto shrink-0 rotate-90 transition-colors md:rotate-0 ${i < active ? "text-lime" : "text-white/70"}`} size={22} aria-hidden />}
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
      <Wave fill="#181A19" flip variant={1} />
      <style>{`
        @keyframes flow-pen { 0%,100% { transform: translate(0,0) rotate(0) } 25% { transform: translate(2px,-1px) rotate(-8deg) } 50% { transform: translate(-1px,1px) rotate(4deg) } 75% { transform: translate(1px,0) rotate(-4deg) } }
        @keyframes flow-twinkle { 0%,100% { transform: scale(1) rotate(0); opacity: 1 } 50% { transform: scale(1.25) rotate(18deg); opacity: .7 } }
        @keyframes flow-stack { 0%,100% { transform: translateY(0) } 30% { transform: translateY(-3px) } 60% { transform: translateY(1px) } }
        .flow-pen { animation: flow-pen 1.2s ease-in-out infinite }
        .flow-twinkle { animation: flow-twinkle 1.4s ease-in-out infinite }
        .flow-stack { animation: flow-stack 1.3s ease-in-out infinite }
      `}</style>
    </section>
  );
}
