"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, TrendingUp, Target, CalendarClock } from "lucide-react";
import { useIntro } from "@/components/layout/Intro";
import { AreaChart, Bars, Ring } from "./Charts";

// Illustrative sample series — not real or projected performance.
const marketValue = [100, 104, 101, 109, 114, 111, 120, 127, 123, 133, 141, 138, 149, 158];
const invested = [100, 103, 106, 109, 112, 115, 118, 121, 124, 127, 130, 133, 136, 139];
const months = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroDashboard() {
  const { done } = useIntro();

  // subtle pointer parallax on desktop
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-4, 4]);
  const rotX = useTransform(sy, [-1, 1], [3, -3]);
  const fx = useTransform(sx, [-1, 1], [-10, 10]);
  const fy = useTransform(sy, [-1, 1], [-8, 8]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const enter = (d: number) => ({
    initial: { opacity: 0, y: 40, scale: 0.96 },
    animate: done ? { opacity: 1, y: 0, scale: 1 } : undefined,
    transition: { delay: d, duration: 1, ease },
  });

  return (
    <div
      className="relative mx-auto w-full max-w-[620px] [perspective:1400px]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {/* glow behind */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute left-[10%] top-[12%] h-[70%] w-[80%] rounded-full bg-brand/30 blur-[90px]" />
        <div className="animate-drift absolute bottom-0 right-0 h-1/2 w-1/2 rounded-full bg-gold/15 blur-[90px] [animation-delay:-6s]" />
      </div>

      <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative [transform-style:preserve-3d]">
        {/* main card */}
        <motion.div {...enter(0.15)} className="glass relative rounded-[28px] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted">Wealth overview</p>
              <p className="mt-1.5 text-[clamp(26px,4vw,34px)] font-semibold tracking-tight text-white">₹18,40,000</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-lime">
                <TrendingUp className="h-3.5 w-3.5" /> Illustrative portfolio value
              </p>
            </div>
          </div>

          <div className="mt-5 h-[150px] sm:h-[170px]">
            <AreaChart series={marketValue} baseline={invested} play={done} delay={0.6} height={170} />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-[#6f7a73]">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted">
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-4 rounded bg-gradient-to-r from-brand to-lime" /> Market value
            </span>
            <span className="flex items-center gap-2">
              <span className="h-0 w-4 border-t border-dashed border-muted" /> Amount invested
            </span>
            <span className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-champagne">
              Sample data
            </span>
          </div>

          {/* allocation */}
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
            {[
              { k: "Equity", v: 60, c: "from-brand to-lime" },
              { k: "Debt", v: 25, c: "from-emerald to-brand" },
              { k: "Hybrid", v: 15, c: "from-gold/70 to-champagne" },
            ].map((a, i) => (
              <div key={a.k}>
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted">{a.k}</span>
                  <span className="text-white">{a.v}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${a.c}`}
                    initial={{ width: 0 }}
                    animate={done ? { width: `${a.v}%` } : undefined}
                    transition={{ delay: 1 + i * 0.12, duration: 1.1, ease }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* floating: goal progress */}
        <motion.div
          {...enter(0.45)}
          style={{ x: fx, y: fy }}
          className="glass absolute -right-3 -top-16 hidden w-[200px] rounded-3xl p-4 sm:block lg:-right-8"
        >
          <div className="animate-float flex items-center gap-3">
            <Ring value={64} size={58} stroke={6} play={done} delay={1.1}>
              <span className="text-xs font-semibold">64%</span>
            </Ring>
            <div>
              <p className="flex items-center gap-1 text-[11px] text-muted">
                <Target className="h-3 w-3" /> Goal progress
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-tight">Child&apos;s education</p>
            </div>
          </div>
        </motion.div>

        {/* floating: SIP */}
        <motion.div
          {...enter(0.6)}
          style={{ x: useTransform(fx, (v) => -v), y: useTransform(fy, (v) => -v) }}
          className="glass absolute -bottom-32 -left-4 hidden w-[210px] rounded-3xl p-4 sm:block lg:-left-12"
        >
          <div className="animate-float [animation-delay:-2s]">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[11px] text-muted">
                <CalendarClock className="h-3.5 w-3.5" /> Monthly SIP
              </p>
              <span className="text-[10px] text-lime">Active</span>
            </div>
            <p className="mt-1 text-lg font-semibold">₹15,000</p>
            <Bars values={[3, 4, 4, 5, 6, 6, 7, 8]} play={done} delay={1.2} className="mt-2 h-10" />
          </div>
        </motion.div>

        {/* floating: protection */}
        <motion.div
          {...enter(0.75)}
          style={{ x: fx, y: useTransform(fy, (v) => -v) }}
          className="glass absolute -bottom-24 right-4 hidden w-[230px] rounded-3xl p-4 md:block"
        >
          <div className="animate-float flex items-center gap-3 [animation-delay:-4s]">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] text-muted">Protection planning</p>
              <p className="text-sm font-semibold">Term + Health cover</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* compact widgets for phones */}
      <motion.div {...enter(0.5)} className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
        <div className="glass flex items-center gap-3 rounded-2xl p-3">
          <Ring value={64} size={46} stroke={5} play={done} delay={1}>
            <span className="text-[10px] font-semibold">64%</span>
          </Ring>
          <div>
            <p className="text-[10px] text-muted">Goal</p>
            <p className="text-xs font-semibold">Education</p>
          </div>
        </div>
        <div className="glass flex items-center gap-3 rounded-2xl p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] text-muted">Protection</p>
            <p className="text-xs font-semibold">Term + Health</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
