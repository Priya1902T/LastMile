"use client";

// Small lime dot that follows the pointer, grows over interactive elements and says "Play" over play buttons.
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.25, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.25, ease: "power3" });
    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      const play = t?.closest("[data-cursor='play']");
      const hover = t?.closest("a, button, [role='button'], input, textarea, summary, [data-cursor='hover']");
      el.classList.toggle("is-play", !!play);
      el.classList.toggle("is-hover", !play && !!hover);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    el.style.opacity = "1";
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden>
      <span>Play</span>
    </div>
  );
}
