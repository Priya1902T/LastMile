"use client";

// Dark footer: parallaxing wordmark, link columns, launch-updates form (not live yet, and says so), © line.
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Wave from "@/components/ui/Wave";
import { FLAGS } from "@/content/flags";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const COLUMNS = [
  { title: "Product", links: [["/product", "Overview"], ["/how-it-works", "How it works"], ["/pricing", "Pricing"], ["/start", "Start your prep"]] },
  { title: "Resources", links: [["/resources", "Guides"], ["/resources#faq", "FAQ"], ["/how-it-works#story", "The story"]] },
  { title: "Company", links: [["/resources#about", "About"], ["mailto:hello@example.com", "Contact"]] },
  { title: "Legal", links: [["/resources#privacy", "Privacy"], ["/resources#terms", "Terms"]] },
];

export default function Footer() {
  const ref = useRef(null);
  const [note, setNote] = useState("");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".footer-word",
        { yPercent: 35 },
        { yPercent: -5, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="on-dark relative mt-10 text-white">
      <Wave fill="#181A19" variant={1} />
      <div className="grain bg-night">
        <div className="relative z-[2] mx-auto max-w-[1200px] px-5 pb-10 pt-14 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
            <div>
              <Link href="/" className="logo-link inline-block" aria-label="Scoped home">
                <Logo dark size={30} />
              </Link>
              <p className="mt-4 max-w-[320px] text-[15px] text-white/65">
                The last-mile interview coach. Know what to prepare, skip the rest.
              </p>
              <form
                className="mt-6 flex max-w-[380px] items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setNote("Launch updates aren’t live yet, so nothing was saved. Check back soon.");
                }}
              >
                <label htmlFor="news" className="sr-only">Email for launch updates</label>
                <input id="news" type="email" required placeholder="you@email.com" className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-white/40 focus:outline-none" />
                <button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-coal" aria-label="Get launch updates">
                  <ArrowRight size={18} />
                </button>
              </form>
              <p className="mt-2 min-h-5 text-[12px] text-lime" role="status">{note}</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {COLUMNS.map((c) => (
                <div key={c.title}>
                  <p className="eyebrow text-white/50">{c.title}</p>
                  <ul className="mt-4 space-y-2.5 text-[14px]">
                    {c.links.map(([href, label]) => (
                      <li key={label}>
                        <Link href={href} className="text-white/80 transition hover:text-lime">{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-16 overflow-hidden" aria-hidden>
            <p className="footer-word display flex items-center gap-[2vw] whitespace-nowrap text-[clamp(72px,17vw,250px)] leading-[0.85] text-white">
              <svg viewBox="0 0 30 22" className="h-[0.62em] w-auto shrink-0" fill="none">
                <path d="M9.5 1 L1.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" />
                <path d="M21.5 1 L13.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" />
              </svg>
              Scoped
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-white/50">
            <span>© {new Date().getFullYear()} Scoped. Prepare what matters.</span>
            {FLAGS.SHOW_SOCIALS && (
              // PLACEHOLDER: no real social accounts yet; links are not set.
              <div className="flex gap-4">
                {[Twitter, Linkedin, Github].map((I, i) => (
                  <a key={i} href="#" aria-label="Social link (placeholder)" className="text-white/70 hover:text-lime"><I size={18} /></a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
