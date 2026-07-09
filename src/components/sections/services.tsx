"use client";

import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { GlassPanel } from "@/components/layout/glass-panel";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { services, featuredServiceIndexes } from "@/lib/data";

const featured = services[featuredServiceIndexes[0]];
const rest = featuredServiceIndexes.slice(1).map((i) => services[i]);
const rowVariants = ["left", "right", "blur", "scale"] as const;

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal variant="up" duration={0.9}>
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Full-stack AI &amp; software,
                  <br />
                  crafted like a product.
                </>
              }
              description="Seventeen disciplines. One accountable team. From a single AI receptionist to the enterprise platform underneath it."
            />
          </Reveal>
          <Reveal variant="right" duration={0.8} delay={0.2}>
            <a
              href="#contact"
              data-cursor="link"
              className="group hidden shrink-0 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink md:flex"
            >
              View all 17 capabilities
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        {/* Featured service — breaks the grid */}
        <Reveal variant="scale" duration={1} delay={0.15} className="mt-16">
          <TiltCard maxTilt={3.5}>
            <GlassPanel strong className="relative overflow-hidden p-10 md:p-16">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-16 font-serif text-[16rem] italic leading-none text-white/[0.04] md:text-[22rem]"
              >
                {featured.index}
              </span>
              <div className="relative grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-electric-soft">
                    Featured capability — {featured.index}
                  </span>
                  <h3 className="mt-5 text-balance text-3xl font-medium tracking-tight text-ink md:text-5xl">
                    {featured.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-balance text-lg leading-relaxed text-ink-muted">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline px-3.5 py-1.5 text-xs text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </TiltCard>
        </Reveal>

        {/* Staggered editorial rows — each enters differently */}
        <div className="mt-6 grid gap-x-10 md:grid-cols-2">
          {rest.map((service, i) => (
            <Reveal
              key={service.index}
              variant={rowVariants[i % rowVariants.length]}
              duration={0.85}
              delay={0.05 * i}
              amount={0.35}
              className={`border-t border-hairline py-10 ${i % 2 === 1 ? "md:mt-14" : ""}`}
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-serif text-3xl italic text-electric-soft">
                  {service.index}
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-ink-faint" />
              </div>
              <h4 className="mt-6 text-2xl font-medium tracking-tight text-ink">
                {service.title}
              </h4>
              <p className="mt-4 max-w-md text-balance leading-relaxed text-ink-muted">
                {service.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
                {service.tags.map((tag, tagIndex) => (
                  <span key={tag} className="flex items-center gap-2">
                    {tag}
                    {tagIndex < service.tags.length - 1 ? (
                      <span className="text-ink-faint/40">·</span>
                    ) : null}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
