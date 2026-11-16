"use client";

// Lenis smooth scrolling, driven by GSAP's ticker and kept in sync with ScrollTrigger.
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

/** Scroll to a y position or element, smoothly when Lenis is running. */
export function scrollToTarget(lenis, target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4, ...opts });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "auto" });
  else document.querySelector(target)?.scrollIntoView();
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ lerp: 0.1, smoothWheel: true });
    l.on("scroll", ScrollTrigger.update);
    const tick = (time) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // On route change: jump to top and recalculate every ScrollTrigger.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
