"use client";

// Small motion helpers for the landing page. No animation library needed.
import { useEffect, useRef, useState } from "react";

/** True when the user asked the OS to reduce motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Returns [ref, inView]. Becomes true once the element is on screen (and stays true). */
export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** Counts from 0 to `target` once `active` is true. */
export function useCountUp(target, active, duration = 1400) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);
  return value;
}

/** Steps 0..count-1 on a timer while `active`; holds on 0 when motion is reduced. */
export function useCycle(count, active, ms = 2600) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setI((x) => (x + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, active, ms, reduced]);
  return i;
}

/** Cycles through phrases, typing each one out. */
export function useTypewriter(phrases, active, { speed = 38, hold = 1600 } = {}) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(phrases[phrases.length - 1]);
  useEffect(() => {
    if (!active || reduced) {
      setText(phrases[phrases.length - 1]);
      return;
    }
    let p = 0;
    let c = 0;
    let timer;
    const step = () => {
      const phrase = phrases[p];
      c += 1;
      setText(phrase.slice(0, c));
      if (c < phrase.length) {
        timer = setTimeout(step, speed);
      } else if (p < phrases.length - 1) {
        timer = setTimeout(() => {
          p += 1;
          c = 0;
          step();
        }, hold);
      }
    };
    setText("");
    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
    // phrases is a constant array from the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);
  return text;
}
