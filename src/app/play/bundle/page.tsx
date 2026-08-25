import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import BundleChallenge from "@/features/play/bundle/components/BundleChallenge";

export const metadata: Metadata = {
  title: "Bundle Optimizer | Rajesh Tiwari",
  description:
    "Leverage code splitting, tree shaking, and third-party library conversions to shrink monstrous JavaScript bundles below 200KB.",
};

export default function BundleOptimizerPage() {
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
          title="Bundle Optimizer"
          description="Profile and compress oversized build assets. Toggle dynamic routing, module shaking, and client-side dependency exclusions to achieve light loading payloads."
        />

        <div className="mt-8 md:mt-12">
          <BundleChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
