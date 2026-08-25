import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import LighthouseChallenge from "@/features/play/lighthouse/components/LighthouseChallenge";

export const metadata: Metadata = {
  title: "Lighthouse Optimizer | Rajesh Tiwari",
  description:
    "Tune compression algorithms, load sequences, semantic tags, and descriptive metadata to raise Google Lighthouse Performance, SEO, and Accessibility scores.",
};

export default function LighthouseOptimizerPage() {
  return (
    <MotionMountSection
      delay={0.06}
      className="pt-6 px-4 pb-12 sm:px-6 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[1040px]">
        {/* Back Link */}
        <div className="mb-6 flex">
          <Link
            href="/play"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Play
          </Link>
        </div>

        <PlayHero
          subtitle="Optimizer Suite"
          title="Lighthouse Optimizer"
          description="Simulate real-time Google Lighthouse profiling. Toggle non-blocking assets, semantic structures, and image scaling factors to hit a perfect 100% triple audit."
        />

        <div className="mt-8 md:mt-12">
          <LighthouseChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
