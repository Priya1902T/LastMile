"use client";

// Reusable scroll motion: word-by-word heading reveals, fade-ups, parallax layers and magnetic buttons.
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Heading whose words rise in one by one when it enters the viewport. */
export function RevealText({ as: Tag = "h2", className = "", children, delay = 0, ...rest }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // autoSplit re-splits once web fonts load (and on resize), so word boxes are measured with the real font.
      const split = SplitText.create(ref.current, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.06,
            delay,
            ease: "power4.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          }),
      });
      return () => split.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Children fade and rise in, staggered, when the wrapper enters. Targets `[data-fade]` inside, or the wrapper itself. */
export function FadeIn({ as: Tag = "div", className = "", children, stagger = 0.08, y = 28, ...rest }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = ref.current.querySelectorAll("[data-fade]");
      gsap.from(items.length ? items : ref.current, {
        y,
        opacity: 0,
        duration: 0.9,
        stagger,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Moves `[data-speed]` children at different rates while the wrapper scrolls by. speed 0.1 = slow drift. */
export function useParallax(scope) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      scope.current.querySelectorAll("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed);
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope },
  );
}

/** Wraps a button/link so it is pulled slightly toward the pointer. */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}

/** Counts a number up when it enters the viewport. */
export function CountUp({ to, decimals = 0, prefix = "", suffix = "", className = "", duration = 1.6 }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const el = ref.current;
      const fmt = (v) => `${prefix}${v.toFixed(decimals)}${suffix}`;
      if (prefersReducedMotion()) {
        el.textContent = fmt(to);
        return;
      }
      const o = { v: 0 };
      el.textContent = fmt(0);
      gsap.to(o, {
        v: to,
        duration,
        ease: "power2.out",
        onUpdate: () => (el.textContent = fmt(o.v)),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className}>
      {`${prefix}${to.toFixed(decimals)}${suffix}`}
    </span>
  );
}

export { ScrollTrigger };
