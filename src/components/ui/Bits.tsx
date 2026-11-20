import { Info } from "lucide-react";
import { Reveal, WordReveal } from "./Motion";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const a = align === "center" ? "mx-auto text-center items-center" : "items-start text-left";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${a} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_#83db45]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2 className="text-balance text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
        <WordReveal text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className="max-w-2xl text-pretty text-[17px] leading-relaxed text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Disclaimer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-2xl border border-gold/20 bg-gold/[0.05] p-4 text-sm leading-relaxed text-[#d8cfb9] ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden />
      <p>{children}</p>
    </div>
  );
}

export function SampleTag({ children = "Illustrative sample data" }: { children?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

export function IconBadge({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "gold" }) {
  const t =
    tone === "gold"
      ? "from-gold/25 to-gold/5 text-champagne border-gold/25 shadow-[0_8px_30px_-10px_rgba(217,168,62,0.6)]"
      : "from-brand/30 to-emerald/5 text-lime border-lime/20 shadow-[0_8px_30px_-10px_rgba(12,155,101,0.7)]";
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br ${t} transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
    >
      {children}
    </span>
  );
}
