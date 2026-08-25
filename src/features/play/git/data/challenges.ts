import { SequenceChallenge } from "../../types";

export const gitChallenge: SequenceChallenge = {
  id: "git-rebase-sequence",
  category: "Developer Workflow",
  title: "Git Rebase Quest",
  description: "Rebase your local feature branch on top of main master updates. Chronologically sequence the workflow steps to ensure a clean history without corrupting public git graphs.",
  difficulty: "hard",
  targetDescription: "Fetch Remote ➔ Checkout Feature ➔ Execute Rebase ➔ Resolve Conflicts ➔ Force Push with Lease.",
  correctOrder: ["fetch", "checkout", "rebase", "resolve", "push"],
  steps: [
    {
      id: "fetch",
      label: "Fetch Remote State",
      description: "Execute 'git fetch origin' to pull the latest commit nodes and branches tracking details from the cloud server.",
    },
    {
      id: "checkout",
      label: "Checkout Feature Branch",
      description: "Run 'git checkout feature/search' (or switch via editor panels) to load your local working workspace branch.",
    },
    {
      id: "rebase",
      label: "Trigger Rebase on Main",
      description: "Execute 'git rebase origin/main' to rewind your feature commits and append them sequentially on top of the latest master updates.",
    },
    {
      id: "resolve",
      label: "Resolve Merge Conflicts",
      description: "If compilation halts, audit file overlaps, clean marker tags, and resume via 'git rebase --continue'.",
    },
    {
      id: "push",
      label: "Force Push with Lease",
      description: "Safely overwrite remote history using 'git push origin feature/search --force-with-lease' (never use standard force push).",
    },
  ],
  explanation:
    "Rebasing feature branches requires pulling remote states (`fetch`), checking out your workspace (`checkout`), executing rebases on upstream master lines (`rebase`), cleaning overlaps (`resolve`), and pushing revisions safely with `--force-with-lease` which guarantees you won't accidentally overwrite teammate commits pushed in the interim!"
};
