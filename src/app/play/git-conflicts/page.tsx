import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import GitConflictsChallenge from "@/features/play/git-conflicts/components/GitConflictsChallenge";

export const metadata: Metadata = {
  title: "Git Conflict Resolver | Rajesh Tiwari",
  description:
    "Master git merging and rebasing by resolving raw code conflicts between HEAD and incoming feature branches.",
};

export default function GitConflictsPage() {
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
          subtitle="Workflow Suite"
          title="Git Conflict Resolver"
          description="Analyze raw version control markers, inspect conflicting lines, and choose clean structural integrations to complete successful git merges."
        />

        <div className="mt-8 md:mt-12">
          <GitConflictsChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
