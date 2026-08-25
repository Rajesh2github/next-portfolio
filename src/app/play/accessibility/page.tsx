import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import AccessibilityChallenge from "@/features/play/accessibility/components/AccessibilityChallenge";

export const metadata: Metadata = {
  title: "Accessibility Detective | Rajesh Tiwari",
  description:
    "Audit markup, resolve contrast thresholds, link inputs and labels, and fix unsemantic elements for digital WCAG compliance.",
};

export default function AccessibilityDetectivePage() {
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
          title="Accessibility Detective"
          description="Investigate code blocks, review simulated chrome console/stack trace reports, and fix digital accessibility WCAG issues."
        />

        <div className="mt-8 md:mt-12">
          <AccessibilityChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
