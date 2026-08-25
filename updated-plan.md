# MASTER DEVELOPMENT PROMPT

# `/play` — Interactive Engineering Playground

You are working on my existing personal portfolio website:

**Website:** https://www.rajeshtiwari.com/

The project is a professional developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion (verify the actual repository before making assumptions).

I want to build a new `/play` section.

---

# 1. PRODUCT VISION

The `/play` section is NOT intended to be a traditional gaming website.

It should be an:

> **Interactive Engineering Playground**

The purpose is to let visitors learn and experiment with frontend and web engineering concepts through small interactive games, visual challenges, simulations, quizzes, and debugging exercises.

The experience should communicate:

> "This is a frontend engineer who understands technology deeply and can turn technical concepts into engaging user experiences."

The playground should be:

* Professional
* Modern
* Interactive
* Educational
* Slightly playful
* Fast
* Mobile-friendly
* Accessible
* Visually consistent with my existing portfolio

Avoid making it look like a children's gaming website.

---

# 2. VERY IMPORTANT — ANALYZE THE EXISTING PROJECT FIRST

Before writing any code:

1. Inspect the entire repository structure.
2. Determine whether the project uses:

   * Next.js App Router or Pages Router
   * TypeScript configuration
   * Tailwind
   * CSS Modules
   * Styled Components
   * Framer Motion
   * Any existing design system
   * Existing UI components
   * Existing theme/dark-mode implementation
   * Existing layout/navigation/footer components
3. Inspect existing pages.
4. Inspect reusable components.
5. Inspect existing utility functions.
6. Inspect existing testing setup.
7. Inspect ESLint and formatting configuration.
8. Inspect `next.config.*`.
9. Inspect package.json.
10. Understand how the existing application handles metadata/SEO.
11. Understand existing animation patterns.

Do NOT immediately start creating files.

First provide a short repository analysis.

Then provide:

```text
Current Architecture
Existing Reusable Components
Existing Styling System
Existing Animation System
Existing Routing Pattern
Recommended /play Architecture
Files That Should Be Created
Files That Should Be Modified
```

Only after this analysis should implementation begin.

---

# 3. NON-NEGOTIABLE RULES

Follow these rules throughout implementation.

## Rule 1 — Do not redesign the existing portfolio

The `/play` section must feel like it belongs to the existing website.

Reuse:

* Navbar
* Footer
* Typography
* Colors
* Spacing
* Cards
* Buttons
* Animation patterns
* Theme system

where appropriate.

---

## Rule 2 — Do not introduce unnecessary dependencies

Before adding a package, determine whether the functionality can be implemented with:

* React
* Next.js
* TypeScript
* CSS
* Existing dependencies

Prefer existing dependencies.

---

## Rule 3 — Build reusable architecture

Do not create every game as an independent one-off implementation.

We will have many interactive experiences.

The architecture should support adding a new game without rewriting the application.

---

## Rule 4 — Data-driven challenges

Questions and challenge definitions should live separately from UI logic.

For example:

```ts
const challenge = {
  id: "flex-center",
  title: "Center the items",
  difficulty: "easy",
  ...
};
```

The UI should consume challenge definitions.

---

## Rule 5 — Avoid over-engineering

Do not build a giant game engine.

Create reusable abstractions only when they provide real value.

Start simple and evolve the architecture when required.

---

# 4. HIGH-LEVEL ROUTE STRUCTURE

The main route:

```text
/play
```

Categories:

```text
/play/frontend
/play/performance
/play/seo
/play/workflow
/play/architecture
/play/security
```

Individual experiences can eventually have routes such as:

```text
/play/javascript
/play/css-flex
/play/css-grid
/play/react
/play/accessibility

/play/core-web-vitals
/play/lighthouse
/play/bundle

/play/seo
/play/robots
/play/structured-data

/play/git
/play/git-conflicts
/play/cicd
/play/debug

/play/cloud
/play/scaling

/play/security
/play/http
```

However:

**Do not necessarily create every route now.**

Implement routes progressively according to the phases defined later.

---

# 5. `/play` LANDING PAGE

Create a professional landing page.

Hero:

```text
Play. Experiment. Learn.
```

Description:

```text
Interactive frontend and web engineering challenges.
Learn concepts, experiment with code, and solve real-world problems.
```

The page should introduce the idea without excessive text.

---

