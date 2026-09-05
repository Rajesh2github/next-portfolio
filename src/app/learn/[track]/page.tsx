"use client";

import React, { use, useState, Suspense, useEffect } from "react";
import { Track } from "@/types/learn";
import { getTopics, getChallengeDays, getInterviewQuestions, getReleases } from "@/lib/learn/loader";
import { useLearningState } from "@/lib/hooks/use-learning-state";
import TrackSwitcher from "@/components/learn/track-switcher";
import { ErrorState, EmptyState } from "@/components/learn/states";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Brain,
  Code,
  Flame,
  Layout,
  Network,
  HelpCircle,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
  Settings,
  ShieldAlert,
  Bookmark,
  Calendar
} from "lucide-react";

interface TrackPageProps {
  params: Promise<{ track: string }>;
}

const trackDetails: Record<Track, {
  name: string;
  tagline: string;
  description: string;
  badge: string;
  colorClass: string;
  bgClass: string;
}> = {
  javascript: {
    name: "JavaScript Core",
    tagline: "The Pillar of Modern Web Applications",
    description: "Master prototypes, functional scopes, async execution flows, event loops, closure allocations, and ECMAScript features.",
    badge: "60-Day JS Challenge",
    colorClass: "text-amber-500 border-amber-200 bg-amber-50/20",
    bgClass: "from-amber-500/5 to-amber-500/0 border-amber-100",
  },
  typescript: {
    name: "TypeScript Professional",
    tagline: "Type-Safe Application Scaling",
    description: "Learn advanced generic parameters, type narrowing, conditional types, mapped typings, decorators, and declarations merging.",
    badge: "Structured TS Path",
    colorClass: "text-blue-600 border-blue-200 bg-blue-50/20",
    bgClass: "from-blue-600/5 to-blue-600/0 border-blue-100",
  },
};

