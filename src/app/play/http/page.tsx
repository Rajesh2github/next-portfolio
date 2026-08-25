import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import HttpChallenge from "@/features/play/http/components/HttpChallenge";

export const metadata: Metadata = {
  title: "HTTP Journey | Rajesh Tiwari",
  description:
    "Arrange the core connection, key exchange, encryption, request response, and visual client-side painting steps of an HTTPS request.",
};

export default function HttpJourneyPage() {
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
          title="HTTP Journey"
          description="Chronologically sequence networking hops and rendering events. Sort DNS resolvers, TCP synchronizations, TLS key exchanges, HTTP headers, server routines, and client painting cycles."
        />

        <div className="mt-8 md:mt-12">
          <HttpChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
