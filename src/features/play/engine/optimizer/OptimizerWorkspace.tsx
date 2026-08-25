"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { OptimizerChallenge } from "../../types";

type OptimizerWorkspaceProps = {
  challenge: OptimizerChallenge;
  onComplete: () => void;
};

export default function OptimizerWorkspace({ challenge, onComplete }: OptimizerWorkspaceProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Toggle optimization action
  const handleToggle = (actionId: string) => {
    if (showResults) return;
    setSelectedIds((prev) =>
      prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId]
    );
  };

  // Compute live metrics based on toggled actions
  const currentMetrics = { ...challenge.initialMetrics };
  challenge.actions.forEach((action) => {
    if (selectedIds.includes(action.id)) {
      Object.entries(action.impacts).forEach(([metricId, value]) => {
        if (currentMetrics[metricId] !== undefined) {
          currentMetrics[metricId] += value;
        }
      });
    }
  });

  // Verify if target conditions are satisfied
  const isMatch = Object.entries(challenge.targetConditions).every(([metricId, condition]) => {
    const val = currentMetrics[metricId];
    if (condition.min !== undefined && val < condition.min) return false;
    if (condition.max !== undefined && val > condition.max) return false;
    return true;
  });

  const getMetricStatus = (metricId: string, val: number) => {
    const condition = challenge.targetConditions[metricId];
    if (!condition) return "neutral";
    if (condition.min !== undefined && val < condition.min) return "bad";
    if (condition.max !== undefined && val > condition.max) return "bad";
    return "good";
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      {/* Left Column: List of Toggleable Actions (5 cols) */}
      <div className="md:col-span-5 flex flex-col gap-5 rounded-[28px] border border-border/40 bg-[var(--surface-glass)] p-6 shadow-sm md:p-8">
        <div>
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
            Optimization Options
          </span>
          <h3 className="mt-3.5 font-[family:var(--font-display)] text-xl font-bold tracking-tight text-foreground">
            {challenge.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Toggle configurations below to influence system metrics and achieve the target architecture.
          </p>
        </div>

        {/* Checkbox Options */}
        <div className="flex flex-col gap-3.5 border-t border-border/20 pt-5">
          {challenge.actions.map((action) => {
            const isChecked = selectedIds.includes(action.id);

            return (
              <button
                key={action.id}
                onClick={() => handleToggle(action.id)}
                className={clsx(
                  "flex w-full cursor-pointer items-start gap-4 rounded-xl border p-4 text-left transition-all active:scale-[0.99] shadow-sm",
                  isChecked
                    ? "border-primary/50 bg-primary/[0.03]"
                    : "border-border/30 bg-secondary/20 hover:bg-secondary/40 hover:border-border/50"
                )}
              >
                {/* Styled Checkbox circle */}
                <div
                  className={clsx(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold leading-none transition-all",
                    isChecked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 bg-zinc-950/40 text-transparent"
                  )}
                >
                  ✓
                </div>

                <div className="flex flex-col gap-1 pr-1">
                  <span className={clsx("text-xs font-semibold leading-relaxed", isChecked ? "text-primary" : "text-foreground")}>
                    {action.label}
                  </span>
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Live Metrics Dashboard (7 cols) */}
      <div className="md:col-span-7 flex flex-col gap-6">
        {/* Core Metrics Gauges */}
        <div className="rounded-[28px] border border-border/40 bg-zinc-950 p-6 shadow-[var(--shadow-card)]">
          <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Live System Dashboard
          </div>

          <div className="flex flex-col gap-6">
            {Object.entries(currentMetrics).map(([metricId, val]) => {
              const config = challenge.metricFormats[metricId];
              if (!config) return null;
              const status = getMetricStatus(metricId, val);

              // Visual bar calculation (clamped 0 to 100)
              const maxVal = Math.max(100, Math.max(val, challenge.initialMetrics[metricId] || 0));
              const percentage = Math.min(100, Math.max(0, (val / maxVal) * 100));

              return (
                <div key={metricId} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono text-[11px] font-semibold">
                    <span className="text-zinc-400">{config.label}</span>
                    <span
                      className={clsx(
                        "rounded px-1.5 py-0.5 font-bold uppercase",
                        status === "good" && "bg-emerald-500/10 text-emerald-400",
                        status === "bad" && "bg-rose-500/10 text-rose-400",
                        status === "neutral" && "bg-zinc-800 text-zinc-400"
                      )}
                    >
                      {val}
                      {config.unit}
                    </span>
                  </div>

                  {/* Meter Progress Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800/40 p-[1px]">
                    <m.div
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={clsx(
                        "h-full rounded-full transition-colors duration-300",
                        status === "good" && "bg-gradient-to-r from-emerald-500/80 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
                        status === "bad" && "bg-gradient-to-r from-rose-500/80 to-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]",
                        status === "neutral" && "bg-zinc-700"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Target Threshold Constraints status */}
        <div className="rounded-2xl border border-border/40 bg-[var(--surface-glass-strong)] p-5 shadow-sm flex flex-col gap-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
            Target Requirements: {challenge.targetDescription}
          </span>

          <div className="flex flex-col gap-2.5">
            {Object.entries(challenge.targetConditions).map(([metricId, condition]) => {
              const val = currentMetrics[metricId];
              const config = challenge.metricFormats[metricId];
              const isSatisfied = getMetricStatus(metricId, val) === "good";

              return (
                <div key={metricId} className="flex items-center gap-2.5 font-mono text-xs">
                  <span
                    className={clsx(
                      "flex h-5 w-5 items-center justify-center rounded-full font-bold",
                      isSatisfied ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    )}
                  >
                    {isSatisfied ? "✓" : "✗"}
                  </span>
                  <span className="text-muted-foreground">
                    {config?.label}:{" "}
                    <span className={clsx("font-bold", isSatisfied ? "text-emerald-400" : "text-rose-400")}>
                      {val}
                      {config?.unit}
                    </span>{" "}
                    (Goal:{" "}
                    {condition.min !== undefined && `>= ${condition.min}${config?.unit}`}
                    {condition.min !== undefined && condition.max !== undefined && " & "}
                    {condition.max !== undefined && `<= ${condition.max}${config?.unit}`}
                    )
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Success Modal Overlay popup */}
      <AnimatePresence>
        {isMatch && !showResults && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <m.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="w-full max-w-lg overflow-hidden rounded-[28px] border border-emerald-500/30 bg-zinc-950 p-6 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] md:p-8"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl border border-emerald-500/20">
                🎉
              </div>

              <h3 className="font-[family:var(--font-display)] text-2xl font-bold text-foreground">
                Target Score Achieved!
              </h3>
              <p className="mt-2 text-sm text-emerald-400 font-mono font-medium">
                System optimization successful!
              </p>

              {/* Technical explanation details */}
              <div className="mt-5 rounded-xl bg-secondary/10 border border-border/20 p-4 text-left max-h-[180px] overflow-y-auto select-text text-xs leading-relaxed text-muted-foreground">
                <p className="font-semibold text-foreground mb-1.5">📊 Optimization Review</p>
                {challenge.explanation}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    setShowResults(true);
                    onComplete();
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-2.5 font-mono text-xs font-semibold text-zinc-950 shadow-sm transition-all active:scale-[0.97]"
                >
                  See Lab Summary
                  <span>→</span>
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
