"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { httpChallenge } from "../data/challenges";
import SequenceWorkspace from "../../engine/sequence/SequenceWorkspace";
import SequenceResults from "../../engine/sequence/SequenceResults";

export default function HttpChallenge() {
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
            <SequenceWorkspace
              challenge={httpChallenge}
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
            <SequenceResults
              challenge={httpChallenge}
              onRestart={handleRestart}
              icon="🌐"
              title="HTTP Sequence Verified!"
              subtitle="All networking packets arrived and parsed correctly!"
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
