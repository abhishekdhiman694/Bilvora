import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "@/lib/data";

export function FAQ() {
  return (
    <section id="faq" className="relative py-28 md:py-36">
      <Container>
        <Reveal variant="up">
          <SectionHeading
            eyebrow="Frequently asked"
            title="Questions worth answering upfront."
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-16 divide-y divide-hairline border-y border-hairline">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} variant="up" delay={0.04 * i} amount={0.5}>
              <details className="group py-6">
                <summary
                  data-cursor="link"
                  className="flex cursor-pointer list-none items-center justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-soft/50 [&::-webkit-details-marker]:hidden"
                >
                  <span className="text-lg font-medium tracking-tight text-ink md:text-xl">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="size-5 shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-180 group-open:text-electric-soft"
                    aria-hidden
                  />
                </summary>
                <p className="mt-4 max-w-2xl text-balance leading-relaxed text-ink-muted">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
