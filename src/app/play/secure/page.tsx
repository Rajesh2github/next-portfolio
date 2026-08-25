import type { Metadata } from "next";
import { MotionMountSection } from "@/components/ui/reveal";
import Link from "next/link";
import PlayHero from "@/features/play/components/PlayHero";
import SecureChallenge from "@/features/play/secure/components/SecureChallenge";

export const metadata: Metadata = {
  title: "Secure the Application | Rajesh Tiwari",
  description:
    "Patch insecure web connections. Deploy Content Security Policies (CSP), restrict wildcard CORS, apply HSTS protection, and configure nosniff headers.",
};

export default function SecureAppPage() {
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
          subtitle="Defense Suite"
          title="Secure the Application"
          description="Identify vulnerable server-side Express script files, inspect stack warning frameworks, and toggle defense headers to protect servers."
        />

        <div className="mt-8 md:mt-12">
          <SecureChallenge />
        </div>
      </div>
    </MotionMountSection>
  );
}
