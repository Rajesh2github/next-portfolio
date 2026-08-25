import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import StructuredDataChallenge from "@/features/play/structured-data/components/StructuredDataChallenge";

export const metadata: Metadata = {
  title: "Structured Data Builder | Rajesh Tiwari",
  description:
    "Construct search-engine readable schemas. Chronologically arrange JSON-LD semantic hierarchies to earn Google rich snippets.",
};

export default function StructuredDataPage() {
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
          title="Structured Data Builder"
          description="Synthesize fully compliant, nested SEO structured schemas. Order context scopes, category types, headline keywords, author profiles, and publication details to secure visual search listings."
        />

        <div className="mt-8 md:mt-12">
          <StructuredDataChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
