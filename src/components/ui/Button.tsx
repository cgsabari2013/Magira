"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

type Variant = "primary" | "glass" | "gold" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-[box-shadow,background-color,color,border-color] duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(135deg,#83db45_-20%,#0c9b65_45%,#006b50_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-8px_rgba(12,155,101,0.65)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_16px_44px_-8px_rgba(12,155,101,0.9)]",
  gold:
    "text-[#1a1305] bg-[linear-gradient(135deg,#f3dfae,#d9a83e_60%,#b98a2a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_30px_-10px_rgba(217,168,62,0.7)]",
  glass:
    "text-white bg-white/[0.06] border border-white/12 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/[0.1] hover:border-white/20",
  ghost: "text-white/80 hover:text-white",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

/** iOS-style tactile pill button with an optional magnetic hover. */
export function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  className = "",
  magnetic = true,
  type = "button",
  disabled,
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  // width utilities also apply to the motion wrapper so w-full works
  const widthCls = className
    .split(" ")
    .filter((c) => /^(sm:|md:|lg:)?w-/.test(c))
    .join(" ");
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {(variant === "primary" || variant === "gold") && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-hover/btn:animate-[shimmer_1.1s_ease]"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group/btn inline-flex ${widthCls}`}
    >
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
            {inner}
          </a>
        ) : (
          <Link href={href} className={cls} aria-label={ariaLabel}>
            {inner}
          </Link>
        )
      ) : (
        <button type={type} className={cls} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
