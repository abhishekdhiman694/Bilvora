"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const pinEl = pinRef.current;
    const steps = stepRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!pinEl || steps.length === 0) return;

    const n = steps.length;
    gsap.set(steps, { opacity: 0, scale: 0.92, filter: "blur(6px)" });
    gsap.set(steps[0], { opacity: 1, scale: 1, filter: "blur(0px)" });

    const trigger = ScrollTrigger.create({
      trigger: pinEl,
      start: "top top",
      end: () => `+=${(n - 1) * 900}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate(self) {
        const raw = self.progress * (n - 1);
        steps.forEach((step, i) => {
          const dist = Math.abs(raw - i);
          const opacity = Math.max(0, 1 - dist * 1.4);
          const scale = 0.92 + Math.max(0, 1 - dist) * 0.08;
          const blur = Math.min(8, dist * 8);
          gsap.set(step, { opacity, scale, filter: `blur(${blur}px)` });
        });

        const active = Math.min(n - 1, Math.round(raw));
        if (counterRef.current) {
          counterRef.current.textContent = `0${active + 1} / 0${n}`;
        }
        dotRefs.current.forEach((dot, i) => {
          if (!dot) return;
          dot.style.backgroundColor =
            i === active ? "var(--electric-soft)" : "rgba(244,244,246,0.12)";
          dot.style.width = i === active ? "1.75rem" : "1.5rem";
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="process" className="relative bg-charcoal">
      <Container className="pt-28 md:pt-36">
        <Reveal variant="up">
          <SectionHeading
            align="center"
            eyebrow="How we work"
            title="A cinematic build process."
            description="Five deliberate phases. No black boxes, no surprise handoffs — just visible, accountable progress from discovery to scale."
            className="mx-auto"
          />
        </Reveal>
      </Container>

      <div
        ref={pinRef}
        className={
          reducedMotion
            ? "relative mt-16 pb-20 md:mt-24"
            : "relative mt-16 h-screen overflow-hidden md:mt-24"
        }
      >
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-hairline md:block" />

        {processSteps.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={item.step}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={
                reducedMotion
                  ? "relative border-t border-hairline py-14 first:border-t-0"
                  : "absolute inset-0 flex items-center"
              }
            >
              <Container>
                <div className="relative grid items-center gap-6 md:grid-cols-2 md:gap-16">
                  <span className="absolute left-1/2 top-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric shadow-[0_0_0_6px_var(--charcoal),0_0_20px_4px_rgba(77,125,255,0.6)] md:block" />

                  <div
                    className={`${reversed ? "md:order-2 md:text-left" : "md:text-right"} flex flex-col md:items-end ${
                      reversed ? "md:items-start" : ""
                    }`}
                  >
                    <span className="font-serif text-7xl italic leading-none text-white/10 md:text-8xl">
                      {item.step}
                    </span>
                  </div>

                  <div className={reversed ? "md:order-1" : ""}>
                    <h3 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-balance leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Container>
            </div>
          );
        })}

        {!reducedMotion ? (
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-4">
            <span
              ref={counterRef}
              className="font-mono text-xs tracking-[0.2em] text-ink-faint"
            >
              01 / 0{processSteps.length}
            </span>
            <div className="flex gap-1.5">
              {processSteps.map((item, i) => (
                <span
                  key={item.step}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="h-1 w-6 rounded-full bg-white/10 transition-[background-color,width] duration-300"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
