// Geometry shared by the story scenes. The stage SVG is 800 × 600.
import { STORY_CHIPS } from "@/content/copy";

export const VB = { w: 800, h: 600 };
export const INK = "#111312";
export const LIME = "#D7FF1E";
export const ORANGE = "#FF7A1F";
export const PAPER = "#F7F3EE";
export const NIGHT = "#181A19";

// Scene 1: chips float around the candidate. [x, y, rotation]
export const CLOUD_POS = [
  [205, 150, -8], [365, 128, 6], [548, 146, -4], [652, 236, 9],
  [168, 262, 7], [628, 330, -9], [222, 360, -6], [600, 428, 5],
  [300, 222, 4], [500, 226, -7], [172, 452, 9], [668, 516, -5],
];

// Scene 4: the Scope Map card the cloud turns into.
export const CARD = { x: 110, y: 64, w: 580, h: 472, r: 32 };
export const ROWS = [
  { y: 128, label: "Must Know", fill: "#E6F8B8" },
  { y: 262, label: "Likely Probed", fill: "#FFE3D1" },
  { y: 396, label: "Safe to Skip", fill: "#E8E6E3" },
];
export const ROW_H = 120;

/** Where each chip lands inside its bucket row. */
export function bucketPos(chips = STORY_CHIPS) {
  const seen = [0, 0, 0];
  return chips.map((c) => {
    const k = seen[c.b]++;
    return [198 + k * 101, ROWS[c.b].y + 80];
  });
}

export const CHIPS = STORY_CHIPS;

export const CLOUD_PATH =
  "M160 262 C118 160 262 88 364 118 C432 56 604 70 644 160 C724 190 726 336 652 384 C664 474 522 522 432 482 C342 544 188 506 178 424 C98 404 100 304 160 262 Z";

export function roundRectPath({ x, y, w, h, r }) {
  return `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}

export const FORM_FIELDS = [
  ["Role", "Frontend Developer"],
  ["Company", "Acme"],
  ["Round", "Technical"],
  ["Time left", "8 hours"],
  ["Biggest worry", "Freezing"],
];

// Scene 5 plan: hours per block and ring colours.
export const PLAN = [
  { h: 2.0, label: "Core topics", color: LIME },
  { h: 1.5, label: "Likely probed", color: ORANGE },
  { h: 1.0, label: "Resume & project Qs", color: INK },
  { h: 0.5, label: "Gap skills", color: "#FFC7A3" },
  { h: 1.0, label: "Revision + mock", color: "#B8D63A" },
];

/** SVG arc path on a circle, angles in degrees (0 = 12 o'clock, clockwise). */
export function arcPath(cx, cy, r, a0, a1) {
  const p = (a) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}
