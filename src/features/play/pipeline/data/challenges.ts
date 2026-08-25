import { SequenceChallenge } from "../../types";

export const pipelineChallenge: SequenceChallenge = {
  id: "pipeline-sequence",
  category: "Developer Workflow",
  title: "CI/CD Pipeline Builder",
  description: "Construct a robust, industry-standard deployment pipeline. Arrange the steps logically to ensure code is vetted, verified, and successfully compiled before hitting production servers.",
  difficulty: "medium",
  targetDescription: "Checkout Code ➔ Install Dependencies ➔ Linter Checks ➔ Run Automated Tests ➔ Production Compile ➔ Secure Deployment.",
  correctOrder: ["checkout", "install", "lint", "test", "build", "deploy"],
  steps: [
    {
      id: "checkout",
      label: "Checkout Code Repository",
      description: "Trigger virtual runners and pull the latest code branch from your GitHub origin repository.",
    },
    {
      id: "install",
      label: "Install Packages & Dependencies",
      description: "Run secure package loaders (e.g. 'npm ci' or 'pnpm install') to download verified node module lines.",
    },
    {
      id: "lint",
      label: "Execute Linter & Format Checks",
      description: "Run code formatters and static syntax checkers (like ESLint) to ensure team architectural compliance.",
    },
    {
      id: "test",
      label: "Run Automated Test Suites",
      description: "Execute unit and integration test scripts to prevent functional code regressions.",
    },
    {
      id: "build",
      label: "Production Build Compile",
      description: "Trigger production bundlers (Webpack, Next.js, Vite) to transpile, tree-shake, and optimize static routes.",
    },
    {
      id: "deploy",
      label: "Deploy Static Assets to Production",
      description: "Securely ship optimized build assets to edge host clusters (Vercel, AWS S3, Cloudflare).",
    },
  ],
  explanation:
    "Production-safe continuous integration (CI/CD) pipelines strictly enforce code checks *before* triggers hit live systems. You must pull code, install packages, and verify coding layouts (lint/test) before compiling bundles. This guarantees that broken or buggy branches are automatically blocked from ever reaching live client browsers!"
};
