"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HeartPulse, Users, ShieldCheck, Home, Briefcase, Wallet, PiggyBank } from "lucide-react";
import { AreaChart, Bars, Ring } from "./Charts";
import { SampleTag } from "@/components/ui/Bits";
import { emi, formatINR } from "@/lib/finance";

function useOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return [ref, inView] as const;
}

const ease = [0.22, 1, 0.36, 1] as const;

/* ───────── Mutual funds: portfolio dashboard ───────── */
export function PortfolioVisual() {
  const [ref, play] = useOnce();
  const series = [40, 46, 44, 52, 58, 55, 64, 72, 69, 80, 88, 95];
  const invested = [40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84];
  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute inset-0 -z-10 rounded-full bg-brand/25 blur-[90px]" />
      <div className="glass rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold">Goal-based portfolio</p>
          <SampleTag />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { k: "Retirement", v: 48 },
            { k: "Home", v: 71 },
            { k: "Education", v: 36 },
          ].map((g, i) => (
            <div key={g.k} className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
              <Ring value={g.v} size={64} stroke={6} play={play} delay={0.2 + i * 0.15} gold={i === 1}>
                <span className="text-xs font-semibold">{g.v}%</span>
              </Ring>
              <span className="text-[11px] text-muted">{g.k}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 h-[130px]">
          <AreaChart series={series} baseline={invested} play={play} delay={0.3} height={130} />
        </div>
        <p className="mt-3 text-[11px] text-[#6f7a73]">Illustration only — not actual or projected scheme performance.</p>
      </div>
    </div>
  );
}

/* ───────── Insurance: family under a glowing shield ───────── */
export function ShieldVisual() {
  const [ref, play] = useOnce();
  const items = [
    { icon: HeartPulse, label: "Health" },
    { icon: Users, label: "Family" },
    { icon: Home, label: "Home" },
  ];
  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-gold/15 blur-[80px]" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full border border-white/[0.07]"
          style={{ inset: `${8 + i * 12}%` }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.1 * i, duration: 1, ease }}
        />
      ))}
      <svg viewBox="0 0 200 220" className="absolute left-1/2 top-1/2 w-[48%] -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <defs>
          <linearGradient id="sh-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c9b65" stopOpacity="0.55" />
            <stop offset="1" stopColor="#003f35" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="sh-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f3dfae" />
            <stop offset="1" stopColor="#d9a83e" />
          </linearGradient>
          <filter id="sh-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path d="M100 10 L180 40 V105 C180 160 145 195 100 210 C55 195 20 160 20 105 V40 Z" fill="#d9a83e" opacity="0.35" filter="url(#sh-glow)" />
        <path d="M100 10 L180 40 V105 C180 160 145 195 100 210 C55 195 20 160 20 105 V40 Z" fill="url(#sh-fill)" />
        <motion.path
          d="M100 10 L180 40 V105 C180 160 145 195 100 210 C55 195 20 160 20 105 V40 Z"
          fill="none"
          stroke="url(#sh-stroke)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        {/* family figures */}
        <g fill="#e9f7ee">
          <circle cx="78" cy="88" r="13" />
          <path d="M56 140 C56 116 100 116 100 140 V150 H56 Z" />
          <circle cx="122" cy="88" r="13" />
          <path d="M100 140 C100 116 144 116 144 140 V150 H100 Z" />
          <circle cx="100" cy="122" r="9" fill="#83db45" />
          <path d="M85 160 C85 142 115 142 115 160 V166 H85 Z" fill="#83db45" />
        </g>
      </svg>
      {items.map((it, i) => {
        const pos = ["left-[2%] top-[22%]", "right-[0%] top-[36%]", "left-[12%] bottom-[8%]"][i];
        return (
          <motion.div
            key={it.label}
            className={`glass absolute flex items-center gap-2 rounded-2xl px-3 py-2 ${pos}`}
            initial={{ opacity: 0, y: 16 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease }}
          >
            <it.icon className="h-4 w-4 text-lime" />
            <span className="text-xs font-medium">{it.label}</span>
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ───────── Loans: EMI overview dashboard ───────── */
export function LoanVisual() {
  const [ref, play] = useOnce();
  const principal = 2500000;
  const rate = 8.75;
  const months = 240;
  const r = emi(principal, rate, months);
  const pPct = (principal / r.totalPayment) * 100;
  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute inset-0 -z-10 rounded-full bg-emerald/30 blur-[90px]" />
      <div className="glass rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold">Loan overview</p>
          <SampleTag>Sample calculation</SampleTag>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[11px] text-muted">Monthly EMI</p>
            <p className="mt-1 text-xl font-semibold">{formatINR(r.emi)}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[11px] text-muted">Loan amount</p>
            <p className="mt-1 text-xl font-semibold">₹25 Lakh</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-[11px] text-muted">
            <span>Principal {Math.round(pPct)}%</span>
            <span>Interest {100 - Math.round(pPct)}%</span>
          </div>
          <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full bg-gradient-to-r from-brand to-lime"
              initial={{ width: 0 }}
              animate={play ? { width: `${pPct}%` } : undefined}
              transition={{ duration: 1.2, ease }}
            />
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-champagne"
              initial={{ width: 0 }}
              animate={play ? { width: `${100 - pPct}%` } : undefined}
              transition={{ delay: 0.3, duration: 1.2, ease }}
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Wallet, k: "Personal" },
            { icon: Home, k: "Home" },
            { icon: Briefcase, k: "Business" },
          ].map((t) => (
            <div key={t.k} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-3">
              <t.icon className="mx-auto h-4 w-4 text-lime" />
              <p className="mt-1.5 text-[11px] text-muted">{t.k}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-[#6f7a73]">
          Example: ₹25 Lakh at {rate}% p.a. for 20 years. Actual rates are set by the lender.
        </p>
      </div>
    </div>
  );
}

/* ───────── Small saving-habit illustration ───────── */
export function SavingsMini() {
  const [ref, play] = useOnce();
  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-lime">
        <PiggyBank className="h-6 w-6" />
      </span>
      <Bars values={[2, 3, 3, 4, 5, 5, 6, 7, 8, 9]} play={play} className="h-12 flex-1" />
    </div>
  );
}
