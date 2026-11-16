"use client";

// S5. The pinned scrollytelling sequence: one stage, one master timeline with a label per scene,
// scrubbed by scroll, snapping to scenes on desktop. Captions reveal word by word; a progress rail jumps between scenes.
// With reduced motion, the six scenes are shown as static stacked illustrations instead.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StoryStage from "./StoryStage";
import { build as build1, floatChips } from "./scenes/Scene1";
import { build as build2 } from "./scenes/Scene2";
import { build as build3 } from "./scenes/Scene3";
import { build as build4 } from "./scenes/Scene4";
import { build as build5 } from "./scenes/Scene5";
import { build as build6 } from "./scenes/Scene6";
import { STORY_SCENES } from "@/content/copy";
import { useLenis, scrollToTarget } from "@/components/site/SmoothScroll";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const LABELS = STORY_SCENES.map((s) => s.id);

/** Builds the paused master timeline for one stage. Labels sit at each scene's resting state (0..5). */
export function buildStoryTimeline(root, stage) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
  LABELS.forEach((l, i) => tl.addLabel(l, i));
  const ctx = { gsap, q, stage, at: (l) => tl.labels[l] };
  [build1, build2, build3, build4, build5, build6].forEach((b) => b(tl, ctx));
  tl.set({}, {}, LABELS.length - 1 + 0.15); // short hold at the end
  return tl;
}

function Caption({ s, i, dark }) {
  return (
    <div className="story-cap absolute inset-0 flex flex-col justify-center" data-i={i} aria-hidden={i ? true : undefined}>
      <p className={`eyebrow ${dark ? "text-lime" : "text-muted"}`}>
        Scene 0{i + 1} · {s.label}
      </p>
      <h3 className="story-h display mt-4 text-[clamp(30px,4vw,54px)] leading-[1]">{s.caption}</h3>
      <p className="story-sub mt-5 max-w-[400px] text-[16px] leading-relaxed opacity-80">{s.sub}</p>
      {i === LABELS.length - 1 && (
        <div className="story-cta mt-8 flex flex-wrap items-center gap-4">
          <p className="display text-[22px] text-white">
            Short on time? <span className="serif-i text-lime">Get Scoped.</span>
          </p>
          <Link href="/start" className="pill pill-lime pill-sm">
            Start Your Prep <ArrowUpRight size={17} className="nudge" />
          </Link>
        </div>
      )}
    </div>
  );
}