function TrackDashboardContent({ track }: { track: Track }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookmarks } = useLearningState();

  const tabParam = searchParams.get("tab") || "syllabus";
  
  // Resolve activeTab based on standard and sidebar-redirecting parameters
  let activeTab: "syllabus" | "challenges" | "interview" | "evolution" | "bookmarks" = "syllabus";
  if (tabParam === "challenges" || tabParam === "roadmap") {
    activeTab = "challenges";
  } else if (tabParam === "interview") {
    activeTab = "interview";
  } else if (tabParam === "evolution") {
    activeTab = "evolution";
  } else if (tabParam === "bookmarks") {
    activeTab = "bookmarks";
  }

  const handleTabChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    // When changing tabs, clear specific query parameters to reset filters
    params.delete("topic");
    router.push(`/learn/${track}?${params.toString()}`);
  };

  const activeTopic = searchParams.get("topic") || "";
  const searchQuery = searchParams.get("search") || "";

  const details = trackDetails[track];
  const topics = getTopics(track);
  const challenges = getChallengeDays(track);
  const interviews = getInterviewQuestions(track);
  const releases = getReleases(track);

  // Dynamic filter lists for Syllabus Topics (Principle 11)
  let filteredTopics = topics;
  
  if (activeTopic) {
    filteredTopics = filteredTopics.filter(
      (t) => t.category.toLowerCase() === activeTopic.toLowerCase()
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTopics = filteredTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
    );
  }

  return (
    <div className="space-y-8">
      {/* Dynamic Track Header Banner */}
      <div className={`rounded-3xl border bg-gradient-to-b p-6 md:p-8 shadow-sm ${details.bgClass}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider border ${details.colorClass}`}>
              {details.badge}
            </span>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {details.name}
            </h1>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {details.tagline}
            </p>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed pt-1.5">
              {details.description}
            </p>
          </div>
          <TrackSwitcher activeTrack={track} />
        </div>
      </div>

      {/* Sub-tabs Selection */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-6 pb-px scrollbar-none">
        {[
          { id: "syllabus", label: "Syllabus Topics", count: topics.length },
          { id: "challenges", label: "Challenge Days", count: challenges.length },
          { id: "interview", label: "Interview Q&A", count: interviews.length },
          { id: "evolution", label: `${track === "javascript" ? "ECMAScript" : "TS"} Releases`, count: releases.length },
          { id: "bookmarks", label: "Bookmarks", count: topics.filter(t => bookmarks.includes(t.id)).length + interviews.filter(i => bookmarks.includes(i.id)).length },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`pb-3 text-sm font-bold border-b-2 transition-all duration-300 relative shrink-0 ${
                isSelected
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENTS */}

      {/* 1. SYLLABUS TAB */}
      {activeTab === "syllabus" && (
        <div className="space-y-6">
          {filteredTopics.length === 0 ? (
            <EmptyState description="We are currently compiling lessons for this curriculum path." />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => router.push(`/learn/${track}/topics/${topic.slug}`)}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded bg-slate-50 border border-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase">
                        {topic.category}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                        topic.difficulty === "easy" || topic.difficulty === "beginner"
                          ? "bg-green-100 text-green-700"
                          : topic.difficulty === "medium" || topic.difficulty === "intermediate"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {topic.difficulty}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {topic.estimatedMinutes} Mins
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      Read Topic
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. CHALLENGES TAB */}
      {activeTab === "challenges" && (
        <div className="space-y-6">
          {challenges.length === 0 ? (
            <EmptyState description="The structured daily challenges are currently being assembled." />
          ) : (
            <div className="space-y-4 max-w-3xl">
              {challenges.map((day) => (
                <div
                  key={day.day}
                  onClick={() => router.push(`/learn/${track}/challenge/${day.day}`)}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-black text-sm shrink-0 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition">
                      Day {day.day}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {day.title}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t border-slate-50 sm:border-0 shrink-0">
                    <div className="flex gap-1.5">
                      <span className="inline-flex items-center rounded bg-slate-50 border border-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                        {day.mcqIds.length} MCQs
                      </span>
                      <span className="inline-flex items-center rounded bg-slate-50 border border-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                        {day.problemIds.length} Probs
                      </span>
                    </div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. INTERVIEW TAB */}
      {activeTab === "interview" && (
        <div className="space-y-6">
          {interviews.length === 0 ? (
            <EmptyState description="Curated interview questions are currently being loaded into our bank." />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {interviews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/learn/${track}/interview/${item.slug}`)}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded bg-slate-50 border border-slate-100 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 uppercase">
                        {item.questionType}
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

                    <h4 className="font-display text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.question}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic bg-slate-50 p-2.5 rounded border border-slate-100">
                      &ldquo;{item.shortAnswer}&rdquo;
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span className="flex items-center gap-1 shrink-0">
                      <Award className="h-3.5 w-3.5 text-blue-500" />
                      Q&A Sheet
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      View Q&A
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. EVOLUTION TAB */}
      {activeTab === "evolution" && (
        <div className="space-y-6">
          {releases.length === 0 ? (
            <EmptyState description="The release history timeline is currently being curated." />
          ) : (
            <div className="relative border-l border-slate-200 pl-6 ml-4 space-y-12 max-w-2xl py-2">
              {releases.map((release) => (
                <div key={release.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-blue-50" />
                  <div
                    onClick={() => router.push(`/learn/${track}/releases/${release.slug}`)}
                    className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-500 hover:shadow-md transition duration-300"
                  >
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {release.year} — {release.release}
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {release.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>{release.featureIds.length} Major Features</span>
                      <span className="text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore Features
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. BOOKMARKS TAB */}
      {activeTab === "bookmarks" && (
        <div className="space-y-8">
          {topics.filter((t) => bookmarks.includes(t.id)).length === 0 &&
          interviews.filter((i) => bookmarks.includes(i.id)).length === 0 ? (
            <EmptyState description="You haven't saved any bookmarks inside this track yet. Click the bookmark icon on any syllabus topic or interview card to save it here!" />
          ) : (
            <div className="space-y-8">
              {/* Bookmarked Topics */}
              {topics.filter((t) => bookmarks.includes(t.id)).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    Saved Syllabus Topics
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {topics
                      .filter((t) => bookmarks.includes(t.id))
                      .map((topic) => (
                        <div
                          key={topic.id}
                          onClick={() => router.push(`/learn/${track}/topics/${topic.slug}`)}
                          className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <span className="inline-flex items-center rounded bg-slate-50 border border-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase">
                              {topic.category}
                            </span>
                            <h4 className="font-display text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                              {topic.title}
                            </h4>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-slate-400" />
                              {topic.estimatedMinutes} mins
                            </span>
                            <span className="text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              Study Lesson
                              <ChevronRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Bookmarked Interviews */}
              {interviews.filter((i) => bookmarks.includes(i.id)).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Brain className="h-4 w-4 text-blue-500" />
                    Saved Interview Cards
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {interviews
                      .filter((i) => bookmarks.includes(i.id))
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => router.push(`/learn/${track}/interview/${item.slug}`)}
                          className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <span className="inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-600 uppercase">
                              {item.difficulty} • {item.questionType}
                            </span>
                            <h4 className="font-display text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors mt-3 leading-snug">
                              {item.question}
                            </h4>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                            <span className="flex items-center gap-1">
                              <Sparkles className="h-3 w-3 text-blue-500" />
                              Interlinked
                            </span>
                            <span className="text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              View Q&A
                              <ChevronRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackPage({ params }: TrackPageProps) {
  const { track } = use(params);
  const normalizedTrack = track.toLowerCase();

  // Validate the track parameter (Principle 23 error safety)
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
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-slate-400">Loading curriculum...</div>}>
      <TrackDashboardContent track={normalizedTrack as Track} />
    </Suspense>
  );
}
