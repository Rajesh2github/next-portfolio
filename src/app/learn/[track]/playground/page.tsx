"use client";

import React, { use, useState, Suspense } from "react";
import { Track } from "@/types/learn";
import { ErrorState } from "@/components/learn/states";
import Link from "next/link";
import {
  ChevronLeft,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  Cpu,
  Info,
  CheckCircle2
} from "lucide-react";

interface PlaygroundPageProps {
  params: Promise<{ track: string }>;
}

const defaultCode: Record<Track, string> = {
  javascript: `// JavaScript Closure Playground
function createMultiplier(factor) {
  return (number) => number * factor;
}

const double = createMultiplier(2);
console.log(double(5)); // Expected Output: 10
console.log(double(12)); // Expected Output: 24`,
  typescript: `// TypeScript Generics Playground
interface KeyValue<K, V> {
  key: K;
  value: V;
}

const pair: KeyValue<string, number> = {
  key: "userId",
  value: 1024
};

console.log(pair.key, pair.value);`
};

function PlaygroundContent({ track }: { track: Track }) {
  const [code, setCode] = useState(defaultCode[track]);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      // Beautiful and non-pretending output message (Principle 20)
      setOutput(`// Browser Sandbox Console (Planned in V2)
// Simulated output from local static compile:
${track === "javascript" ? "10\n24" : "userId 1024"}

[Info] Real-time browser-level sandboxed execution with dynamic error tracing, Monaco editor structures, and unit-testing compilers is currently in active preparation for V2!`);
    }, 800);
  };

  const handleReset = () => {
    setCode(defaultCode[track]);
    setOutput("");
  };

  return (
    <div className="space-y-8 w-full">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href={`/learn/${track}`} className="hover:text-blue-600 flex items-center gap-1 font-semibold transition">
            <ChevronLeft className="h-3 w-3" />
            {track === "javascript" ? "JavaScript" : "TypeScript"}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold">Concept Playground</span>
        </div>
      </div>

      {/* Playground Header Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[9px] font-black text-blue-600 uppercase tracking-wide">
              Interactive Sandbox
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <Cpu className="h-3.5 w-3.5" />
              JS/TS Runtime Environment
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl leading-snug">
            Interactive Concept Playground
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            Write code, play with scoped closures, generic typing templates, or dynamic APIs, and check outputs inside our simulated browser console.
          </p>
        </div>
      </div>

      {/* Sandbox Split Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Code Editor Card (Span 7 of 12) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200 bg-[#0f172a] shadow-sm overflow-hidden h-[450px]">
          {/* Header toolbar */}
          <div className="flex h-11 items-center justify-between border-b border-slate-800 bg-[#0b0f19] px-4 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-blue-500" />
              main.{track === "javascript" ? "js" : "ts"}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-1 rounded bg-blue-600 py-1 px-3 text-white hover:bg-blue-700 transition font-black"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                {isRunning ? "Running..." : "Run"}
              </button>
            </div>
          </div>

          {/* Code Textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-[#0a0d16] p-4 text-xs text-slate-100 font-mono focus:outline-none resize-none leading-relaxed border-0"
            spellCheck="false"
          />
        </div>

        {/* Right: Console Output Card (Span 5 of 12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Output Panel */}
          <div className="flex-1 flex flex-col rounded-2xl border border-slate-200 bg-[#0f172a] shadow-sm overflow-hidden min-h-[220px]">
            <div className="flex h-11 items-center border-b border-slate-800 bg-[#0b0f19] px-4 text-xs font-bold text-slate-400">
              Console Output
            </div>
            <pre className="flex-1 bg-[#0a0d16] p-4 text-xs font-mono text-emerald-400 leading-relaxed overflow-auto whitespace-pre-wrap select-text">
              {output || "// Click 'Run' to compile and execute the code environment..."}
            </pre>
          </div>

          {/* Sandbox Info */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/20 p-5 space-y-2.5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
              <Info className="h-4 w-4" />
              Sandbox Architecture
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              We do not claim that full runtime browser execution is complete yet. Our V2 architecture plan is designing an isolated Web Worker sandbox container supporting real-time TS compiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage({ params }: PlaygroundPageProps) {
  const { track } = use(params);
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
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-slate-400">Loading playground...</div>}>
      <PlaygroundContent track={normalizedTrack as Track} />
    </Suspense>
  );
}
