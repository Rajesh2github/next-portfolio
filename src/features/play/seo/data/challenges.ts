import { DetectiveChallenge } from "../../types";

export const seoChallenges: DetectiveChallenge[] = [
  {
    id: "poor-title",
    title: "Case #1: The Uninformative Title",
    description: "A product category list page has a raw, uninformative HTML title tag: '<title>Products</title>'. Click-through rates from search engines are extremely low.",
    difficulty: "easy",
    symptom: "Search engines display weak, unappealing snippets. Missing keywords and branding context inside <title>.",
    code: `<head>
  <title>Products</title>
  <meta name="description" content="Browse our inventory catalog." />
</head>`,
    consoleLogs: [
      "🖥️ Catalog hydrated successfully.",
      "⚠️ [SEO Analyzer] Warning: Title is too short (8 chars) and lacks brand keywords. Best practice is 50-60 chars."
    ],
    options: [
      { id: "wrong-1", label: "Change the title tag to '<title>Our Super Awesome Premium Developer Products Category Page</title>'.", correct: false },
      { id: "correct", label: "Set descriptive keyword + brand structure: '<title>Developer Gear & Tech Pouch Accessories | Rajesh Tiwari</title>'.", correct: true },
      { id: "wrong-2", label: "Remove the <title> tag completely and let search engines pick from the <h1> on the page.", correct: false },
      { id: "wrong-3", label: "Add 'title=\"Developer accessories\"' attribute directly to the <head> tag.", correct: false }
    ],
    explanation:
      "A page title is the single most important on-page SEO meta-tag. It should be concise, contain high-value keywords, and include branding context, keeping within the 50-60 character boundary. Titles that are too long get cropped (`...`), and brief titles like 'Products' fail to attract searches or clicks."
  },
  {
    id: "heading-hierarchy",
    title: "Case #2: The Jumbled Headers",
    description: "A blog post has its main heading formatted as an 'H3', while several minor subheadings are styled as 'H1' elements to make them look larger visually.",
    difficulty: "medium",
    symptom: "Googlebot crawler reports jumbled semantic structure. Heading hierarchy is out of order.",
    code: `/* Document Body Markup */
<header>
  <h3>Case Study: Web Performance</h3>
</header>
<main>
  <h1>Section 1: Initial Metrics</h1>
  <p>Some metrics analysis lines...</p>
</main>`,
    consoleLogs: [
      "🖥️ Blog layout mounted.",
      "⚠️ [SEO Semantic Linter] Error: Multiple <h1> tags detected on a single document page.",
      "⚠️ [SEO Semantic Linter] Error: Document begins with <h3> before any <h1> tag is declared."
    ],
    options: [
      { id: "wrong-1", label: "Keep the markup but use CSS to set font-size on H3 to match H1.", correct: false },
      { id: "correct", label: "Use one <h1> for the article title, and <h2> for subsections. Use CSS font-size rules for sizes.", correct: true },
      { id: "wrong-2", label: "Change all headers to <h3> to make them uniform.", correct: false },
      { id: "wrong-3", label: "Convert all heading tags to <div> tags styled with bold utilities.", correct: false }
    ],
    explanation:
      "Search engine crawlers parse heading structures (`H1` through `H6`) to understand the semantic outline of a document. There should strictly be exactly ONE `H1` representing the primary page topic, followed sequentially by `H2` for sub-sections and `H3` for nested headings. NEVER use heading tags for visual font sizing—rely on CSS styles (like Tailwind's `text-3xl`, `text-lg`) instead!"
  },
  {
    id: "missing-canonical",
    title: "Case #3: The Duplicate Index Penalty",
    description: "A tech blog renders posts using both 'https://rajesh.com/blog/speed' and 'https://rajesh.com/blog/speed?ref=newsletter'. Search engine crawlers are flagging duplicate pages and splitting ranking authority.",
    difficulty: "hard",
    symptom: "SEO rank decay. Authority is divided between duplicate URLs, hurting overall visibility.",
    code: `<head>
  <title>Speed Optimization - Rajesh</title>
  <!-- No canonical relationship is defined -->
</head>`,
    consoleLogs: [
      "🖥️ Route hydrated.",
      "⚠️ [Googlebot Core] Audit Warn: Duplicate page content detected on alternative query parameter routes."
    ],
    options: [
      { id: "wrong-1", label: "Add a 'noindex' meta tag to the query parameter page.", correct: false },
      { id: "correct", label: "Add a <link rel=\"canonical\" href=\"https://rajesh.com/blog/speed\" /> tag inside the <head>.", correct: true },
      { id: "wrong-2", label: "Redirect all queries to home page using absolute server-side paths.", correct: false },
      { id: "wrong-3", label: "Apply 'aria-label=\"canonical\"' link relationships directly inside the <body>.", correct: false }
    ],
    explanation:
      "When a single piece of content is accessible at multiple URLs (e.g., due to trackers, newsletter referrals, or pagination), crawlers treat them as separate duplicates, which splits your page-rank authority. Declaring a `<link rel=\"canonical\">` tag tells search engines which URL is the 'single source of truth' (the master copy), concentrating all ranking power into that one URL."
  },
  {
    id: "accidental-noindex",
    title: "Case #4: The Invisible Production Site",
    description: "Your team launched a major website update to production. After two weeks, Google Search Console shows that the new production pages are not appearing in search indexes at all.",
    difficulty: "medium",
    symptom: "Zero search queries recorded. Search Console reveals index blocks on live URLs.",
    code: `<head>
  <title>Launch Portfolio | Rajesh Tiwari</title>
  <meta name="robots" content="noindex, nofollow" />
</head>`,
    consoleLogs: [
      "🖥️ Production cluster live.",
      "⚠️ [Googlebot Indexer] Skip Indexing: Page is flagged under robots 'noindex' instruction."
    ],
    options: [
      { id: "wrong-1", label: "Add a sitemap.xml to the root directory linking all URLs.", correct: false },
      { id: "correct", label: "Change the robots meta tag to 'index, follow' on production builds.", correct: true },
      { id: "wrong-2", label: "Write a server-side redirect rule to map traffic to secure TLS links.", correct: false },
      { id: "wrong-3", label: "Add 'allow: /' to the top of your head tags config.", correct: false }
    ],
    explanation:
      "The robots meta directive `<meta name=\"robots\" content=\"noindex, nofollow\" />` explicitly commands all crawl bots (Googlebot, Bingbot) to ignore the page and skip adding it to search indexes. This is common during local staging, but if accidentally committed to production, it completely hides your site from search results. Changing it to `index, follow` restores normal search indexing."
  }
];
