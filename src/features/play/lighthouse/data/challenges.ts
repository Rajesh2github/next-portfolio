import { OptimizerChallenge } from "../../types";

export const lighthouseChallenge: OptimizerChallenge = {
  id: "lighthouse-performance",
  category: "Web Performance",
  title: "Lighthouse Audit Optimizer",
  description: "Your startup landing page currently has a poor mobile performance audit due to bulky uncompressed images, blocking CSS files, and unlabeled accessibility attributes. Maximize your scores to 100!",
  difficulty: "medium",
  targetDescription: "Achieve Audit Scores above 95% on Performance, SEO, and Accessibility.",
  initialMetrics: {
    score: 45,
    fcp: 4.2,
    seo: 60,
    accessibility: 78,
  },
  targetConditions: {
    score: { min: 95 },
    seo: { min: 95 },
    accessibility: { min: 95 },
  },
  metricFormats: {
    score: { unit: "%", higherIsBetter: true, label: "Lighthouse Performance" },
    fcp: { unit: "s", higherIsBetter: false, label: "First Contentful Paint" },
    seo: { unit: "%", higherIsBetter: true, label: "Lighthouse SEO" },
    accessibility: { unit: "%", higherIsBetter: true, label: "Accessibility Score" },
  },
  actions: [
    {
      id: "opt-images",
      label: "Compress & Convert Images to AVIF",
      description: "Converts bulky PNG/JPEG raw assets into modern WebP/AVIF containers to shrink downloaded payloads.",
      impacts: { score: 18, fcp: -1.4 },
    },
    {
      id: "defer-css",
      label: "Defer Non-Critical CSS Stylesheets",
      description: "Loads render-blocking stylesheets asynchronously, unblocking initial browser HTML parsing.",
      impacts: { score: 12, fcp: -1.0 },
    },
    {
      id: "seo-metadata",
      label: "Add Meta Descriptions & Canonicals",
      description: "Provides descriptive page metadata and canonical mappings to resolve index duplication warnings.",
      impacts: { seo: 35, score: 5 },
    },
    {
      id: "heading-structure",
      label: "Format Semantic Heading Hierarchies",
      description: "Restructures jumbled headers to ensure a clean sequential outline (one H1 followed by H2s).",
      impacts: { seo: 10, accessibility: 10, score: 5 },
    },
    {
      id: "form-labels",
      label: "Link Inputs to Descriptive Labels",
      description: "Binds inputs to native labels with htmlFor attributes to assist keyboard and screen readers.",
      impacts: { accessibility: 15, score: 10 },
    },
  ],
  explanation:
    "Maximizing audit scores demands resolving render-blocking scripts (deferring CSS), optimizing large asset weights (AVIF compression), and defining explicit semantic boundaries (heading lines and labels). Notice how these separate segments complement each other: securing clean accessibility and robust metadata automatically raises your core scores!"
};
