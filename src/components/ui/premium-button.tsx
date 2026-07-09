"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type CommonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  className?: string;
  children: React.ReactNode;
  icon?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
  > & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
  > & { href: string };

const MotionLink = motion.create(Link);

export function PremiumButton({
  variant = "primary",
  size = "default",
  className,
  children,
  icon = true,
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isDisabled = !href && Boolean((props as { disabled?: boolean }).disabled);

  const classes = cn(
    "group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-soft/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
    "disabled:cursor-not-allowed disabled:opacity-55",
    size === "lg" ? "h-14 px-8 text-base" : "h-12 px-6 text-[0.925rem]",
    variant === "primary" &&
      "bg-ink text-void shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset]",
    variant === "secondary" && "glass text-ink",
    variant === "ghost" && "text-ink-muted",
    className,
  );

  const content = (
    <>
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background:
              "linear-gradient(120deg, rgba(77,125,255,0.65), rgba(139,92,246,0.65))",
          }}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
      {icon ? (
        <ArrowUpRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : null}
    </>
  );

  const sharedMotionProps = {
    style: { x: isDisabled ? 0 : springX, y: isDisabled ? 0 : springY },
    onMouseMove: isDisabled ? undefined : handleMouseMove,
    onMouseLeave: isDisabled ? undefined : handleMouseLeave,
    whileHover: isDisabled ? undefined : { scale: 1.035 },
    whileTap: isDisabled ? undefined : { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 400, damping: 22 },
    "data-cursor": isDisabled ? undefined : "link",
  };

  if (href) {
    return (
      <MotionLink
        href={href}
        ref={ref as never}
        className={classes}
        {...sharedMotionProps}
        {...(props as Omit<ButtonAsLink, keyof CommonProps | "href">)}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={ref as never}
      className={classes}
      {...sharedMotionProps}
      {...(props as Omit<ButtonAsButton, keyof CommonProps | "href">)}
    >
      {content}
    </motion.button>
  );
}
