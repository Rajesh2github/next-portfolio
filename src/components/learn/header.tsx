"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useLearningState } from "@/lib/hooks/use-learning-state";
import { Search, Bookmark, BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function LearnHeader({ onMenuClick }: HeaderProps) {
  const { isSignedIn } = useAuth();
  const { bookmarks } = useLearningState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const bookmarkCount = bookmarks.length;

  const getDynamicTitle = () => {
    if (pathname.includes("/dsa")) {
      return (
        <>
          Learn<span className="text-blue-600">DSA</span>
        </>
      );
    }
    if (pathname.includes("/javascript-typescript")) {
      return (
        <>
          Learn<span className="text-blue-600">JS/TS</span>
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

  // Update URL search parameter when search value changes (debounced)
  useEffect(() => {
    // If the search value is exactly what is already in the URL search param, do nothing!
    const urlSearch = searchParams.get("search") || "";
    if (searchValue === urlSearch) return;

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      
      const segments = pathname.split("/").filter(Boolean);
      let currentTrack = segments.length >= 2 ? segments[1] : null;

      // Smart Track Detection (If user is on the main /learn page without an active track)
      if (!currentTrack && searchValue) {
        const query = searchValue.toLowerCase();
        
        // JavaScript Keywords
        const jsKeywords = ["closure", "let", "const", "var", "scope", "event", "loop", "prototype", "function", "es6", "es2015", "async", "await", "callback"];
        // TypeScript Keywords
        const tsKeywords = ["interface", "generic", "narrowing", "type", "readonly", "decorator", "tuple", "union", "alias"];
        // DSA Keywords
        const dsaKeywords = ["divisor", "gcd", "lcm", "prime", "factor", "pointer", "binary", "search", "prefix", "array", "traverse", "index", "target", "sum"];

        if (jsKeywords.some(kw => query.includes(kw))) {
          currentTrack = "javascript";
        } else if (tsKeywords.some(kw => query.includes(kw))) {
          currentTrack = "typescript";
        } else if (dsaKeywords.some(kw => query.includes(kw))) {
          currentTrack = "dsa";
        } else {
          currentTrack = "dsa";
        }
      }

      const activeTrack = currentTrack || "dsa";

      // If we are not on the specific track's main dashboard page, redirect to its dashboard on search
      if (pathname !== `/learn/${activeTrack}` && searchValue) {
        router.push(`/learn/${activeTrack}?${params.toString()}`);
      } else {
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchValue, pathname, router, searchParams]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-sm">
      {/* Left: Logo & Hamburger */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle Hamburger */}
        <button
          onClick={onMenuClick}
          className="rounded p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Mobile Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/learn" className="flex items-center gap-2.5 text-[#0f172a] hover:opacity-90 select-none">
          <Image
            src="/images/learn/icon.png"
            alt="RT Brand Logo"
            width={34}
            height={34}
            className="rounded-lg object-contain shrink-0 border border-slate-100 shadow-sm"
          />
          <span className="font-display text-base font-extrabold tracking-tight text-slate-800">
            RT <span className="text-blue-600">Labs</span>
          </span>
        </Link>
      </div>

      {/* Center: Search */}
      {isSignedIn && (
        <div className="mx-4 max-w-md flex-1">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search problems, patterns, topics..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      )}

      {/* Right: Bookmarks & User profile */}
      <div className="flex items-center gap-4">
        {isSignedIn && (
          <>
            <Link
              href="/learn/dsa?tab=bookmarks"
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition"
              aria-label="Bookmarks"
            >
              <Bookmark className="h-5 w-5" />
              {bookmarkCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* User profile button loaded dynamically from Clerk */}
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 border border-slate-200 shadow-sm",
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
