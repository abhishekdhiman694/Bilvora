"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { easeText } from "@/lib/motion";

export function MaskReveal({
  children,
  className,
  duration = 1.1,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });

  return (
    <span ref={ref} className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration, delay, ease: easeText }}
      >
        {children}
      </motion.span>
    </span>
  );
}
