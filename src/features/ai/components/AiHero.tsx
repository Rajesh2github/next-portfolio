"use client";

import { m } from "framer-motion";

type AiHeroProps = {
  title: string;
  subtitle: string;
  description: string;
};

export default function AiHero({ title, subtitle, description }: AiHeroProps) {
  return (
    <div className="relative mx-auto mb-12 max-w-3xl text-center px-4">
      {/* Pulse Badge */}
      <m.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
        </span>
        {subtitle}
      </m.div>

      {/* Main heading */}
      <m.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-[family:var(--font-display)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {title}
      </m.h1>

      {/* Description */}
      <m.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {description}
      </m.p>

      {/* Decorative gradient underline divider */}
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-10 h-px w-[120px] origin-center rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
}
