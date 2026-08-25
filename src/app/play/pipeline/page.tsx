import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import PipelineChallenge from "@/features/play/pipeline/components/PipelineChallenge";

export const metadata: Metadata = {
  title: "CI/CD Pipeline Builder | Rajesh Tiwari",
  description:
    "Assemble automated build pipelines. Sort packages loaders, syntax checkers, unit testers, transpilation bundlers, and static host deployment actions.",
};

export default function PipelinePage() {
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
          title="CI/CD Pipeline Builder"
          description="Drag, reorder, and compile standard deployment stages. Create rigorous sandboxes where code repos, dependencies, format lint checkers, automated test suites, production build runs, and edge deploys execute sequentially."
        />

        <div className="mt-8 md:mt-12">
          <PipelineChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
