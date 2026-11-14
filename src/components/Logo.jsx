export function Logo({ dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[24px] font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"}`}
    >
      <svg width="30" height="20" viewBox="0 0 30 20" aria-hidden>
        <path d="M8 0h7L7 20H0z" fill="#D4F53C" />
        <path d="M21 0h7l-8 20h-7z" fill="#D4F53C" />
      </svg>
      Scoped
    </span>
  );
}
