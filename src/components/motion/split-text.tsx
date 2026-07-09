"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { easeText } from "@/lib/motion";

type Line = { text: string; className?: string };

export function SplitText({
  lines,
  baseDelay = 0,
  lineStagger = 0.14,
  wordStagger = 0.045,
}: {
  lines: Line[];
  baseDelay?: number;
  lineStagger?: number;
  wordStagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <span ref={ref} className="block">
      {lines.map((line, li) => {
        const words = line.text.split(" ");
        return (
          <span key={li} className={cn("block", line.className)}>
            {words.map((word, wi) => (
              <span key={wi}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-top">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%", rotate: 3 }}
                    animate={inView ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 3 }}
                    transition={{
                      duration: 1.05,
                      ease: easeText,
                      delay: baseDelay + li * lineStagger + wi * wordStagger,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
