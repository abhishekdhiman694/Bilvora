"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { CalendarCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { GradientMesh } from "@/components/layout/gradient-mesh";
import { Noise } from "@/components/layout/noise";
import { PremiumButton } from "@/components/ui/premium-button";
import { openCalendlyPopup } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";
import { stats } from "@/lib/data";

const AICore = dynamic(() => import("@/components/three/ai-core").then((m) => m.AICore), {
  ssr: false,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const coreY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32"
    >
      <GradientMesh variant="hero" />
      <Noise />

      {/* Reserved focal point for the future 3D AI object */}
      <motion.div
        aria-hidden
        style={{ y: coreY }}
        className="pointer-events-none absolute right-[8%] top-[22%] hidden aspect-square w-[26rem] items-center justify-center rounded-full lg:flex"
      >
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex size-full items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-white/10"
          />
          <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_65%)] blur-2xl" />
          <AICore className="absolute inset-12" particleCount={36} />
          <span className="absolute -bottom-9 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-faint">
            Bilvora AI Core
          </span>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }}>
        <Container className="relative flex flex-col items-center text-center">
          <MaskReveal duration={0.8}>
            <span className="mb-8 inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.32em] text-ink-muted">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_12px_2px_rgba(77,125,255,0.7)]" />
              Premium AI &amp; Software Engineering Studio
            </span>
          </MaskReveal>

          <h1 className="max-w-5xl text-balance font-medium leading-[0.98] tracking-[-0.04em] text-ink">
            <SplitText
              baseDelay={0.35}
              lines={[
                { text: "We build technology", className: "text-[clamp(2.75rem,8vw,6.75rem)]" },
                {
                  text: "from the future.",
                  className: "text-[clamp(2.75rem,8vw,6.75rem)] text-gradient",
                },
              ]}
            />
          </h1>

          <Reveal variant="blur" delay={1.15} duration={1}>
            <p
              data-cursor="text"
              className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink-muted md:text-xl"
            >
              Bilvora Technologies designs and engineers AI voice agents, intelligent
              automation and enterprise software for companies that refuse to look
              ordinary.
            </p>
          </Reveal>

          <Reveal variant="up" delay={1.35} duration={0.9}>
            <div className="mt-10 flex w-full max-w-md flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center">
              <PremiumButton
                onClick={() => {
                  trackEvent("cta_click", { cta: "hero_book_call" });
                  openCalendlyPopup();
                }}
                size="lg"
                icon={false}
                className="w-full sm:w-auto"
              >
                <CalendarCheck className="size-4" aria-hidden />
                Book a Free Discovery Call
              </PremiumButton>
              <PremiumButton
                href="#work"
                size="lg"
                variant="secondary"
                icon={false}
                className="w-full sm:w-auto"
              >
                <Sparkles className="size-4 text-electric-soft" aria-hidden />
                View our work
              </PremiumButton>
            </div>
          </Reveal>

          <div className="mt-24 grid w-full max-w-4xl grid-cols-2 gap-y-10 border-t border-hairline pt-10 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                variant="up"
                delay={1.5 + i * 0.1}
                duration={0.8}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-serif text-4xl italic text-ink md:text-5xl">
                  <CountUp value={stat.value} delay={1.6 + i * 0.1} duration={1.6} />
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
