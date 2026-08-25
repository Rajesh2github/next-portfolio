import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import ReactChallenge from "@/features/play/react/components/ReactChallenge";

export const metadata: Metadata = {
  title: "React Challenge | Rajesh Tiwari",
  description:
    "Solve interactive exercises covering React state batching, stale effect hooks closures, and virtual DOM recursive re-render structures.",
};

export default function ReactChallengePage() {
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
          subtitle="Logic Suite"
          title="React Challenge"
          description="Resolve structural state batches, stale closures, missing effect dependencies, and optimization render cycles."
        />

        <div className="mt-8 md:mt-12">
          <ReactChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
