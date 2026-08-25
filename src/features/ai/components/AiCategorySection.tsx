"use client";

import React from "react";

type AiCategorySectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AiCategorySection({
  title,
  description,
  children,
}: AiCategorySectionProps) {
  return (
    <div className="border-t border-border/20 pt-10 first:border-none first:pt-0">
      <div className="mb-6">
        <h2 className="font-[family:var(--font-display)] text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {children}
      </div>
    </div>
  );
}