# 6. CATEGORY STRUCTURE

The main `/play` page should eventually contain these categories.

---

## CATEGORY 1 — Frontend

```text
Frontend
```

Experiences:

### JavaScript Arena

Predict JavaScript output and understand why.

Topics:

* Variables
* Scope
* Hoisting
* Closures
* `this`
* Objects
* Arrays
* Type coercion
* Equality
* Event loop
* Promises
* Async/await

---

### CSS Flexbox Lab

Visually solve Flexbox problems.

Users manipulate:

```text
display
flex-direction
justify-content
align-items
flex-wrap
gap
align-content
```

The UI changes immediately.

The user must recreate the target layout.

---

### CSS Grid Lab

Users solve layout challenges involving:

```text
grid-template-columns
grid-template-rows
grid-template-areas
gap
```

This should work similarly to Flexbox Lab.

---

### React Challenge

Interactive React concepts:

* State updates
* Props
* Re-rendering
* useEffect
* useMemo
* useCallback
* Component composition
* Controlled components

---

### Accessibility Detective

Users identify accessibility problems.

Examples:

```html
<div onclick="submit()">Submit</div>
```

Problems:

* Not semantic
* Keyboard accessibility
* Focus behavior

Other challenges:

* Missing labels
* Missing alt text
* Poor contrast
* Incorrect ARIA usage
* Keyboard navigation
* Focus management

---

# 7. CATEGORY 2 — WEB PERFORMANCE

Category:

```text
Web Performance
```

---

## Core Web Vitals Lab

Teach:

* LCP
* INP
* CLS

Example:

```text
LCP: 5.2s ❌
INP: 140ms ✅
CLS: 0.28 ❌
```

Show a simulated website.

The user must identify what is causing the problem.

Example:

```text
Large hero image
Blocking JavaScript
Layout shift
Third-party script
```

Then explain the solution.

---

## Lighthouse Optimizer

Start with:

```text
Performance: 45
Accessibility: 82
Best Practices: 78
SEO: 60
```

Give optimization choices.

Example:

```text
Optimize image
Remove unused JavaScript
Lazy load image
Add semantic HTML
Add canonical
Compress resources
```

The score changes based on the user's choices.

This is a simulation, not a real Lighthouse run.

Clearly communicate that the scores are simulated.

---

## Bundle Optimizer

Display a simulated JavaScript bundle.

Example:

```text
React       200 KB
Charts      150 KB
Lodash      120 KB
Moment       80 KB
Application 300 KB
```

Allow actions:

```text
Dynamic import
Tree shaking
Remove dependency
Code splitting
Replace library
```

Then show:

```text
Before: 850 KB
After: 420 KB
```

Teach bundle optimization concepts.

---

# 8. CATEGORY 3 — SEO

Category:

```text
SEO
```

---

## SEO Detective

Show a simulated page containing SEO issues.

Example:

```text
Title: Home

<h3>Product</h3>
<h1>Buy Now</h1>

<img src="product.jpg">
```

User identifies:

* Bad title
* Missing meta description
* Missing alt
* Heading hierarchy
* Missing canonical
* Bad URL

Display an SEO score.

---

## Google Bot Simulator

Simulate crawling.

Example:

```text
Googlebot
   ↓
/products
   ↓
/products/iphone
   ↓
/private
```

Use:

```text
robots.txt
sitemap.xml
canonical
noindex
redirect
```

Let the user determine:

```text
Crawl
Do not crawl
Index
Do not index
```

Visualize the crawler's journey.

---

## robots.txt Challenge

Give users robots rules.

Example:

```text
User-agent: *
Disallow: /admin
Disallow: /private
Allow: /public
```

Ask whether a URL is crawlable.

---

## Structured Data Builder

Allow users to construct JSON-LD.

Examples:

```text
Article
Product
Person
Organization
BreadcrumbList
```

Start with basic properties and progressively build valid structured data.

---

# 9. CATEGORY 4 — DEVELOPER WORKFLOW

Category:

```text
Developer Workflow
```

---

## Git Quest

Visualize Git branches.

Example:

```text
main
  ●──●──●
       \
        ●──● feature
```

Ask users what command/action should be used.

Topics:

* merge
* rebase
* cherry-pick
* reset
* revert
* stash

---

## Git Conflict Resolver

Show:

