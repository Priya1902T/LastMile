"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TABS = [
  { key: "scope", label: "Scope" },
  { key: "plan", label: "Plan" },
  { key: "questions", label: "Questions" },
];

function Chevron() {
  return <span className="chev ml-3 text-[18px] text-mute">›</span>;
}

function ScopeGroup({ title, color, items }) {
  if (!items.length) return null;
  return (
    <div className="mb-5">
      <p className={`mb-2 inline-block rounded-full px-3 py-1 text-[12px] font-semibold ${color}`}>{title}</p>
      <div className="space-y-2">
        {items.map((it, i) => (
          <details key={i} className="glass rounded-2xl p-4">
            <summary className="flex items-center justify-between">
              <span>
                <span className="block text-[15px] font-medium">{it.topic}</span>
                <span className="block text-[13px] text-sub">{it.why}</span>
              </span>
              <Chevron />
            </summary>
            <p className="mt-3 rounded-xl bg-vio-soft/70 p-3 text-[14px]">{it.howToPrep}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function fmtMinutes(m) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}

export default function PlanView(p) {
  const router = useRouter();
  const [tab, setTab] = useState("scope");
  const [done, setDone] = useState(() => p.blocks.map(() => false));
  const [copied, setCopied] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const storeKey = `scoped:plan:${p.id}`;
  // Plan progress is a per-device convenience, so localStorage is fine here.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) ?? "null");
      if (Array.isArray(saved) && saved.length === p.blocks.length) setDone(saved);
    } catch {}
  }, [storeKey, p.blocks.length]);
  function toggle(i) {
    const next = done.map((d, k) => (k === i ? !d : d));
    setDone(next);
    try {
      localStorage.setItem(storeKey, JSON.stringify(next));
    } catch {}
  }
  async function copy(text, i) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  }
  async function del() {
    if (!confirm("Delete your resume and this plan? This cannot be undone.")) return;
    setDeleting(true);
    const res = await fetch(`/api/sessions/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      try {
        localStorage.removeItem(storeKey);
      } catch {}
      router.push("/start");
    } else {
      setDeleting(false);
      alert("Could not delete right now. Please try again.");
    }
  }
  const pct = Math.round((done.filter(Boolean).length / Math.max(done.length, 1)) * 100);
  const total = p.blocks.reduce((a, b) => a + b.minutes, 0);
  const s = p.session;
  return (
    <section className="fade-in">
      <div className="mt-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] text-sub">
            {s.role}
            {s.company ? `, ${s.company}` : ""} · {s.round} round
          </p>
          <h1 className="mt-1 font-display text-[34px] font-extrabold leading-none tracking-[-0.02em]">Your plan</h1>
        </div>
        <span className="shrink-0 rounded-full bg-vio-soft px-3 py-1.5 text-[12px] font-medium text-vio-deep">
          {s.when ?? "Soon"} · {fmtMinutes(total)}
        </span>
      </div>
      <div
        className="mt-4 h-1.5 rounded-full bg-line"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-1.5 rounded-full bg-lime transition-all" style={{ width: `${pct}%` }} />
      </div>

      {p.fearTip && (
        <div className="mt-4 rounded-2xl bg-ink p-4 text-white">
          <p className="font-display text-[14px] font-bold text-lime">{p.fearTip.title}</p>
          <p className="mt-1 text-[13px] text-white/75">{p.fearTip.drill}</p>
        </div>
      )}

      {tab === "scope" && (
        <div className="mt-5 fade-in">
          <ScopeGroup title="Must know" color="bg-lime text-ink" items={p.scope.mustKnow} />
          <ScopeGroup title="Likely probed" color="bg-orange-soft text-amber" items={p.scope.likelyProbed} />
          <ScopeGroup title="Safe to skip" color="bg-cream2 text-sub" items={p.scope.safeToSkip} />
        </div>
      )}

      {tab === "plan" && (
        <div className="mt-5 space-y-2 fade-in">
          {p.blocks.map((b, i) => (
            <label
              key={i}
              className={`glass flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition ${done[i] ? "opacity-50" : ""}`}
            >
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => toggle(i)}
                className="h-5 w-5 shrink-0 accent-ink"
              />
              <span className={`flex-1 text-[15px] ${done[i] ? "line-through" : ""}`}>{b.task}</span>
              <span className="shrink-0 text-[12px] text-mute">{fmtMinutes(b.minutes)}</span>
            </label>
          ))}
        </div>
      )}

      {tab === "questions" && (
        <div className="mt-5 fade-in">
          {p.probeQuestions.length > 0 && <p className="mb-2 text-[13px] font-medium">They will likely ask</p>}
          <div className="space-y-2">
            {p.probeQuestions.map((q, i) => (
              <details key={i} className="glass rounded-2xl p-4">
                <summary className="flex items-center justify-between">
                  <span className="pr-3 text-[15px] font-medium">{q.question}</span>
                  <Chevron />
                </summary>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-sub">
                  {q.outline.map((o, k) => (
                    <li key={k}>{o}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          {p.gapScripts.map((g, i) => (
            <div key={i} className="mt-5">
              <p className="mb-2 text-[13px] font-medium">Honest-gap script: {g.skill}</p>
              <div className="glass rounded-2xl p-4">
                <p className="text-[13px] text-sub">What to learn: {g.learnFast}</p>
                <p className="mt-3 rounded-xl bg-lime-soft p-3 font-serif text-[18px] italic leading-snug">
                  {g.script}
                </p>
                <button
                  type="button"
                  onClick={() => copy(g.script, i)}
                  className="mt-3 text-[13px] font-medium text-vio"
                >
                  {copied === i ? "Copied" : "Copy script"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-3">
        <Link href="/start" className="text-[13px] font-medium underline underline-offset-4">
          Start a new plan
        </Link>
        <button
          type="button"
          disabled={deleting}
          onClick={del}
          className="text-[12px] text-red-600 disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete my data"}
        </button>
      </div>

      <nav
        className="fixed bottom-0 left-1/2 z-20 w-full max-w-[520px] -translate-x-1/2 px-5"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="flex h-16 items-center justify-around rounded-full bg-ink p-1.5 text-[13px] text-white/70 shadow-[0_10px_30px_rgba(20,20,20,.25)]">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                window.scrollTo(0, 0);
              }}
              aria-current={tab === t.key ? "page" : undefined}
              className={`h-full flex-1 rounded-full px-4 transition ${tab === t.key ? "bg-lime font-semibold text-ink" : "hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}
