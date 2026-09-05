"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Code2, Heart, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function LearnFooter() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentTrack = segments.length >= 2 ? segments[1] : null;

  // Dynamic links computation based on active track
  const getDynamicLinks = () => {
    if (currentTrack === "javascript") {
      return (
        <>
          <Link href="/learn/javascript" className="hover:text-blue-600 transition text-slate-500 hover:font-semibold">
            JS Dashboard
          </Link>
          <Link href="/learn/javascript?tab=challenges" className="hover:text-blue-600 transition text-slate-500 hover:font-semibold">
            Daily Challenges
          </Link>
        </>
      );
    }
    if (currentTrack === "typescript") {
      return (
        <>
          <Link href="/learn/typescript" className="hover:text-blue-600 transition text-slate-500 hover:font-semibold">
            TS Dashboard
          </Link>
          <Link href="/learn/typescript?tab=challenges" className="hover:text-blue-600 transition text-slate-500 hover:font-semibold">
            Daily Challenges
          </Link>
        </>
      );
    }
    // Default / DSA links
    return (
      <>
        <Link href="/learn/dsa" className="hover:text-blue-600 transition text-slate-500 hover:font-semibold">
          DSA Dashboard
        </Link>
        <Link href="/learn/dsa?tab=roadmap" className="hover:text-blue-600 transition text-slate-500 hover:font-semibold">
          Roadmap
        </Link>
      </>
    );
  };

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-6 text-slate-500">
      <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Left: Brand & Statement */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#0f172a] font-bold tracking-tight">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
              <Code2 className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-sm">
              RT <span className="text-blue-600">Labs</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 tracking-wide uppercase">
              v1.0
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            A premium learning portal designed to master system architecture, core engineering patterns, and advanced algorithms.
          </p>
        </div>

        {/* Center: Curated Navigation Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1 text-slate-500 hover:font-semibold">
            Portfolio <ExternalLink className="h-3 w-3 opacity-60" />
          </Link>
          {getDynamicLinks()}
          <span className="text-slate-200">|</span>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
            <Sparkles className="h-3 w-3 text-blue-500" /> Rajesh Tiwari
          </span>
        </div>

        {/* Right: Copyright & Socials */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-end">
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/Rajesh2github"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 hover:bg-slate-50 hover:text-[#0f172a] transition border border-transparent hover:border-slate-200"
              aria-label="GitHub"
            >
              <FaGithub className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/rajesh-tiwari-reactjs-javascript/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 hover:bg-slate-50 hover:text-blue-600 transition border border-transparent hover:border-slate-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} Rajesh Tiwari. Made with <Heart className="inline h-3.5 w-3.5 text-red-500 fill-red-100" /> for elite engineering.
          </div>
        </div>

      </div>
    </footer>
  );
}