function StaticStory() {
  const refs = useRef([]);
  useEffect(() => {
    const tls = refs.current.map((el, i) => {
      if (!el) return null;
      const tl = buildStoryTimeline(el, el);
      tl.seek(LABELS[i]);
      return tl;
    });
    return () => tls.forEach((t) => t?.kill());
  }, []);
  return (
    <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8">
      {STORY_SCENES.map((s, i) => (
        <article key={s.id} className="grid items-center gap-6 md:grid-cols-[38%_62%]">
          <div>
            <p className="eyebrow text-muted">Scene 0{i + 1} · {s.label}</p>
            <h3 className="display mt-3 text-[32px] leading-[1.05]">{s.caption}</h3>
            <p className="mt-3 text-muted">{s.sub}</p>
          </div>
          <div ref={(el) => (refs.current[i] = el)} className="aspect-[4/3] overflow-hidden rounded-[32px] bg-paper" style={{ background: i === 5 ? "#181A19" : "#EFEAE3" }}>
            <StoryStage idPrefix={`s${i}`} />
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Story({ id = "story" }) {
  const ref = useRef(null);
  const stRef = useRef(null);
  const tlRef = useRef(null);
  const lenis = useLenis();
  const [reduced, setReduced] = useState(false);
  const [scene, setScene] = useState(0);

  useEffect(() => setReduced(prefersReducedMotion()), []);

  useGSAP(
    () => {
      if (reduced || prefersReducedMotion()) return;
      const stage = ref.current.querySelector(".story-stage");
      const tl = buildStoryTimeline(ref.current.querySelector(".story-art"), stage);
      tlRef.current = tl;
      const floats = floatChips(gsap, gsap.utils.selector(ref.current));

      // Captions: split into words once; show scene i's words, hide the others.
      const caps = gsap.utils.toArray(ref.current.querySelectorAll(".story-cap"));
      const splits = caps.map((c) => SplitText.create(c.querySelector(".story-h"), { type: "words", mask: "words" }));
      caps.forEach((c, i) => {
        if (i === 0) return;
        gsap.set(c, { autoAlpha: 0 });
        gsap.set(splits[i].words, { yPercent: 110 });
      });
      let shown = 0;
      const showCaption = (i) => {
        if (i === shown) return;
        const prev = caps[shown];
        gsap.to(splits[shown].words, { yPercent: -110, duration: 0.4, stagger: 0.02, ease: "power2.in" });
        gsap.to(prev, { autoAlpha: 0, duration: 0.3, delay: 0.2 });
        gsap.set(caps[i], { autoAlpha: 1 });
        gsap.fromTo(splits[i].words, { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.05, ease: "power4.out", delay: 0.15 });
        gsap.fromTo(caps[i].querySelectorAll(".story-sub, .story-cta, .eyebrow"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.35, stagger: 0.08 });
        caps.forEach((c, k) => c.setAttribute("aria-hidden", k === i ? "false" : "true"));
        shown = i;
      };

      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 900px)", mobile: "(max-width: 899px)" }, (c) => {
        const { desktop } = c.conditions;
        const st = ScrollTrigger.create({
          trigger: ref.current.querySelector(".story-pin"),
          start: "top top",
          end: desktop ? "+=650%" : "+=450%",
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          animation: tl,
          snap: desktop
            ? { snapTo: "labelsDirectional", duration: { min: 0.25, max: 0.8 }, delay: 0.08, ease: "power1.inOut" }
            : undefined,
          onUpdate: (self) => {
            const time = tl.duration() * self.progress;
            // Scene k's caption takes over halfway through its transition.
            const idx = Math.max(0, Math.min(LABELS.length - 1, Math.floor(time + 0.5)));
            ref.current.style.setProperty("--story-p", String(self.progress));
            setScene(idx);
            showCaption(idx);
            // Chips drift idly only while they are still a pile.
            floats.forEach((f) => (time > 0.6 ? f.pause() : f.play()));
          },
        });
        stRef.current = st;
        return () => {
          stRef.current = null;
        };
      });
      // caption colour follows the stage
      gsap.to(ref.current.querySelector(".story-caps"), {
        color: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: ref.current.querySelector(".story-pin"),
          start: () => (stRef.current ? stRef.current.start + (stRef.current.end - stRef.current.start) * (4.1 / tl.duration()) : 0),
          end: () => (stRef.current ? stRef.current.start + (stRef.current.end - stRef.current.start) * (4.35 / tl.duration()) : 1),
          scrub: true,
        },
      });

      return () => {
        splits.forEach((s) => s.revert());
        floats.forEach((f) => f.kill());
      };
    },
    { scope: ref, dependencies: [reduced] },
  );

  const jump = (i) => {
    const st = stRef.current;
    const tl = tlRef.current;
    if (!st || !tl) return;
    const y = st.start + (st.end - st.start) * (tl.labels[LABELS[i]] / tl.duration());
    scrollToTarget(lenis, y);
  };

  return (
    <section ref={ref} id={id} className="relative scroll-mt-0" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="sr-only">How Scoped turns too much into a plan</h2>
      {reduced ? (
        <div className="py-20">
          <StaticStory />
        </div>
      ) : (
        <div className="story-pin relative h-screen overflow-hidden">
          <div className="story-stage absolute inset-0 bg-paper" style={{ backgroundColor: "#F7F3EE" }}>
            <div className="mx-auto grid h-full max-w-[1280px] grid-rows-[auto_1fr] gap-2 px-5 pb-6 pt-[92px] sm:px-8 min-[900px]:grid-cols-[34%_66%] min-[900px]:grid-rows-1 min-[900px]:gap-8 min-[900px]:py-[96px] min-[900px]:pr-14">
              <div className="story-caps relative h-[200px] text-coal min-[900px]:h-auto">
                {STORY_SCENES.map((s, i) => (
                  <Caption key={s.id} s={s} i={i} dark={i === 5} />
                ))}
              </div>
              <div className="story-art relative min-h-0">
                <StoryStage />
              </div>
            </div>
          </div>

          {/* Progress rail */}
          <nav className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 sm:block" aria-label="Story scenes">
            <div className="relative flex flex-col gap-5">
              <span className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-[2px] bg-coal/15" aria-hidden />
              <span className="absolute left-[9px] top-2 w-[2px] origin-top bg-lime" style={{ height: "calc((100% - 16px) * var(--story-p, 0))" }} aria-hidden />
              {STORY_SCENES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jump(i)}
                  className="group relative flex items-center gap-3"
                  aria-label={`Go to scene ${i + 1}: ${s.label}`}
                  aria-current={scene === i ? "step" : undefined}
                >
                  <span className={`relative z-[1] h-5 w-5 rounded-full border-2 transition ${i <= scene ? "border-coal bg-lime" : "border-coal/30 bg-paper"}`} />
                  <span className={`pointer-events-none absolute right-8 whitespace-nowrap rounded-full bg-coal px-3 py-1 text-[12px] font-semibold text-white transition ${scene === i ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </section>
  );
}
