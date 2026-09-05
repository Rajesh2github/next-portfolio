"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export interface UserLearningState {
  bookmarks: string[];
  completed: string[];
}

const DEFAULT_STATE: UserLearningState = {
  bookmarks: [],
  completed: [],
};

export function useLearningState() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [learningState, setLearningState] = useState<UserLearningState>(DEFAULT_STATE);
  const [isSyncing, setIsSyncing] = useState(true);
  const [hasSynced, setHasSynced] = useState(false);

  // 1. Load from localStorage first on mount to avoid UI flicker
  useEffect(() => {
    try {
      const localBookmarks = JSON.parse(localStorage.getItem("dsa-bookmarks") || "[]");
      const localCompleted = JSON.parse(localStorage.getItem("dsa-completed") || "[]");
      setLearningState({
        bookmarks: localBookmarks,
        completed: localCompleted,
      });
      setIsSyncing(false);
    } catch (e) {
      console.error("Failed to load local learning state", e);
    }
  }, []);

  // 2. Sync localStorage with Clerk Metadata (Bi-directional merge - runs ONCE on load)
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || hasSynced) return;

    setIsSyncing(true);
    
    try {
      const localBookmarks = JSON.parse(localStorage.getItem("dsa-bookmarks") || "[]") as string[];
      const localCompleted = JSON.parse(localStorage.getItem("dsa-completed") || "[]") as string[];
      
      const metadata = (user.unsafeMetadata || {}) as Record<string, any>;
      const clerkBookmarks = (metadata.bookmarks || []) as string[];
      const clerkCompleted = (metadata.completed || []) as string[];

      let needsClerkUpdate = false;
      let needsLocalUpdate = false;

      // Merge Bookmarks
      const mergedBookmarks = Array.from(new Set([...localBookmarks, ...clerkBookmarks]));
      if (mergedBookmarks.length !== localBookmarks.length) {
        needsLocalUpdate = true;
      }
      if (mergedBookmarks.length !== clerkBookmarks.length) {
        needsClerkUpdate = true;
      }

      // Merge Completed
      const mergedCompleted = Array.from(new Set([...localCompleted, ...clerkCompleted]));
      if (mergedCompleted.length !== localCompleted.length) {
        needsLocalUpdate = true;
      }
      if (mergedCompleted.length !== clerkCompleted.length) {
        needsClerkUpdate = true;
      }

      if (needsLocalUpdate) {
        localStorage.setItem("dsa-bookmarks", JSON.stringify(mergedBookmarks));
        localStorage.setItem("dsa-completed", JSON.stringify(mergedCompleted));
        setLearningState({
          bookmarks: mergedBookmarks,
          completed: mergedCompleted,
        });
        window.dispatchEvent(new Event("learning-state-changed"));
      }

      setHasSynced(true);

      if (needsClerkUpdate) {
        user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            bookmarks: mergedBookmarks,
            completed: mergedCompleted,
          },
        }).finally(() => setIsSyncing(false));
      } else {
        setIsSyncing(false);
      }
    } catch (e) {
      console.error("Failed syncing Clerk metadata", e);
      setIsSyncing(false);
    }
  }, [isLoaded, isSignedIn, user, hasSynced]);

  // 3. Listen for changes triggered by other components/tabs
  useEffect(() => {
    const handleStateChange = () => {
      try {
        const b = JSON.parse(localStorage.getItem("dsa-bookmarks") || "[]");
        const c = JSON.parse(localStorage.getItem("dsa-completed") || "[]");
        setLearningState({ bookmarks: b, completed: c });
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener("learning-state-changed", handleStateChange);
    return () => window.removeEventListener("learning-state-changed", handleStateChange);
  }, []);

  const toggleBookmark = async (id: string) => {
    try {
      let updated = [...learningState.bookmarks];
      if (updated.includes(id)) {
        updated = updated.filter((item) => item !== id);
      } else {
        updated.push(id);
      }

      // Optimistic UI & Local persistence
      localStorage.setItem("dsa-bookmarks", JSON.stringify(updated));
      setLearningState((prev) => ({ ...prev, bookmarks: updated }));
      window.dispatchEvent(new Event("learning-state-changed"));

      // Clerk Remote Sync
      if (isSignedIn && user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            bookmarks: updated,
          },
        });
      }
    } catch (err) {
      console.error("Failed toggling bookmark", err);
    }
  };

  const toggleCompleted = async (id: string) => {
    try {
      let updated = [...learningState.completed];
      if (updated.includes(id)) {
        updated = updated.filter((item) => item !== id);
      } else {
        updated.push(id);
      }

      // Optimistic UI & Local persistence
      localStorage.setItem("dsa-completed", JSON.stringify(updated));
      setLearningState((prev) => ({ ...prev, completed: updated }));
      window.dispatchEvent(new Event("learning-state-changed"));

      // Clerk Remote Sync
      if (isSignedIn && user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            completed: updated,
          },
        });
      }
    } catch (err) {
      console.error("Failed toggling completed state", err);
    }
  };

  return {
    bookmarks: learningState.bookmarks,
    completed: learningState.completed,
    isSyncing,
    toggleBookmark,
    toggleCompleted,
  };
}
