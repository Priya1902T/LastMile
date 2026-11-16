"use client";

// Sticky nav: transparent at the top, blurred bar after 40px, lime scroll-progress line, full-screen mobile menu.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS } from "@/content/copy";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef(null);
  const overlay = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Staggered links when the mobile menu opens; lock page scroll while it is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open && overlay.current && !prefersReducedMotion()) {
      gsap.fromTo(
        overlay.current.querySelectorAll("[data-menu-item]"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: "power3.out" },
      );
    }
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? "bg-paper/75 shadow-[0_1px_0_rgba(17,19,18,.06)] backdrop-blur-xl" : ""
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Scoped home" className="logo-link">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-11 text-[14px] font-semibold lg:flex" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="navlink" aria-current={pathname === l.href ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <Link href="/login" className="navlink hidden text-[14px] font-semibold lg:inline">
              Log in
            </Link>
            <Link href="/start" className="pill pill-dark pill-sm hidden sm:inline-flex">
              Get Started <ArrowUpRight size={17} className="nudge" />
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full bg-coal text-white lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className="h-[2px] w-full bg-transparent">
          <div ref={bar} className="h-full origin-left bg-lime" style={{ transform: "scaleX(0)" }} />
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={overlay}
          className="on-dark fixed inset-0 z-40 flex flex-col justify-between bg-night px-6 pb-10 pt-28 text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {[...NAV_LINKS, { href: "/login", label: "Log in" }].map((l) => (
              <Link key={l.href} href={l.href} data-menu-item className="display text-[44px] leading-tight">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/start" data-menu-item className="pill pill-lime w-full">
            Start Your Prep <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </>
  );
}
