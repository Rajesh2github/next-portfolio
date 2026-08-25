"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { DetectiveChallenge } from "../../types";

type DetectiveWorkspaceProps = {
  challenge: DetectiveChallenge;
  onAnswerSelected: (isCorrect: boolean) => void;
  onNext: () => void;
  isLast: boolean;
};

type TabType = "diagnostics" | "console" | "network";

export default function DetectiveWorkspace({
  challenge,
  onAnswerSelected,
  onNext,
  isLast,
}: DetectiveWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabType>("diagnostics");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (hasSubmitted) return;
    setSelectedId(optionId);
    setHasSubmitted(true);
    onAnswerSelected(isCorrect);
  };

  const getOptionStyle = (optionId: string, isThisOptionCorrect: boolean) => {
    if (!hasSubmitted) {
      return clsx(
        "border-border/40 bg-secondary/30 hover:border-primary/40 hover:bg-primary/[0.02]",
        selectedId === optionId
          ? "border-primary bg-primary/5 text-primary"
          : "text-foreground"
      );
    }

    const isThisOptionSelected = selectedId === optionId;

    if (isThisOptionCorrect) {
      return "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold";
    }

    if (isThisOptionSelected) {
      return "border-rose-500/50 bg-rose-500/10 text-rose-400";
    }

    return "border-border/20 bg-secondary/10 text-muted-foreground opacity-50";
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      {/* Left Column: Code Terminal & Diagnostic panels (7 cols) */}
      <div className="md:col-span-7 flex flex-col gap-6">
        {/* Terminal Code Snip */}
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 shadow-[var(--shadow-card)] md:text-sm">
          <div className="mb-3.5 flex gap-1.5 border-b border-zinc-800/60 pb-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              bug-component.tsx
            </span>
          </div>
          <pre className="overflow-x-auto whitespace-pre leading-relaxed select-all">
            <code>{challenge.code}</code>
          </pre>
        </div>

        {/* Diagnostics & Tabs Panel */}
        <div className="rounded-2xl border border-border/40 bg-[var(--surface-glass-strong)] overflow-hidden shadow-sm">
          {/* Tab Headers */}
          <div className="flex border-b border-border/20 bg-secondary/20">
            <button
              onClick={() => setActiveTab("diagnostics")}
              className={clsx(
                "cursor-pointer px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all border-r border-border/20",
                activeTab === "diagnostics"
                  ? "bg-zinc-950 text-foreground"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              📁 Diagnostics
            </button>
            <button
              onClick={() => setActiveTab("console")}
              className={clsx(
                "cursor-pointer px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all border-r border-border/20",
                activeTab === "console"
                  ? "bg-zinc-950 text-foreground"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              🖥️ Console
            </button>
            <button
              onClick={() => setActiveTab("network")}
              className={clsx(
                "cursor-pointer px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all",
                activeTab === "network"
                  ? "bg-zinc-950 text-foreground"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              🌐 Network
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 min-h-[140px] bg-zinc-950/40 select-text font-mono text-xs">
            {activeTab === "diagnostics" && (
              <div className="leading-relaxed">
                <span className="text-rose-400 font-bold">● Warning:</span>
                <p className="mt-2 text-muted-foreground text-[12px]">{challenge.symptom}</p>
              </div>
            )}

            {activeTab === "console" && (
              <div className="flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed">
                {challenge.consoleLogs && challenge.consoleLogs.length > 0 ? (
                  challenge.consoleLogs.map((log, i) => (
                    <div
                      key={i}
                      className={clsx(
                        log.toLowerCase().includes("error") && "text-rose-400",
                        log.toLowerCase().includes("warn") && "text-amber-400",
                        !log.toLowerCase().includes("error") && !log.toLowerCase().includes("warn") && "text-zinc-400"
                      )}
                    >
                      {log}
                    </div>
                  ))
                ) : (
                  <span className="text-muted-foreground italic">No console outputs recorded.</span>
                )}
              </div>
            )}

            {activeTab === "network" && (
              <div className="overflow-x-auto">
                {challenge.networkRequests && challenge.networkRequests.length > 0 ? (
                  <table className="w-full text-left font-mono text-[11px] text-zinc-300">
                    <thead>
                      <tr className="border-b border-border/10 text-muted-foreground font-bold">
                        <th className="pb-1.5">Name</th>
                        <th className="pb-1.5">Method</th>
                        <th className="pb-1.5">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {challenge.networkRequests.map((req, i) => (
                        <tr key={i} className="border-b border-border/10 last:border-none">
                          <td className="py-2 text-cyan-400 truncate max-w-[140px]" title={req.url}>
                            {req.url}
                          </td>
                          <td className="py-2 font-semibold uppercase">{req.method}</td>
                          <td className="py-2">
                            <span
                              className={clsx(
                                "rounded px-1.5 py-0.5 font-bold",
                                req.status >= 400 ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"
                              )}
                            >
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <span className="text-muted-foreground italic">No network requests recorded.</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Scenario Details & Fix Options (5 cols) */}
      <div className="md:col-span-5 flex flex-col gap-6">
        <div className="rounded-[28px] border border-border/40 bg-[var(--surface-glass)] p-6 shadow-sm">
          <span className="rounded-full border border-rose-500/20 bg-rose-500/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-400">
            Case Details
          </span>
          <h3 className="mt-3.5 font-[family:var(--font-display)] text-xl font-bold tracking-tight text-foreground">
            {challenge.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {challenge.description}
          </p>

          {/* Options */}
          <div className="mt-6 flex flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Select Investigation Patch
            </span>
            {challenge.options.map((option) => (
              <button
                key={option.id}
                disabled={hasSubmitted}
                onClick={() => handleOptionClick(option.id, option.correct)}
                className={clsx(
                  "flex w-full items-center justify-between rounded-xl border p-4 text-left font-mono text-[11px] font-medium leading-normal transition-all md:text-xs shadow-sm",
                  getOptionStyle(option.id, option.correct),
                  !hasSubmitted && "cursor-pointer active:scale-[0.98]"
                )}
              >
                <span>{option.label}</span>
                {hasSubmitted && option.correct && (
                  <span className="text-emerald-400 font-bold">✓</span>
                )}
                {hasSubmitted && selectedId === option.id && !option.correct && (
                  <span className="text-rose-400 font-bold">✗</span>
                )}
              </button>
            ))}
          </div>

          {/* Explanation reveal */}
          <AnimatePresence>
            {hasSubmitted && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 border-t border-border/20 pt-6"
              >
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  💡 Root Cause Explanation
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground select-text">
                  {challenge.explanation}
                </p>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedId(null);
                      setHasSubmitted(false);
                      onNext();
                    }}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-5 py-2 font-mono text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97]"
                  >
                    {isLast ? "See Case Files" : "Next Scenario"}
                    <span>→</span>
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
