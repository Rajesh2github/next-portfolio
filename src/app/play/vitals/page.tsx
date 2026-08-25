import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import VitalsChallenge from "@/features/play/vitals/components/VitalsChallenge";

export const metadata: Metadata = {
  title: "Core Web Vitals Lab | Rajesh Tiwari",
  description:
    "Audit largest contentful paints, layout shifts, and input response latencies to speed up loading and rendering metrics.",
};

export default function VitalsLabPage() {
  return (
    <MotionMountSection
      delay={0.06}
      className="pt-6 px-4 pb-12 sm:px-6 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[760px]">
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
          subtitle="Performance Suite"
          title="Core Web Vitals Lab"
          description="Identify and resolve paint speed, visual stability shift, and blocking script latencies using simulated web vital profiles."
        />

        <div className="mt-8 md:mt-12">
          <VitalsChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
