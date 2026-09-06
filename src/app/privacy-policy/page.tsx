import React from "react";
import Link from "next/link";
import { privacyPolicies } from "@/content/privacy-policy";
import { ArrowLeft, ShieldCheck, Heart, Sparkles, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policies",
  description: "Official privacy policy directories for Rajesh Tiwari's mobile applications and educational learning games.",
};

export default function PrivacyPolicyIndex() {
  const policiesList = Object.entries(privacyPolicies);

  return (
    <div className="mx-auto w-full max-w-[940px] px-6 py-12">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition duration-300 mb-8"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Home
      </Link>

      <div className="space-y-6 mb-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner dark:bg-slate-800 dark:text-blue-400">
          <ShieldCheck className="h-6 w-6 animate-pulse" />
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Privacy Policies
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Official privacy declarations for our kids learning games and software products. We design educational games with children's safety, strict privacy, and COPPA compliance in mind.
        </p>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800/60 pt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          Available Game Policies ({policiesList.length})
        </h2>

        {policiesList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 font-medium dark:bg-slate-900/40 dark:border-slate-800/50">
            No policy documents have been compiled yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {policiesList.map(([slug, policy]) => (
              <Link
                key={slug}
                href={`/privacy-policy/${slug}`}
                className="group block rounded-2xl border border-slate-200/80 bg-white dark:bg-slate-900/20 dark:border-slate-800/80 p-6 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white shadow-sm shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    Kids Learning Game
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors leading-snug">
                  {policy.appName}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  Effective: {policy.effectiveDate}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                  <span>Read Policy</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="border-t border-slate-100 dark:border-slate-800/60 mt-16 pt-8 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <p>&copy; {new Date().getFullYear()} Rajesh Tiwari. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="h-3 w-3 text-red-500 fill-red-100" /> for young learners.
        </p>
      </div>
    </div>
  );
}
