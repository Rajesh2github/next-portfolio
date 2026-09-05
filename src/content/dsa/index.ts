import { DSAProblem } from "@/types/dsa";
import { numberTheoryProblems } from "./problems/number-theory";
import { arrayProblems } from "./problems/arrays";
import { twoPointersBinarySearchProblems } from "./problems/two-pointers-binary-search";

export const dsaProblems: DSAProblem[] = [
  ...numberTheoryProblems,
  ...arrayProblems,
  ...twoPointersBinarySearchProblems,
];

export const getProblemBySlug = (slug: string): DSAProblem | undefined => {
  return dsaProblems.find((p) => p.slug === slug);
};

// Extracted from seed dataset to remain consistent
export const dsaPatterns = [
  "Number Theory",
  "Arrays",
  "Two Pointer",
  "Binary Search",
] as const;

export const dsaTopics = [
  "Mathematics",
  "Divisors",
  "GCD",
  "LCM",
  "Primes",
  "Arrays",
  "Basic Traversal",
  "Frequency Counting",
  "Strings",
  "Prefix Sum",
  "Two Pointer",
  "Binary Search",
] as const;
