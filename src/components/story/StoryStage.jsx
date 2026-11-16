// The single SVG canvas every scene draws into. Shared actors (cloud, chips, avatar, clock) live here once
// and are re-animated scene to scene, so motion stays continuous.
import { Avatar, Chips, Clock, Cloud } from "./scenes/Scene1";
import { Layer as Form } from "./scenes/Scene2";
import { Layer as Triage } from "./scenes/Scene3";
import { Layer as Rows } from "./scenes/Scene4";
import { Layer as Plan } from "./scenes/Scene5";
import { Layer as Walkin } from "./scenes/Scene6";
import { VB } from "./data";

export default function StoryStage({ idPrefix = "" }) {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="story-svg h-full w-full"
      role="img"
      aria-label="Illustration: a candidate's topics are sorted into a scope map and a time-boxed plan."
      data-prefix={idPrefix}
    >
      <defs>
        <filter id="st-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity=".13" />
        </filter>
        <filter id="st-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <Walkin />
      <Clock />
      <Triage />
      <Form />
      <Plan />
      <g id="st-scope">
        <Cloud />
        <Rows />
        <Chips />
      </g>
      <Avatar />
    </svg>
  );
}
