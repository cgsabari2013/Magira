"use client";

import { useEffect, useId, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatINR } from "@/lib/finance";

/** Slider and number input kept in sync. Out-of-range typing is clamped on blur. */
export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  display,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  display?: string;
}) {
  const id = useId();
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  const fill = ((value - min) / (max - min)) * 100;

  const commit = (raw: string) => {
    const n = Number(raw.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(n) || raw.trim() === "") {
      setText(String(value));
      return;
    }
    const clamped = Math.min(max, Math.max(min, n));
    onChange(clamped);
    setText(String(clamped));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={`${id}-n`} className="text-[15px] text-muted">
          {label}
        </label>
        <div className="flex h-11 items-center rounded-xl border border-white/10 bg-white/[0.04] px-3 focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(12,155,101,0.18)]">
          {prefix && <span className="text-sm text-muted">{prefix}</span>}
          <input
            id={`${id}-n`}
            inputMode="decimal"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              const n = Number(e.target.value);
              if (Number.isFinite(n) && n >= min && n <= max) onChange(n);
            }}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commit((e.target as HTMLInputElement).value)}
            className="w-[7.5rem] bg-transparent text-right text-[16px] font-semibold text-white outline-none sm:w-[8.5rem]"
            aria-describedby={`${id}-r`}
          />
          {suffix && <span className="ml-1 text-sm text-muted">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3"
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
        aria-valuetext={display}
      />
      <div id={`${id}-r`} className="mt-1 flex justify-between text-[12px] text-[#6f7a73]">
        <span>
          {prefix}
          {min.toLocaleString("en-IN")}
          {suffix ? ` ${suffix}` : ""}
        </span>
        {display && <span className="text-muted">{display}</span>}
        <span>
          {prefix}
          {max.toLocaleString("en-IN")}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
    </div>
  );
}

export function Donut({
  data,
  center,
}: {
  data: { name: string; value: number; color: string }[];
  center?: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="68%"
            outerRadius="100%"
            paddingAngle={2}
            cornerRadius={8}
            stroke="none"
            startAngle={90}
            endAngle={-270}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => formatINR(Number(v))}
            contentStyle={{
              background: "#111614",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              color: "#fff",
              fontSize: 13,
            }}
            itemStyle={{ color: "#fff" }}
          />
        </PieChart>
      </ResponsiveContainer>
      {center && <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">{center}</div>}
    </div>
  );
}

export function Legend({ items }: { items: { label: string; value: string; color: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.label} className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0">
          <span className="flex items-center gap-2.5 text-[15px] text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: i.color }} />
            {i.label}
          </span>
          <span className="whitespace-nowrap text-[15px] font-semibold tabular-nums">{i.value}</span>
        </li>
      ))}
    </ul>
  );
}
