# Build the learning platform foundation — `/learn`

You are a senior frontend engineer, UI/UX designer, and product-minded architect working on my existing Next.js portfolio application.

Your task is to **build the complete foundation for a scalable learning platform under `/learn`**.

We are **not adding the actual learning content yet**. First, we want to develop the architecture, content model, reusable components, routes, validation, and user experience required to support JavaScript and TypeScript learning.

The goal is to make it easy to add hundreds of lessons, MCQs, coding problems, interview questions, and release features later **without changing the core UI architecture**.

---

# 1. Product context

This is my existing portfolio website:

* Portfolio: `https://www.rajeshtiwari.com/`
* Learning section: `/learn`
* Main technologies: Next.js, React, TypeScript
* Authentication: Clerk, if already configured
* Styling: Inspect and reuse the existing design system

The learning platform will eventually contain:

### JavaScript

* 60-Day JavaScript Challenge
* Daily coding challenge
* Company-wise interview preparation
* Common interview questions
* JavaScript Evolution / ECMAScript releases
* Concept Playground
* Learning progress
* Bookmarks
* Revision mode

### TypeScript

* Structured learning path
* Interview preparation
* Daily challenge
* Common interview questions
* TypeScript releases / evolution
* Practice and progress

**Important:** JavaScript and TypeScript must be separate learning tracks, but they should share the same underlying content architecture and reusable UI components.

---

# 2. Main objective

Build the foundation so that later we can add content like:

```text
JavaScript
    ↓
Topic
    ↓
MCQs
    ↓
Coding Problems
    ↓
Interview Questions
    ↓
Challenge Days
    ↓
Release Features
```

The UI should be able to render all of these from structured content.

### Example future workflow

```text
Add a new topic
    ↓
Add its MDX explanation
    ↓
Add related MCQs
    ↓
Add related coding problems
    ↓
Add interview questions
    ↓
Add it to a challenge day
    ↓
UI automatically renders everything
```

**No page component should need to be rewritten just because new content is added.**

---

# 3. First phase: inspect the existing repository

Before making changes, inspect the project thoroughly.

Report:

### Architecture

* Next.js version
* App Router or Pages Router
* Existing route structure
* Existing layout structure
* Existing navigation components
* Existing design system
* Existing styling approach
* Existing state management
* Existing authentication setup
* Existing Clerk configuration
* Existing middleware
* Existing database setup
* Existing testing setup

### Important questions

* Does `/learn` already exist?
* Is there already a JavaScript or TypeScript learning page?
* Are JavaScript and TypeScript currently combined?
* Is there an existing login page or modal?
* Is there an existing protected-route pattern?
* Is there an existing shared modal/dialog component?
* Is there an existing card, tabs, breadcrumb, or progress component?
* Is there an existing content/data-loading pattern?

**Do not create duplicate components or duplicate authentication logic if suitable implementations already exist.**

After inspection, propose the smallest clean architecture that fits the repository.

---

# 4. Scope of this implementation

## Build now

* Learning route structure
* JavaScript and TypeScript separation
* Shared learning layout
* Content model
* Content loader
* Content validation
* Reusable UI components
* Empty states
* Loading states
* Error states
* Public/private route structure
* Authentication integration points
* Progress integration points
* Bookmark integration points
* Responsive navigation
* Basic learning dashboard foundation

## Do NOT build now

* Actual 60-day lesson content
* Hundreds of MCQs
* Full interview question database
* Full coding problem database
* Complete release history
* Code execution engine
* Online judge
* Full CMS
* Admin panel
* Complex recommendation engine
* Large database migration
* Unnecessary redesign of the portfolio

**The goal is to build the platform foundation, not the entire learning product in one step.**

---

# 5. Recommended information architecture

Adapt this to the existing routing conventions.

