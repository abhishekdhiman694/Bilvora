"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorVariant = "default" | "link" | "text";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 340, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 340, damping: 28, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isFine || prefersReducedMotion) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest("[data-cursor]");
      const attr = cursorEl?.getAttribute("data-cursor");
      setVariant(attr === "link" || attr === "text" ? attr : "default");
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = variant === "link" ? 68 : variant === "text" ? 34 : 26;
  const dotSize = variant === "link" ? 0 : variant === "text" ? 3 : 5;

  return (
    <div className="hidden lg:block">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full border mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "rgba(244,244,246,0.75)",
          backgroundColor:
            variant === "link" ? "rgba(244,244,246,0.08)" : "transparent",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-ink mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: dotSize, height: dotSize, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </div>
  );
}
