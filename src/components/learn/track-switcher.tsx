"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Track } from "@/types/learn";
import { Code, Server } from "lucide-react";

interface TrackSwitcherProps {
  activeTrack: Track;
}

export default function TrackSwitcher({ activeTrack }: TrackSwitcherProps) {
  const router = useRouter();

  const handleTrackChange = (track: Track) => {
    router.push(`/learn/${track}`);
  };

  return (
    <div className="flex rounded-xl bg-slate-100 p-1.5 max-w-sm mb-6 shadow-sm border border-slate-200/40">
      {/* JavaScript Track Toggle */}
      <button
        onClick={() => handleTrackChange("javascript")}
        className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-bold transition-all duration-300 ${
          activeTrack === "javascript"
            ? "bg-white text-amber-500 shadow-sm border border-slate-100"
            : "text-slate-500 hover:text-slate-900 hover:bg-white/40"
        }`}
      >
        <Code className="h-4 w-4" />
        <span>JavaScript</span>
      </button>

      {/* TypeScript Track Toggle */}
      <button
        onClick={() => handleTrackChange("typescript")}
        className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-bold transition-all duration-300 ${
          activeTrack === "typescript"
            ? "bg-white text-blue-600 shadow-sm border border-slate-100"
            : "text-slate-500 hover:text-slate-900 hover:bg-white/40"
        }`}
      >
        <Server className="h-4 w-4" />
        <span>TypeScript</span>
      </button>
    </div>
  );
}
