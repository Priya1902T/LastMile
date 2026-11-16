// Curved section edge. Place it at the top or bottom of a section; `fill` is the colour of the section it belongs to.
export default function Wave({ fill = "#181A19", flip = false, className = "", variant = 0 }) {
  const paths = [
    "M0 60 C 240 0 480 0 720 26 C 960 52 1200 56 1440 18 L1440 60 Z",
    "M0 60 C 300 20 520 46 760 30 C 1000 14 1220 0 1440 30 L1440 60 Z",
  ];
  return (
    <svg
      className={`wave ${className}`}
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d={paths[variant % paths.length]} fill={fill} />
    </svg>
  );
}
