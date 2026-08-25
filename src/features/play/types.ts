export type JavaScriptChallenge = {
  id: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  code?: string;
  options: {
    id: string;
    label: string;
  }[];
  correctAnswer: string;
  explanation: string;
};

export type FlexChallenge = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  container: {
    width?: string;
    height?: string;
  };
  items: {
    id: string;
    label: string;
    colorClass?: string;
  }[];
  availableControls: {
    property: string;
    options: string[];
  }[];
  initialStyles: Record<string, string>;
  solution: Record<string, string>;
  hint: string;
};

export type GridChallenge = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  container: {
    height?: string;
  };
  items: {
    id: string;
    label: string;
    colorClass?: string;
    style?: Record<string, string>;
    solutionStyle?: Record<string, string>;
  }[];
  availableControls: {
    property: string;
    options: string[];
  }[];
  initialStyles: Record<string, string>;
  solution: Record<string, string>;
  hint: string;
};

export type DetectiveChallenge = {
  id: string;
  category?: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  symptom: string;
  code: string;
  options: {
    id: string;
    label: string;
    correct: boolean;
  }[];
  explanation: string;
  consoleLogs?: string[];
  networkRequests?: {
    url: string;
    method: string;
    status: number;
    response: string;
  }[];
};

export type QuizChallenge = {
  id: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  code?: string;
  options: {
    id: string;
    label: string;
  }[];
  correctAnswer: string;
  explanation: string;
};

export type OptimizerAction = {
  id: string;
  label: string;
  description: string;
  impacts: Record<string, number>;
};

export type OptimizerChallenge = {
  id: string;
  category: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  targetDescription: string;
  initialMetrics: Record<string, number>;
  targetConditions: Record<string, { min?: number; max?: number }>;
  metricFormats: Record<string, { unit: string; higherIsBetter: boolean; label: string }>;
  actions: OptimizerAction[];
  explanation: string;
};

export type SequenceStep = {
  id: string;
  label: string;
  description: string;
};

export type SequenceChallenge = {
  id: string;
  category: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  targetDescription: string;
  correctOrder: string[];
  steps: SequenceStep[];
  explanation: string;
};
