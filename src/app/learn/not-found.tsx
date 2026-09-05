"use client";

import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, ShieldAlert } from "lucide-react";

export default function LearnNotFound() {
  return (
    <div className="light min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 flex flex-col items-center justify-center p-4 select-none">
      {/* Centered Premium Not Found Card */}
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm text-center space-y-6">
        
        {/* Themed Icon Wrapper */}
        <div className="mx-auto h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 flex shadow-inner relative">
          <Compass className="h-8 w-8 animate-spin-slow" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 border-2 border-white text-[8px] font-black text-white">
            404
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl leading-snug">
            Syllabus Page Lost
          </h1>
          <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
            The curriculum, lesson, or challenge day you are searching for is currently not compiled or resides on a different track.
          </p>
        </div>

        {/* Informational Hint */}
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 text-left flex items-start gap-2.5">
          <ShieldAlert className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
            Double check your URL pathing parameters (e.g. track, topics, or slug indices), or jump directly back to our active tracks selection grid.
          </p>
        </div>

        {/* CTA Redirect Button */}
        <div className="pt-2">
          <Link
            href="/learn"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <span>Return to Learning Hub</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Subtle branding footer */}
      <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-wider">
        RT Labs — Professional Developer Portal
      </p>
    </div>
  );
}
