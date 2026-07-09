"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { GradientMesh } from "@/components/layout/gradient-mesh";
import { Noise } from "@/components/layout/noise";
import { PremiumButton } from "@/components/ui/premium-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-6 text-center">
      <GradientMesh variant="center" />
      <Noise />
      <Container className="relative flex flex-col items-center">
        <span className="font-mono text-xs uppercase tracking-[0.32em] text-ink-faint">
          Error 500
        </span>
        <h1 className="mt-6 text-balance text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink">
          Something went <span className="text-gradient">wrong.</span>
        </h1>
        <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-ink-muted">
          An unexpected error occurred on our end. Try again, or head back home —
          we&apos;ve been notified either way.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <PremiumButton onClick={() => reset()} size="lg" icon={false}>
            Try again
          </PremiumButton>
          <PremiumButton href="/" size="lg" variant="secondary" icon={false}>
            Back to homepage
          </PremiumButton>
        </div>
      </Container>
    </div>
  );
}
