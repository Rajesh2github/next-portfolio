import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import ScaleChallenge from "@/features/play/scale/components/ScaleChallenge";

export const metadata: Metadata = {
  title: "Scale the Application | Rajesh Tiwari",
  description:
    "Design and optimize high-concurrency cloud environments. provision load balancers, caching, and background queues within budgets.",
};

export default function ScalePage() {
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
          title="Scale the Application"
          description="Provision network assets inside a live cloud scaling simulator. Defend servers against high-volume traffic spike crashes by maintaining latency thresholds under budget boundaries."
        />

        <div className="mt-8 md:mt-12">
          <ScaleChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
