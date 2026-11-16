"use client";

// Page-load intro: the lime // draws itself, then the curtain wipes up. Plays once per browser session.
import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function IntroCurtain() {
  const ref = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem("scoped:intro") === "1";
        sessionStorage.setItem("scoped:intro", "1");
      } catch {}
      if (seen || prefersReducedMotion()) {
        setDone(true);
        return;
      }
      window.__scopedIntroPlaying = true;
      gsap
        .timeline({
          onComplete: () => {
            window.__scopedIntroPlaying = false;
            setDone(true);
          },
        })
        .from(".intro-slash", { drawSVG: "0%", duration: 0.5, stagger: 0.12, ease: "power2.inOut" })
        .to(".intro-mark", { scale: 0.9, opacity: 0, duration: 0.3 }, "+=0.15")
        .to(ref.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.1");
    },
    { scope: ref },
  );

  if (done) return null;
  return (
    <div ref={ref} className="intro-curtain fixed inset-0 z-[70] grid place-items-center bg-night" aria-hidden>
      {/* Hide instantly (before hydration) for repeat visits in this session, so there is no dark flash. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "try{if(sessionStorage.getItem('scoped:intro')==='1')document.documentElement.classList.add('intro-seen')}catch(e){}",
        }}
      />
      <svg className="intro-mark" width="96" height="70" viewBox="0 0 30 22" fill="none">
        <path className="intro-slash" d="M9.5 1 L1.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" />
        <path className="intro-slash" d="M21.5 1 L13.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
