# Build the `/learn` experience and authentication UX

You are a senior frontend engineer, UI/UX designer, and product manager working on my existing Next.js portfolio application.

Your task is to **inspect the existing codebase first, understand the current architecture, and then implement the `/learn` experience and its authentication flow** without unnecessarily changing existing portfolio functionality.

The goal is to make `/learn` feel like a real learning product while keeping the portfolio accessible and preserving a smooth user experience.

---

## 1. Product context

This is my personal portfolio website:

* Existing portfolio: `https://www.rajeshtiwari.com/`
* New learning section: `/learn`
* Main technologies: Next.js, React, TypeScript
* Authentication: Clerk (if already configured, reuse the existing setup)
* Existing design system and styling: **inspect the repository and reuse what is already available**

The learning section may eventually contain:

* JavaScript
* DSA
* React
* Frontend engineering
* System design
* Other software engineering learning resources

The learning content should be discoverable publicly, while personal features can require authentication.

---

## 2. Main product principles

### Principle 1: Public learning first

Users should be able to:

* Open `/learn`
* Browse learning categories
* Open topics
* Read questions
* Read explanations and solutions

**Do not force users to log in just to browse or read public learning content.**

### Principle 2: Authentication should feel like part of the app

If a user tries to access a protected feature:

* Keep them inside the application.
* Do not send them to an unrelated external authentication experience.
* Do not redirect them to the homepage when authentication fails.
* Preserve the page they were viewing.
* Preserve the action they were trying to perform.

### Principle 3: Preserve user intent

If a user is reading:

`/learn/javascript/closures`

and clicks **Save**, the application should remember:

```ts
{
  returnTo: "/learn/javascript/closures",
  action: "save"
}
```

After successful authentication:

1. Return to the original page.
2. Complete the intended action where possible.
3. Show appropriate feedback.

If authentication fails:

1. Keep the user inside the app.
2. Show a clear error.
3. Allow the user to retry.
4. Do not lose the original destination.

### Principle 4: Do not over-engineer

Build the foundation properly, but do not implement a complete learning platform, CMS, progress engine, or large authentication abstraction unless the existing project already requires it.

Focus on the **first usable version**.

---

# 3. First phase: inspect the repository

Before writing code, inspect the existing project and report:

### Architecture

* Next.js version
* App Router or Pages Router
* Existing route structure
* Existing layout and navigation components
* Existing design system/components
* Existing authentication setup
* Existing Clerk configuration
* Existing middleware
* Existing state management
* Existing styling approach
* Existing testing setup

### Important questions

* Is `/learn` already present?
* Is there already a login page or authentication modal?
* Is Clerk already installed and configured?
* Is there an existing protected-route pattern?
* Is there an existing shared header/footer?
* Is there an existing modal/dialog component?
* Are there existing UI components that should be reused?

**Do not create duplicate components or duplicate authentication logic if suitable implementations already exist.**

After inspection, propose the smallest clean architecture that fits the repository.

---

# 4. Implement the `/learn` information architecture

Create or improve the following structure, adapting it to the existing routing conventions:

```text
/learn
├── /javascript
├── /dsa
├── /react
├── /frontend
├── /system-design
├── /bookmarks
├── /progress
└── /login
```

These are conceptual routes. Use the repository's existing conventions and do not create unnecessary empty pages.

## Public routes

The following should be publicly accessible:

* `/learn`
* Learning category pages
* Topic pages
* Question pages
* Public explanations and solutions

## Protected routes/features

Authentication may be required for:

* Saving/bookmarking questions
* Tracking progress
* Viewing personal history
* Personalized practice
* Other user-specific features

**Do not make the entire `/learn` section login-only.**

---

# 5. Design the `/learn` landing page

Create a clean, modern learning landing page that feels consistent with the portfolio.

The page should answer:

> What can I learn here, and where should I start?

Suggested sections:

### Hero

