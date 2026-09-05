"use client";

import React, { use, Suspense } from "react";
import { Track, Release, ReleaseFeature } from "@/types/learn";
import { getReleaseBySlug, getReleaseFeatures } from "@/lib/learn/loader";
import { ErrorState, EmptyState } from "@/components/learn/states";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Sparkles,
  ArrowRight,
  Code,
  Layers,
  Award
} from "lucide-react";

interface ReleasePageProps {
  params: Promise<{ track: string; slug: string }>;
}

// Reuse our custom zero-dependency syntax tokenizer highlighting for comparison boxes
function highlightCode(code: string, lang: string): string {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/(\/\/.*|#.*)/g, '<span class="text-slate-500 font-normal italic">$1</span>');
  html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-400 font-medium">$1$2$1</span>');
  html = html.replace(/\b(\d+)\b(?![^<>]*>)/g, '<span class="text-amber-400">$1</span>');

  const controlsRegex = /\b(return|if|else|elif|for|while|break|continue|in|and|or|not)\b(?![^<>]*>)/g;
  const definitionsRegex = /\b(function|const|let|var|class|export|import|from|as|def|public|private|static|package|func|type|struct|chan|go|interface|long\s+long)\b(?![^<>]*>)/g;
  const typesRegex = /\b(number|string|boolean|int|long|double|void|int64|vector|size_t|List|ArrayList|Integer)\b(?![^<>]*>)/g;

  html = html.replace(controlsRegex, '<span class="text-pink-400 font-semibold">$1</span>');
  html = html.replace(definitionsRegex, '<span class="text-sky-400 font-semibold">$1</span>');
  html = html.replace(typesRegex, '<span class="text-teal-400 font-medium">$1</span>');

  return html;
}

function ReleaseDetailContent({ track, slug }: { track: Track; slug: string }) {
  const release = getReleaseBySlug(track, slug);

  if (!release) {
    return (
      <EmptyState
        title="Release Timeline Not Found"
        description="We are currently compiling historical features for this release."
        actionText="Back to Track"
        onAction={() => window.location.replace(`/learn/${track}`)}
      />
    );
  }

  const features = getReleaseFeatures(track, release.id);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href={`/learn/${track}`} className="hover:text-blue-600 flex items-center gap-1 font-semibold transition">
            <ChevronLeft className="h-3 w-3" />
            {track === "javascript" ? "JavaScript" : "TypeScript"}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-400">Releases</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold truncate max-w-[150px] sm:max-w-none">{release.release}</span>
        </div>
      </div>

      {/* Main Release Header card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[9px] font-black text-blue-600 uppercase tracking-wide">
              Evolution Milestone
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <Calendar className="h-3.5 w-3.5" />
              Published in {release.year}
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl leading-snug">
            {release.title}
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            {release.description}
          </p>
        </div>
      </div>

      {/* Features Deep Dive Timeline List */}
      <div className="space-y-8">
        <div className="flex h-10 items-center border-b border-slate-200 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-blue-500" />
            Major Features In {release.release} ({features.length})
          </h3>
        </div>

        {features.length === 0 ? (
          <EmptyState description="Features list is currently being structured." />
        ) : (
          <div className="space-y-12">
            {features.map((feature, idx) => (
              <div key={feature.id} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
                {/* Feature Header */}
                <div className="space-y-1.5 border-b border-slate-100 pb-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Feature {idx + 1}</div>
                  <h4 className="font-display text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                  {feature.explanation}
                </p>

                {/* Side-by-side Before/After Code Comparisons (Principle 19) */}
                {(feature.beforeExample || feature.afterExample) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Before Block */}
                    {feature.beforeExample && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded">
                          Before {release.release} / Legacy
                        </span>
                        <pre className="m-0 bg-slate-900 text-[#f1f5f9] p-3 rounded-xl overflow-x-auto text-[11px] font-mono border border-slate-800 leading-relaxed h-48 select-text">
                          <code
                            dangerouslySetInnerHTML={{
                              __html: highlightCode(feature.beforeExample, track)
                            }}
                          />
                        </pre>
                      </div>
                    )}

                    {/* After Block */}
                    {feature.afterExample && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          After {release.release} / Modern
                        </span>
                        <pre className="m-0 bg-slate-900 text-[#f1f5f9] p-3 rounded-xl overflow-x-auto text-[11px] font-mono border border-slate-800 leading-relaxed h-48 select-text">
                          <code
                            dangerouslySetInnerHTML={{
                              __html: highlightCode(feature.afterExample, track)
                            }}
                          />
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReleasePage({ params }: ReleasePageProps) {
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
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-slate-400">Loading release details...</div>}>
      <ReleaseDetailContent track={normalizedTrack as Track} slug={slug} />
    </Suspense>
  );
}
