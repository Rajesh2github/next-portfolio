"use client";

import React, { use, useState, useEffect, Suspense } from "react";
import { Track } from "@/types/learn";
import { getTopicBySlug, getMcqsForTopic } from "@/lib/learn/loader";
import { useLearningState } from "@/lib/hooks/use-learning-state";
import { useUser, useClerk } from "@clerk/nextjs";
import { ErrorState, EmptyState } from "@/components/learn/states";
import McqQuiz from "@/components/learn/mcq-quiz";
import Link from "next/link";
import {
  ChevronLeft,
  Bookmark,
  BookmarkCheck,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2
} from "lucide-react";

interface TopicPageProps {
  params: Promise<{ track: string; slug: string }>;
}

// Custom simple parser to render basic markdown structures beautifully in Tailwind (zero-dependency)
function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeLines: string[] = [];

  return lines.map((line, idx) => {
    // 1. Handle Code Blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const codeText = codeLines.join("\n");
        codeLines = [];
        return (
          <pre key={idx} className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-slate-800 my-4 leading-relaxed">
            <code>{codeText}</code>
          </pre>
        );
      } else {
        inCodeBlock = true;
        return null;
      }
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return null;
    }

    // 2. Headers
    if (line.startsWith("### ")) {
      return (
        <h4 key={idx} className="text-sm font-black text-slate-800 uppercase tracking-wider mt-5 mb-2 font-display">
          {line.replace("### ", "")}
        </h4>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h3 key={idx} className="text-base font-black text-slate-900 border-b border-slate-100 pb-2 mt-6 mb-3 font-display">
          {line.replace("## ", "")}
        </h3>
      );
    }

    // 3. Bullet points
    if (line.startsWith("- ")) {
      return (
        <li key={idx} className="list-disc pl-2 ml-5 text-xs font-medium text-slate-600 leading-relaxed my-1">
          {line.replace("- ", "")}
        </li>
      );
    }

    // 4. Empty line
    if (line.trim() === "") {
      return <div key={idx} className="h-2" />;
    }

    // 5. Standard paragraph
    return (
      <p key={idx} className="text-xs font-medium text-slate-600 leading-relaxed my-2">
        {line}
      </p>
    );
  }).filter(Boolean) as React.ReactNode[];
}

function TopicDetailContent({ track, slug }: { track: Track; slug: string }) {
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const topic = getTopicBySlug(track, slug);

  const { bookmarks, completed, toggleBookmark, toggleCompleted } = useLearningState();

  const isBookmarked = topic ? bookmarks.includes(topic.id) : false;
  const isCompleted = topic ? completed.includes(topic.id) : false;

  // Intent-preserving login effects
  useEffect(() => {
    if (isLoaded && isSignedIn && topic) {
      try {
        const pendingBookmarkId = sessionStorage.getItem("pending-bookmark-action");
        if (pendingBookmarkId === topic.id) {
          sessionStorage.removeItem("pending-bookmark-action");
          toggleBookmark(topic.id);
        }

        const pendingCompletedId = sessionStorage.getItem("pending-completed-action");
        if (pendingCompletedId === topic.id) {
          sessionStorage.removeItem("pending-completed-action");
          toggleCompleted(topic.id);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isLoaded, isSignedIn, topic, toggleBookmark, toggleCompleted]);

  if (!topic) {
    return (
      <EmptyState
        title="Topic Lesson Not Found"
        description="We are currently writing the syllabus explanation for this topic."
        actionText="Back to Syllabus"
        onAction={() => window.location.replace(`/learn/${track}`)}
      />
    );
  }

  const mcqs = getMcqsForTopic(track, topic.id);

  const handleBookmarkToggle = () => {
    if (!isSignedIn) {
      sessionStorage.setItem("pending-bookmark-action", topic.id);
      clerk.openSignIn({ forceRedirectUrl: window.location.href });
      return;
    }
    toggleBookmark(topic.id);
  };

  const handleCompletedToggle = () => {
    if (!isSignedIn) {
      sessionStorage.setItem("pending-completed-action", topic.id);
      clerk.openSignIn({ forceRedirectUrl: window.location.href });
      return;
    }
    toggleCompleted(topic.id);
  };

  return (
    <div className="space-y-8 w-full">
      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href={`/learn/${track}`} className="hover:text-blue-600 flex items-center gap-1 font-semibold transition">
            <ChevronLeft className="h-3 w-3" />
            {track === "javascript" ? "JavaScript" : "TypeScript"}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-400">{topic.category}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold truncate max-w-[150px] sm:max-w-none">{topic.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Trigger */}
          <button
            onClick={handleBookmarkToggle}
            className={`flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold shadow-sm transition hover:bg-slate-50 ${
              isBookmarked ? "text-blue-600 border-blue-200 bg-blue-50/20" : "text-slate-600"
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="h-4 w-4 text-blue-600" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                <span>Save</span>
              </>
            )}
          </button>

          {/* Completion Trigger */}
          <button
            onClick={handleCompletedToggle}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm transition ${
              isCompleted
                ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <CheckCircle2 className={`h-4 w-4 ${isCompleted ? "text-white" : "text-slate-400"}`} />
            <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header Block */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[9px] font-black text-blue-600 uppercase tracking-wide">
              {topic.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <Clock className="h-3.5 w-3.5" />
              {topic.estimatedMinutes} Mins Read
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl leading-snug">
            {topic.title}
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            {topic.description}
          </p>
        </div>
      </div>

      {/* Markdown Content (Split layout or Single column) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Dynamic Markdown Content */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 md:p-8 shadow-sm prose max-w-none">
          <div className="space-y-4">
            {renderMarkdown(topic.content)}
          </div>
        </div>

        {/* Right: Interactive Knowledge Check Quiz */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-blue-50/30 border border-blue-100/50 p-5 flex flex-col gap-2 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              Day Core Standard
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              After reading through the scoping environment above, attempt the live code quiz to confirm your memory structures are solidified!
            </p>
          </div>

          <McqQuiz questions={mcqs} />
        </div>
      </div>
    </div>
  );
}

export default function TopicPage({ params }: TopicPageProps) {
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
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-slate-400">Loading lesson...</div>}>
      <TopicDetailContent track={normalizedTrack as Track} slug={slug} />
    </Suspense>
  );
}
