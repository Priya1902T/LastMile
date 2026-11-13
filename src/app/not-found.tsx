import Link from "next/link";

export default function NotFound() {
  return (
    <section className="fade-in">
      <p className="font-serif text-[28px] leading-none">Scoped</p>
      <div className="glass mt-6 rounded-3xl p-6">
        <h1 className="font-serif text-[34px] leading-[1.1]">This plan doesn’t exist</h1>
        <p className="mt-3 text-[15px] text-sub">It may have been deleted, or the link is wrong.</p>
        <Link href="/" className="mt-6 inline-block text-[14px] font-medium text-vio">Start a new plan →</Link>
      </div>
    </section>
  );
}
