"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";
import { cn } from "@/lib/utils";

export function CountUp({
  value,
  duration = 1.8,
  delay = 0,
  className,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      node.textContent = value;
      return;
    }
    const [, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${latest.toFixed(decimals)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, delay]);

  return (
    <span ref={ref} className={cn(className)}>
      0
    </span>
  );
}
