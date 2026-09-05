"use client";

import React, { use, useState, useEffect, Suspense } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useLearningState } from "@/lib/hooks/use-learning-state";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Code,
  Copy,
  Info,
  Lightbulb,
  MessageSquare
} from "lucide-react";
import { getProblemBySlug } from "@/content/dsa";
import { SupportedLanguage } from "@/types/dsa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Simple and safe syntax highlighting tokenizer (zero-dependency)
function highlightCode(code: string, lang: string): string {
  // 1. Escape HTML first to prevent XSS and rendering breakages
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Apply tokenizer replacements
  // Comments (matches // style and # style)
  html = html.replace(/(\/\/.*|#.*)/g, '<span class="text-slate-500 font-normal italic">$1</span>');

  // Strings (matches double quotes, single quotes, backticks)
  html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-400 font-medium">$1$2$1</span>');

  // Numbers (only outside HTML tags)
  html = html.replace(/\b(\d+)\b(?![^<>]*>)/g, '<span class="text-amber-400">$1</span>');

  // Custom regexes to prevent matching keywords/types inside HTML tag parameters (e.g. <span class="...">)
  const controlsRegex = /\b(return|if|else|elif|for|while|break|continue|in|and|or|not)\b(?![^<>]*>)/g;
  const definitionsRegex = /\b(function|const|let|var|class|export|import|from|as|def|public|private|static|package|func|type|struct|chan|go|interface|long\s+long)\b(?![^<>]*>)/g;
  const typesRegex = /\b(number|string|boolean|int|long|double|void|int64|vector|size_t|List|ArrayList|Integer)\b(?![^<>]*>)/g;
  const builtinsRegex = /\b(Math|min|max|gcd|lcm|append|sort|sorted|make|len|push|push_back|reserve|charCodeAt|fromCharCode|Collections|std)\b(?![^<>]*>)/g;
  const constantsRegex = /\b(true|false|null|undefined|nil|None|True|False)\b(?![^<>]*>)/g;

  // Apply highlights in structured layers
  html = html.replace(controlsRegex, '<span class="text-pink-400 font-semibold">$1</span>');
  html = html.replace(definitionsRegex, '<span class="text-sky-400 font-semibold">$1</span>');
  html = html.replace(typesRegex, '<span class="text-teal-400 font-medium">$1</span>');
  html = html.replace(builtinsRegex, '<span class="text-purple-400">$1</span>');
  html = html.replace(constantsRegex, '<span class="text-orange-400">$1</span>');

  return html;
}

const languageNames: Record<SupportedLanguage, string> = {
  javascript: "JavaScript (Node.js)",
  typescript: "TypeScript",
  python: "Python 3",
  java: "Java (OpenJDK)",
  cpp: "C++ (GCC)",
  go: "Go (Golang)"
};

function ProblemPageContent({ params }: PageProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const { slug } = use(params);
  const problem = getProblemBySlug(slug);

  const { bookmarks, completed, toggleBookmark, toggleCompleted } = useLearningState();
  const searchParams = useSearchParams();
  const trackParam = searchParams.get("track");
  const dashboardUrl = trackParam ? `/learn/${trackParam}` : "/learn/dsa";

  // Active state for Left Panel Tabs
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "discussion">("problem");

  // Active state for Selected Language
  const [selectedLang, setSelectedLanguage] = useState<SupportedLanguage>("javascript");

  // Copy status
  const [copied, setCopied] = useState(false);

  const isBookmarked = problem ? bookmarks.includes(problem.id) : false;
  const isCompleted = problem ? completed.includes(problem.id) : false;

  // Intent-preserving effect: trigger pending actions once authenticated (Principle 3)
  useEffect(() => {
    if (isLoaded && isSignedIn && problem) {
      try {
        const pendingBookmarkId = sessionStorage.getItem("pending-bookmark-action");
        if (pendingBookmarkId === problem.id) {
          sessionStorage.removeItem("pending-bookmark-action");
          toggleBookmark(problem.id);
        }

        const pendingCompletedId = sessionStorage.getItem("pending-completed-action");
        if (pendingCompletedId === problem.id) {
          sessionStorage.removeItem("pending-completed-action");
          toggleCompleted(problem.id);
        }
      } catch (e) {
        console.error("Failed to handle pending action", e);
      }
    }
  }, [isLoaded, isSignedIn, problem, toggleBookmark, toggleCompleted]);

  const handleBookmarkToggle = () => {
    if (!problem) return;

    // Principle 3: If not authenticated, open login modal and preserve user intent
    if (!isSignedIn) {
      try {
        sessionStorage.setItem("pending-bookmark-action", problem.id);
        clerk.openSignIn({
          forceRedirectUrl: window.location.href,
        });
      } catch (err) {
        console.error("Failed to trigger sign in", err);
      }
      return;
    }

    toggleBookmark(problem.id);
  };

  const handleCompletedToggle = () => {
    if (!problem) return;

    // Principle 3: If not authenticated, open login modal and preserve user intent
    if (!isSignedIn) {
      try {
        sessionStorage.setItem("pending-completed-action", problem.id);
        clerk.openSignIn({
          forceRedirectUrl: window.location.href,
        });
      } catch (err) {
        console.error("Failed to trigger sign in", err);
      }
      return;
    }

    toggleCompleted(problem.id);
  };

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Problem Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The problem you are looking for does not exist in our library.</p>
        <Link href={dashboardUrl} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const solution = problem.solutions[selectedLang];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(solution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic breadcrumb & header back trigger */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href={dashboardUrl} className="hover:text-blue-600 flex items-center gap-1 font-semibold transition">
            <ChevronLeft className="h-3 w-3" />
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-400">{problem.patterns[0]}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold truncate max-w-[150px] sm:max-w-none">{problem.title}</span>
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

      {/* Main Title & Metadata */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  problem.difficulty === "easy"
                    ? "bg-green-100 text-green-700"
                    : problem.difficulty === "medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {problem.difficulty}
              </span>
              {problem.patterns.map((p) => (
                <span key={p} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  {p}
                </span>
              ))}
              {problem.topics.map((t) => (
                <span key={t} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="font-display text-xl font-extrabold text-slate-900 mt-2.5 md:text-2xl">
              {problem.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Two-Column split-pane layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Left Column: Tabs, Description, Approach (Span 5 of 12) */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden lg:col-span-5 h-[calc(100vh-280px)] min-h-[500px] max-h-[800px]">
          
          {/* Sub-tabs header */}
          <div className="flex border-b border-slate-100 bg-slate-50 p-1">
            <button
              onClick={() => setActiveTab("problem")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-md transition ${
                activeTab === "problem"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-md transition ${
                activeTab === "solution"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Approach
            </button>
            <button
              onClick={() => setActiveTab("discussion")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-md transition ${
                activeTab === "discussion"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Discussion
            </button>
          </div>

          {/* Tab Content Panel (Scrollable) */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
            
            {/* PROBLEM TAB */}
            {activeTab === "problem" && (
              <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Problem Statement</h3>
                  <p className="whitespace-pre-line text-slate-800 font-medium bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    {problem.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Examples</h3>
                  {problem.examples.map((example) => (
                    <div key={example.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-2">
                      <div className="font-bold text-xs text-slate-500">Example {example.id}</div>
                      <div>
                        <span className="font-bold text-xs text-slate-400 block uppercase">Input:</span>
                        <code className="font-mono text-xs text-slate-800 bg-white px-2 py-1 rounded border border-slate-100 block mt-1">{example.input}</code>
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-400 block uppercase">Output:</span>
                        <code className="font-mono text-xs text-slate-800 bg-white px-2 py-1 rounded border border-slate-100 block mt-1">{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div className="text-xs text-slate-600 mt-2">
                          <strong className="text-slate-800">Explanation: </strong> {example.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Constraints</h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                    {problem.constraints.map((c, i) => (
                      <li key={i} className="font-mono">{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Hints */}
                {problem.hints && problem.hints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Lightbulb className="h-4 w-4 text-amber-500 fill-amber-100" />
                      Hints
                    </h3>
                    <div className="space-y-2">
                      {problem.hints.map((hint, i) => (
                        <div key={i} className="flex gap-2 text-xs bg-amber-50/50 text-amber-900 border border-amber-100/50 p-3 rounded-lg">
                          <span className="font-bold">{i+1}.</span>
                          <p>{hint}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SOLUTION TAB (APPROACH) */}
            {activeTab === "solution" && (
              <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Algorithm Approach</h3>
                  <p className="whitespace-pre-line text-slate-800 font-medium bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    {solution.approach}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Step-by-Step Breakdown</h3>
                  <p className="whitespace-pre-line text-slate-600 text-xs">
                    {solution.explanation}
                  </p>
                </div>

                {/* Complexity Analysis */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Complexity Analysis</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-center">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Time Complexity</span>
                      <code className="block mt-1 font-mono text-sm font-bold text-slate-800">{solution.timeComplexity}</code>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-center">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Space Complexity</span>
                      <code className="block mt-1 font-mono text-sm font-bold text-slate-800">{solution.spaceComplexity}</code>
                    </div>
                  </div>
                </div>

                {/* Important Concepts */}
                {problem.importantConcepts && problem.importantConcepts.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Info className="h-4 w-4 text-blue-600" />
                      Key Principles
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.importantConcepts.map((concept, i) => (
                        <span key={i} className="inline-flex items-center rounded bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DISCUSSION TAB PLACEHOLDER */}
            {activeTab === "discussion" && (
              <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                <div className="rounded-full bg-slate-50 border border-slate-100 p-3 text-slate-400 mb-3 shadow-inner">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h4 className="font-display text-sm font-bold text-slate-800">Discussion coming soon!</h4>
                <p className="mt-1 text-xs text-slate-500 max-w-xs">
                  A full user discussion feed with thread locks, likes, and customized peer explanations is planned for V2.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Viewer (Span 7 of 12) */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-[#0f172a] shadow-sm overflow-hidden lg:col-span-7 h-[calc(100vh-280px)] min-h-[500px] max-h-[800px]">
          
          {/* Code Header with language dropdown and copy */}
          <div className="flex h-12 items-center justify-between border-b border-slate-800 bg-[#0b0f19] px-4">
            
            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
                className="appearance-none cursor-pointer rounded-lg border border-slate-800 bg-[#151c2c] py-1.5 pl-3 pr-8 text-xs font-bold text-slate-200 outline-none hover:border-slate-700 transition"
              >
                {Object.keys(problem.solutions).map((lang) => (
                  <option key={lang} value={lang}>
                    {languageNames[lang as SupportedLanguage]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#151c2c] px-3 py-1.5 text-[10px] font-bold text-slate-300 hover:border-slate-700 hover:text-white transition"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax Highlighted Code (Scrollable) */}
          <div data-lenis-prevent className="flex-1 overflow-auto bg-[#0a0d16] p-4 text-xs font-mono leading-relaxed select-text text-[#f1f5f9] scrollbar-thin scrollbar-thumb-slate-800">
            <pre className="m-0">
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightCode(solution.code, selectedLang)
                }}
              />
            </pre>
          </div>

          {/* Info status line */}
          <div className="flex h-10 items-center justify-between border-t border-slate-800 bg-[#0b0f19] px-4 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Code className="h-3 w-3 text-blue-500" />
              Read-only view
            </span>
            <span>Target: {problem.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProblemPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-slate-400 animate-pulse">Loading problem details...</div>}>
      <ProblemPageContent params={params} />
    </Suspense>
  );
}
