"use client";

import React, { use, useState, useEffect, Suspense } from "react";
import { Track, ChallengeDay, Topic, Mcq, CodingProblem } from "@/types/learn";
import { getChallengeDayByNum, getTopics, getCodingProblems } from "@/lib/learn/loader";
import { useLearningState } from "@/lib/hooks/use-learning-state";
import { useUser, useClerk } from "@clerk/nextjs";
import { ErrorState, EmptyState } from "@/components/learn/states";
import McqQuiz from "@/components/learn/mcq-quiz";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Code,
  Award,
  BookMarked
} from "lucide-react";

interface ChallengePageProps {
  params: Promise<{ track: string; day: string }>;
}

function ChallengeDayDetailContent({ track, dayNum }: { track: Track; dayNum: number }) {
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  const dayData = getChallengeDayByNum(track, dayNum);

  const { completed, toggleCompleted } = useLearningState();

  const isDayCompleted = completed.includes(`challenge-day-${track}-${dayNum}`);

  // Intent-preserving login effect (Principle 3)
  useEffect(() => {
    if (isLoaded && isSignedIn && dayData) {
      try {
        const pendingCompletedId = sessionStorage.getItem("pending-challenge-completed");
        if (pendingCompletedId === `challenge-day-${track}-${dayNum}`) {
          sessionStorage.removeItem("pending-challenge-completed");
          toggleCompleted(`challenge-day-${track}-${dayNum}`);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isLoaded, isSignedIn, dayData, track, dayNum, toggleCompleted]);

  if (!dayData) {
    return (
      <EmptyState
        title="Challenge Day Not Found"
        description={`We are currently compiling curriculum tasks for Day ${dayNum}.`}
        actionText="Back to Track"
        onAction={() => window.location.replace(`/learn/${track}`)}
      />
    );
  }

  // Load all actual reference models
  const allTopics = getTopics(track);
  const allProblems = getCodingProblems(track);

  const topics = allTopics.filter((t) => dayData.topicIds.includes(t.id));
  const problems = allProblems.filter((p) => dayData.problemIds.includes(p.id));

  // Load MCQ details connected to this challenge day
  // Since McqQuiz takes full Mcq shapes, and loader provides Mcqs, we pull the related ones
  const mcqs = getTopics(track)
    .flatMap((t) => dayData.topicIds.includes(t.id) ? getTopics(track) : []) // just a helper or loaded directly
    .flatMap(() => []); // placeholder if we don't have mcq items loaded directly. 
  // Wait, our loader has mcqs inside mcqsDB! Let's read from getMcqsForTopic or define getMcqsForChallengeDay in loader.
  // Actually, we can load MCQs matching dayData.mcqIds directly by querying them!
  // Let's check: our javascript.ts has `jsMcqs` and typescript.ts has `tsMcqs`. 
  // We can query them. To keep it simple, we can load all mcqs from topics, or query directly:
  // Let's create a custom list or query them. Since dayData.mcqIds is given, let's pull those!
  // In Javascript track: dayData.mcqIds has ["js-closures-mcq-001"]. In typescript.ts, ["ts-interfaces-mcq-001"].
  // We can write a direct query or load them.
  const dayMcqs = getTopics(track)
    .flatMap((t) => getTopics(track)) // fallback
    .map(() => {
      // Since McqQuiz just expects an array of Mcq shapes, let's load them!
      // In JS, we can get them from the global loader. We will export a method getMcqsForChallengeDay or similar in loader if needed.
      // But actually, getRelatedContent or our loader database holds them. Let's write a simple selector.
      if (track === "javascript") {
        return require("@/content/learn/javascript").jsMcqs.filter((m: any) => dayData.mcqIds.includes(m.id));
      } else {
        return require("@/content/learn/typescript").tsMcqs.filter((m: any) => dayData.mcqIds.includes(m.id));
      }
    })[0] || [];

  const handleCompletedToggle = () => {
    if (!isSignedIn) {
      sessionStorage.setItem("pending-challenge-completed", `challenge-day-${track}-${dayNum}`);
      clerk.openSignIn({ forceRedirectUrl: window.location.href });
      return;
    }
    toggleCompleted(`challenge-day-${track}-${dayNum}`);
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
          <span className="font-semibold text-slate-400">Daily Challenge</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold">Day {dayData.day}</span>
        </div>

        {/* Completion Toggle */}
        <button
          onClick={handleCompletedToggle}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm transition ${
            isDayCompleted
              ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <CheckCircle2 className={`h-4 w-4 ${isDayCompleted ? "text-white" : "text-slate-400"}`} />
          <span>{isDayCompleted ? "Day Completed" : "Mark Day Complete"}</span>
        </button>
      </div>

      {/* Challenge Day Title Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[9px] font-black text-blue-600 uppercase tracking-wide">
              Challenge Milestone
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <Clock className="h-3.5 w-3.5" />
              {dayData.estimatedMinutes} Mins Duration
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl leading-snug">
            Day {dayData.day}: {dayData.title}
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            {dayData.description}
          </p>
        </div>
      </div>

      {/* Tasks Partition */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Lessons & Problems Tasks (7 of 12) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex h-10 items-center border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookMarked className="h-4 w-4 text-blue-500" />
              Today&apos;s Curriculum Tasks
            </h3>
          </div>

          {/* Topics List */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Read & Study</h4>
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => router.push(`/learn/${track}/topics/${topic.slug}`)}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-4 hover:border-blue-500 hover:shadow-md transition duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="font-display text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-0.5">
                      Syllabus lesson • {topic.estimatedMinutes} Mins Read
                    </p>
                  </div>
                </div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                  <ChevronLeft className="h-4 w-4 rotate-180" />
                </span>
              </div>
            ))}
          </div>

          {/* Coding Problems */}
          {problems.length > 0 && (
            <div className="space-y-3 pt-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Coding Practice</h4>
              {problems.map((problem) => (
                <div
                  key={problem.id}
                  onClick={() => router.push(`/learn/dsa/problems/${problem.slug}?track=${track}`)} // Dynamic back-routing mapping
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-4 hover:border-blue-500 hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 shrink-0 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition">
                      <Code className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h5 className="font-display text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {problem.title}
                      </h5>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-0.5">
                        Coding challenge • {problem.difficulty}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: MCQ Quiz block (5 of 12) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex h-10 items-center border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-blue-500" />
              Day Knowledge Check
            </h3>
          </div>

          <McqQuiz questions={dayMcqs} />
        </div>
      </div>
    </div>
  );
}

export default function ChallengeDayPage({ params }: ChallengePageProps) {
  const { track, day } = use(params);
  const normalizedTrack = track.toLowerCase();
  const dayNum = Number(day);

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

  if (isNaN(dayNum)) {
    return (
      <div className="py-8">
        <ErrorState
          title="Invalid Challenge Day"
          description="The challenge day specified must be a valid number."
          actionText="Back to Curriculum"
          onAction={() => window.location.replace(`/learn/${normalizedTrack}`)}
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-slate-400">Loading daily tasks...</div>}>
      <ChallengeDayDetailContent track={normalizedTrack as Track} dayNum={dayNum} />
    </Suspense>
  );
}
