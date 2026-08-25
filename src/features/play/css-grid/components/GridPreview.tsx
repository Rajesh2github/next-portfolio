"use client";

import { m } from "framer-motion";
import clsx from "clsx";

type GridItemType = {
  id: string;
  label: string;
  colorClass?: string;
  style?: Record<string, string>;
  solutionStyle?: Record<string, string>;
};

type GridPreviewProps = {
  styles: Record<string, string>;
  items: GridItemType[];
  title: string;
  height?: string;
  isTarget?: boolean;
};

export default function GridPreview({
  styles,
  items,
  title,
  height = "180px",
  isTarget = false,
}: GridPreviewProps) {
  const containerStyles: Record<string, string> = {};
  const customItemStyles: Record<string, Record<string, string>> = {};

  // Parse container vs item-specific properties
  Object.entries(styles).forEach(([key, value]) => {
    if (key.startsWith("item")) {
      const match = key.match(/^item([A-Za-z]+)_(.+)$/);
      if (match) {
        const itemId = match[1].toLowerCase();
        const prop = match[2];
        if (!customItemStyles[itemId]) customItemStyles[itemId] = {};
        customItemStyles[itemId][prop] = value;
      }
    } else {
      containerStyles[key] = value;
    }
  });

  const finalContainerStyle = {
    ...containerStyles,
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

      {/* Grid Container */}
      <div
        style={finalContainerStyle}
        className={clsx(
          "w-full overflow-hidden rounded-xl border p-4 transition-all duration-300",
          isTarget
            ? "border-dashed border-border/50 bg-secondary/10 opacity-75"
            : "border-border/40 bg-zinc-950 shadow-[var(--shadow-card)]"
        )}
      >
        {items.map((item) => {
          // Resolve item style
          const baseStyle = isTarget ? item.solutionStyle : item.style;
          const userOverride = !isTarget ? customItemStyles[item.id] : undefined;

          const finalItemStyle = {
            ...baseStyle,
            ...userOverride,
          } as React.CSSProperties;

          return (
            <m.div
              key={item.id}
              layout // Smooth transition when grid cells resize or shift!
              style={finalItemStyle}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={clsx(
                "flex h-12 w-full items-center justify-center rounded-lg border font-mono text-sm font-bold shadow-sm select-none",
                item.colorClass || "bg-primary/10 text-primary border-primary/20",
                isTarget && "opacity-80 scale-95"
              )}
            >
              {item.label}
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
