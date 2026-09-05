"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLearn = pathname.startsWith("/learn");

  return (
    <main className={`w-full flex-1 ${isLearn ? "pt-0 pb-0" : "pt-32 pb-24 sm:pb-10"}`}>
      <div className="w-full">{children}</div>
    </main>
  );
}