```text id="0x0g9h"
/learn
├── page.tsx
│
├── javascript/
│   ├── page.tsx
│   ├── challenge/
│   │   ├── page.tsx
│   │   └── [day]/
│   │       └── page.tsx
│   ├── topics/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── interview/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── releases/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── daily-challenge/
│   │   └── page.tsx
│   ├── playground/
│   │   └── page.tsx
│   └── progress/
│       └── page.tsx
│
└── typescript/
    ├── page.tsx
    ├── challenge/
    ├── topics/
    ├── interview/
    ├── releases/
    ├── daily-challenge/
    ├── playground/
    └── progress/
```

### Important

These are **conceptual routes**.

Do not create unnecessary empty pages just to match the tree.

If a route is not needed yet, create the appropriate placeholder or defer it until the feature is implemented.

Use the existing project conventions.

---

# 6. Separate JavaScript and TypeScript

The learning landing page should clearly show two independent tracks.

```text id="5i9j2m"
Learn
├── JavaScript
│   ├── 60-Day Challenge
│   ├── Topics
│   ├── Interview Preparation
│   ├── Daily Challenge
│   ├── JavaScript Evolution
│   ├── Playground
│   └── Progress
│
└── TypeScript
    ├── Learning Path
    ├── Topics
    ├── Interview Preparation
    ├── Daily Challenge
    ├── TypeScript Evolution
    ├── Playground
    └── Progress
```

### UX requirements

* Users should immediately understand the difference between JavaScript and TypeScript.
* Do not combine both into one generic topic list.
* Do not duplicate the same content between tracks.
* Use shared components with different data.
* Make it easy to switch between JavaScript and TypeScript.

---

# 7. Content architecture — most important part

Build a **content-as-code system**.

Recommended approach:

> **MDX + TypeScript metadata + central loader + validation**

Use the existing project conventions if they already have a suitable content system.

Do not introduce a CMS or database for static learning content at this stage unless the repository already requires one.

---

# 8. Suggested content folder structure

Adapt to the existing project.

```text id="q8v6z1"
content/
├── javascript/
│   ├── topics/
│   ├── challenges/
│   ├── interview-questions/
│   ├── releases/
│   ├── problems/
│   └── categories/
│
└── typescript/
    ├── topics/
    ├── challenges/
    ├── interview-questions/
    ├── releases/
    ├── problems/
    └── categories/
```

### Important

Do not add hundreds of placeholder files.

Create only the minimum example content required to prove that the architecture works.

For example:

* One sample topic
* One sample MCQ
* One sample coding problem
* One sample interview question
* One sample release
* One sample challenge day

Clearly mark them as **sample/demo content**.

---

# 9. Define the content models

Create a central `types.ts` or equivalent.

The models should be reusable across JavaScript and TypeScript.

### Topic

```ts
type Topic = {
  id: string;
  slug: string;
  title: string;
  description: string;
  track: "javascript" | "typescript";
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  prerequisites?: string[];
  relatedTopicIds?: string[];
  contentPath: string;
};
```

### MCQ

```ts
type Mcq = {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topicIds: string[];
};
```

### Coding problem

```ts
type CodingProblem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  track: "javascript" | "typescript";
  difficulty: "easy" | "medium" | "hard";
  topicIds: string[];
  constraints?: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode?: {
    javascript?: string;
    typescript?: string;
  };
  solutionPath?: string;
  hints?: string[];
};
```

### Interview question

```ts
type InterviewQuestion = {
  id: string;
  slug: string;
  question: string;
  shortAnswer: string;
  explanation: string;
  track: "javascript" | "typescript";
  difficulty: "easy" | "medium" | "hard";
  topicIds: string[];
  relatedProblemIds?: string[];
  companyTags?: string[];
  questionType: "conceptual" | "output" | "coding";
};
```

### Challenge day

```ts
type ChallengeDay = {
  day: number;
  title: string;
  description: string;
  track: "javascript" | "typescript";
  topicIds: string[];
  mcqIds: string[];
  problemIds: string[];
  estimatedMinutes: number;
  prerequisites?: number[];
};
```

### JavaScript release

```ts
type JavaScriptRelease = {
  id: string;
  slug: string;
  release: string;
  year: number;
  title: string;
  description: string;
  featureIds: string[];
};
```

