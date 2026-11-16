// The three hand-drawn black sparkle strokes from the reference.
export default function Sparkles({ className = "", color = "#111312", width = 70 }) {
  return (
    <svg className={className} width={width} height={width * 0.8} viewBox="0 0 70 56" fill="none" aria-hidden>
      <path className="spark" d="M6 34 L28 44" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      <path className="spark" d="M22 4 L33 30" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      <path className="spark" d="M58 2 L46 27" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
