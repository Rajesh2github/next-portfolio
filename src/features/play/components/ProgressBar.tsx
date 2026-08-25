"use client";

import { m } from "framer-motion";

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between font-mono text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        <span>Progress</span>
        <span>
          {current} of {total} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary border border-border/30 p-[1px]">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary shadow-[0_0_8px_rgba(52,211,153,0.3)]"
        />
      </div>
    </div>
  );
}