* Clear title
* Short description
* Primary CTA: **Start learning**
* Secondary CTA: **Explore topics**

### Learning categories

Examples:

* JavaScript
* DSA
* React
* Frontend Engineering
* System Design

### Featured learning paths

Show a small number of useful starting points.

### Practice by pattern

For example:

* Arrays
* Strings
* Two pointers
* Sliding window
* Recursion
* Dynamic programming

### Continue learning

If the user is authenticated, show their learning progress.

If the user is not authenticated, show a subtle invitation to sign in—not an intrusive login wall.

**Do not invent a large amount of learning content.** Use existing content if available, or create a small, clearly structured placeholder/data-driven foundation.

---

# 6. Implement the authentication UX

## Recommended behavior

### Case A: User is browsing public content

Allow them to continue without login.

### Case B: User clicks a protected action

Example:

```text
User opens:
 /learn/javascript/closures

User clicks:
 Save

Application:
 Opens login modal or login screen
```

### Case C: User successfully logs in

```text
Login success
    ↓
Return to original route
    ↓
Complete intended action
    ↓
Show success feedback
```

### Case D: User closes login

```text
Close login
    ↓
Return to the same learning page
```

### Case E: User enters invalid credentials

```text
Login fails
    ↓
Show error inside the app
    ↓
Keep user on the login UI
    ↓
Allow retry
```

### Case F: Session expires

```text
User is on a protected page
    ↓
Session expires
    ↓
Ask user to sign in
    ↓
Preserve current route
    ↓
Return after successful authentication
```

---

# 7. Login UI requirements

## Desktop

Prefer a modal/dialog over the current learning page.

## Mobile

Use a dedicated login screen if that provides a better experience.

The exact implementation should follow the existing application architecture and Clerk setup.

### Login UI should include

* Clear heading
* Short explanation of why login is needed
* Google sign-in if already configured
* Existing Clerk authentication options
* Clear error state
* Loading state
* Close/back action
* Retry capability

### Example copy

**Heading:**

> Sign in to continue

**Description:**

> Sign in to save your progress and keep your learning history across devices.

**Error:**

> We couldn't sign you in. Please try again.

Avoid technical error messages such as:

> `Clerk: authentication_failed`

Translate errors into user-friendly messages where appropriate.

---

# 8. Preserve the original route and action

Implement a reusable mechanism for protected actions.

For example:

```ts
type LoginIntent = {
  returnTo: string;
  action?: string;
};
```

The implementation should support:

* Safe return URLs
* Original pathname
* Optional query parameters
* Optional intended action

Example:

```text
/learn/login?returnTo=/learn/javascript/closures&action=save
```

### Security requirements

* Do not blindly redirect to arbitrary external URLs.
* Validate return destinations.
* Prefer internal application routes.
* Avoid open redirect vulnerabilities.
* Do not expose sensitive authentication data in URLs.

Use the correct Clerk APIs for the installed version. **Inspect the existing Clerk setup and documentation before implementing authentication behavior.**

---

# 9. Portfolio → Learn navigation

Add a link to `/learn` from the existing portfolio.

### Header

Add **Learn** to the primary navigation if appropriate.

### Footer

Add a dedicated learning link.

### Public pages

Add contextual links where useful.

Example:

> Explore my frontend learning resources.

Do not add the same large CTA to every page.

### Important

* Preserve existing navigation behavior.
* Preserve responsive behavior.
* Preserve accessibility.
* Reuse existing navigation components.
* Do not break existing portfolio routes.

---

# 10. UI/UX quality requirements

The implementation should feel polished and production-ready.

### Responsive

* Desktop
* Tablet
* Mobile
* No horizontal overflow
* Good spacing and typography

### Accessibility

* Keyboard accessible
* Proper focus management for modals
* Escape key closes modal where appropriate
* Focus returns to the triggering element
* Proper labels and accessible buttons
* Clear error messages
* Visible loading states

### UX

