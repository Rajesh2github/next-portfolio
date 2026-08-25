import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import GooglebotChallenge from "@/features/play/googlebot/components/GooglebotChallenge";

export const metadata: Metadata = {
  title: "Googlebot Simulator | Rajesh Tiwari",
  description:
    "Simulate search engine crawler processes. Chronologically arrange domain queries, robots directives, HTML parsing, and database search registration.",
};

export default function GooglebotPage() {
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
          title="Googlebot Simulator"
          description="Synthesize the complete crawl pipeline of modern search engine spiders. Chronologically sequence network domain queries, robots directive permissions, HTML payload fetchings, parsing links, and database registrations."
        />

        <div className="mt-8 md:mt-12">
          <GooglebotChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
