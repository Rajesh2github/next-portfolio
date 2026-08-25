import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import CloudChallenge from "@/features/play/cloud/components/CloudChallenge";

export const metadata: Metadata = {
  title: "Cloud Builder | Rajesh Tiwari",
  description:
    "Design Multi-AZ architectures, partition database replication nodes, configure secure caching structures, and integrate CloudFront edge loaders.",
};

export default function CloudBuilderPage() {
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
          subtitle="Optimizer Suite"
          title="Cloud Builder"
          description="Synthesize secure, robust multi-region network meshes. Toggle application load balancers, caching partitions, database replica streams, and CloudFront edge loaders."
        />

        <div className="mt-8 md:mt-12">
          <CloudChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
