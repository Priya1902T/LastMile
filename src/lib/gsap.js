"use client";

// One place to register GSAP plugins (all free since GSAP 3.13).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out" });
}

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, SplitText, useGSAP };