```text
<<<<<<< HEAD
const title = "Hello";
=======
const title = "Welcome";
>>>>>>> feature
```

User resolves the conflict.

Then explain:

* What caused conflict
* What resolution does
* Difference between merge and rebase

---

## CI/CD Pipeline Builder

Provide blocks:

```text
Checkout
Install
Lint
Test
Build
E2E
Deploy Staging
Approval
Deploy Production
```

Users arrange them into a valid pipeline.

Then simulate failures.

Example:

```text
Build       ✅
Unit Test   ❌
Deploy      🚫
```

Explain why deployment should stop.

---

## Debug Hunter

Create realistic frontend debugging scenarios.

Example:

```text
Production Bug

Page works locally.

Production:
Blank screen.
```

Give investigation tools:

```text
Console
Network
Environment Variables
Build Logs
Server Logs
```

The user investigates and finds the root cause.

Possible scenarios:

* Missing environment variable
* API failure
* Hydration mismatch
* Wrong basePath
* CORS
* CSP
* Incorrect asset path
* Runtime error

---

# 10. CATEGORY 5 — CLOUD & ARCHITECTURE

Category:

```text
Architecture
```

---

## Cloud Architecture Builder

Users receive requirements:

```text
1 million users
Global traffic
Static assets
API
Database
```

Available components:

```text
CDN
Load Balancer
Application Server
Object Storage
Database
Cache
Queue
```

Users connect them.

Then simulate traffic.

---

## Scale the Application

Start with:

```text
Users
 ↓
Single Server
 ↓
Database
```

Increase traffic.

The user needs to improve architecture.

Possible actions:

```text
Add CDN
Add Load Balancer
Add Server
Add Cache
Add Queue
```

Show simulated:

```text
Latency
Availability
Cost
Capacity
```

Important:

Architecture often has multiple valid solutions.

Do NOT create misleading "only one correct architecture" challenges.

Use scoring based on trade-offs instead.

---

# 11. CATEGORY 6 — SECURITY

Category:

```text
Application Security
```

---

## Security Detective

Show vulnerable examples.

Example:

```js
const query =
  `SELECT * FROM users WHERE name = '${name}'`;
```

Ask:

```text
What is the security problem?
```

Topics:

* XSS
* SQL Injection
* CSRF
* CORS
* Authentication
* Authorization
* CSP
* Cookies
* Secrets
* Security headers

Keep this defensive and educational.

Do not provide instructions for attacking real systems.

---

## Secure the Application

Show:

```text
❌ Missing CSP
❌ Insecure cookie
❌ Exposed secret
❌ Missing HTTPS
```

Let the user choose appropriate protections.

Then show:

```text
Security Score: 90/100
```

---

# 12. CATEGORY 7 — HTTP & BROWSER

Category:

```text
Browser & Networking
```

---

## HTTP Journey

Teach what happens after entering:

```text
https://example.com
```

Interactive sequence:

```text
Browser
 ↓
DNS
 ↓
TCP
 ↓
TLS
 ↓
HTTP Request
 ↓
Server
 ↓
Response
 ↓
Browser Rendering
```

Allow users to arrange the steps.

---

## HTTP Status Challenge

Show scenarios:

```text
Resource missing
Unauthorized
Forbidden
Server error
Redirect
```

User selects:

```text
200
301
302
400
401
403
404
500
```

Then explain.

---

# 13. GAME / CHALLENGE TYPES

Do not treat every experience as the same type of game.

Create reusable patterns.

## Quiz Engine

Used for:

* JavaScript
* SEO
* Security
* HTTP

Flow:

```text
Question
 ↓
Answer
 ↓
Explanation
 ↓
Score
 ↓
Next
```

---

## Visual Lab Engine

Used for:

* Flexbox
* Grid
* Performance

Flow:

```text
Target
 ↓
User controls
 ↓
Live preview
 ↓
Validation
 ↓
Success
```

---

## Detective Engine

Used for:

* SEO
* Accessibility
* Debugging
* Security

Flow:

```text
Scenario
 ↓
Investigate
 ↓
Identify problem
 ↓
Fix
 ↓
Explanation
```

---

## Builder Engine

Used for:

* CI/CD
* Cloud Architecture
* Structured Data

Flow:

```text
Requirements
 ↓
Available components
 ↓
User builds solution
 ↓
Validation
 ↓
Score
```

---

## Simulation Engine

Used for:

