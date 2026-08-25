import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import FlexChallenge from "@/features/play/css-flex/components/FlexChallenge";

export const metadata: Metadata = {
  title: "CSS Flexbox Lab | Rajesh Tiwari",
  description:
    "Master CSS Flexbox alignment properties visually by solving progressive challenges in real time.",
};

export default function FlexLabPage() {
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
          title="CSS Flexbox Lab"
          description="Experiment with Flexbox properties and recreate visual layouts. Master main vs. cross axis alignments in real time."
        />

        <div className="mt-8 md:mt-12">
          <FlexChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
