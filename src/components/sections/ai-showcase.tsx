"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { GradientMesh } from "@/components/layout/gradient-mesh";
import { Reveal } from "@/components/motion/reveal";
import { easeImage } from "@/lib/motion";

const AICore = dynamic(() => import("@/components/three/ai-core").then((m) => m.AICore), {
  ssr: false,
});

const markers = [
  { label: "Key light · 45°", position: "left-[8%] top-[18%]" },
  { label: "Particle field · active", position: "right-[10%] top-[28%]" },
  { label: "Camera · orbit path", position: "left-[12%] bottom-[20%]" },
  { label: "Neural core · object", position: "right-[14%] bottom-[16%]" },
];

const corners = [
  "left-6 top-6 border-l border-t",
  "right-6 top-6 border-r border-t",
  "left-6 bottom-6 border-l border-b",
  "right-6 bottom-6 border-r border-b",
];

export function AIShowcase() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 md:py-36">
      <GradientMesh variant="center" className="opacity-70" />

      <Container className="relative">
        <Reveal variant="blur" duration={1}>
          <SectionHeading
            align="center"
            tone="violet"
            eyebrow="AI Showcase"
            title={
              <>
                A living neural core,
                <br />
                <span className="text-gradient">rendered in real time.</span>
              </>
            }
            description="An interactive neural core rendered live in your browser — drag to rotate it and watch it breathe. This is the same engine that will power Bilvora's voice and data visualizations."
            className="mx-auto"
          />
        </Reveal>

        <Reveal
          variant="scale"
          duration={1.2}
          delay={0.15}
          amount={0.2}
          ease={easeImage}
          className="relative mx-auto mt-20 aspect-[16/10] w-full max-w-5xl rounded-[2.5rem] border border-hairline bg-void/40 md:aspect-[21/10]"
        >
          {/* Camera frame brackets */}
          {corners.map((pos, i) => (
            <motion.div
              key={pos}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              className={`pointer-events-none absolute size-10 ${pos} border-white/25`}
            />
          ))}

          {/* Interactive 3D neural core */}
          <AICore
            interactive
            particleCount={90}
            className="absolute inset-8 md:inset-16"
          />

          {/* Center crosshair */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-px -translate-x-1/2 -translate-y-1/2 bg-white/10" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 -translate-y-1/2 bg-white/10" />

          {/* Staging labels */}
          {markers.map((marker, i) => (
            <motion.div
              key={marker.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.12 }}
              className={`pointer-events-none absolute hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint md:block ${marker.position}`}
            >
              {marker.label}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-hairline bg-void/60 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-faint"
          >
            Drag to rotate — Bilvora AI Core
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