* Google Bot
* HTTP Journey
* Deployment
* Scaling

Flow:

```text
Initial state
 ↓
User action
 ↓
Simulation
 ↓
Result
 ↓
Explanation
```

---

# 14. PROPOSED ARCHITECTURE

Adapt this to the existing repository.

A possible architecture:

```text
app/
  play/
    page.tsx

    javascript/
      page.tsx

    css-flex/
      page.tsx

    css-grid/
      page.tsx

    seo/
      page.tsx

    performance/
      page.tsx

    git/
      page.tsx

    debug/
      page.tsx

components/
  play/
    PlayHero.tsx
    PlayCategory.tsx
    PlayCard.tsx
    GameLayout.tsx
    GameHeader.tsx
    ProgressBar.tsx
    ScoreDisplay.tsx
    ResultScreen.tsx
    Hint.tsx

features/
  play/
    engine/
      types.ts
      useGameProgress.ts

    javascript/
      components/
      data/
      types.ts
      utils/

    css-flex/
      components/
      data/
      types.ts
      utils/

    seo/
      components/
      data/
      types.ts

    performance/
      components/
      data/
      types.ts

    git/
      components/
      data/
      types.ts

    security/
      components/
      data/
      types.ts

    architecture/
      components/
      data/
      types.ts
```

Again:

**Do not blindly follow this structure.**

Use the repository's existing architecture if it provides a better solution.

---

# 15. DATA-DRIVEN DESIGN

Every challenge should have a typed definition.

Example:

```ts
type Difficulty = "easy" | "medium" | "hard";

type ChallengeBase = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  hint?: string;
};
```

Quiz:

```ts
type QuizChallenge = ChallengeBase & {
  type: "quiz";
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
};
```

Visual:

```ts
type VisualChallenge = ChallengeBase & {
  type: "visual";
  target: unknown;
  initialState: unknown;
  solution: unknown;
};
```

Do not create an overly generic type system if it makes the implementation harder.

---

# 16. SHARED GAME EXPERIENCE

All challenges should have consistent UI.

A game page should generally contain:

```text
Back to Play

Category
Challenge 3 / 10

Title
Description

-------------------------
|                       |
|      Challenge        |
|                       |
-------------------------

Hint

Progress

Score
```

At completion:

```text
Challenge Complete 🎉

Score
Accuracy
Time

[Next Challenge]
[Play Again]
[Back to Play]
```

---

# 17. PROGRESS SYSTEM

Eventually support:

```text
Completed:
12 / 30

JavaScript:
██████░░░░

CSS:
████████░░

SEO:
███░░░░░░░

Performance:
████░░░░░░
```

Do not implement global progress tracking until the basic games work.

Start with local game progress.

---

# 18. SCORING

Possible scoring:

```text
Correct answer: +100
Hint used: -10
Wrong answer: 0
Fast completion: bonus
```

But don't overcomplicate the scoring system initially.

For educational games, explanations are more important than points.

---

# 19. MOBILE EXPERIENCE

Everything must work on mobile.

For visual games:

Desktop:

```text
Controls | Preview
```

Mobile:

```text
Preview

Controls

Generated Result
```

Avoid tiny controls.

Avoid requiring drag-and-drop when there is a better mobile interaction.

---

# 20. ACCESSIBILITY

All games must support:

* Keyboard navigation
* Visible focus
* Semantic HTML
* Screen-reader labels
* Accessible form controls
* No color-only feedback
* Reduced motion where applicable

---

# 21. PERFORMANCE

The `/play` feature must not negatively impact the portfolio.

Requirements:

* Route-level code splitting
* Lazy-load heavy experiences
* Avoid unnecessary dependencies
* Avoid unnecessary global state
* Avoid large animation libraries if already available alternatives exist
* Avoid rendering all games on `/play`

Each game should load only when required.

---

# 22. SEO FOR `/play`

Every public challenge route should have useful metadata.

Examples:

```text
/play
Interactive Frontend Engineering Playground | Rajesh Tiwari

/play/javascript
JavaScript Challenges | Rajesh Tiwari

/play/css-flex
CSS Flexbox Playground | Rajesh Tiwari

/play/seo
Interactive SEO Challenges | Rajesh Tiwari
```

Follow the existing project's metadata conventions.

Also consider:

