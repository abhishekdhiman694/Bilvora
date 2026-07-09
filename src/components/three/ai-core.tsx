"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AICoreScene } from "./ai-core-scene";
import { cn } from "@/lib/utils";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function AICore({
  interactive = false,
  particleCount = 60,
  className,
}: {
  interactive?: boolean;
  particleCount?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [inView, setInView] = useState(false);

  // Never mount WebGL for reduced-motion visitors or devices without
  // GPU/WebGL support — the CSS placeholder underneath stays as the visual.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !hasWebGL()) return;
    setCanRender(true);
  }, []);

  // Fully unmount the canvas (and let R3F dispose every GPU resource) once
  // it's well out of view, and mount it *before* it scrolls into view (a
  // generous rootMargin) so WebGL/shader setup finishes ahead of time
  // instead of visibly popping in after the user reaches it.
  useEffect(() => {
    if (!canRender) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "50% 0px 50% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [canRender]);

  if (!canRender) return null;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {inView ? (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 4.4], fov: 38 }}
        >
          <Suspense fallback={null}>
            <AICoreScene interactive={interactive} particleCount={particleCount} />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
