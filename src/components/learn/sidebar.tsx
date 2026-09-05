"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Map,
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { dsaPatterns, dsaTopics } from "@/content/dsa";
import { getTopics } from "@/lib/learn/loader";
import { Track } from "@/types/learn";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LearnSidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getDynamicTitle = () => {
    if (pathname.includes("/dsa")) {
      return (
        <>
          Learn<span className="text-blue-600">DSA</span>
        </>
      );
    }
    if (pathname.includes("/javascript")) {
      return (
        <>
          Learn<span className="text-blue-600">JS</span>
        </>
      );
    }
    if (pathname.includes("/typescript")) {
      return (
        <>
          Learn<span className="text-blue-600">TS</span>
        </>
      );
    }
    if (pathname.includes("/html-css")) {
      return (
        <>
          Learn<span className="text-blue-600">HTML/CSS</span>
        </>
      );
    }
    if (pathname.includes("/system-design")) {
      return (
        <>
          Learn<span className="text-blue-600">SystemDesign</span>
        </>
      );
    }
    return (
      <>
        Learn<span className="text-blue-600">Portal</span>
      </>
    );
  };

  // Active state for STUDY section tabs
  const currentTab = searchParams.get("tab") || "dashboard";
  const activePattern = searchParams.get("pattern") || "";
  const activeTopic = searchParams.get("topic") || "";

  const segments = pathname.split("/").filter(Boolean);
  const currentTrack = (segments.length >= 2 ? segments[1] : "dsa") as Track | "dsa";
  const isDsa = currentTrack === "dsa";

  // Dynamically load topics categories for non-DSA tracks
  let trackCategories: string[] = [];
  if (!isDsa && (currentTrack === "javascript" || currentTrack === "typescript")) {
    try {
      const topics = getTopics(currentTrack);
      trackCategories = Array.from(new Set(topics.map((t) => t.category)));
    } catch (e) {
      console.error(e);
    }
  }

  // Browse Tabs: "patterns" | "topics"
  const [browseTab, setBrowseTab] = useState<"patterns" | "topics">("patterns");

  // Accordion toggle states
  const [patternsExpanded, setPatternsExpanded] = useState(true);
  const [topicsExpanded, setTopicsExpanded] = useState(true);

  const handleStudyTabClick = (tab: string) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    router.push(`/learn/${currentTrack}?${params.toString()}`);
    onClose(); // Close mobile drawer
  };

  const handlePatternClick = (pattern: string) => {
    const params = new URLSearchParams();
    params.set("tab", "dashboard");
    params.set("pattern", pattern);
    router.push(`/learn/${currentTrack}?${params.toString()}`);
    onClose();
  };

  const handleTopicClick = (topic: string) => {
    const params = new URLSearchParams();
    params.set("tab", "dashboard");
    params.set("topic", topic);
    router.push(`/learn/${currentTrack}?${params.toString()}`);
    onClose();
  };

  const clearFilters = () => {
    router.push(`/learn/${currentTrack}?tab=dashboard`);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container (Stretches all the way to the footer) */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white pt-16 transition-transform duration-300 lg:static lg:h-auto lg:min-h-full lg:bg-white lg:pt-0 lg:z-30 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Navigation Content */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 pt-3 pb-6">
          
          {/* Back to Portal Hub Link (Principle 9 Back trigger) */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-[10px] font-black text-slate-400 hover:text-blue-600 transition uppercase tracking-widest mb-3 px-3 hover:underline"
          >
            <ChevronLeft className="h-3 w-3" />
            Learning Hub
          </Link>

          {/* Sidebar Header Brand (Book SVG & Dynamic Selected Track Option) */}
          <div className="mb-4 px-3 flex items-center gap-2.5 text-[#0f172a] tracking-tight border-b border-slate-100/50 pb-3 select-none">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-white shadow-sm shrink-0">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="font-display text-sm font-bold tracking-tight">
              {getDynamicTitle()}
            </span>
          </div>

          {/* SECTION: STUDY */}
          <div className="mb-8">
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Study
            </h2>
            <nav className="space-y-1">
              {/* Dashboard */}
              <button
                onClick={() => handleStudyTabClick("dashboard")}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  currentTab === "dashboard" && !activePattern && !activeTopic
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <LayoutDashboard className="h-4.5 w-4.5" />
                <span>Dashboard</span>
              </button>

              {/* Roadmap */}
              <button
                onClick={() => handleStudyTabClick("roadmap")}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  currentTab === "roadmap"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Map className="h-4.5 w-4.5" />
                <span>Roadmap</span>
              </button>

              {/* Bookmarks */}
              <button
                onClick={() => handleStudyTabClick("bookmarks")}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  currentTab === "bookmarks"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Bookmark className="h-4.5 w-4.5" />
                <span>Bookmarks</span>
              </button>
            </nav>
          </div>

          {/* SECTION: BROWSE */}
          <div>
            <div className="mb-4 flex items-center justify-between px-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Browse
              </h2>
              {(activePattern || activeTopic) && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-medium text-blue-600 hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Sub-tabs or Categories based on track type */}
            {isDsa ? (
              <>
                {/* Sub-tabs: Patterns / Topics */}
                <div className="mb-4 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
                  <button
                    onClick={() => setBrowseTab("patterns")}
                    className={`flex items-center justify-center gap-1.5 rounded-md py-1 text-xs font-semibold transition ${
                      browseTab === "patterns"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Compass className="h-3.5 w-3.5" />
                    Patterns
                  </button>
                  <button
                    onClick={() => setBrowseTab("topics")}
                    className={`flex items-center justify-center gap-1.5 rounded-md py-1 text-xs font-semibold transition ${
                      browseTab === "topics"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    Topics
                  </button>
                </div>

                {/* Tab: Patterns */}
                {browseTab === "patterns" && (
                  <div className="space-y-1">
                    <button
                      onClick={() => setPatternsExpanded(!patternsExpanded)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50"
                    >
                      <span>Patterns Categories</span>
                      {patternsExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>

                    {patternsExpanded && (
                      <div className="mt-1 space-y-1 pl-2">
                        {dsaPatterns.map((pattern) => {
                          const isActive = activePattern === pattern;
                          return (
                            <button
                              key={pattern}
                              onClick={() => handlePatternClick(pattern)}
                              className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-xs font-medium transition ${
                                isActive
                                  ? "bg-blue-50 text-blue-600 font-semibold"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <span className="truncate">{pattern}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Topics */}
                {browseTab === "topics" && (
                  <div className="space-y-1">
                    <button
                      onClick={() => setTopicsExpanded(!topicsExpanded)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50"
                    >
                      <span>Topics Categories</span>
                      {topicsExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>

                    {topicsExpanded && (
                      <div data-lenis-prevent className="mt-1 max-h-[300px] overflow-y-auto space-y-1 pl-2 scrollbar-thin">
                        {dsaTopics.map((topic) => {
                          const isActive = activeTopic === topic;
                          return (
                            <button
                              key={topic}
                              onClick={() => handleTopicClick(topic)}
                              className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-xs font-medium transition ${
                                isActive
                                  ? "bg-blue-50 text-blue-600 font-semibold"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <span className="truncate">{topic}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Syllabus Categories for JS / TS (Principle 11) */
              <div className="space-y-1">
                <button
                  onClick={() => setTopicsExpanded(!topicsExpanded)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  <span>Syllabus Categories</span>
                  {topicsExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </button>

                {topicsExpanded && (
                  <div data-lenis-prevent className="mt-1 max-h-[300px] overflow-y-auto space-y-1 pl-2 scrollbar-thin">
                    {trackCategories.map((category) => {
                      const isActive = activeTopic.toLowerCase() === category.toLowerCase();
                      return (
                        <button
                          key={category}
                          onClick={() => handleTopicClick(category)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-xs font-medium transition ${
                            isActive
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="truncate">{category}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Area of Sidebar (Meet the Creator Card) */}
        <div className="border-t border-slate-100 p-4 bg-slate-50/40">
          <Link
            href="/"
            className="group block text-left rounded-2xl border border-blue-100 bg-blue-50/30 p-3.5 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white shadow-sm shrink-0">
                <Sparkles className="h-3 w-3" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">
                Meet the Creator
              </span>
            </div>
            <h5 className="font-display text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              Rajesh Tiwari
            </h5>
            <p className="text-[10px] text-slate-500 mt-1 leading-normal font-medium">
              Explore my full-stack projects, creative play modules, and developer journey.
            </p>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:underline">
              <span>Visit Portfolio</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
          <p className="text-center text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-wider">
            RT Labs &copy; 2026
          </p>
        </div>
      </aside>
    </>
  );
}
