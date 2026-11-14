import Link from "next/link";
import { Logo } from "./Logo";

/** Narrow, phone-first container for the app screens (intake, plan). */
export default function AppShell({ children }) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-[520px] items-center justify-between px-5 pt-6">
        <Link href="/" aria-label="Scoped home">
          <Logo />
        </Link>
      </header>
      <main className="relative mx-auto w-full max-w-[520px] px-5 pb-32 pt-6">{children}</main>
    </div>
  );
}
