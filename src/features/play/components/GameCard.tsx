"use client";

import { m } from "framer-motion";
import Link from "next/link";

type GameCardProps = {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  href: string;
  disabled?: boolean;
  delay?: number;
};

export default function GameCard({
  title,
  description,
  icon,
  buttonText,
  href,
  disabled = false,
  delay = 0,
}: GameCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {disabled ? (
        <div className="relative h-full overflow-hidden rounded-2xl border border-border/40 bg-[var(--surface-glass)] p-6 opacity-60 shadow-[var(--shadow-soft)]">
          <div className="flex h-full flex-col justify-between">
            <div>
              {/* Icon Circle */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl font-mono text-2xl shadow-sm border border-border/30 bg-secondary/40 text-muted-foreground">
                {icon}
              </div>

              {/* Title */}
              <h3 className="font-[family:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Action Footer */}
            <div className="mt-8 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-secondary/60 px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase border border-border/20">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Link href={href} className="group block h-full">
          <m.div
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative h-full overflow-hidden rounded-2xl border border-border/40 bg-[var(--surface-glass)] p-6 shadow-[var(--shadow-soft)] transition-colors hover:border-primary/40 hover:bg-[var(--surface-glass-strong)] dark:hover:bg-primary/[0.02]"
          >
            {/* Subtle gradient hover glow */}
            <div className="pointer-events-none absolute -inset-px -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex h-full flex-col justify-between">
              <div>
                {/* Icon Circle */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl font-mono text-2xl shadow-sm border border-border/30 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {icon}
                </div>

                {/* Title */}
                <h3 className="font-[family:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
                  {title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="mt-8 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary group-hover:text-primary/80 transition-colors">
                  {buttonText}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>
          </m.div>
        </Link>
      )}
    </m.div>
  );
}
