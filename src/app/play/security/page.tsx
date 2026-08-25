import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import SecurityChallenge from "@/features/play/security/components/SecurityChallenge";

export const metadata: Metadata = {
  title: "Security Detective | Rajesh Tiwari",
  description:
    "Troubleshoot Cross-Site Scripting (XSS) inputs, database injection strings, exposed token environments, and insecure cookie standards.",
};

export default function SecurityDetectivePage() {
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
          title="Security Detective"
          description="Analyze vulnerable script concatenation loops, audit network session tokens, and deploy standard defense practices to secure applications."
        />

        <div className="mt-8 md:mt-12">
          <SecurityChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
