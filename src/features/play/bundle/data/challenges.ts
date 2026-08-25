import { OptimizerChallenge } from "../../types";

export const bundleChallenge: OptimizerChallenge = {
  id: "bundle-performance",
  category: "Web Performance",
  title: "Webpack Bundle Optimizer",
  description: "Your React application is shipping a massive 850KB monolithic JavaScript bundle on page load, stalling user connections on mobile devices. Shrink your code size!",
  difficulty: "hard",
  targetDescription: "Optimize bundle payload size to under 200 KB and initial load time under 1.5 seconds.",
  initialMetrics: {
    size: 850,
    loadTime: 4.8,
    requests: 15,
  },
  targetConditions: {
    size: { max: 200 },
    loadTime: { max: 1.5 },
  },
  metricFormats: {
    size: { unit: " KB", higherIsBetter: false, label: "Initial Bundle Size" },
    loadTime: { unit: "s", higherIsBetter: false, label: "Simulated load time" },
    requests: { unit: " HTTP", higherIsBetter: false, label: "Bundle Chunk Requests" },
  },
  actions: [
    {
      id: "dynamic-imports",
      label: "Implement Next.js Dynamic Imports",
      description: "Splits heavy non-critical page paths into asynchronously loaded chunks using dynamic() code-splitting.",
      impacts: { size: -250, loadTime: -1.4, requests: 5 },
    },
    {
      id: "tree-shaking",
      label: "Configure Lodash Tree Shaking",
      description: "Instructs Webpack to strip unused utility functions, importing only the specific helpers queried by modules.",
      impacts: { size: -115, loadTime: -0.7 },
    },
    {
      id: "replace-moment",
      label: "Swap Moment.js for date-fns",
      description: "Replaces the bloated, mutable Moment.js locale timezone dictionary with modular, functional date-fns utilities.",
      impacts: { size: -80, loadTime: -0.5 },
    },
    {
      id: "lazy-charts",
      label: "Lazy Load Highcharts Core Library",
      description: "Defers fetching and compiling heavy interactive graphing dependencies until the user actually scrolls to dashboard frames.",
      impacts: { size: -150, loadTime: -1.0, requests: 2 },
    },
    {
      id: "react-external",
      label: "Externalize React Core to CDN",
      description: "Excludes React and ReactDOM source runtimes from your main chunk build, referencing cached versions via CDN lines.",
      impacts: { size: -130, loadTime: -0.8, requests: 2 },
    },
  ],
  explanation:
    "Reducing monolithic bundles is solved using split boundaries (dynamic imports), swapping heavy dependencies (date-fns replacing Moment.js), and leveraging tree-shaking to purge unused modules. Notice that splitting chunks increases the HTTP request count, but the overall load time falls significantly because the main thread compiles less code upfront!"
};
