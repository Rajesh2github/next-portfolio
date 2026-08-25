"use client";

import { m } from "framer-motion";
import clsx from "clsx";

type FlexItem = {
  id: string;
  label: string;
  colorClass?: string;
};

type FlexPreviewProps = {
  styles: Record<string, string>;
  items: FlexItem[];
  title: string;
  height?: string;
  isTarget?: boolean;
};

export default function FlexPreview({
  styles,
  items,
  title,
  height = "180px",
  isTarget = false,
}: FlexPreviewProps) {
  // Map display property to inline-style since CSS grid / block behave normally
  const containerStyle = {
    ...styles,
    height,
  } as React.CSSProperties;

  return (
    <div className="flex flex-col w-full h-full">
      {/* Label/Title */}
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <span>{title}</span>
        {isTarget && (
          <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[8px] font-semibold text-muted-foreground uppercase border border-border/20">
            Goal Layout
          </span>
        )}
      </div>

      {/* Main Container */}
      <div
        style={containerStyle}
        className={clsx(
          "w-full overflow-hidden rounded-xl border p-4 transition-all duration-300",
          isTarget
            ? "border-dashed border-border/50 bg-secondary/10 opacity-75"
            : "border-border/40 bg-zinc-950 shadow-[var(--shadow-card)]"
        )}
      >
        {items.map((item) => (
          <m.div
            key={item.id}
            layout // Employs FLIP animation to slide boxes when styles change!
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={clsx(
              "flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-sm font-bold shadow-sm select-none",
              item.colorClass || "bg-primary/10 text-primary border-primary/20",
              isTarget && "opacity-80 scale-95"
            )}
          >
            {item.label}
          </m.div>
        ))}
      </div>
    </div>
  );
}
