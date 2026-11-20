"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/** Builds a smooth SVG path (Catmull-Rom → Bézier) through points. */
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/**
 * Animated area chart. Pure SVG; scales to its container.
 * `play` lets a parent delay the draw (e.g. until the intro is gone).
 */
export function AreaChart({
  series,
  baseline,
  play = true,
  height = 160,
  delay = 0,
}: {
  series: number[];
  baseline?: number[];
  play?: boolean;
  height?: number;
  delay?: number;
}) {
  const id = useId().replace(/:/g, "");
  const W = 400;
  const H = height;
  const all = [...series, ...(baseline ?? [])];
  const max = Math.max(...all) * 1.08;
  const min = Math.min(0, ...all);
  const toPts = (arr: number[]) =>
    arr.map((v, i) => [(i / (arr.length - 1)) * W, H - ((v - min) / (max - min)) * (H - 8) - 4] as [number, number]);
  const pts = toPts(series);
  const line = smoothPath(pts);
  const area = `${line} L${W},${H} L0,${H} Z`;
  const base = baseline ? smoothPath(toPts(baseline)) : null;
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`a${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c9b65" stopOpacity="0.45" />
          <stop offset="1" stopColor="#0c9b65" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0c9b65" />
          <stop offset="0.7" stopColor="#83db45" />
          <stop offset="1" stopColor="#d9a83e" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="white" strokeOpacity="0.05" vectorEffect="non-scaling-stroke" />
      ))}
      <motion.path
        d={area}
        fill={`url(#a${id})`}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={{ delay: delay + 0.6, duration: 1 }}
      />
      {base && (
        <motion.path
          d={base}
          fill="none"
          stroke="#a7b0aa"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ delay, duration: 1.6, ease: "easeInOut" }}
        />
      )}
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#l${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1 } : undefined}
        transition={{ delay, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r="4"
        fill="#d9a83e"
        initial={{ scale: 0, opacity: 0 }}
        animate={play ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: delay + 1.7, type: "spring" }}
        style={{ transformOrigin: `${last[0]}px ${last[1]}px` }}
      />
    </svg>
  );
}

/** Circular progress ring. */
export function Ring({
  value,
  size = 84,
  stroke = 8,
  play = true,
  delay = 0,
  gold = false,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  play?: boolean;
  delay?: number;
  gold?: boolean;
  children?: React.ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`r${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={gold ? "#f3dfae" : "#83db45"} />
            <stop offset="1" stopColor={gold ? "#d9a83e" : "#0c9b65"} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#r${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={play ? { strokeDashoffset: c * (1 - value / 100) } : undefined}
          transition={{ delay, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/** Simple animated column bars (HTML, percentage heights). */
export function Bars({
  values,
  play = true,
  delay = 0,
  className = "h-16",
  highlightLast = true,
}: {
  values: number[];
  play?: boolean;
  delay?: number;
  className?: string;
  highlightLast?: boolean;
}) {
  const max = Math.max(...values);
  return (
    <div className={`flex items-end gap-1.5 ${className}`} aria-hidden>
      {values.map((v, i) => (
        <motion.span
          key={i}
          className={`flex-1 rounded-t-md ${
            highlightLast && i === values.length - 1
              ? "bg-gradient-to-t from-gold/60 to-champagne"
              : "bg-gradient-to-t from-brand/40 to-lime/80"
          }`}
          initial={{ height: "6%" }}
          animate={play ? { height: `${(v / max) * 100}%` } : undefined}
          transition={{ delay: delay + i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
