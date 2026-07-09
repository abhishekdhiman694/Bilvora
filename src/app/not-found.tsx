import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { GradientMesh } from "@/components/layout/gradient-mesh";
import { Noise } from "@/components/layout/noise";
import { PremiumButton } from "@/components/ui/premium-button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-6 text-center">
      <GradientMesh variant="center" />
      <Noise />
      <Container className="relative flex flex-col items-center">
        <span className="font-mono text-xs uppercase tracking-[0.32em] text-ink-faint">
          Error 404
        </span>
        <h1 className="mt-6 text-balance text-[clamp(3rem,10vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink">
          Page not <span className="text-gradient">found.</span>
        </h1>
        <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <PremiumButton href="/" size="lg">
            Back to homepage
          </PremiumButton>
          <PremiumButton href="/#contact" size="lg" variant="secondary" icon={false}>
            Contact us
          </PremiumButton>
        </div>
      </Container>
    </div>
  );
}
