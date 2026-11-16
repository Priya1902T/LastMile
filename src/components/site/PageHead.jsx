// Simple header for the inner pages, in the same visual language as the hero.
import Sparkles from "@/components/ui/Sparkles";

export default function PageHead({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden pt-[140px]">
      <div className="halftone-lime pointer-events-none absolute -right-24 top-16 h-[320px] w-[320px] rotate-[24deg] rounded-[55%_14%_52%_12%] opacity-90" aria-hidden />
      <div className="pointer-events-none absolute right-[22%] top-[260px] hidden h-24 w-24 rounded-full bg-orange md:block" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-5 pb-10 sm:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-5 max-w-[860px] text-[clamp(42px,6vw,76px)] leading-[0.98]">{title}</h1>
        {children && <div className="lede mt-6 max-w-[560px]">{children}</div>}
        <Sparkles className="mt-6" width={52} />
      </div>
    </section>
  );
}
