"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { GlassPanel } from "@/components/layout/glass-panel";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { testimonials } from "@/lib/data";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return (
    <div
      className="flex size-12 shrink-0 items-center justify-center rounded-full font-serif text-lg italic text-ink"
      style={{
        background:
          "linear-gradient(135deg, rgba(77,125,255,0.35), rgba(139,92,246,0.35))",
      }}
    >
      {initials}
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="relative py-28 md:py-36">
      <Container>
        <Reveal variant="up">
          <SectionHeading
            eyebrow="Client voices"
            title="Trusted by the operators who bet on us."
            className="max-w-2xl"
          />
        </Reveal>

        <Reveal variant="scale" delay={0.15} duration={1} className="mt-16">
          <TiltCard maxTilt={3}>
            <GlassPanel strong className="relative overflow-hidden p-10 md:p-16">
              <Quote className="size-10 text-electric-soft/60" />
              <p
                data-cursor="text"
                className="mt-8 max-w-3xl text-balance font-serif text-3xl italic leading-[1.4] text-ink md:text-4xl"
              >
                {featured.quote}
              </p>
              <div className="mt-10 flex items-center gap-4 border-t border-hairline pt-8">
                <Avatar name={featured.name} />
                <div>
                  <p className="font-medium text-ink">{featured.name}</p>
                  <p className="text-sm text-ink-muted">{featured.role}</p>
                </div>
              </div>
            </GlassPanel>
          </TiltCard>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((testimonial, i) => (
            <Reveal
              key={testimonial.name}
              variant={i % 2 === 0 ? "left" : "right"}
              delay={0.1 * i}
              duration={0.9}
            >
              <TiltCard maxTilt={6}>
                <GlassPanel className="flex h-full flex-col gap-8 p-8 md:p-10">
                  <Quote className="size-7 text-violet-soft/60" />
                  <p
                    data-cursor="text"
                    className="flex-1 text-balance text-lg leading-relaxed text-ink"
                  >
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4 border-t border-hairline pt-6">
                    <Avatar name={testimonial.name} />
                    <div>
                      <p className="font-medium text-ink">{testimonial.name}</p>
                      <p className="text-sm text-ink-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </GlassPanel>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
