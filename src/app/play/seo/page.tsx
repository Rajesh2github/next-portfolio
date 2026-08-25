import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import SeoChallenge from "@/features/play/seo/components/SeoChallenge";

export const metadata: Metadata = {
  title: "SEO Detective | Rajesh Tiwari",
  description:
    "Troubleshoot indexing blockers, align header schemas, resolve duplicated referrers, and map exact crawl directives.",
};

export default function SeoDetectivePage() {
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
          subtitle="Detective Suite"
          title="SEO Detective"
          description="Trace index reports, investigate header schema markups, and identify crawling parameters to unlock maximum search engine visibility."
        />

        <div className="mt-8 md:mt-12">
          <SeoChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
