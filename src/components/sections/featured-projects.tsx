"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { easeImage } from "@/lib/motion";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-36, 36]);

  return (
    <div ref={ref} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-hairline bg-charcoal-2 ${
          reversed ? "md:order-2" : ""
        }`}
      >
        <motion.div
          aria-hidden
          style={{ y: imageY }}
          className="absolute inset-[-10%]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                index % 2 === 0
                  ? "radial-gradient(circle at 30% 20%, rgba(77,125,255,0.28), transparent 60%), radial-gradient(circle at 80% 90%, rgba(139,92,246,0.22), transparent 55%)"
                  : "radial-gradient(circle at 80% 10%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(circle at 20% 90%, rgba(77,125,255,0.22), transparent 55%)",
            }}
          />
        </motion.div>

        <span className="absolute -bottom-10 -left-4 font-serif text-[10rem] italic leading-none text-white/[0.06] md:text-[13rem]">
          {project.index}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-white/15 bg-void/40 px-5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-faint">
            Case study visual — reserved
          </span>
        </div>

        {/* Curtain wipe reveal */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: easeImage }}
          style={{ originX: reversed ? 0 : 1 }}
          className="absolute inset-0 z-10 bg-charcoal"
        />
      </div>

      <div className={reversed ? "md:order-1" : ""}>
        <MaskReveal duration={0.7}>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-electric-soft">
            {project.category}
          </span>
        </MaskReveal>
        <h3 className="mt-5 text-balance text-3xl font-medium tracking-tight text-ink md:text-4xl">
          <MaskReveal duration={0.9} delay={0.1}>
            {project.title}
          </MaskReveal>
        </h3>
        <Reveal variant="up" delay={0.25} duration={0.8}>
          <p className="mt-5 max-w-md text-balance leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <div className="mt-7 flex items-center gap-3 border-t border-hairline pt-6">
            <span className="font-serif text-lg italic text-ink">{project.metric}</span>
          </div>
          <a
            href="#contact"
            data-cursor="link"
            className="group mt-7 inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-electric-soft"
          >
            View case study
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="work" className="relative py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Products people
                  <br />
                  actually use.
                </>
              }
              description="A small sample of the platforms, agents and systems we've shipped into production."
            />
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-28 md:gap-36">
          {projects.map((project, i) => (
            <ProjectRow key={project.index} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
