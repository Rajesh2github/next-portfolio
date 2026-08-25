import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import DebugHunterChallenge from "@/features/play/debug/components/DebugHunterChallenge";

export const metadata: Metadata = {
  title: "Debug Hunter | Rajesh Tiwari",
  description:
    "Troubleshoot and fix realistic frontend runtime errors, stacking context failures, state rendering mutations, and event bubbling leaks.",
};

export default function DebugHunterPage() {
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
          subtitle="Detective Suite"
          title="Debug Hunter"
          description="Investigate diagnostic logs, inspect terminal files, trace server request tables, and select the correct fix to squash active bugs."
        />

        <div className="mt-8 md:mt-12">
          <DebugHunterChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
