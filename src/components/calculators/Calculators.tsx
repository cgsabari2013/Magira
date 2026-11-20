"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RotateCcw, TrendingUp, Coins, Landmark, ArrowRight } from "lucide-react";
import { SliderField, Donut, Legend } from "./parts";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { emi, formatINR, formatINRWords, lumpsumFutureValue, sipFutureValue } from "@/lib/finance";

const C = { invested: "#0c9b65", returns: "#d9a83e", principal: "#0c9b65", interest: "#d9a83e" };

type Tab = "sip" | "lumpsum" | "emi";
const tabs: { id: Tab; label: string; icon: typeof TrendingUp }[] = [
  { id: "sip", label: "SIP", icon: TrendingUp },
  { id: "lumpsum", label: "Lump Sum", icon: Coins },
  { id: "emi", label: "Loan EMI", icon: Landmark },
];

export function Calculators() {
  const [tab, setTab] = useState<Tab>("sip");

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "") as Tab;
      if (tabs.some((t) => t.id === h)) setTab(h);
    };
    read();
    // Next.js <Link> updates the hash via pushState (no hashchange), so also
    // re-read after in-app clicks on calculator links.
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.('a[href*="/calculators/#"]')) setTimeout(read, 50);
    };
    window.addEventListener("hashchange", read);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", read);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const select = (t: Tab) => {
    setTab(t);
    history.replaceState(null, "", `#${t}`);
  };

  return (
    <div>
      <div role="tablist" aria-label="Calculators" className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active}
              aria-controls={`panel-${t.id}`}
              onClick={() => select(t.id)}
              className={`relative flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-4 text-[15px] font-medium transition-colors sm:px-6 ${
                active ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="calc-tab"
                  className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(131,219,69,0.25),rgba(12,155,101,0.35))] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <t.icon className="relative h-4 w-4" />
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "sip" && <SipCalc />}
            {tab === "lumpsum" && <LumpsumCalc />}
            {tab === "emi" && <EmiCalc />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Shell({
  title,
  intro,
  inputs,
  onReset,
  result,
  assumptions,
}: {
  title: string;
  intro: string;
  inputs: React.ReactNode;
  onReset: () => void;
  result: React.ReactNode;
  assumptions: string;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="panel rounded-[28px] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-1.5 text-[15px] text-muted">{intro}</p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="flex h-11 flex-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-muted transition hover:text-white active:scale-95"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
        <div className="mt-8 space-y-8">{inputs}</div>
        <p className="mt-8 rounded-2xl bg-white/[0.03] p-4 text-[13px] leading-relaxed text-[#8b958f]">{assumptions}</p>
      </div>
      <div className="glass relative overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/25 blur-[80px]" />
        <div className="relative">{result}</div>
      </div>
    </div>
  );
}

function Headline({ label, value, words }: { label: string; value: number; words?: boolean }) {
  const fmtWords = useCallback((n: number) => formatINRWords(n), []);
  return (
    <div>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-[clamp(32px,5vw,44px)] font-semibold tracking-tight">
        <AnimatedNumber value={value} format={formatINR} />
      </p>
      {words && (
        <p className="text-sm text-gold">
          ≈ <AnimatedNumber value={value} format={fmtWords} />
        </p>
      )}
    </div>
  );
}

/* ───────── SIP ───────── */
const SIP_DEFAULT = { monthly: 10000, rate: 12, years: 10 };
function SipCalc() {
  const [s, set] = useState(SIP_DEFAULT);
  const r = useMemo(() => sipFutureValue(s.monthly, s.rate, s.years), [s]);
  return (
    <Shell
      title="SIP Calculator"
      intro="Estimate how a monthly SIP could grow over time."
      onReset={() => set(SIP_DEFAULT)}
      assumptions="Assumes a constant annual return compounded monthly, with each instalment invested at the start of the month: FV = P × [((1 + r)ⁿ − 1) / r] × (1 + r). Real returns vary from year to year and are not guaranteed."
      inputs={
        <>
          <SliderField label="Monthly investment" prefix="₹" value={s.monthly} min={500} max={200000} step={500} onChange={(v) => set({ ...s, monthly: v })} display={formatINRWords(s.monthly)} />
          <SliderField label="Expected annual return" suffix="%" value={s.rate} min={1} max={30} step={0.5} onChange={(v) => set({ ...s, rate: v })} />
          <SliderField label="Investment period" suffix="yrs" value={s.years} min={1} max={40} step={1} onChange={(v) => set({ ...s, years: v })} />
        </>
      }
      result={
        <>
          <Headline label="Estimated future value" value={r.futureValue} words />
          <div className="my-8">
            <Donut
              data={[
                { name: "Total investment", value: r.invested, color: C.invested },
                { name: "Estimated returns", value: Math.max(0, r.returns), color: C.returns },
              ]}
              center={
                <>
                  <span className="text-xs text-muted">Returns share</span>
                  <span className="text-xl font-semibold">{Math.round((Math.max(0, r.returns) / r.futureValue) * 100)}%</span>
                </>
              }
            />
          </div>
          <Legend
            items={[
              { label: "Total investment", value: formatINR(r.invested), color: C.invested },
              { label: "Estimated returns", value: formatINR(r.returns), color: C.returns },
              { label: "Estimated future value", value: formatINR(r.futureValue), color: "#fff" },
            ]}
          />
          <div className="mt-7">
            <Button href="/book/" className="w-full sm:w-auto">
              Discuss Your Investment Goals <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      }
    />
  );
}

/* ───────── Lump sum ───────── */
const LS_DEFAULT = { amount: 500000, rate: 12, years: 10 };
function LumpsumCalc() {
  const [s, set] = useState(LS_DEFAULT);
  const r = useMemo(() => lumpsumFutureValue(s.amount, s.rate, s.years), [s]);
  return (
    <Shell
      title="Lump Sum Calculator"
      intro="Estimate how a one-time investment could grow."
      onReset={() => set(LS_DEFAULT)}
      assumptions="Assumes a constant annual return compounded yearly: FV = P × (1 + r)ⁿ. Real returns vary and are not guaranteed."
      inputs={
        <>
          <SliderField label="Initial investment" prefix="₹" value={s.amount} min={5000} max={50000000} step={5000} onChange={(v) => set({ ...s, amount: v })} display={formatINRWords(s.amount)} />
          <SliderField label="Expected annual return" suffix="%" value={s.rate} min={1} max={30} step={0.5} onChange={(v) => set({ ...s, rate: v })} />
          <SliderField label="Investment period" suffix="yrs" value={s.years} min={1} max={40} step={1} onChange={(v) => set({ ...s, years: v })} />
        </>
      }
      result={
        <>
          <Headline label="Estimated future value" value={r.futureValue} words />
          <div className="my-8">
            <Donut
              data={[
                { name: "Initial investment", value: r.invested, color: C.invested },
                { name: "Estimated returns", value: Math.max(0, r.returns), color: C.returns },
              ]}
              center={
                <>
                  <span className="text-xs text-muted">Growth</span>
                  <span className="text-xl font-semibold">{(r.futureValue / r.invested).toFixed(2)}×</span>
                </>
              }
            />
          </div>
          <Legend
            items={[
              { label: "Initial investment", value: formatINR(r.invested), color: C.invested },
              { label: "Estimated returns", value: formatINR(r.returns), color: C.returns },
              { label: "Estimated future value", value: formatINR(r.futureValue), color: "#fff" },
            ]}
          />
        </>
      }
    />
  );
}

/* ───────── EMI ───────── */
const EMI_DEFAULT = { amount: 2500000, rate: 8.75, tenure: 20, unit: "years" as "years" | "months" };
function EmiCalc() {
  const [s, set] = useState(EMI_DEFAULT);
  const months = s.unit === "years" ? s.tenure * 12 : s.tenure;
  const r = useMemo(() => emi(s.amount, s.rate, months), [s.amount, s.rate, months]);

  const switchUnit = (unit: "years" | "months") => {
    if (unit === s.unit) return;
    const tenure = unit === "months" ? s.tenure * 12 : Math.max(1, Math.round(s.tenure / 12));
    set({ ...s, unit, tenure });
  };

  return (
    <Shell
      title="Loan EMI Calculator"
      intro="Plan a monthly instalment that fits your budget."
      onReset={() => set(EMI_DEFAULT)}
      assumptions="Uses the standard reducing-balance formula: EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1), with a fixed rate for the full tenure. Excludes processing fees, insurance and other charges. Actual rates and eligibility are set by the lender."
      inputs={
        <>
          <SliderField label="Loan amount" prefix="₹" value={s.amount} min={50000} max={50000000} step={10000} onChange={(v) => set({ ...s, amount: v })} display={formatINRWords(s.amount)} />
          <SliderField label="Annual interest rate" suffix="%" value={s.rate} min={1} max={30} step={0.05} onChange={(v) => set({ ...s, rate: v })} />
          <div>
            <div className="mb-3 flex justify-end">
              <div role="radiogroup" aria-label="Tenure unit" className="flex rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm">
                {(["years", "months"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    role="radio"
                    aria-checked={s.unit === u}
                    onClick={() => switchUnit(u)}
                    className={`min-h-[36px] rounded-full px-4 capitalize transition ${s.unit === u ? "bg-white/10 text-white" : "text-muted"}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            {s.unit === "years" ? (
              <SliderField label="Loan tenure" suffix="yrs" value={s.tenure} min={1} max={30} step={1} onChange={(v) => set({ ...s, tenure: v })} />
            ) : (
              <SliderField label="Loan tenure" suffix="months" value={s.tenure} min={6} max={360} step={1} onChange={(v) => set({ ...s, tenure: v })} />
            )}
          </div>
        </>
      }
      result={
        <>
          <Headline label="Monthly EMI" value={r.emi} />
          <div className="my-8">
            <Donut
              data={[
                { name: "Principal", value: s.amount, color: C.principal },
                { name: "Total interest", value: Math.max(0, r.totalInterest), color: C.interest },
              ]}
              center={
                <>
                  <span className="text-xs text-muted">Interest share</span>
                  <span className="text-xl font-semibold">{Math.round((Math.max(0, r.totalInterest) / r.totalPayment) * 100)}%</span>
                </>
              }
            />
          </div>
          <Legend
            items={[
              { label: "Principal amount", value: formatINR(s.amount), color: C.principal },
              { label: "Total interest payable", value: formatINR(r.totalInterest), color: C.interest },
              { label: "Total repayment", value: formatINR(r.totalPayment), color: "#fff" },
            ]}
          />
          <div className="mt-7">
            <Button href="/book/" className="w-full sm:w-auto">
              Discuss Your Loan Requirements <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      }
    />
  );
}
