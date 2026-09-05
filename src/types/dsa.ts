export type SupportedLanguage = "javascript" | "typescript" | "python" | "java" | "cpp" | "go";

export interface Example {
  id: number;
  input: string;
  output: string;
  explanation?: string;
}

export interface DSASolution {
  language: SupportedLanguage;
  code: string;
  approach: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface DSAProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  patterns: string[];
  topics: string[];
  description: string;
  examples: Example[];
  constraints: string[];
  hints?: string[];
  importantConcepts?: string[];
  solutions: Record<SupportedLanguage, DSASolution>;
}
