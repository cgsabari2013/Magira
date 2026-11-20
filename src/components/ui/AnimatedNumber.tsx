"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Tweens a number smoothly whenever `value` changes. Writes to the DOM directly (no re-renders). */
export function AnimatedNumber({
  value,
  format,
  className,
  duration = 0.7,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = format(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, format, duration, reduce]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {format(value)}
    </span>
  );
}
