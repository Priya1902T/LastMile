// "// Scoped" wordmark. The two slashes are separate paths so they can be drawn in or twinkled.
export default function Logo({ dark = false, size = 26, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} style={{ fontSize: size }}>
      <svg className="logo-mark" width={size * 1.15} height={size * 0.85} viewBox="0 0 30 22" aria-hidden>
        <path className="slash" d="M9.5 1 L1.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path className="slash" d="M21.5 1 L13.5 21" stroke="#D7FF1E" strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
      <span className={`display leading-none ${dark ? "text-white" : "text-coal"}`} style={{ letterSpacing: "-0.05em" }}>
        Scoped
      </span>
    </span>
  );
}
