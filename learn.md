You are a senior frontend architect and UI engineer.

I have an existing Next.js portfolio website.

I want to add a new authenticated learning section:

/learn

The portfolio itself must remain publicly accessible.

The /learn section should require authentication using Clerk.

IMPORTANT:
This is V1.

Do NOT implement:
- Code editor
- Run Code
- Code execution
- Submit solution
- Online compiler
- Test case execution
- Runtime statistics
- Memory statistics
- Acceptance rate
- User progress tracking
- Streaks
- Points
- Leaderboards
- Submissions
- Social discussion backend
- PostgreSQL
- Prisma
- Neon

Keep the implementation focused on content browsing and learning.

==================================================
1. AUTHENTICATION
==================================================

Use Clerk for authentication.

The public portfolio pages must remain accessible without authentication.

The following section must require authentication:

/learn
/learn/*

If the user is not authenticated:
- redirect them to the Clerk sign-in page
- after successful authentication, redirect them back to the requested /learn URL

Use Clerk's official Next.js integration.

Do not create a custom authentication system.

Do not store passwords.

Do not store OAuth tokens.

Do not create a users table.

Do not duplicate Clerk user data in our own database.

For authenticated UI, Clerk can provide:
- user ID
- first name
- last name
- email
- profile image
- authentication state

Use Clerk's UserButton in the application header for:
- avatar
- account management
- logout

==================================================
2. PRODUCT GOAL
==================================================

The goal is to create a DSA learning platform inside my portfolio.

The learning platform should organize questions in two ways:

1. Pattern based
2. Topic based

Example:

Patterns
  Number Theory
    Basic Concepts
    GCD / LCM
    Prime Numbers
    Divisors & Factors
    Modular Arithmetic

Topics
  Mathematics
  Arrays
  Strings
  Hashing
  Searching
  Sorting
  Two Pointer
  Sliding Window
  Recursion
  Backtracking
  Linked List
  Stack
  Queue
  Trees
  Graphs
  Dynamic Programming
  Greedy
  Bit Manipulation

A question can belong to:
- one primary pattern
- one or more topics

==================================================
3. PAGE DESIGN
==================================================

Create a clean modern DSA learning interface inspired by the attached reference screenshot.

Do NOT make an exact copy of any existing website.

Use the screenshot only as inspiration for:
- layout
- information hierarchy
- navigation
- spacing
- card structure
- typography
- visual organization

The page should feel like a modern developer learning platform.

==================================================
4. APPLICATION LAYOUT
==================================================

Create a dedicated /learn application shell.

Header:

Left:
- LearnDSA logo/text
- small navigation/menu

Center:
- search input

Right:
- bookmark icon
- Clerk UserButton

Do not create fake user information.

The displayed user information must come from Clerk.

Example:

Avatar
Rajesh
▼

The UserButton should handle account management and logout.

==================================================
5. LEFT SIDEBAR
==================================================

Create a collapsible sidebar.

Sections:

STUDY

- Dashboard
- Roadmap
- Bookmarks

BROWSE

Tabs:

Patterns
Topics

Patterns example:

Number Theory
  Basic Concepts
  GCD / LCM
  Prime Numbers
  Divisors & Factors
  Modular Arithmetic

Arrays & Hashing
Two Pointers
Sliding Window
Binary Search
Linked List
Stack
Queue
Trees
Graphs
Dynamic Programming
Greedy
Bit Manipulation

Each category can be expandable/collapsible.

The selected pattern/topic should be visually highlighted.

==================================================
6. QUESTION PAGE
==================================================

Route:

/learn/problems/[slug]

Example:

/learn/problems/number-of-common-factors

Page structure:

Breadcrumb:

Patterns
>
Number Theory
>
Divisors & Factors

Title:

Number of Common Factors

Metadata:

Easy

Number Theory

Divisors & Factors

Bookmark button

Main tabs:

Problem
Solution
Discussion

For V1:

Problem tab:
IMPLEMENT

Solution tab:
IMPLEMENT

Discussion:
Show a placeholder UI saying discussion functionality is coming soon.

Do not implement backend discussion functionality yet.

==================================================
7. PROBLEM SECTION
==================================================

Display:

Problem Statement

Description

Examples

Constraints

Hints

Important Concepts

Example:

Problem Statement

Given two positive integers a and b, return the number of common factors of a and b.

An integer x is a common factor of a and b if x divides both a and b.

Examples:

Example 1

Input:
a = 12
b = 6

Output:
4

Explanation:
The common factors are 1, 2, 3 and 6.

Example 2

Input:
a = 25
b = 30

Output:
2

Explanation:
The common factors are 1 and 5.

Constraints:

1 <= a, b <= 10^9

Use proper semantic HTML and accessible markup.

==================================================
8. SOLUTION SECTION
==================================================

Do NOT create a code editor.

Do NOT create Run Code.

Do NOT create Submit.

Instead create:

Solution

Choose Language:

[ JavaScript (Node.js) ▼ ]

When the language changes, display the corresponding solution.

Supported languages for V1:

- JavaScript
- TypeScript
- Python
- Java
- C++
- Go

The solution should be displayed in a beautiful read-only syntax-highlighted code block.

Actions:

[ Copy ]

No Run button.

No editor.

No execution.

Below the code display:

Approach

Step-by-step explanation.

Time Complexity

Space Complexity

Important Notes

==================================================
9. LANGUAGE DROPDOWN
==================================================

The language dropdown should dynamically change the displayed solution.

Example:

JavaScript
TypeScript
Python
Java
C++
Go

The selected language should be stored only in local UI state.

Do not store it in the database.

Example data structure:

solutions: {
  javascript: {
    code: "...",
    explanation: "...",
    timeComplexity: "...",
    spaceComplexity: "..."
  },

  typescript: {
    code: "...",
    explanation: "...",
    timeComplexity: "...",
    spaceComplexity: "..."
  },

  python: {
    code: "...",
    explanation: "...",
    timeComplexity: "...",
    spaceComplexity: "..."
  }
}

==================================================
10. QUESTION DATA MODEL
==================================================

Create a strongly typed content model.

Example:

interface DSAProblem {
  id: string;
  slug: string;
  title: string;

  difficulty:
    | "easy"
    | "medium"
    | "hard";

  patterns: string[];

  topics: string[];

  description: string;

  examples: Example[];

  constraints: string[];

  hints?: string[];

  importantConcepts?: string[];

  solutions: {
    language: SupportedLanguage;
    code: string;
    explanation: string;
    timeComplexity: string;
    spaceComplexity: string;
  }[];
}

==================================================
11. CONTENT STORAGE
==================================================

Do NOT introduce PostgreSQL or Prisma yet.

Keep DSA content inside the repository.

Use a clean content directory.

Recommended structure:

content/
  dsa/
    problems/
      number-of-common-factors.ts
      count-divisors.ts
      prime-factors.ts

    patterns/
      number-theory.ts
      arrays.ts
      two-pointers.ts

    topics/
      mathematics.ts
      arrays.ts
      strings.ts

Create an index so problems can be discovered easily.

Example:

content/dsa/index.ts

export const dsaProblems = [
  numberOfCommonFactors,
  ...
]

The architecture must make it easy to migrate the content to a database later.

==================================================
12. INITIAL CONTENT
==================================================

Create a small ORIGINAL seed dataset.

Do not copy content from:
- Get SDE Ready
- LeetCode
- GeeksforGeeks
- HackerRank
- InterviewBit
- other copyrighted learning platforms

Use common algorithmic concepts but write original:
- problem statements
- examples
- explanations
- hints
- solutions

Start with approximately 10 questions.

Focus on:

Number Theory
- Divisors
- GCD
- LCM
- Prime numbers
- Prime factorization

Arrays
- basic traversal
- frequency counting
- prefix sum

Two Pointer
- basic two pointer pattern

Binary Search
- basic binary search

Each problem must have solutions in:
- JavaScript
- TypeScript
- Python
- Java
- C++
- Go

==================================================
13. SEARCH
==================================================

Implement frontend search UI.

Search should search:

- problem title
- pattern
- topic

Example:

Search:

"binary"

Results:

Binary Search Basics
Binary Search on Answer

Search should be debounced.

For V1, search can operate over the local content dataset.

Do not introduce Elasticsearch or another search service.

==================================================
14. BOOKMARKS
==================================================

Create the bookmark UI.

For V1:

Bookmark state can be stored locally in the browser.

Do NOT create database persistence yet.

Structure the code so that bookmark persistence can later be moved to a backend.

==================================================
15. RESPONSIVE DESIGN
==================================================

Desktop:

Three conceptual areas:

Left:
navigation

Center:
problem content

Right:
solution panel

Tablet:
collapse sidebar

Mobile:
sidebar becomes drawer

The problem content must remain readable.

The solution card should move below the problem content on smaller screens.

==================================================
16. ACCESSIBILITY
==================================================

Implement:

- keyboard navigation
- proper button labels
- aria-label where required
- visible focus states
- semantic headings
- accessible dropdown
- accessible sidebar navigation
- sufficient contrast

==================================================
17. PERFORMANCE
==================================================

The /learn section should be optimized for Next.js.

Use:
- Server Components where appropriate
- Client Components only where interaction is required
- dynamic imports where useful
- no unnecessary global state
- no unnecessary API calls

Do not load a heavy code editor because we are NOT implementing an editor.

Use a lightweight syntax highlighting solution for read-only code.

==================================================
18. VISUAL DESIGN
==================================================

Use a clean light theme similar to the attached reference.

Characteristics:

- white background
- subtle borders
- rounded cards
- blue primary accent
- dark navy text
- muted secondary text
- generous spacing
- clean typography
- monospace code blocks
- clear hierarchy

Avoid:
- excessive gradients
- excessive shadows
- clutter
- unnecessary animations

==================================================
19. IMPORTANT ARCHITECTURE RULE
==================================================

Do not over-engineer.

V1 architecture:

Next.js
+
Clerk
+
Local DSA content
+
React/Next.js components

No database.

No code execution.

No external backend.

No separate API for reading problems.

==================================================
20. FUTURE EXTENSIBILITY
==================================================

Although V1 should remain simple, structure the code so that these can be added later:

Phase 2:
- PostgreSQL
- Prisma
- user bookmarks synced to backend
- completed questions
- learning progress
- notes

Phase 3:
- Monaco editor
- Run Code
- Submit
- sandboxed code execution
- test cases
- submissions

Phase 4:
- discussion
- comments
- likes
- user-generated explanations
- leaderboard

Do NOT implement these phases now.

==================================================
21. IMPORTANT CONTENT RULE
==================================================

The platform should contain ORIGINAL educational content.

Do not scrape or reproduce protected course content.

Do not automatically crawl paid courses.

Do not copy exact problem statements, explanations, examples, or solutions from third-party learning platforms.

If an algorithm is a common/public concept, create a new original problem statement and explanation.

==================================================
22. DELIVERABLE
==================================================

First inspect the existing Next.js project.

Do not replace the existing portfolio.

Integrate /learn into the current application.

Before coding:

1. Inspect the existing project structure.
2. Identify:
   - Next.js version
   - App Router or Pages Router
   - existing styling system
   - existing component library
   - existing fonts
   - existing layout
   - existing navigation
3. Reuse existing components/styles where appropriate.
4. Do not introduce a new UI framework if an existing one is already present.

Then implement:

1. /learn route
2. authentication protection
3. Learn layout
4. header
5. sidebar
6. patterns/topics navigation
7. problem listing
8. problem detail page
9. solution language dropdown
10. syntax-highlighted read-only solution
11. bookmark UI using localStorage
12. search
13. responsive layout
14. seed DSA content

At the end:

- run lint
- run typecheck
- run tests if available
- fix errors
- provide a concise summary of files created/modified
- explain how to add a new DSA problem