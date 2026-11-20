"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Sprout, Repeat, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/Bits";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Motion";
import { formatINR, formatINRCompact, sipFutureValue } from "@/lib/finance";

const ASSUMED_RATE = 12; // illustrative only
const milestones = [5, 10, 15, 20, 25];

export function GrowthSection() {
  const [monthly, setMonthly] = useState(5000);
  const ref = useRef<HTMLDivElement>(null);
  const play = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const data = useMemo(() => milestones.map((y) => ({ y, ...sipFutureValue(monthly, ASSUMED_RATE, y) })), [monthly]);
  const max = data[data.length - 1].futureValue;
  const final = data[data.length - 1];
  const fill = ((monthly - 1000) / (50000 - 1000)) * 100;

  return (
    <section className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-[-15%] top-1/4 h-[34rem] w-[34rem] rounded-full bg-brand/15 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="The power of consistency"
          title="Small Steps Today. Bigger Financial Goals Tomorrow."
          intro="Regular investing, given time, can compound into meaningful goals. Move the slider to see an illustration."
        />

        <div ref={ref} className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* steps */}
          <div className="grid gap-4">
            {[
              { icon: Sprout, t: "Start small", d: "Begin with an amount that feels comfortable today." },
              { icon: Repeat, t: "Stay consistent", d: "Invest every month and step it up as your income grows." },
              { icon: Target, t: "Stay goal-focused", d: "Link each investment to a goal and review it regularly." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.1}>
                <div className="panel flex gap-4 rounded-3xl p-5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand/15 text-lime">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{s.t}</p>
                    <p className="mt-1 text-[15px] text-muted">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Button href="/calculators/#sip" variant="glass" className="mt-2">
                Try the full SIP calculator <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>

          {/* interactive chart */}
          <Reveal delay={0.1}>
            <div className="glass rounded-[28px] p-5 sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <label htmlFor="growth-sip" className="text-sm text-muted">
                    Monthly investment
                  </label>
                  <p className="mt-1 text-3xl font-semibold tracking-tight">
                    <AnimatedNumber value={monthly} format={formatINR} />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted">Illustrative value in 25 years</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-gold">
                    <AnimatedNumber value={final.futureValue} format={formatINRCompact} />
                  </p>
                </div>
              </div>
              <input
                id="growth-sip"
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="range mt-5"
                style={{ ["--fill" as string]: `${fill}%` }}
                aria-valuetext={formatINR(monthly)}
              />

              <div className="mt-8 grid h-[220px] grid-cols-5 items-end gap-3 sm:gap-5">
                {data.map((d, i) => {
                  const total = (d.futureValue / max) * 100;
                  const inv = (d.invested / d.futureValue) * 100;
                  return (
                    <div key={d.y} className="flex h-full flex-col items-center justify-end gap-2">
                      <span className="text-[11px] font-medium text-white/80">{formatINRCompact(d.futureValue)}</span>
                      <motion.div
                        className="relative w-full max-w-[64px] overflow-hidden rounded-t-xl bg-gradient-to-t from-brand/50 to-lime/90"
                        initial={{ height: "4%" }}
                        animate={play ? { height: `${Math.max(total, 4)}%` } : undefined}
                        transition={{ delay: i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.div
                          className="absolute inset-x-0 bottom-0 bg-white/20"
                          animate={{ height: `${inv}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.div>
                      <span className="text-xs text-muted">{d.y} yrs</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-white/30" /> Amount invested
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-lime" /> Illustrative growth
                </span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#7d8781]">
                Assumes {ASSUMED_RATE}% annual return compounded monthly, purely for illustration. Mutual fund returns are
                market-linked and not guaranteed; actual outcomes may be higher or lower.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
