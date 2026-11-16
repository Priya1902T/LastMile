import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Log in · Scoped" };

export default function LoginPage() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-5 pt-[120px]">
      <div className="card relative w-full max-w-[440px] p-8">
        <span className="display absolute -top-4 right-6 rotate-[-6deg] rounded-[12px] bg-lime px-3 py-1.5 text-[13px]">Coming soon</span>
        <h1 className="display text-[34px] leading-tight">Accounts are on the way.</h1>
        <p className="mt-3 text-[15px] text-muted">
          You don’t need an account today. Start a plan and keep its private link; you can delete it any time from the plan page.
        </p>
        <Link href="/start" className="pill pill-dark mt-7 w-full">
          Start without an account <ArrowUpRight size={18} className="nudge" />
        </Link>
      </div>
    </section>
  );
}
