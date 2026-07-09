"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { GlassPanel } from "@/components/layout/glass-panel";
import { Reveal } from "@/components/motion/reveal";
import { easeButton } from "@/lib/motion";
import { technologies } from "@/lib/data";

export function Technologies() {
  return (
    <section id="technology" className="relative py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Technology"
              title={
                <>
                  An arsenal, not
                  <br />a checklist.
                </>
              }
              description="We choose tools the way engineers choose tools — for leverage, not resume padding."
            />
          </Reveal>
          <Reveal variant="right" delay={0.15}>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-faint md:block">
Curated, not accumulated
            </span>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0.1} duration={1}>
          <GlassPanel className="relative overflow-hidden p-10 md:p-16">
            <p className="text-balance text-2xl leading-[1.6] tracking-tight md:text-4xl md:leading-[1.55]">
              {technologies.map((tech, i) => (
                <span key={tech.name}>
                  <motion.span
                    data-cursor="link"
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.045,
                      ease: easeButton,
                    }}
                    className={`inline-block cursor-default ${
                      tech.category === "AI" ? "text-gradient-static" : "text-ink"
                    }`}
                  >
                    {tech.name}
                  </motion.span>
                  {i < technologies.length - 1 ? (
                    <span className="mx-3 text-ink-faint/50 md:mx-4">/</span>
                  ) : null}
                </span>
              ))}
            </p>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline pt-8">
              {["Framework", "Language", "Design", "Runtime", "Data", "Cloud", "AI", "Voice", "Payments", "DevOps"].map(
                (category, i) => (
                  <motion.span
                    key={category}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.04 }}
                    className="text-xs uppercase tracking-[0.2em] text-ink-faint"
                  >
                    {category}
                  </motion.span>
                ),
              )}
            </div>
          </GlassPanel>
        </Reveal>
      </Container>
    </section>
  );
}