* No unexpected redirects
* No lost navigation state
* No unnecessary login walls
* No confusing authentication errors
* Clear feedback after actions
* Consistent loading and empty states

### Visual consistency

Reuse the existing portfolio design system.

Do not introduce a completely unrelated visual style.

---

# 11. Technical implementation guidelines

Before implementing:

1. Inspect the repository.
2. Identify reusable components.
3. Identify the existing authentication flow.
4. Identify the existing routing conventions.
5. Identify the existing styling conventions.
6. Propose the implementation plan.
7. Implement incrementally.

### Prefer

* Reusable components
* Data-driven learning categories
* Clean route structure
* Shared authentication utilities
* Existing design system
* Existing Clerk integration
* Minimal dependencies

### Avoid

* Duplicate authentication logic
* Duplicate modal components
* Unnecessary global state
* Hardcoded learning content everywhere
* Large unrelated refactors
* Replacing existing portfolio architecture
* Creating a second authentication system

---

# 12. Suggested component architecture

Adapt this to the existing codebase:

```text
components/
├── learn/
│   ├── LearnHero
│   ├── LearningCategoryCard
│   ├── LearningPathCard
│   ├── ContinueLearning
│   └── ProtectedAction
│
├── auth/
│   ├── LoginModal
│   ├── LoginScreen
│   └── AuthError
│
└── navigation/
    └── ...
```

These are suggestions, not mandatory filenames.

**Reuse existing components whenever possible.**

---

# 13. Suggested implementation phases

## Phase 1 — Discovery

* Inspect repository
* Understand architecture
* Identify existing authentication
* Identify reusable components
* Propose implementation plan

## Phase 2 — Navigation

* Add `/learn` navigation
* Add header/footer links
* Preserve existing portfolio behavior

## Phase 3 — Learning landing page

* Build `/learn`
* Add categories
* Add featured paths
* Add public browsing experience

## Phase 4 — Authentication UX

* Implement protected action flow
* Implement login modal/screen
* Preserve return route
* Preserve intended action
* Handle success/failure/cancel

## Phase 5 — Polish

* Responsive design
* Accessibility
* Loading states
* Error states
* Empty states
* Visual consistency

## Phase 6 — Validation

Run the existing project checks.

At minimum:

* TypeScript
* ESLint
* Tests if available
* Build

Also manually verify:

* Public `/learn` works without login
* Protected action opens login
* Successful login returns to original page
* Failed login stays inside app
* Closing login returns to original page
* Mobile login works
* Existing portfolio pages still work

---

# 14. Acceptance criteria

The implementation is complete when:

* [ ] `/learn` is accessible publicly.
* [ ] Users can browse learning content without login.
* [ ] Protected actions require authentication.
* [ ] Login does not take users away from the application unnecessarily.
* [ ] Failed login keeps users inside the app.
* [ ] Login errors are clear and retryable.
* [ ] Successful login returns users to the original route.
* [ ] The intended action is preserved where possible.
* [ ] Closing login returns users to the same page.
* [ ] Session expiry preserves the current route.
* [ ] Learn is accessible from the portfolio navigation.
* [ ] Existing portfolio functionality is not broken.
* [ ] The UI is responsive and accessible.
* [ ] The implementation uses the existing architecture and design system.
* [ ] No unnecessary duplicate authentication logic is introduced.
* [ ] TypeScript, lint, tests, and build pass.

---

# 15. Important instructions

**Do not immediately start coding without inspecting the repository.**

First, understand the existing project and explain:

1. What already exists.
2. What needs to be added.
3. What can be reused.
4. What the recommended implementation plan is.

Then implement the changes.

If something is unclear, make a reasonable product/engineering decision based on the existing codebase rather than introducing unnecessary complexity.

The final result should be a **clean, scalable, user-friendly `/learn` foundation** that we can extend later with DSA questions, JavaScript learning paths, solutions, progress tracking, bookmarks, and personalized practice.
