import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import GitChallenge from "@/features/play/git/components/GitChallenge";

export const metadata: Metadata = {
  title: "Git Quest | Rajesh Tiwari",
  description:
    "Master advanced git workflows. Arrange chronological checkout, fetching, rebasing, and force pushing parameters safely.",
};

export default function GitQuestPage() {
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
          subtitle="Sequence Suite"
          title="Git Quest"
          description="Chronologically sequence terminal rebase operations. Order remote fetches, local branch switches, upstream rebase executions, conflict cleanup checkpoints, and secure push scripts."
        />

        <div className="mt-8 md:mt-12">
          <GitChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