### Release feature

```ts
type JavaScriptFeature = {
  id: string;
  slug: string;
  title: string;
  releaseId: string;
  description: string;
  explanation: string;
  beforeExample?: string;
  afterExample?: string;
  topicIds?: string[];
  mcqIds?: string[];
};
```

---

# 10. Important content-model rules

### Rule 1: Stable IDs

Every content item must have a stable ID.

Examples:

```text
js-closures
js-closures-mcq-001
js-counter-closure
js-event-loop-001
js-es2015-let-const
```

### Rule 2: Slugs

Use stable, URL-safe slugs.

### Rule 3: References

Use IDs to connect content.

Example:

```text
Challenge Day 20
    ↓
Topic: js-closures
    ↓
MCQ: js-closures-mcq-001
    ↓
Problem: js-counter-closure
```

### Rule 4: No duplication

Do not duplicate the same explanation in:

* Topic page
* Interview page
* Challenge day
* Release page

Reference the original content.

### Rule 5: Track separation

JavaScript content must not accidentally appear in TypeScript pages.

### Rule 6: UI independence

The UI should not depend on hardcoded content filenames or hardcoded question lists.

---

# 11. Build a central content loader

Create a central loader/query layer.

Suggested APIs:

```ts
getTopicBySlug(track, slug);

getTopics(track);

getChallengeDay(track, day);

getInterviewQuestionBySlug(track, slug);

getInterviewQuestions(track);

getCodingProblemBySlug(track, slug);

getCodingProblems(track);

getReleaseBySlug(track, slug);

getReleases(track);

getRelatedContent(contentId);
```

The exact API can be improved based on the repository.

### Important

The UI should consume content through this loader.

Do not scatter direct imports of content files across every page.

---

# 12. Add content validation

Use Zod or the existing validation approach.

Validation should catch:

* Duplicate IDs
* Duplicate slugs
* Missing required fields
* Invalid difficulty values
* Invalid track values
* Missing references
* Broken topic IDs
* Broken MCQ IDs
* Broken problem IDs
* Broken interview question IDs
* Invalid challenge day references
* Invalid release feature references
* Missing correct answers
* Empty required content

### Example error

```text
❌ Challenge day 20 references problem "js-counter-closure"
   but the problem does not exist.
```

### Important

Validation should run:

* During development
* During build
* Through a dedicated validation script if appropriate

Do not wait until runtime to discover broken content relationships.

---

# 13. Build reusable UI components

Create reusable components based on the content model.

Suggested structure:

```text id="q7g2xj"
components/
└── learn/
    ├── LearnLayout
    ├── LearnHeader
    ├── LearnSidebar
    ├── LearnBreadcrumbs
    ├── TrackSwitcher
    ├── LearningCategoryCard
    ├── LearningPathCard
    ├── TopicCard
    ├── TopicPage
    ├── ChallengeDayCard
    ├── ChallengeDayPage
    ├── McqQuestion
    ├── McqQuiz
    ├── CodingProblemCard
    ├── CodingProblemPage
    ├── InterviewQuestionCard
    ├── InterviewQuestionPage
    ├── ReleaseCard
    ├── ReleaseFeaturePage
    ├── RelatedContent
    ├── ProgressCard
    ├── EmptyState
    ├── LoadingState
    └── ErrorState
```

### Important

These are suggestions.

Do not create unnecessary components.

If multiple components share the same structure, create a reusable primitive.

---

# 14. Build the learning landing page

Create `/learn`.

The page should clearly communicate:

> Learn JavaScript and TypeScript through structured learning paths, practice, and interview preparation.

Suggested sections:

### Hero

* Title
* Description
* Primary CTA: Start learning
* Secondary CTA: Explore topics

### Learning tracks

Two clear cards:

* JavaScript
* TypeScript

### Featured learning paths

Use sample content for now.

### Practice

Show:

* Daily Challenge
* Interview Preparation
* Common Questions

### Continue learning

Show a placeholder or authenticated state.

