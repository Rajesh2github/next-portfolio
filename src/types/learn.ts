import { z } from "zod";

export const TrackSchema = z.enum(["javascript", "typescript"]);
export type Track = z.infer<typeof TrackSchema>;

export const DifficultySchema = z.enum(["easy", "medium", "hard", "beginner", "intermediate", "advanced"]);
export type Difficulty = z.infer<typeof DifficultySchema>;

// 1. Topic Schema
export const TopicSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  track: TrackSchema,
  category: z.string(),
  difficulty: DifficultySchema,
  estimatedMinutes: z.number(),
  prerequisites: z.array(z.string()).optional(),
  relatedTopicIds: z.array(z.string()).optional(),
  content: z.string(), // Static markdown/HTML/MDX explanation content
});
export type Topic = z.infer<typeof TopicSchema>;

// 2. MCQ Option Schema
export const McqOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

// MCQ Schema
export const McqSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(McqOptionSchema),
  correctOptionId: z.string(),
  explanation: z.string(),
  difficulty: DifficultySchema,
  topicIds: z.array(z.string()),
});
export type Mcq = z.infer<typeof McqSchema>;

// 3. Coding Problem Example Schema
export const ExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional(),
});

// Coding Problem Schema
export const CodingProblemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  track: TrackSchema,
  difficulty: DifficultySchema,
  topicIds: z.array(z.string()),
  constraints: z.array(z.string()).optional(),
  examples: z.array(ExampleSchema),
  starterCode: z.object({
    javascript: z.string().optional(),
    typescript: z.string().optional(),
  }).optional(),
  solutionCode: z.string().optional(),
  solutionExplanation: z.string().optional(),
  hints: z.array(z.string()).optional(),
});
export type CodingProblem = z.infer<typeof CodingProblemSchema>;

// 4. Interview Question Schema
export const InterviewQuestionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  question: z.string(),
  shortAnswer: z.string(),
  explanation: z.string(),
  track: TrackSchema,
  difficulty: DifficultySchema,
  topicIds: z.array(z.string()),
  relatedProblemIds: z.array(z.string()).optional(),
  companyTags: z.array(z.string()).optional(),
  questionType: z.enum(["conceptual", "output", "coding"]),
});
export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema>;

// 5. Challenge Day Schema
export const ChallengeDaySchema = z.object({
  day: z.number(),
  title: z.string(),
  description: z.string(),
  track: TrackSchema,
  topicIds: z.array(z.string()),
  mcqIds: z.array(z.string()),
  problemIds: z.array(z.string()),
  estimatedMinutes: z.number(),
  prerequisites: z.array(z.number()).optional(),
});
export type ChallengeDay = z.infer<typeof ChallengeDaySchema>;

// 6. Release Schema
export const ReleaseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  release: z.string(), // e.g. "ES6", "ES2020", "v5.0"
  year: z.number(),
  title: z.string(),
  description: z.string(),
  featureIds: z.array(z.string()),
});
export type Release = z.infer<typeof ReleaseSchema>;

// 7. Release Feature Schema
export const ReleaseFeatureSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  releaseId: z.string(),
  description: z.string(),
  explanation: z.string(),
  beforeExample: z.string().optional(),
  afterExample: z.string().optional(),
  topicIds: z.array(z.string()).optional(),
  mcqIds: z.array(z.string()).optional(),
});
export type ReleaseFeature = z.infer<typeof ReleaseFeatureSchema>;

// Dynamic track switcher state
export interface LearningTrackDetails {
  name: string;
  tagline: string;
  description: string;
  badgeText: string;
  themeColor: string;
}
