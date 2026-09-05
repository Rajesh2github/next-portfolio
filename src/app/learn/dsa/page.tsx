"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useLearningState } from "@/lib/hooks/use-learning-state";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Code,
  Flame,
  List,
  Map,
  RotateCcw,
  Sparkles,
  Trophy
} from "lucide-react";
import { dsaProblems } from "@/content/dsa";
import { DSAProblem } from "@/types/dsa";

function LearnDashboardContent() {
  const { user, isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL parameters for active state
  const currentTab = searchParams.get("tab") || "dashboard";
  const activePattern = searchParams.get("pattern") || "";
  const activeTopic = searchParams.get("topic") || "";
  const searchQuery = searchParams.get("search") || "";

  const { bookmarks, completed, toggleBookmark } = useLearningState();

  // Intent-preserving effect: trigger pending bookmark once authenticated
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      try {
        const pendingId = sessionStorage.getItem("pending-bookmark-action");
        if (pendingId) {
          sessionStorage.removeItem("pending-bookmark-action");
          toggleBookmark(pendingId);
        }
      } catch (e) {
        console.error("Failed to handle pending action", e);
      }
    }
  }, [isLoaded, isSignedIn, toggleBookmark]);

  // Handle bookmark toggle
  const handleBookmarkToggle = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Principle 3: If not authenticated, open login modal and preserve user intent
    if (!isSignedIn) {
      try {
        sessionStorage.setItem("pending-bookmark-action", id);
        clerk.openSignIn({
          forceRedirectUrl: window.location.href,
        });
      } catch (err) {
        console.error("Failed to trigger sign in", err);
      }
      return;
    }

    toggleBookmark(id);
  };

  // Filter problems based on active parameters
  const getFilteredProblems = (): DSAProblem[] => {
    let list = dsaProblems;

    // Filter by Tab (Bookmarks)
    if (currentTab === "bookmarks") {
      list = list.filter((p) => bookmarks.includes(p.id));
    }

    // Filter by Pattern
    if (activePattern) {
      list = list.filter((p) =>
        p.patterns.some((pat) => pat.toLowerCase() === activePattern.toLowerCase())
      );
    }

    // Filter by Topic
    if (activeTopic) {
      list = list.filter((p) =>
        p.topics.some((top) => top.toLowerCase() === activeTopic.toLowerCase())
      );
    }

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.patterns.some((pat) => pat.toLowerCase().includes(query)) ||
          p.topics.some((top) => top.toLowerCase().includes(query))
      );
    }

    return list;
  };

  const filteredProblems = getFilteredProblems();

  // Helper to clear filters
  const resetFilters = () => {
    router.push("/learn/dsa?tab=dashboard");
  };

  // Static stats calculation
  const totalCount = dsaProblems.length;
  const easyCount = dsaProblems.filter((p) => p.difficulty === "easy").length;
  const mediumCount = dsaProblems.filter((p) => p.difficulty === "medium").length;
  const bookmarkedCount = bookmarks.length;
  const completedCount = completed.length;

  if (currentTab === "roadmap") {
    // Progress computations for each Phase
    const ntProblems = dsaProblems.filter((p) => p.patterns.includes("Number Theory"));
    const ntCompleted = ntProblems.filter((p) => completed.includes(p.id)).length;
    const ntPercentage = ntProblems.length > 0 ? Math.round((ntCompleted / ntProblems.length) * 100) : 0;

    const arrProblems = dsaProblems.filter((p) => p.patterns.includes("Arrays"));
    const arrCompleted = arrProblems.filter((p) => completed.includes(p.id)).length;
    const arrPercentage = arrProblems.length > 0 ? Math.round((arrCompleted / arrProblems.length) * 100) : 0;

    const tpProblems = dsaProblems.filter((p) => p.patterns.includes("Two Pointer"));
    const tpCompleted = tpProblems.filter((p) => completed.includes(p.id)).length;
    const tpPercentage = tpProblems.length > 0 ? Math.round((tpCompleted / tpProblems.length) * 100) : 0;

    const bsProblems = dsaProblems.filter((p) => p.patterns.includes("Binary Search"));
    const bsCompleted = bsProblems.filter((p) => completed.includes(p.id)).length;
    const bsPercentage = bsProblems.length > 0 ? Math.round((bsCompleted / bsProblems.length) * 100) : 0;

    return (
      <div className="space-y-6">
        {/* Roadmap Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Map className="h-4 w-4" />
                Step-by-Step Curriculum
              </div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                DSA Roadmap
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                Master core data structures and algorithms systematically. We recommend starting with Mathematics/Number Theory and progressing towards linear structures, binary search, and complexity scaling.
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-inner">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative border-l border-slate-200 pl-6 ml-4 space-y-12">
          
          {/* Phase 1: Number Theory */}
          <div className="relative">
            <span className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ${
              ntPercentage === 100 ? "bg-green-600 ring-green-100" : "bg-blue-600 ring-blue-50"
            }`} />
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phase 1</span>
                {ntPercentage === 100 && (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Completed</span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-1">Mathematics & Number Theory</h3>
              <p className="text-xs text-slate-500 mt-1">
                The foundation of analytical problem solving. Learn GCD, LCM, Prime Sieve, and factorization boundaries.
              </p>
              
              {/* Progress Bar */}
              <div className="flex items-center gap-3 mt-3 max-w-md">
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${ntPercentage}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 shrink-0">
                  {ntCompleted}/{ntProblems.length} ({ntPercentage}%)
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {ntProblems.map((p) => {
                  const isDone = completed.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => router.push(`/learn/dsa/problems/${p.slug}`)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        isDone
                          ? "border-green-200 bg-green-50/55 text-green-700 hover:bg-green-50 hover:border-green-300"
                          : "border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 fill-green-50" />
                      ) : (
                        <Code className="h-3.5 w-3.5 text-slate-400" />
                      )}
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Phase 2: Array Traversals & Hashmaps */}
          <div className="relative">
            <span className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ${
              arrPercentage === 100 ? "bg-green-600 ring-green-100" : "bg-slate-200 ring-slate-50"
            }`} />
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phase 2</span>
                {arrPercentage === 100 && (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Completed</span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-1">Arrays & Frequency Tables</h3>
              <p className="text-xs text-slate-500 mt-1">
                Linear arrays, prefix-sum queries, traversal optimizations, and fast constant-time frequency hashes.
              </p>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 mt-3 max-w-md">
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${arrPercentage}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 shrink-0">
                  {arrCompleted}/{arrProblems.length} ({arrPercentage}%)
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {arrProblems.map((p) => {
                  const isDone = completed.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => router.push(`/learn/dsa/problems/${p.slug}`)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        isDone
                          ? "border-green-200 bg-green-50/55 text-green-700 hover:bg-green-50 hover:border-green-300"
                          : "border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 fill-green-50" />
                      ) : (
                        <Code className="h-3.5 w-3.5 text-slate-400" />
                      )}
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Phase 3: Two Pointers */}
          <div className="relative">
            <span className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ${
              tpPercentage === 100 ? "bg-green-600 ring-green-100" : "bg-slate-200 ring-slate-50"
            }`} />
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phase 3</span>
                {tpPercentage === 100 && (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Completed</span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-1">Two Pointer Strategy</h3>
              <p className="text-xs text-slate-500 mt-1">
                Iterate on sorted spaces inwards or maintain dual indexes to reduce O(N^2) checks to N times.
              </p>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 mt-3 max-w-md">
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${tpPercentage}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 shrink-0">
                  {tpCompleted}/{tpProblems.length} ({tpPercentage}%)
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {tpProblems.map((p) => {
                  const isDone = completed.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => router.push(`/learn/dsa/problems/${p.slug}`)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        isDone
                          ? "border-green-200 bg-green-50/55 text-green-700 hover:bg-green-50 hover:border-green-300"
                          : "border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 fill-green-50" />
                      ) : (
                        <Code className="h-3.5 w-3.5 text-slate-400" />
                      )}
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Phase 4: Binary Search */}
          <div className="relative">
            <span className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ${
              bsPercentage === 100 ? "bg-green-600 ring-green-100" : "bg-slate-200 ring-slate-50"
            }`} />
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phase 4</span>
                {bsPercentage === 100 && (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Completed</span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-1">Binary Search & Logarithmic Space</h3>
              <p className="text-xs text-slate-500 mt-1">
                Locating keys or lower-bounds in structured datasets in O(log N) operations.
              </p>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 mt-3 max-w-md">
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${bsPercentage}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 shrink-0">
                  {bsCompleted}/{bsProblems.length} ({bsPercentage}%)
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {bsProblems.map((p) => {
                  const isDone = completed.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => router.push(`/learn/dsa/problems/${p.slug}`)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        isDone
                          ? "border-green-200 bg-green-50/55 text-green-700 hover:bg-green-50 hover:border-green-300"
                          : "border-slate-100 bg-slate-50 text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 fill-green-50" />
                      ) : (
                        <Code className="h-3.5 w-3.5 text-slate-400" />
                      )}
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Top Hero Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Flame className="h-4 w-4 fill-blue-100" />
              Start Solving Today
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {isLoaded && user ? `Hello, ${user.firstName || "Rajesh"}!` : "Welcome back!"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Select a category in the sidebar or dive into problems below. Boost your algorithmic reasoning.
            </p>
          </div>
          
          {/* Quick Metrics */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 shadow-inner">
            <div className="text-center px-2 border-r border-slate-200">
              <span className="block text-lg font-black text-slate-800">{totalCount}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Problems</span>
            </div>
            <div className="text-center px-2 border-r border-slate-200">
              <span className="block text-lg font-black text-green-600">{easyCount}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Easy</span>
            </div>
            <div className="text-center px-2 border-r border-slate-200">
              <span className="block text-lg font-black text-amber-500">{mediumCount}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Medium</span>
            </div>
            <div className="text-center px-2 border-r border-slate-200">
              <span className="block text-lg font-black text-blue-600">{bookmarkedCount}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Saved</span>
            </div>
            <div className="text-center px-2">
              <span className="block text-lg font-black text-emerald-600">{completedCount}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Solved</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER NOTIFICATION STATE */}
      {(activePattern || activeTopic || searchQuery || currentTab === "bookmarks") && (
        <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm text-blue-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <span>Filtering by:</span>
            {currentTab === "bookmarks" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold">
                Bookmarks
              </span>
            )}
            {activePattern && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold">
                Pattern: {activePattern}
              </span>
            )}
            {activeTopic && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold">
                Topic: {activeTopic}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold">
                Search: &quot;{searchQuery}&quot;
              </span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      )}

      {/* PROBLEMS CONTENT CONTAINER */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex h-12 items-center justify-between border-b border-slate-100 bg-slate-50 px-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {currentTab === "bookmarks" ? "Saved Bookmarks" : "Algorithmic Challenges"} ({filteredProblems.length})
          </span>
          <List className="h-4.5 w-4.5 text-slate-400" />
        </div>

        {/* Empty state */}
        {filteredProblems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Trophy className="h-10 w-10 text-slate-300 mb-3" />
            <h3 className="font-display text-base font-bold text-slate-800">No Problems Found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
             We couldn&apos;t find any challenges matching your current search queries or filters. Try resetting filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              Show All Problems
            </button>
          </div>
        ) : (
          /* Problems List (Table UI) */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="px-6 py-4 w-12 text-center">Save</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4 hidden md:table-cell">Pattern</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Topics</th>
                  <th className="px-6 py-4 text-center w-24">Difficulty</th>
                  <th className="px-6 py-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProblems.map((problem) => {
                  const isBookmarked = bookmarks.includes(problem.id);
                  return (
                    <tr
                      key={problem.id}
                      onClick={() => router.push(`/learn/dsa/problems/${problem.slug}`)}
                      className="group cursor-pointer hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Bookmark Trigger */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={(e) => handleBookmarkToggle(problem.id, e)}
                          className="rounded p-1.5 text-slate-300 hover:bg-slate-100 hover:text-blue-600 transition"
                          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark problem"}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="h-4.5 w-4.5 text-blue-600" />
                          ) : (
                            <Bookmark className="h-4.5 w-4.5 text-slate-400 opacity-60 group-hover:opacity-100" />
                          )}
                        </button>
                      </td>

                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {problem.title}
                        </div>
                      </td>

                      {/* Pattern */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                          {problem.patterns[0]}
                        </span>
                      </td>

                      {/* Topics */}
                      <td className="px-6 py-4 hidden sm:table-cell max-w-xs truncate">
                        <div className="flex flex-wrap gap-1">
                          {problem.topics.slice(0, 2).map((topic) => (
                            <span
                              key={topic}
                              className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600"
                            >
                              {topic}
                            </span>
                          ))}
                          {problem.topics.length > 2 && (
                            <span className="text-[10px] text-slate-400 font-bold">
                              +{problem.topics.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Difficulty */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            problem.difficulty === "easy"
                              ? "bg-green-100 text-green-700"
                              : problem.difficulty === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition">
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearnDashboard() {
  return (
    <Suspense fallback={
      <div className="flex h-32 items-center justify-center">
        <div className="text-sm font-semibold text-slate-500 animate-pulse">Loading dashboard...</div>
      </div>
    }>
      <LearnDashboardContent />
    </Suspense>
  );
}