### Important

Do not make the landing page depend on actual production content yet.

Use a data-driven structure that can later be populated from the content loader.

---

# 15. Build the JavaScript and TypeScript track pages

Create:

```text
/learn/javascript
/learn/typescript
```

Each track page should have:

* Track title
* Description
* Learning path
* Topics
* Interview preparation
* Daily challenge
* Release history
* Playground
* Progress

### Important

Use the same reusable components with different track data.

Do not create separate duplicated components like:

```text
JavaScriptTopicCard
TypeScriptTopicCard
```

unless there is a genuine UI difference.

Prefer:

```text
TopicCard
```

with track-specific data.

---

# 16. Build topic pages

Create a reusable topic page that can render MDX content.

Example future route:

```text
/learn/javascript/topics/closures
```

The page should support:

* Title
* Description
* Difficulty
* Estimated time
* MDX content
* Related topics
* MCQs
* Coding problems
* Interview questions
* Progress action
* Bookmark action

### Important

Do not hardcode the topic explanation inside the page component.

The page should load the topic metadata and content from the content loader.

---

# 17. Build challenge pages

Create:

```text
/learn/javascript/challenge
/learn/javascript/challenge/1
```

And equivalent TypeScript routes.

### Challenge overview

Show:

* Challenge title
* Progress
* Completed days
* Current day
* Upcoming days
* Estimated time
* Difficulty

### Challenge day page

Show:

* Day title
* Learning content
* MCQs
* Coding problems
* Completion action

### Important

The challenge day should reference existing topics, MCQs, and problems.

Do not duplicate their content.

---

# 18. Build interview preparation pages

Create reusable pages for:

* Common interview questions
* Topic-wise questions
* Company-wise questions

Example:

```text
/learn/javascript/interview
/learn/javascript/interview/explain-event-loop
```

The page should support:

* Question
* Short answer
* Detailed explanation
* Code examples
* Related topics
* Related coding problems
* Company tags
* Difficulty
* Question type

### Important

Do not hardcode company names or interview questions into UI components.

Use structured data.

---

# 19. Build JavaScript Evolution pages

Create:

```text
/learn/javascript/releases
/learn/javascript/releases/es2015
```

The page should support:

* Release title
* Year
* Description
* Feature list
* Feature explanation
* Before/after examples
* Related topics
* Related MCQs

### Important

The release history should be data-driven.

Adding a new ECMAScript release later should require adding content, not changing the page component.

---

# 20. Build the Concept Playground foundation

Do not build a full code execution engine yet.

For now, create the architecture for interactive examples.

Suggested model:

```ts
type PlaygroundExample = {
  id: string;
  title: string;
  description: string;
  track: "javascript" | "typescript";
  topicIds: string[];
  code: string;
  explanation?: string;
};
```

Create a reusable component that can later support:

* Code display
* Run button
* Output display
* Explanation
* Reset button

### Important

If code execution is not implemented yet, show a clear placeholder.

Do not pretend that code execution works.

---

# 21. Authentication integration

Use the existing Clerk setup if available.

### Public pages

* `/learn`
* Track pages
* Topic pages
* Interview pages
* Release pages

### Protected features

* Bookmarks
* Progress
* Learning history
* Personalized practice

### Important

Do not force login to read public learning content.

Create reusable authentication integration points for future protected actions.

Example:

```text
User clicks Save
    ↓
ProtectedAction
    ↓
Login required
    ↓
Return to original page
```

Do not implement a separate authentication system.

---

# 22. Progress and bookmark integration

Create the foundation for user-specific features.

Do not build a full backend unless the project already has one.

Suggested interfaces:

```ts
type LearningProgress = {
  userId: string;
  contentId: string;
  completed: boolean;
  completedAt?: string;
  lastVisitedAt?: string;
  quizScore?: number;
  problemSolved?: boolean;
};
```

```ts
type Bookmark = {
  userId: string;
  contentId: string;
  createdAt: string;
};
```

### Important

Keep user data separate from content.

Do not store user progress inside content files.

