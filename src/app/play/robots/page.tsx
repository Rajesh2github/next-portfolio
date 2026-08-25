import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import RobotsChallenge from "@/features/play/robots/components/RobotsChallenge";

export const metadata: Metadata = {
  title: "robots.txt Challenge | Rajesh Tiwari",
  description:
    "Test your robots.txt parsing and wildcard matching knowledge. Determine if bots are allowed or disallowed from crawling specific URLs.",
};

export default function RobotsChallengePage() {
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
          subtitle="SEO Suite"
          title="robots.txt Challenge"
          description="Analyze disallow structures, user-agent specific scopes, sitemaps syntax, and specificity patterns to audit crawl access rules."
        />

        <div className="mt-8 md:mt-12">
          <RobotsChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
