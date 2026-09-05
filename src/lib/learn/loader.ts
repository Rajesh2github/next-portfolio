import { Track, Topic, Mcq, CodingProblem, InterviewQuestion, ChallengeDay, Release, ReleaseFeature } from "@/types/learn";
import { jsTopics, jsMcqs, jsProblems, jsInterviewQuestions, jsChallengeDays, jsReleases, jsFeatures } from "@/content/learn/javascript";
import { tsTopics, tsMcqs, tsProblems, tsInterviewQuestions, tsChallengeDays, tsReleases, tsFeatures } from "@/content/learn/typescript";
import { TopicSchema, McqSchema, CodingProblemSchema, InterviewQuestionSchema, ChallengeDaySchema, ReleaseSchema, ReleaseFeatureSchema } from "@/types/learn";

// --- COMBINED static databases ---

const topicsDB: Record<Track, Topic[]> = {
  javascript: jsTopics,
  typescript: tsTopics,
};

const mcqsDB: Record<Track, Mcq[]> = {
  javascript: jsMcqs,
  typescript: tsMcqs,
};

const problemsDB: Record<Track, CodingProblem[]> = {
  javascript: jsProblems,
  typescript: tsProblems,
};

const interviewDB: Record<Track, InterviewQuestion[]> = {
  javascript: jsInterviewQuestions,
  typescript: tsInterviewQuestions,
};

const challengesDB: Record<Track, ChallengeDay[]> = {
  javascript: jsChallengeDays,
  typescript: tsChallengeDays,
};

const releasesDB: Record<Track, Release[]> = {
  javascript: jsReleases,
  typescript: tsReleases,
};

const featuresDB: Record<Track, ReleaseFeature[]> = {
  javascript: jsFeatures,
  typescript: tsFeatures,
};

// --- SCHEMA & DATA INTEGRITY VALIDATION ENGINE (Principle 12) ---

export function validateContentDatabase() {
  const tracks: Track[] = ["javascript", "typescript"];
  
  for (const track of tracks) {
    // 1. Validate Topics
    topicsDB[track].forEach((item) => {
      TopicSchema.parse(item);
    });

    // 2. Validate MCQs
    mcqsDB[track].forEach((item) => {
      McqSchema.parse(item);
      // Verify topicIds references
      item.topicIds.forEach((topicId) => {
        const found = topicsDB[track].some((t) => t.id === topicId);
        if (!found) {
          throw new Error(`❌ MCQ "${item.id}" references topic "${topicId}" but it does not exist.`);
        }
      });
    });

    // 3. Validate Coding Problems
    problemsDB[track].forEach((item) => {
      CodingProblemSchema.parse(item);
      item.topicIds.forEach((topicId) => {
        const found = topicsDB[track].some((t) => t.id === topicId);
        if (!found) {
          throw new Error(`❌ CodingProblem "${item.id}" references topic "${topicId}" but it does not exist.`);
        }
      });
    });

    // 4. Validate Interview Questions
    interviewDB[track].forEach((item) => {
      InterviewQuestionSchema.parse(item);
      item.topicIds.forEach((topicId) => {
        const found = topicsDB[track].some((t) => t.id === topicId);
        if (!found) {
          throw new Error(`❌ InterviewQuestion "${item.id}" references topic "${topicId}" but it does not exist.`);
        }
      });
    });

    // 5. Validate Challenge Days
    challengesDB[track].forEach((item) => {
      ChallengeDaySchema.parse(item);
      
      // Verify references
      item.topicIds.forEach((topicId) => {
        const found = topicsDB[track].some((t) => t.id === topicId);
        if (!found) {
          throw new Error(`❌ ChallengeDay "${item.day}" references topic "${topicId}" but it does not exist.`);
        }
      });

      item.mcqIds.forEach((mcqId) => {
        const found = mcqsDB[track].some((m) => m.id === mcqId);
        if (!found) {
          throw new Error(`❌ ChallengeDay "${item.day}" references MCQ "${mcqId}" but it does not exist.`);
        }
      });

      item.problemIds.forEach((probId) => {
        const found = problemsDB[track].some((p) => p.id === probId);
        if (!found) {
          throw new Error(`❌ ChallengeDay "${item.day}" references CodingProblem "${probId}" but it does not exist.`);
        }
      });
    });

    // 6. Validate Releases & Features
    releasesDB[track].forEach((item) => {
      ReleaseSchema.parse(item);
      item.featureIds.forEach((featureId) => {
        const found = featuresDB[track].some((f) => f.id === featureId);
        if (!found) {
          throw new Error(`❌ Release "${item.id}" references feature "${featureId}" but it does not exist.`);
        }
      });
    });

    featuresDB[track].forEach((item) => {
      ReleaseFeatureSchema.parse(item);
      const found = releasesDB[track].some((r) => r.id === item.releaseId);
      if (!found) {
        throw new Error(`❌ Feature "${item.id}" references release "${item.releaseId}" but it does not exist.`);
      }
    });
  }
}

