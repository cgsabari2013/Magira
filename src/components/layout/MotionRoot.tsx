"use client";

import { MotionConfig } from "framer-motion";

/** Honours the visitor's "reduce motion" OS setting across every animation. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
