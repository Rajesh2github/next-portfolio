"use client";

import React, { Suspense } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Brain,
  Layers,
  FileCode,
  Network,
  Database,
  Smartphone,
  Cloud,
  Cpu,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Flame,
  Code,
  Server,
  Info
} from "lucide-react";

interface PathCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "active" | "coming_soon";
  topics: string[];
  slug: string;
}

const learningPaths: PathCardProps[] = [
  {
    title: "Data Structures & Algorithms (DSA)",
    description: "Master patterns in problem solving: Number Theory, Arrays, Two Pointer, Binary Search, Trees, and DP.",
    icon: Brain,
    status: "active",
    topics: ["Mathematics", "Sliding Window", "Two Pointer", "Binary Search"],
    slug: "dsa"
  },
  {
    title: "JavaScript Core (JS)",
    description: "Master prototypes, functional execution context, closures, event loops, async flows, and ECMAScript features.",
    icon: Code,
    status: "active",
    topics: ["Closures", "Event Loop", "Prototypes", "ES6+ Evolution"],
    slug: "javascript"
  },
  {
    title: "TypeScript Professional (TS)",
    description: "Learn advanced type parameters, generic mappings, type narrowing, conditional shapes, and declaration merging.",
    icon: Server,
    status: "active",
    topics: ["Interfaces", "Generics", "Narrowing", "Decorators"],
    slug: "typescript"
  },
  {
    title: "HTML & CSS Core",
    description: "Modern CSS layout structures, Grid, Flexbox, transitions, typography, and semantic accessible HTML.",
    icon: FileCode,
    status: "coming_soon",
    topics: ["Flexbox", "CSS Grid", "Animations", "A11y Core"],
    slug: "html-css"
  },
  {
    title: "Frontend Engineering (React & Next.js)",
    description: "React 19, Server Components, streaming hydration, Turbopack, and Next.js App Router architectures.",
    icon: Layers,
    status: "coming_soon",
    topics: ["Server Components", "Suspense", "Streaming", "Turbopack"],
    slug: "react-next"
  },
  {
    title: "System Design (HLD & LLD)",
    description: "Architecting high-scale distributed backends and low-level design patterns (SOLID, structural, creational).",
    icon: Network,
    status: "coming_soon",
    topics: ["Load Balancers", "Caching", "SOLID", "Design Patterns"],
    slug: "system-design"
  },
  {
    title: "Mobile Development (React Native)",
    description: "Cross-platform mobile apps using React Native, native bridges, reanimated animations, and Expo CLI.",
    icon: Smartphone,
    status: "coming_soon",
    topics: ["Expo", "Native Bridges", "Reanimated", "State Core"],
    slug: "react-native"
  },
  {
    title: "Generative AI & Agentic AI",
    description: "Building autonomous coding agents, LLM tool integrations, RAG vector searches, and system workflows.",
    icon: Cpu,
    status: "coming_soon",
    topics: ["Agents", "Prompt Chaining", "RAG", "Vector DBs"],
    slug: "agentic-ai"
  },
  {
    title: "Cloud & Infrastructure (NGINX & GCP)",
    description: "NGINX reverse proxies, load balancing, Google Cloud architectures, Firebase backend engines, and CI/CD pipelines.",
    icon: Cloud,
    status: "coming_soon",
    topics: ["NGINX Proxies", "GCP Core", "Firebase", "GitHub Actions"],
    slug: "cloud-infra"
  },
  {
    title: "Monorepos & Microfrontends",
    description: "Scaling workspace structures using Turborepo, microfrontend routing, module federation, and dependency tree structures.",
    icon: Database,
    status: "coming_soon",
    topics: ["Turborepo", "Module Federation", "Yarn Workspaces", "CI Tooling"],
    slug: "monorepos"
  }
];

function LearningPortalContent() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  const handlePathClick = (path: PathCardProps) => {
    if (path.status === "active") {
      router.push(`/learn/${path.slug}`);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Welcome Hero Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Flame className="h-4 w-4 fill-blue-100 animate-pulse" />
              Dev Learning Portal
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {isLoaded && user ? `Welcome, ${user.firstName || "Rajesh"}!` : "Welcome to your Learning Portal!"}
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Expand your engineering skills systematically. Browse through different active or upcoming training paths curated to build highly-scalable applications, agentic platforms, and premium digital experiences.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-inner">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Subtle Sign-In Invitation (Principle 5) */}
      {isLoaded && !user && (
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-blue-800">
          <div className="flex items-start gap-2.5">
            <Info className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">
              <strong>Tip:</strong> Sign in to bookmark questions, track your roadmap progress, and save your practice history across devices.
            </p>
          </div>
          <button
            onClick={() => clerk.openSignIn()}
            className="rounded-lg bg-blue-600 px-3.5 py-1.5 font-bold text-white shadow-sm hover:bg-blue-700 transition shrink-0"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Grid of Learning Paths */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-500" />
            Curated Tracks ({learningPaths.length})
          </h2>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            3 Tracks Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path) => {
            const Icon = path.icon;
            const isActive = path.status === "active";

            return (
              <div
                key={path.slug}
                onClick={() => handlePathClick(path)}
                className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 ${
                  isActive
                    ? "cursor-pointer border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5"
                    : "border-slate-100 opacity-80"
                }`}
              >
                <div>
                  {/* Icon & Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                        isActive
                          ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isActive ? "Active" : "Coming Soon"}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {path.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                {/* Topics / Footer */}
                <div className="mt-5 pt-4 border-t border-slate-50">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {path.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center rounded bg-slate-50 border border-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {isActive ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition">
                      Start Learning
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-slate-300" />
                      Syllabus pre-computed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function LearningPortal() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="text-sm font-semibold text-slate-500 animate-pulse">
            Loading learning tracks...
          </div>
        </div>
      }
    >
      <LearningPortalContent />
    </Suspense>
  );
}
