import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import HttpStatusChallenge from "@/features/play/status/components/HttpStatusChallenge";

export const metadata: Metadata = {
  title: "HTTP Status Challenge | Rajesh Tiwari",
  description:
    "Test your networking knowledge by matching HTTP Status Codes to real-world server, client, and redirection scenarios.",
};

export default function HttpStatusPage() {
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
          subtitle="Network Suite"
          title="HTTP Status Challenge"
          description="Identify redirect, unauthenticated, forbidden, client-side, gateway timeout, and database crash response codes in real time."
        />

        <div className="mt-8 md:mt-12">
          <HttpStatusChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