// Automatically trigger database validation checks during build/startup
try {
  validateContentDatabase();
} catch (e) {
  console.error("🔥 Static Learning Content Database Integrity Failure:", e);
  throw e;
}

// --- DATA ACCESS LOADER APIS (Principle 11) ---

export const getTopics = (track: Track): Topic[] => {
  return topicsDB[track];
};

export const getTopicBySlug = (track: Track, slug: string): Topic | undefined => {
  return topicsDB[track].find((t) => t.slug === slug);
};

export const getMcqsForTopic = (track: Track, topicId: string): Mcq[] => {
  return mcqsDB[track].filter((m) => m.topicIds.includes(topicId));
};

export const getCodingProblems = (track: Track): CodingProblem[] => {
  return problemsDB[track];
};

export const getCodingProblemBySlug = (track: Track, slug: string): CodingProblem | undefined => {
  return problemsDB[track].find((p) => p.slug === slug);
};

export const getInterviewQuestions = (track: Track): InterviewQuestion[] => {
  return interviewDB[track];
};

export const getInterviewQuestionBySlug = (track: Track, slug: string): InterviewQuestion | undefined => {
  return interviewDB[track].find((q) => q.slug === slug);
};

export const getChallengeDays = (track: Track): ChallengeDay[] => {
  return challengesDB[track];
};

export const getChallengeDayByNum = (track: Track, dayNum: number): ChallengeDay | undefined => {
  return challengesDB[track].find((d) => d.day === dayNum);
};

export const getReleases = (track: Track): Release[] => {
  return releasesDB[track];
};

export const getReleaseBySlug = (track: Track, slug: string): Release | undefined => {
  return releasesDB[track].find((r) => r.slug === slug);
};

export const getReleaseFeatures = (track: Track, releaseId: string): ReleaseFeature[] => {
  return featuresDB[track].filter((f) => f.releaseId === releaseId);
};

export const getReleaseFeatureBySlug = (track: Track, slug: string): ReleaseFeature | undefined => {
  return featuresDB[track].find((f) => f.slug === slug);
};

// Unified dynamic back-reference query resolver (Step 11: getRelatedContent)
export interface RelatedContentGroup {
  topics: Topic[];
  mcqs: Mcq[];
  problems: CodingProblem[];
  interviews: InterviewQuestion[];
}

export const getRelatedContent = (track: Track, topicId: string): RelatedContentGroup => {
  return {
    topics: topicsDB[track].filter((t) => t.relatedTopicIds?.includes(topicId) || t.id === topicId),
    mcqs: mcqsDB[track].filter((m) => m.topicIds.includes(topicId)),
    problems: problemsDB[track].filter((p) => p.topicIds.includes(topicId)),
    interviews: interviewDB[track].filter((q) => q.topicIds.includes(topicId)),
  };
};
