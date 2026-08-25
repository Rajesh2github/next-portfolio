import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import JavaScriptChallenge from "@/features/play/javascript/components/JavaScriptChallenge";

export const metadata: Metadata = {
  title: "JavaScript Challenge | Rajesh Tiwari",
  description:
    "Predict the output and test your deep JavaScript knowledge on core concepts like event loop, hoisting, closures, and type coercion.",
};

export default function JavaScriptChallengePage() {
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
          subtitle="Challenge"
          title="JavaScript Challenge"
          description="Predict the output and test your deep JavaScript knowledge on concepts like scope, hoisting, closures, and coercion."
        />

        <div className="mt-8 md:mt-12">
          <JavaScriptChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
