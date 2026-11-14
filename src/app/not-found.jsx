import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function NotFound() {
  return (
    <AppShell>
      <section className="fade-in">
        <div className="glass rounded-3xl p-6">
          <h1 className="font-display text-[32px] font-extrabold leading-[1.1]">This plan doesn’t exist</h1>
          <p className="mt-3 text-[15px] text-sub">It may have been deleted, or the link is wrong.</p>
          <Link href="/start" className="mt-6 inline-block text-[14px] font-medium text-vio">
            Start a new plan →
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
