import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import GridChallenge from "@/features/play/css-grid/components/GridChallenge";

export const metadata: Metadata = {
  title: "CSS Grid Lab | Rajesh Tiwari",
  description:
    "Master CSS Grid column-tracking, track gaps, item spanning, and cell placements visually in real time.",
};

export default function GridLabPage() {
  return (
    <MotionMountSection
      delay={0.06}
      className="pt-6 px-4 pb-12 sm:px-6 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[940px]">
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
          subtitle="Lab Space"
          title="CSS Grid Lab"
          description="Master CSS Grid tracking, cell spaces, fractional columns, spanning, and cellular alignments in real time."
        />

        <div className="mt-8 md:mt-12">
          <GridChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
