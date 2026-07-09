"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { GlassPanel } from "@/components/layout/glass-panel";
import { GradientMesh } from "@/components/layout/gradient-mesh";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { CountUp } from "@/components/motion/count-up";
import { whyBilvora } from "@/lib/data";

const rowVariants = ["left", "blur", "right", "scale"] as const;

export function WhyBilvora() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <GradientMesh variant="corner" className="opacity-60" />

      <Container className="relative grid gap-16 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div className="md:sticky md:top-32 md:h-fit">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Why Bilvora"
              title={
                <>
                  Four reasons the
                  <br />
                  best teams choose us.
                </>
              }
              description="We are not a template shop or a prompt-engineering side hustle. We are the team enterprises call when the build has to work the first time."
            />
          </Reveal>
        </div>

        <div className="relative">
          {whyBilvora.map((item, i) => (
            <Reveal
              key={item.number}
              variant={rowVariants[i % rowVariants.length]}
              delay={i * 0.06}
              amount={0.4}
              className={`flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:gap-10 ${
                i === 0 ? "" : "border-t border-hairline"
              }`}
            >
              <span className="font-serif text-6xl italic leading-none text-white/10 sm:text-7xl">
                {item.number}
              </span>
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-balance leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal
            variant="scale"
            delay={0.3}
            duration={1}
            className="mt-4 ml-auto max-w-xs sm:mt-0 sm:absolute sm:right-2 sm:top-[38%]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <TiltCard maxTilt={10}>
                <GlassPanel
                  strong
                  className="flex -rotate-2 flex-col gap-3 p-7"
                >
                  <span className="font-serif text-5xl italic text-gradient">
                    <CountUp value="92%" duration={1.6} />
                  </span>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    of clients expand scope with Bilvora within their first 6 months.
                  </p>
                </GlassPanel>
              </TiltCard>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
