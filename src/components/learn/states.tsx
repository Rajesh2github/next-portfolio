"use client";

import React from "react";
import { AlertCircle, RotateCcw, HelpCircle } from "lucide-react";

interface StateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

// 1. Loading State (Skeleton Loaders)
export function LoadingState() {
  return (
    <div className="space-y-6 w-full py-4 animate-pulse">
      {/* Banner Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-3">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-8 w-64 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
      </div>

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((id) => (
          <div key={id} className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-slate-200 rounded-xl" />
              <div className="h-5 w-16 bg-slate-100 rounded-full" />
            </div>
            <div className="h-6 w-40 bg-slate-200 rounded" />
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-3/4 bg-slate-100 rounded" />
            </div>
            <div className="pt-4 border-t border-slate-50 flex gap-1">
              <div className="h-4 w-12 bg-slate-100 rounded" />
              <div className="h-4 w-12 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Empty State Component (Principle 23)
export function EmptyState({
  title = "No Content Found",
  description = "There are no lessons or exercises matching your active filters. We are constantly updating our tracks, so stay tuned!",
  actionText,
  onAction,
}: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-slate-200 bg-white shadow-sm max-w-lg mx-auto">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 shadow-inner">
        <HelpCircle className="h-6 w-6" />
      </div>
      <h3 className="font-display text-base font-bold text-slate-800">
        {title}
      </h3>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-sm">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

// 3. Error State Component (Principle 23)
export function ErrorState({
  title = "Something Went Wrong",
  description = "We encountered an unexpected issue trying to load the curriculum database. Please reload or try again.",
  actionText = "Reload Page",
  onAction = () => typeof window !== "undefined" && window.location.reload(),
}: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-red-100 bg-red-50/20 shadow-sm max-w-lg mx-auto">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 shadow-inner">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="font-display text-base font-bold text-slate-800">
        {title}
      </h3>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-sm">
        {description}
      </p>
      <button
        onClick={onAction}
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {actionText}
      </button>
    </div>
  );
}
