"use client";

// S13. FAQ accordion: smooth height animation, plus rotates into a cross, keyboard operable (native buttons).
import { useRef, useState } from "react";
import { RevealText } from "@/components/ui/Motion";
import { FAQ } from "@/content/copy";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

function Item({ q, a, i }) {
  const [open, setOpen] = useState(i === 0);
  const body = useRef(null);
  const toggle = () => {
    const el = body.current;
    const next = !open;
    setOpen(next);
    if (prefersReducedMotion()) return;
    if (next) gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
    else gsap.fromTo(el, { height: el.offsetHeight, opacity: 1 }, { height: 0, opacity: 0, duration: 0.35, ease: "power3.inOut" });
  };
  return (
    <div className="border-b border-coal/10">
      <h3>
        <button type="button" onClick={toggle} aria-expanded={open} aria-controls={`faq-${i}`} id={`faq-q-${i}`} className="flex w-full items-center justify-between gap-6 py-6 text-left">
          <span className="display text-[clamp(17px,1.6vw,21px)] tracking-[-0.02em]">{q}</span>
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-[transform,background] duration-300 ${open ? "rotate-45 bg-lime" : "bg-fog"}`} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v12M2 8h12" stroke="#111312" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </span>
        </button>
      </h3>
      <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} ref={body} className="overflow-hidden" style={open ? undefined : { height: 0, opacity: 0 }}>
        <p className="max-w-[760px] pb-6 text-[16px] leading-relaxed text-muted">{a}</p>
      </div>
    </div>
  );
}

export default function Faq({ id = "faq" }) {
  return (
    <section id={id} className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-10 lg:grid-cols-[34%_66%]">
        <div>
          <p className="eyebrow text-muted">FAQ</p>
          <RevealText id={`${id}-title`} className="display mt-3 text-[clamp(32px,4vw,50px)] leading-[1.03]">
            Fair <span className="serif-i">questions.</span>
          </RevealText>
          <p className="lede mt-4 max-w-[320px]">Straight answers about how Scoped works and what it won’t do.</p>
        </div>
        <div>
          {FAQ.map((f, i) => <Item key={f.q} {...f} i={i} />)}
        </div>
      </div>
    </section>
  );
}
