"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { trustedBy } from "@/lib/data";

export function TrustedBy() {
  return (
    <section className="relative border-y border-hairline">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-center md:gap-16">
        <MaskReveal duration={0.8} className="shrink-0 md:max-w-[10rem]">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-faint">
            Trusted by ambitious teams across 38 countries
          </p>
        </MaskReveal>

        <div className="grid flex-1 grid-cols-2 divide-x divide-y divide-hairline border border-hairline sm:grid-cols-4">
          {trustedBy.map((name, i) => (
            <Reveal
              key={name}
              variant="blur"
              duration={0.7}
              delay={i * 0.06}
              amount={0.4}
              className="flex items-center justify-center px-6 py-7"
            >
              <span
                data-cursor="text"
                className="text-center font-serif text-lg italic tracking-tight text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {name}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
