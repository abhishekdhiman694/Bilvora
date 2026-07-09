"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

type DivProps = Omit<
  React.ComponentProps<"div">,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragEnter" | "onDragLeave" | "onDragOver"
>;

export function TiltCard({
  children,
  className,
  maxTilt = 7,
  glare = true,
  ...props
}: DivProps & { maxTilt?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 240,
    damping: 22,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 240,
    damping: 22,
    mass: 0.6,
  });
  const glareX = useSpring(useTransform(px, [0, 1], [0, 100]), {
    stiffness: 220,
    damping: 28,
  });
  const glareY = useSpring(useTransform(py, [0, 1], [0, 100]), {
    stiffness: 220,
    damping: 28,
  });
  const glareBackground = useMotionTemplate`radial-gradient(480px circle at ${glareX}% ${glareY}%, rgba(244,244,246,0.10), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("group relative", className)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      {...props}
    >
      {children}
      {glare ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />
      ) : null}
    </motion.div>
  );
}
