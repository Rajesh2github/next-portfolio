"use client";

import React, { use, Suspense } from "react";
import { Track } from "@/types/learn";
import { getInterviewQuestionBySlug, getCodingProblemBySlug } from "@/lib/learn/loader";
import { ErrorState, EmptyState } from "@/components/learn/states";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Award,
  HelpCircle,
  Building,
  CheckCircle2,
  Code,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface InterviewPageProps {
  params: Promise<{ track: string; slug: string }>;
}

function InterviewDetailContent({ track, slug }: { track: Track; slug: string }) {
  const router = useRouter();
  const item = getInterviewQuestionBySlug(track, slug);

  if (!item) {
    return (
      <EmptyState
        title="Question Not Found"
        description="We are currently compiling this interview question details."
        actionText="Back to Track"
        onAction={() => window.location.replace(`/learn/${track}`)}
      />
    );
  }

  // Find related problem details if any exist
  const relatedProblems = item.relatedProblemIds
    ? item.relatedProblemIds.map((probId) => {
        // Query the problem in our DSA library or custom DB
        // For simplicity, we can query it using the slug or loader
        // Since we know the loader can fetch by slug, and our seed DSA problems have slugs:
        if (probId === "js-counter-closure") {
          return { title: "Create Counter with Step Offset", slug: "counter-closure" };
        }
        if (probId === "ts-readonly-interface") {
          return { title: "Immutable User Profile Interface", slug: "readonly-interface" };
        }
        return null;
      }).filter(Boolean)
    : [];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href={`/learn/${track}`} className="hover:text-blue-600 flex items-center gap-1 font-semibold transition">
            <ChevronLeft className="h-3 w-3" />
            {track === "javascript" ? "JavaScript" : "TypeScript"}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-400">Interview Prep</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold truncate max-w-[150px] sm:max-w-none">{item.slug}</span>
        </div>
      </div>

      {/* Main Question Box */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[9px] font-black text-blue-600 uppercase tracking-wide">
            {item.questionType} Question
          </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${
            item.difficulty === "easy"
              ? "bg-green-100 text-green-700"
              : item.difficulty === "medium"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}>
            {item.difficulty}
          </span>
        </div>

        <h1 className="font-display text-lg font-extrabold text-slate-900 md:text-xl leading-snug">
          Q: {item.question}
        </h1>

        {/* Company Tags */}
        {item.companyTags && item.companyTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Building className="h-3.5 w-3.5" />
              Frequently Asked At:
            </span>
            {item.companyTags.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-md bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-[9px] font-bold text-slate-600 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Short Answer (Italicized Quote block) */}
      <div className="rounded-2xl border-l-4 border-blue-500 bg-blue-50/20 p-5 shadow-inner">
        <h5 className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1 flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
          The Quick Answer (TL;DR)
        </h5>
        <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
          &ldquo;{item.shortAnswer}&rdquo;
        </p>
      </div>

      {/* Detailed Explanation */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-blue-500" />
          Detailed Deep Dive
        </h4>
        <p className="text-xs font-medium text-slate-600 leading-relaxed whitespace-pre-line">
          {item.explanation}
        </p>
      </div>

      {/* Related Challenges */}
      {relatedProblems.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Code className="h-4 w-4 text-blue-500" />
            Apply Your Knowledge (Related Challenges)
          </h4>
          <div className="space-y-2.5">
            {relatedProblems.map((prob) => {
              if (!prob) return null;
              return (
                <div
                  key={prob.slug}
                  onClick={() => router.push(`/learn/dsa/problems/${prob.slug}?track=${track}`)} // Dynamic back-routing mapping
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-4 hover:border-blue-500 hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 shrink-0 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition">
                      <Code className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h5 className="font-display text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {prob.title}
                      </h5>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">
                        Interactive coding challenge
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InterviewQuestionPage({ params }: InterviewPageProps) {
  const { track, slug } = use(params);
  const normalizedTrack = track.toLowerCase();

  if (normalizedTrack !== "javascript" && normalizedTrack !== "typescript") {
    return (
      <div className="py-8">
        <ErrorState
          title="Invalid Learning Track"
          description={`"${track}" is not a recognized curriculum. Please choose either JavaScript or TypeScript.`}
          actionText="Back to Learning Hub"
          onAction={() => window.location.replace("/learn")}
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-slate-400">Loading interview details...</div>}>
      <InterviewDetailContent track={normalizedTrack as Track} slug={slug} />
    </Suspense>
  );
}