* canonical URLs
* Open Graph metadata
* structured data where genuinely appropriate
* sitemap inclusion
* robots behavior

Do not blindly add SEO features just for the sake of adding them.

---

# 23. ANALYTICS

Do not add analytics unless the existing project already has an analytics solution.

If analytics already exists, consider tracking:

```text
game_started
challenge_completed
game_completed
hint_used
```

But:

* Do not collect unnecessary personal information.
* Do not introduce a new analytics provider without justification.

---

# 24. TESTING

For reusable logic, add unit tests where appropriate.

Especially test:

* Challenge validation
* Scoring
* Progress
* Flexbox solution matching
* SEO rule evaluation
* Git state transitions
* Pipeline validation

Example:

```text
isFlexChallengeComplete()
calculateScore()
isSeoIssueFixed()
validatePipeline()
```

Do not write meaningless snapshot tests for everything.

---

# 25. IMPLEMENTATION PHASES

This is extremely important.

DO NOT attempt to build all categories in one pass.

---

## PHASE 0 — Repository Analysis

Analyze the project.

Do not implement.

Deliver:

```text
Architecture analysis
Recommended architecture
Files to create
Files to modify
Potential risks
```

---

# PHASE 1 — Foundation

Build:

```text
/play
```

Create:

* Play hero
* Category cards
* Game card
* Shared layout
* Shared progress
* Shared result components
* Responsive behavior

Then implement:

```text
/play/javascript
```

Add:

* 10 questions
* Score
* Progress
* Explanation
* Results
* Restart

Then implement:

```text
/play/css-flex
```

Add:

* 6 challenges
* Live preview
* Controls
* Target preview
* Generated CSS
* Hint
* Completion detection

STOP and test Phase 1 thoroughly before moving forward.

---

# PHASE 2 — Web Engineering

Implement:

```text
/play/css-grid
/play/accessibility
/play/core-web-vitals
/play/bundle
```

Focus on polished interactive experiences.

---

# PHASE 3 — SEO

Implement:

```text
/play/seo
/play/robots
/play/structured-data
```

Focus on visual explanations.

---

# PHASE 4 — Developer Workflow

Implement:

```text
/play/git
/play/git-conflicts
/play/cicd
/play/debug
```

---

# PHASE 5 — Security & Networking

Implement:

```text
/play/security
/play/http
```

---

# PHASE 6 — Architecture

Implement:

```text
/play/cloud
/play/scaling
```

These should emphasize trade-offs rather than a single "correct" answer.

---

# 26. QUALITY BAR

Before considering a challenge complete, ask:

### Is it fun?

Would a developer actually want to click around?

### Is it educational?

Does the user understand something after playing?

### Is it technically correct?

No misleading explanations.

### Is it visually clear?

Can the user immediately understand what to do?

### Is it responsive?

Works on desktop and mobile.

### Is it accessible?

Keyboard and semantic support.

### Is it performant?

No unnecessary JavaScript.

### Does it fit my portfolio?

It should feel like part of:

```text
rajeshtiwari.com
```

not a separate gaming website.

---

# 27. IMPORTANT CONTENT RULE

Technical explanations must be accurate.

If you are uncertain about a technical fact:

1. Verify it.
2. Do not invent an explanation.
3. Prefer a simpler verified question.

This is especially important for:

* JavaScript behavior
* Browser behavior
* SEO
* Core Web Vitals
* HTTP
* Security
* Cloud architecture
* Git behavior

---

# 28. FINAL DESIGN PRINCIPLE

The `/play` page should communicate three things:

```text
I know technology.
        +
I understand user experience.
        +
I enjoy building things.
```

The goal is not to demonstrate how many games I can build.

The goal is to create an interactive representation of my engineering knowledge.

---

# 29. FIRST TASK

Start now with ONLY:

## Step 1

Analyze the existing repository.

Do NOT modify files yet.

Report:

1. Current framework/version
2. App Router vs Pages Router
3. Existing styling system
4. Existing design system/components
5. Existing animation system
6. Existing navigation/layout
7. Existing SEO/metadata implementation
8. Existing testing setup
9. Existing folder structure
10. Recommended `/play` architecture
11. Exact files you recommend creating
12. Exact existing files that need modification

Then wait for approval before implementing Phase 1.

Do not skip repository analysis.
Do not create placeholder games.
Do not install dependencies without justification.
Do not modify unrelated portfolio functionality.