---

# 23. Loading, empty, and error states

Every major page should have a clear state.

### Loading

Show a proper loading UI.

### Empty

Example:

> No learning content available yet. We are preparing this section.

### Error

Example:

> We couldn't load this learning content. Please try again.

### Important

Do not show blank pages.

Do not show fake content as if it is real.

---

# 24. Responsive and accessibility requirements

The learning platform should work well on:

* Desktop
* Tablet
* Mobile

### Requirements

* No horizontal overflow
* Good spacing
* Clear typography
* Keyboard accessible
* Accessible buttons
* Accessible navigation
* Proper focus management
* Responsive sidebar/navigation
* Clear active states
* Clear loading states

Reuse the existing design system.

Do not introduce an unrelated visual style.

---

# 25. Technical quality requirements

### Prefer

* Reusable components
* Data-driven rendering
* Central content loader
* Strong TypeScript types
* Schema validation
* Clean route structure
* Existing design system
* Existing authentication setup
* Minimal dependencies

### Avoid

* Hardcoded question lists inside components
* Duplicate JavaScript and TypeScript components
* Duplicate authentication logic
* Unnecessary global state
* Large unrelated refactors
* Unnecessary database work
* Building a CMS now
* Building a code execution engine now

---

# 26. Suggested implementation phases

## Phase 1 — Repository discovery

* Inspect architecture
* Identify reusable components
* Identify existing authentication
* Identify existing routing conventions
* Propose implementation plan

## Phase 2 — Content foundation

* Create content types
* Create sample content
* Create content loader
* Create validation
* Create content relationships

## Phase 3 — Shared UI

* Learning layout
* Track switcher
* Topic cards
* Challenge cards
* Interview cards
* Release cards
* Empty/loading/error states

## Phase 4 — Routes

* `/learn`
* `/learn/javascript`
* `/learn/typescript`
* Topic routes
* Challenge routes
* Interview routes
* Release routes

## Phase 5 — Authentication integration

* Protected action foundation
* Login integration
* Return-to-route behavior
* Progress/bookmark integration points

## Phase 6 — Polish

* Responsive design
* Accessibility
* Loading states
* Error states
* Empty states
* Visual consistency

## Phase 7 — Validation

Run:

* TypeScript
* ESLint
* Tests if available
* Build

---

# 27. Acceptance criteria

The implementation is complete when:

* [ ] `/learn` exists and is publicly accessible.
* [ ] JavaScript and TypeScript are separate tracks.
* [ ] Shared components are used for both tracks.
* [ ] Content is stored separately from UI.
* [ ] Content is data-driven.
* [ ] Content has stable IDs and references.
* [ ] A central content loader exists.
* [ ] Content validation exists.
* [ ] Sample content proves the architecture works.
* [ ] Topic pages can render MDX content.
* [ ] Challenge days reference topics, MCQs, and problems.
* [ ] Interview questions reference topics and problems.
* [ ] Release features reference topics and MCQs.
* [ ] New content can be added without changing page components.
* [ ] Public learning content does not require login.
* [ ] Protected features have authentication integration points.
* [ ] User progress is separate from content.
* [ ] Loading, empty, and error states exist.
* [ ] The UI is responsive and accessible.
* [ ] Existing portfolio functionality is not broken.
* [ ] TypeScript, lint, tests, and build pass.

---

# 28. Final instructions

**Do not immediately start coding without inspecting the repository.**

First, understand the existing project and explain:

1. What already exists.
2. What needs to be added.
3. What can be reused.
4. What the recommended architecture is.
5. What the implementation phases will be.

Then implement the changes incrementally.

**Do not add the actual learning content yet.**

Build the foundation so that later we can add:

* 60-day JavaScript lessons
* TypeScript learning paths
* MCQs
* Coding problems
* Interview questions
* Company-wise preparation
* JavaScript releases
* Concept playgrounds
* Progress tracking
* Bookmarks

The final result should be a **clean, scalable, reusable learning platform foundation** that fits naturally into the existing portfolio.
