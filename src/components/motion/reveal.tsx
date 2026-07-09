"use client";

import { motion, type Variants, type Easing } from "motion/react";
import { easeCard, viewportOnce } from "@/lib/motion";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "rotate";

const variantsMap: Record<RevealVariant, Variants> = {
  up: { hidden: { opacity: 0, y: 52 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.86 }, visible: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, filter: "blur(16px)", y: 24 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -5, y: 34 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
};

export function Reveal({
  children,
  variant = "up",
  duration = 0.9,
  delay = 0,
  ease = easeCard,
  once = viewportOnce.once,
  amount = viewportOnce.amount,
  className,
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  duration?: number;
  delay?: number;
  ease?: Easing;
  once?: boolean;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variantsMap[variant]}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
