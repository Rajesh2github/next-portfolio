import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { privacyPolicies } from "@/content/privacy-policy";
import { ArrowLeft, Mail, Calendar, Sparkles, Heart } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for play store crawler parsing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = privacyPolicies[slug];

  if (!policy) {
    return {
      title: "Policy Not Found",
    };
  }

  return {
    title: `${policy.title}`,
    description: `Official privacy policy statements for the ${policy.appName} mobile application.`,
  };
}

export default function PrivacyPolicyDetail({ params }: PageProps) {
  const { slug } = use(params);
  const policy = privacyPolicies[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[800px] px-6 py-12">
      {/* Back Link to Directories */}
      <Link
        href="/privacy-policy"
        className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition duration-300 mb-8"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        All Privacy Policies
      </Link>

      {/* Header Banner */}
      <div className="space-y-6 border-b border-slate-100 dark:border-slate-800/60 pb-8 mb-10">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white shadow-sm shrink-0">
            <Sparkles className="h-3 w-3" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
            Official Play Store Privacy Statement
          </span>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          {policy.title}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 px-2.5 py-1 rounded-md">
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
            <span>Effective: {policy.effectiveDate}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 px-2.5 py-1 rounded-md">
            <Mail className="h-3.5 w-3.5 text-blue-500" />
            <span>Support: {policy.contactEmail}</span>
          </div>
        </div>
      </div>

      {/* Structured Legal Content */}
      <main className="space-y-10">
        {policy.sections.map((section, idx) => (
          <div key={idx} className="space-y-3.5 group">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug">
              {section.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {section.content}
            </p>
          </div>
        ))}
      </main>

      {/* Footer Branding */}
      <div className="border-t border-slate-100 dark:border-slate-800/60 mt-20 pt-8 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <p>&copy; {new Date().getFullYear()} Rajesh Tiwari. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="h-3 w-3 text-red-500 fill-red-100" /> for kids safety.
        </p>
      </div>
    </div>
  );
}
