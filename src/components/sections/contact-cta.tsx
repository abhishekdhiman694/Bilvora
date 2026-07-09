"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalendarCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { GradientMesh } from "@/components/layout/gradient-mesh";
import { Noise } from "@/components/layout/noise";
import { GlassPanel } from "@/components/layout/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { CalendlyInline } from "@/components/contact/calendly-inline";
import { ContactForm } from "@/components/contact/contact-form";
import { openCalendlyPopup } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Tab = "call" | "message";

export function ContactCTA() {
  const [tab, setTab] = useState<Tab>("call");
  const [booked, setBooked] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-44">
      <GradientMesh variant="single" />
      <Noise />

      <Container className="relative flex flex-col items-center text-center">
        <MaskReveal duration={0.8} className="mb-8">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.32em] text-ink-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_12px_2px_rgba(77,125,255,0.7)]" />
            Let&apos;s build
          </span>
        </MaskReveal>

        <h2 className="max-w-4xl text-balance font-medium leading-[1.02] tracking-[-0.03em] text-ink">
          <SplitText
            baseDelay={0.2}
            lines={[
              {
                text: "Something the internet",
                className: "text-[clamp(2.5rem,7vw,5.5rem)]",
              },
              {
                text: "hasn't seen yet.",
                className: "text-[clamp(2.5rem,7vw,5.5rem)] text-gradient",
              },
            ]}
          />
        </h2>

        <Reveal variant="blur" delay={0.9} duration={0.9}>
          <p
            data-cursor="text"
            className="mt-8 max-w-lg text-balance text-lg leading-relaxed text-ink-muted"
          >
            Tell us what you&apos;re building. We&apos;ll reply within one business
            day with next steps, not a sales script.
          </p>
        </Reveal>

        <Reveal variant="up" delay={1.1} duration={0.9}>
          <motion.div
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-10 flex w-full max-w-md flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <PremiumButton
              onClick={() => {
                trackEvent("cta_click", { cta: "contact_book_call" });
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
              onClick={() => {
                trackEvent("cta_click", { cta: "contact_send_message" });
                setTab("message");
              }}
              size="lg"
              variant="secondary"
              icon={false}
              className="w-full sm:w-auto"
            >
              <MessageSquare className="size-4 text-electric-soft" aria-hidden />
              Send a Message
            </PremiumButton>
          </motion.div>
        </Reveal>

        <Reveal variant="scale" delay={0.15} duration={1} className="mt-20 w-full max-w-4xl">
          <GlassPanel strong className="p-6 md:p-10">
            <div
              role="tablist"
              aria-label="Contact options"
              className="mx-auto mb-8 flex w-fit gap-1 rounded-full border border-hairline bg-void/40 p-1"
            >
              <button
                type="button"
                role="tab"
                id="contact-tab-call"
                aria-selected={tab === "call"}
                aria-controls="contact-panel-call"
                data-cursor="link"
                onClick={() => setTab("call")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  tab === "call" ? "bg-ink text-void" : "text-ink-muted hover:text-ink",
                )}
              >
                <CalendarCheck className="size-4" aria-hidden />
                Book a Call
              </button>
              <button
                type="button"
                role="tab"
                id="contact-tab-message"
                aria-selected={tab === "message"}
                aria-controls="contact-panel-message"
                data-cursor="link"
                onClick={() => setTab("message")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  tab === "message" ? "bg-ink text-void" : "text-ink-muted hover:text-ink",
                )}
              >
                <MessageSquare className="size-4" aria-hidden />
                Send a Message
              </button>
            </div>

            <div
              id="contact-panel-call"
              role="tabpanel"
              aria-labelledby="contact-tab-call"
              hidden={tab !== "call"}
            >
              {tab === "call" ? (
                booked ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center">
                    <CheckCircle2 className="size-10 text-electric-soft" aria-hidden />
                    <div>
                      <p className="text-xl font-medium text-ink">You&apos;re booked.</p>
                      <p className="mt-2 max-w-sm text-balance text-sm leading-relaxed text-ink-muted">
                        Thanks for scheduling time with Bilvora — check your inbox for
                        the calendar invite and details.
                      </p>
                    </div>
                  </div>
                ) : (
                  <CalendlyInline
                    onScheduled={() => {
                      trackEvent("conversion", { type: "calendly_booking_completed" });
                      setBooked(true);
                    }}
                  />
                )
              ) : null}
            </div>

            <div
              id="contact-panel-message"
              role="tabpanel"
              aria-labelledby="contact-tab-message"
              hidden={tab !== "message"}
              className="text-left"
            >
              {tab === "message" ? <ContactForm /> : null}
            </div>
          </GlassPanel>
        </Reveal>
      </Container>
    </section>
  );
}
