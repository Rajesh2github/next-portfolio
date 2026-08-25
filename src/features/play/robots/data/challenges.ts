import { QuizChallenge } from "../../types";

export const robotsChallenges: QuizChallenge[] = [
  {
    id: "disallow-admin",
    category: "robots.txt Syntax",
    difficulty: "easy",
    question: "Under these robots rules, is a search engine crawler allowed to crawl the path 'https://rajesh.com/admin/settings'?",
    code: `User-agent: *
Disallow: /admin/
Allow: /admin/login`,
    options: [
      { id: "no", label: "No, crawling is blocked." },
      { id: "yes", label: "Yes, crawling is allowed." },
      { id: "sitemaps", label: "Only if listed in sitemaps." },
      { id: "agent", label: "Depends on user-agent type." },
    ],
    correctAnswer: "no",
    explanation:
      "The directive `Disallow: /admin/` tells all crawl bots (`User-agent: *`) that they are strictly forbidden from accessing any paths starting with `/admin/`. The only exception listed is the login page `/admin/login`. Therefore, accessing `/admin/settings` remains entirely blocked."
  },
  {
    id: "user-agent-matching",
    category: "Crawler Agents",
    difficulty: "medium",
    question: "A custom bot with User-Agent 'BadBot' attempts to crawl your site. Is it allowed to crawl the path '/public/assets'?",
    code: `User-agent: BadBot
Disallow: /

User-agent: *
Allow: /public/`,
    options: [
      { id: "no", label: "No, crawling is blocked." },
      { id: "yes", label: "Yes, crawling is allowed." },
      { id: "public", label: "Only if assets are uncompressed." },
      { id: "both", label: "Yes, because '*' allows public paths." },
    ],
    correctAnswer: "no",
    explanation:
      "When a crawler parses robots.txt, it strictly obeys the *most specific* group matching its user-agent name. Since there is an explicit block for `User-agent: BadBot` to `Disallow: /` (blocking everything), 'BadBot' will ignore the wildcard rules (`User-agent: *`) and block all crawling, including public assets."
  },
  {
    id: "allow-precedence",
    category: "Specificity Priority",
    difficulty: "hard",
    question: "A standard crawler parses this robots file. Is it allowed to crawl '/blog/drafts/post-1'?",
    code: `User-agent: *
Disallow: /blog/drafts/
Allow: /blog/drafts/post-1`,
    options: [
      { id: "yes", label: "Yes, crawling is allowed because 'Allow' is more specific." },
      { id: "no", label: "No, 'Disallow' has global priority." },
      { id: "error", label: "Syntax error: duplicate statements are invalid." },
      { id: "partial", label: "Only if requested over HTTPS." },
    ],
    correctAnswer: "yes",
    explanation:
      "In modern robots.txt parsing rules (supported by Google, Bing, etc.), if multiple directives match a URL, the most specific directive (measured by character length) takes precedence. Since `/blog/drafts/post-1` (25 chars) is longer and more specific than `/blog/drafts/` (14 chars), the crawler obeys the `Allow` statement, making the specific draft crawlable."
  },
  {
    id: "wildcard-matching",
    category: "robots.txt Wildcards",
    difficulty: "hard",
    question: "Is Googlebot allowed to crawl 'https://rajesh.com/projects/calculator.pdf' under this configuration?",
    code: `User-agent: *
Disallow: /*.pdf$`,
    options: [
      { id: "no", label: "No, crawling is blocked." },
      { id: "yes", label: "Yes, crawling is allowed." },
      { id: "only-pdf", label: "Allowed only if sitemaps exist." },
      { id: "meta", label: "Depends on image alt tagging." },
    ],
    correctAnswer: "no",
    explanation:
      "The wildcard rule `/*.pdf$` uses `*` to represent any sequence of characters and `$` to designate the end of the URL. This matches any URL ending in the `.pdf` extension across your entire site. As a result, the crawler blocks `calculator.pdf` from indexing."
  }
];
