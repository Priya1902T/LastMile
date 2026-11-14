"use client";

// "Watch a plan get built": a scroll story. Text chapters scroll on the left;
// the stage on the right is sticky and changes with the chapter in view.
import { useEffect, useRef, useState } from "react";
import { Check, FileText, Lock, Quote, Trash2 } from "lucide-react";

const CHAPTERS = [
  {
    kicker: "8:40 pm",
    title: "Riya has an interview tomorrow.",
    body: "Frontend developer, technical round, 10 am. She has about eight hours, and what scares her most is freezing on a question.",
  },
  {
    kicker: "Step 1 · Read",
    title: "Scoped reads what she shares.",
    body: "Her resume and the job description are turned into a list of topics. Her email and phone number are removed before anything reaches the AI.",
  },
  {
    kicker: "Step 2 · Triage",
    title: "Every topic gets a bucket.",
    body: "What the job needs and her resume shows becomes must know. What they will probe goes in the middle. The rest is safe to skip, with a one-line fallback.",
  },
  {
    kicker: "Step 3 · Plan",
    title: "Eight hours, working backwards.",
    body: "A time-boxed plan, the questions they will ask about her own projects, and an honest script for the one skill she has not used yet.",
  },
];

const TOPICS = [
  { t: "React hooks", b: 0 },
  { t: "REST APIs", b: 0 },
  { t: "Component state", b: 0 },
  { t: "TypeScript", b: 1 },
  { t: "Testing (Jest)", b: 1 },
  { t: "Accessibility", b: 1 },
  { t: "GraphQL", b: 2 },
  { t: "Micro-frontends", b: 2 },
];
const BUCKETS = [
  { name: "Must know", cls: "b-lime" },
  { name: "Likely probed", cls: "b-peach" },
  { name: "Safe to skip", cls: "b-grey" },
];
const PLAN = [
  ["2.0 h", "Hooks + state, out loud"],
  ["1.5 h", "Fetching & error states"],
  ["1.0 h", "Your dashboard project Qs"],
  ["1.0 h", "TypeScript basics"],
  ["0.5 h", "Freeze drill: pause, restate"],
];

function Stage({ ch }) {
  return (
    <div className="story-stage" aria-live="polite">
      <div className="story-progress">
        {CHAPTERS.map((_, i) => (
          <span key={i} className={i <= ch ? "on" : ""} />
        ))}
      </div>

      {/* 0: intake */}
      <div className={`frame ${ch === 0 ? "show" : ""}`}>
        <p className="frame-label">Her answers</p>
        <div className="intake-chips">
          {["Tomorrow", "Frontend developer", "Technical round", "~8 hours", "Freezing"].map((c, i) => (
            <span key={c} className="ichip" style={{ "--d": `${i * 140}ms` }}>
              <Check size={14} /> {c}
            </span>
          ))}
        </div>
        <div className="clock">
          <span className="clock-hand" />
        </div>
      </div>

      {/* 1: reading */}
      <div className={`frame ${ch === 1 ? "show" : ""}`}>
        <p className="frame-label">Reading resume + JD</p>
        <div className="doc">
          <FileText size={22} />
          <div className="doc-lines">
            {[90, 70, 84, 60, 76, 50].map((w, i) => (
              <i key={i} style={{ width: `${w}%` }} />
            ))}
          </div>
          <span className="scanline" />
          <span className="redact">email@… → [email]</span>
        </div>
        <div className="topic-cloud">
          {TOPICS.map((x, i) => (
            <span key={x.t} className="tchip" style={{ "--d": `${300 + i * 110}ms` }}>
              {x.t}
            </span>
          ))}
        </div>
      </div>

      {/* 2: triage */}
      <div className={`frame ${ch === 2 ? "show" : ""}`}>
        <p className="frame-label">Sorted into three buckets</p>
        <div className="buckets">
          {BUCKETS.map((b, bi) => (
            <div key={b.name} className={`bucket ${b.cls}`}>
              <b>{b.name}</b>
              {TOPICS.filter((x) => x.b === bi).map((x, i) => (
                <span key={x.t} className="bchip" style={{ "--d": `${bi * 260 + i * 140}ms` }}>
                  {x.t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3: plan */}
      <div className={`frame ${ch === 3 ? "show" : ""}`}>
        <p className="frame-label">Her plan · 6 h prep, then sleep</p>
        <div className="mini-plan">
          {PLAN.map(([h, t], i) => (
            <div key={t} className="mrow" style={{ "--d": `${i * 160}ms` }}>
              <b>{h}</b>
              <span>{t}</span>
            </div>
          ))}
        </div>
        <div className="gap-quote" style={{ "--d": "950ms" }}>
          <Quote size={16} />
          <p>“I haven’t used TypeScript in production yet, but I know the basics and here’s how I’d ramp up…”</p>
        </div>
        <div className="private" style={{ "--d": "1200ms" }}>
          <Lock size={14} /> Encrypted · <Trash2 size={14} /> one-tap delete
        </div>
      </div>
    </div>
  );
}

export default function Story() {
  const [ch, setCh] = useState(0);
  const refs = useRef([]);

  // The active chapter is the last one whose top has passed the reading line.
  // The line sits lower on narrow screens, where the stage is pinned above the text.
  useEffect(() => {
    // Cheap (four rects), so it runs directly on scroll; React skips re-renders when the value is unchanged.
    const update = () => {
      const line = window.innerHeight * (window.innerWidth <= 900 ? 0.75 : 0.55);
      let next = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) next = i;
      });
      setCh(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="story shell" id="story">
      <div className="story-head reveal">
        <div className="eyebrow">ONE EVENING, START TO FINISH</div>
        <h2>
          Watch a plan <em>get built.</em>
        </h2>
      </div>
      <div className="story-grid">
        <div className="story-chapters">
          {CHAPTERS.map((c, i) => (
            <article
              key={c.title}
              data-i={i}
              ref={(el) => (refs.current[i] = el)}
              className={`chapter ${ch === i ? "active" : ""}`}
            >
              <span className="kicker">{c.kicker}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
        <div className="story-sticky">
          <Stage ch={ch} />
        </div>
      </div>
    </section>
  );
}
