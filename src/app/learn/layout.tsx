"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { Lock, LogIn } from "lucide-react";
import LearnHeader from "@/components/learn/header";
import LearnSidebar from "@/components/learn/sidebar";
import LearnFooter from "@/components/learn/footer";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const pathname = usePathname();
  const isRootPortal = pathname === "/learn";

  // Trigger Clerk Sign-In modal automatically on sub-route access (Principle 6)
  useEffect(() => {
    if (isLoaded && !isSignedIn && !isRootPortal) {
      try {
        clerk.openSignIn({
          forceRedirectUrl: window.location.href,
        });
      } catch (err) {
        console.error("Failed to automatically open sign-in", err);
      }
    }
  }, [isLoaded, isSignedIn, isRootPortal, clerk]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-sm font-semibold text-slate-500 animate-pulse">
          Loading learning portal...
        </div>
      </div>
    );
  }

  // Determine whether to allow access to content (either public root portal or signed-in user)
  const hasAccess = isRootPortal || isSignedIn;

  return (
    <div className="light min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className="flex min-h-screen flex-col">
        {/* Customized Header */}
        <Suspense fallback={<div className="h-16 w-full bg-white border-b border-slate-200" />}>
          <LearnHeader onMenuClick={() => setSidebarOpen(true)} />
        </Suspense>

        <div className="flex flex-1 pt-16">
          {/* Collapsible Left Sidebar (Rendered only on specific sub-tracks when authenticated) */}
          {!isRootPortal && isSignedIn && (
            <Suspense fallback={<div className="w-64 bg-white border-r border-slate-200 hidden lg:block" />}>
              <LearnSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </Suspense>
          )}

          {/* Main Application Container */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-full flex flex-col min-h-[calc(100vh-64px)]">
            <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col">
              <div className="flex-1 pb-12">
                {hasAccess ? (
                  // Grant immediate access for public root or authenticated user
                  children
                ) : (
                  // Show beautiful, secure, intent-preserving Locked Card if unauthenticated on private tracks (Principle 6)
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                      <Lock className="h-7 w-7" />
                    </div>
                    <h2 className="font-display text-xl font-extrabold text-slate-900 md:text-2xl">
                      Authentication Required
                    </h2>
                    <p className="mt-2 max-w-sm text-sm text-slate-500 leading-relaxed">
                      Please sign in to access this curriculum path, save bookmarks, and track your practice milestones across devices.
                    </p>
                    <button
                      onClick={() => clerk.openSignIn({ forceRedirectUrl: window.location.href })}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In to Continue
                    </button>
                  </div>
                )}
              </div>
              <LearnFooter />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
