"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cloudChallenge } from "../data/challenges";
import OptimizerWorkspace from "../../engine/optimizer/OptimizerWorkspace";
import OptimizerResults from "../../engine/optimizer/OptimizerResults";

export default function CloudChallenge() {
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
              challenge={cloudChallenge}
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
              challenge={cloudChallenge}
              onRestart={handleRestart}
              icon="☁️"
              title="Cloud Stack Assembled!"
              subtitle="You achieved 99%+ availability and 1 Million user limits!"
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
