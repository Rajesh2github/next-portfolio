import { DetectiveChallenge } from "../../types";

export const gitConflictsChallenges: DetectiveChallenge[] = [
  {
    id: "conflict-simple",
    title: "Case #1: The Title Collision",
    description: "Two developers edited the landing page header title concurrently. Your git merge has halted, reporting an active merge conflict in standard code files.",
    difficulty: "easy",
    symptom: "Merge aborted. Your editor highlights conflicting modifications on the exact same lines of code.",
    code: `<<<<<<< HEAD
const landingTitle = "Engineering Portfolio";
=======
const landingTitle = "Developer Workspace";
>>>>>>> feature/new-heading`,
    consoleLogs: [
      "🌳 git checkout main",
      "🌳 git merge feature/new-heading",
      "⚠️ CONFLICT (content): Merge conflict in landing-page.tsx",
      "🛑 Automatic merge failed; fix conflicts and then commit the result."
    ],
    options: [
      { id: "wrong-1", label: "Delete all the code lines entirely to bypass compilation blocks.", correct: false },
      { id: "correct", label: "Pick the target feature string, strip out all git separators: 'const landingTitle = \"Developer Workspace\";'.", correct: true },
      { id: "wrong-2", label: "Commit the file with the conflict markers ('<<<<<<<', '=======') left in place.", correct: false },
      { id: "wrong-3", label: "Run 'git rebase --abort' and delete the local feature branch.", correct: false }
    ],
    explanation:
      "When Git encounters edits to the same lines of code across merged branches, it prints conflict markers (`<<<<<<<` marks your current HEAD branch, `=======` splits them, and `>>>>>>>` marks the incoming branch). To resolve, select the desired string (or combine both) and delete the markers completely before saving and committing."
  },
  {
    id: "conflict-imports",
    category: "Git Merging",
    title: "Case #2: The Import Overlap",
    description: "During a branch sync, your React imports list has locked up. Both branches appended different utilities inside the same block of lines.",
    difficulty: "medium",
    symptom: "Webpack compiles with errors. Raw git conflict indicators block syntax compilation.",
    code: `<<<<<<< HEAD
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
=======
import { motion } from "framer-motion";
import { parseQueryParams } from "@/lib/router";
>>>>>>> feature/search-filters`,
    consoleLogs: [
      "🌳 git merge feature/search-filters",
      "⚠️ CONFLICT (content): Merge conflict in App.tsx"
    ],
    options: [
      { id: "wrong-1", label: "Select HEAD list and drop the incoming search filters utility import.", correct: false },
      { id: "correct", label: "Combine both imports, deleting markers: 'import { motion } from ...', 'import { formatCurrency } ...', 'import { parseQueryParams } ...'.", correct: true },
      { id: "wrong-2", label: "Change one of the imports to use standard Node.js 'require()' statements.", correct: false },
      { id: "wrong-3", label: "Delete the framer-motion library imports completely to bypass overlaps.", correct: false }
    ],
    explanation:
      "Unlike simple title collisions where one string replaces another, import overlaps frequently require combining *both* changes. Resolving this conflict entails listing both formatCurrency and parseQueryParams imports sequentially and removing all the structural git indicators."
  },
  {
    id: "conflict-double-edit",
    category: "Git Merging",
    title: "Case #3: The Function Refactor",
    description: "A helper function's return parameters have clashed. One developer converted standard syntax to arrow formats, while another optimized the internal calculation math.",
    difficulty: "hard",
    symptom: "Visual compilation warning. Git is completely unable to merge the modified scopes automatically.",
    code: `<<<<<<< HEAD
export function calculateTax(price: number) {
  return price * 0.15 + 2.5;
}
=======
export const calculateTax = (price: number) => price * 0.20 + 2.5;
>>>>>>> feature/tax-update`,
    consoleLogs: [
      "🌳 git merge feature/tax-update",
      "⚠️ CONFLICT (content): Merge conflict in tax.ts"
    ],
    options: [
      { id: "wrong-1", label: "Keep the HEAD function and drop the 20% tax update completely.", correct: false },
      { id: "correct", label: "Apply both the modern arrow function refactor AND the updated 20% rate: 'export const calculateTax = (price: number) => price * 0.20 + 2.5;'.", correct: true },
      { id: "wrong-2", label: "Leave both blocks in the file and rename one to 'calculateTax2'.", correct: false },
      { id: "wrong-3", label: "Revert your branch commits entirely using 'git reset --hard HEAD~5'.", correct: false }
    ],
    explanation:
      "When resolving complex overlaps, look at the logical intent of both branches. Here, one branch refactored the syntax (`const calculateTax = () =>`) and another updated the value (`0.20`). The correct merged resolution applies *both* changes together, formatting as the modern arrow while holding the correct, updated business calculation."
  },
  {
    id: "conflict-html-nest",
    category: "Git Merging",
    title: "Case #4: The Nested Layout Clash",
    description: "Two developers simultaneously appended different action buttons inside the same responsive parent dashboard flex container, trapping the markup.",
    difficulty: "medium",
    symptom: "Dev server reports broken JSX closure tags. Unremoved git conflict markers corrupt HTML trees.",
    code: `<div className="flex justify-between items-center">
<<<<<<< HEAD
  <button className="btn-primary">Buy Now</button>
=======
  <button className="btn-primary">Buy Now</button>
  <button className="btn-secondary">Add to Wishlist</button>
>>>>>>> feature/wishlist
</div>`,
    consoleLogs: [
      "🌳 git merge feature/wishlist",
      "⚠️ CONFLICT (content): Merge conflict in ProductDashboard.tsx"
    ],
    options: [
      { id: "wrong-1", label: "Select HEAD's single 'Buy Now' button block.", correct: false },
      { id: "correct", label: "Keep the incoming block containing both 'Buy Now' and 'Add to Wishlist' buttons: '<button className=\"btn-primary\">Buy Now... <button className=\"btn-secondary\">Add to...'.", correct: true },
      { id: "wrong-2", label: "Wrap the incoming block inside a separate <iframe> wrapper.", correct: false },
      { id: "wrong-3", label: "Move the flex container div tags inside the git head tag marker.", correct: false }
    ],
    explanation:
      "In this layout clash, the feature branch has appended a second action button (`Add to Wishlist`) beside the original `Buy Now` button, while HEAD only had the original button. Accepting the incoming wishlist block captures both actions correctly, resolving the layout overlap once indicators are cleaned."
  }
];
