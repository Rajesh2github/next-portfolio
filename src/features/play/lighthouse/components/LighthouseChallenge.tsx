"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { lighthouseChallenge } from "../data/challenges";
import OptimizerWorkspace from "../../engine/optimizer/OptimizerWorkspace";
import OptimizerResults from "../../engine/optimizer/OptimizerResults";

export default function LighthouseChallenge() {
  const [isFinished, setIsFinished] = useState(false);

  const handleComplete = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setIsFinished(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <m.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <OptimizerWorkspace
              challenge={lighthouseChallenge}
              onComplete={handleComplete}
            />
          </m.div>
        ) : (
          <m.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] border border-border/40 bg-[var(--surface-glass)] px-6 py-8 shadow-[var(--shadow-card-strong)] sm:px-8 max-w-2xl mx-auto"
          >
            <OptimizerResults
              challenge={lighthouseChallenge}
              onRestart={handleRestart}
              icon="🚨"
              title="Lighthouse Audit Complete!"
              subtitle="You achieved 95%+ across all core categories!"
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
