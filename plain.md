# Build Plan: `/play` Interactive Frontend Playground

## Project Context

I have an existing personal portfolio website built with:

* Next.js
* TypeScript
* React
* Tailwind CSS
* Framer Motion

The portfolio is available at `https://www.rajeshtiwari.com/`.

I want to add a new section/page called `/play`.

The goal is NOT to create a typical gaming website. Instead, `/play` should be an interactive frontend learning and experimentation playground containing small games and challenges related to frontend development.

The experience should feel professional, modern, fun, interactive, and consistent with the existing portfolio design.

---

# Primary Goal

Create a `/play` section where visitors can explore multiple interactive frontend challenges.

The main idea is:

> Learn frontend concepts by playing and experimenting.

The `/play` section should demonstrate my frontend engineering skills through interactive experiences.

The initial version should focus on:

1. JavaScript challenges
2. CSS Flexbox visual challenges
3. CSS Grid challenges
4. Debugging challenges

The architecture must be extensible so new games can easily be added later.

---

# Important Instructions

Before writing code:

1. Analyze the existing project structure.
2. Analyze the existing design system, colors, typography, spacing, animations, and components.
3. Reuse existing components and styling patterns wherever possible.
4. Do not redesign the entire portfolio.
5. The `/play` section must visually feel like part of the existing website.
6. Prefer reusable, data-driven architecture over hardcoded game implementations.
7. Keep the first version simple and high quality.
8. Do not add unnecessary dependencies.

First provide a short implementation plan based on the existing project structure, then start implementation.

---

# Route Structure

Create the following routes:

```text
/play
/play/javascript
/play/css-flex
/play/css-grid
/play/debug
```

Future games should be easy to add.

---

# Main `/play` Landing Page

Create a landing page that introduces the interactive playground.

## Hero

Title:

```text
Play. Experiment. Learn.
```

Description:

```text
Interactive frontend challenges designed to make learning more fun.
Experiment with code, solve problems, and see the results instantly.
```

Do not make it look like a children's gaming website.

The design should be:

* Professional
* Minimal
* Modern
* Slightly playful
* Developer-focused

---

# Game Cards

Display cards for available challenges.

Initial cards:

## 1. JavaScript Challenge

Icon/theme:

```text
🧠
```

Title:

```text
JavaScript Challenge
```

Description:

```text
Predict the output and test your JavaScript knowledge.
```

Button:

```text
Play Challenge →
```

---

## 2. CSS Flexbox Lab

Icon/theme:

```text
🎨
```

Title:

```text
CSS Flexbox Lab
```

Description:

```text
Experiment with Flexbox properties and recreate visual layouts.
```

Button:

```text
Start Playing →
```

---

## 3. CSS Grid Lab

Icon/theme:

```text
▦
```

Title:

```text
CSS Grid Lab
```

Description:

```text
Build layouts visually using CSS Grid.
```

Button:

```text
Coming Soon
```

Initially this can be marked as coming soon if the implementation scope becomes too large.

---

## 4. Bug Hunter

Icon/theme:

```text
🐛
```

Title:

```text
Bug Hunter
```

Description:

```text
Find and fix frontend problems.
```

Button:

```text
Coming Soon
```

---

# Priority Order

Implement in this order:

## Phase 1

1. `/play`
2. JavaScript Challenge
3. CSS Flexbox Lab

## Phase 2

4. CSS Grid Lab
5. Bug Hunter

Do not compromise the quality of Phase 1 by trying to implement everything at once.

---

# 1. JavaScript Challenge

Route:

```text
/play/javascript
```

## Concept

Show the user a JavaScript code snippet and ask them to predict the output.

Example:

```js
console.log([] == false);
```

Possible answers:

```text
true
false
undefined
error
```

After selecting an answer:

* Show whether the answer is correct.
* Explain WHY.
* Show a short technical explanation.
* Allow the user to continue to the next challenge.

---

## JavaScript Challenge Types

Support multiple challenge types through a reusable data structure:

### Predict the output

```js
console.log(typeof []);
```

### What happens next?

```js
setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => console.log("B"));

console.log("C");
```

### Find the correct answer

Questions about:

* Closures
* Hoisting
* Promises
* Event loop
* `this`
* Objects
* Arrays
* Type coercion
* Equality
* Scope

---

## JavaScript Challenge Data Structure

Do NOT hardcode challenge logic inside React components.

Create something similar to:

```ts
type JavaScriptChallenge = {
  id: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  code?: string;
  options: {
    id: string;
    label: string;
  }[];
  correctAnswer: string;
  explanation: string;
};
```

Store challenges in a separate data file.

Example:

```text
features/play/javascript/data/challenges.ts
```

The UI should render challenges dynamically.

---

# JavaScript Game Flow

```text
Start
  ↓
Show Challenge
  ↓
User selects answer
  ↓
Check answer
  ↓
Show explanation
  ↓
Update score
  ↓
Next challenge
  ↓
Results
```

---

# Results Screen

At the end show:

```text
Challenge Complete
```

Display:

* Score
* Correct answers
* Total questions
* Accuracy percentage

Example:

```text
8 / 10 Correct

Accuracy: 80%
```

Buttons:

```text
Play Again
Back to Play
```

---

# 2. CSS Flexbox Lab

Route:

```text
/play/css-flex
```

This is the most important feature.

The goal is to create a visual and interactive Flexbox learning experience.

---

# Core Concept

The user sees:

1. A target layout
2. A live preview
3. Controls for CSS properties

The user changes CSS properties.

The preview updates immediately.

The goal is to make the preview match the target layout.

---

# Example Challenge

## Challenge

```text
Center the boxes horizontally and vertically.
```

## Target

Three boxes should appear:

```text
+-------------------------+
|                         |
|       [A] [B] [C]       |
|                         |
+-------------------------+
```

## User Controls

Allow the user to modify:

```text
display
flex-direction
justify-content
align-items
flex-wrap
gap
```

For the first challenge, only show controls necessary for the challenge.

Do not overwhelm the user with every possible CSS property.

---

# Flexbox Challenge Progression

## Level 1

Horizontal layout.

Goal:

```text
[A] [B] [C]
```

Expected concept:

```css
display: flex;
```

---

## Level 2

Center horizontally.

Expected concept:

```css
justify-content: center;
```

---

## Level 3

Center vertically.

Expected concept:

```css
align-items: center;
```

---

## Level 4

Stack items vertically.

Expected concept:

```css
flex-direction: column;
```

---

## Level 5

Add spacing.

Expected concept:

```css
gap
```

---

## Level 6

Push items to opposite ends.

Expected concept:

```css
justify-content: space-between;
```

---

# Flexbox Challenge Architecture

Challenges must be data-driven.

Create something similar to:

```ts
type FlexChallenge = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";

  container: {
    width?: number;
    height?: number;
  };

  items: {
    id: string;
    label: string;
  }[];

  availableControls: {
    property: string;
    options: string[];
  }[];

  initialStyles: Record<string, string>;

  solution: Record<string, string>;
};
```

Example:

```ts
{
  id: "center-items",

  title: "Center the Items",

  description:
    "Center all items horizontally and vertically.",

  availableControls: [
    {
      property: "justifyContent",
      options: [
        "flex-start",
        "center",
        "flex-end"
      ]
    },

    {
      property: "alignItems",
      options: [
        "flex-start",
        "center",
        "flex-end"
      ]
    }
  ],

  initialStyles: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  solution: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}
```

---

# Live Preview

Create a reusable component:

```text
FlexPreview
```

Responsibilities:

* Receive CSS configuration.
* Apply styles dynamically.
* Render flex items.
* Update immediately when controls change.

The user should clearly see the effect of every property.

---

# Target Preview

Create another component:

```text
TargetPreview
```

This displays the expected final layout.

The target should be visually distinguishable from the user's preview.

For example:

```text
TARGET
[A] [B] [C]


YOUR RESULT
[A] [B] [C]
```

---

# Challenge Completion

When the user matches the required layout:

```text
🎉 Challenge Completed!
```

Show:

```text
Correct Flexbox:

display: flex;
justify-content: center;
align-items: center;
```

Then provide:

```text
Next Challenge →
```

---

# Important Matching Logic

Do NOT rely only on screenshot or pixel-perfect comparison.

Initially, validate using the required CSS configuration.

For example:

```ts
const isCorrect =
  userStyles.justifyContent === solution.justifyContent &&
  userStyles.alignItems === solution.alignItems;
```

However, build the architecture so visual/layout comparison could potentially be added in the future.

---

# Hint System

Each challenge should support hints.

Example:

```text
💡 Hint
Think about the difference between the main axis and cross axis.
```

The hint should not immediately reveal the full answer.

---

# Show Generated CSS

A very important feature:

As the user changes controls, show the CSS being generated.

Example:

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
```

This should update in real time.

This makes the feature both educational and interactive.

---

# Component Architecture

Suggested structure:

```text
app/
  play/
    page.tsx

    javascript/
      page.tsx

    css-flex/
      page.tsx

components/
  play/
    PlayHero.tsx
    GameCard.tsx
    GameLayout.tsx
    ProgressBar.tsx
    ScoreDisplay.tsx

features/
  play/

    javascript/
      components/
        JavaScriptChallenge.tsx
        JavaScriptQuestion.tsx
        JavaScriptResults.tsx

      data/
        challenges.ts

      types.ts

    css-flex/
      components/
        FlexControls.tsx
        FlexPreview.tsx
        TargetPreview.tsx
        GeneratedCSS.tsx
        FlexChallenge.tsx

      data/
        challenges.ts

      types.ts
```

Adapt this structure to the existing project conventions.

Do not blindly use this structure if the project already has a better architecture.

---

# Shared Game Engine

Consider creating reusable concepts for all games.

For example:

```ts
type GameState = {
  currentIndex: number;
  score: number;
  completedChallenges: string[];
};
```

Potential reusable hook:

```text
useGameProgress
```

Responsibilities:

* Track current challenge.
* Track score.
* Move to next challenge.
* Restart game.
* Calculate results.

Do not over-engineer this initially.

Use it only if it genuinely reduces duplication.

---

# State Management

Prefer:

```text
React useState
useReducer
```

Do not introduce Redux or another global state library unless the existing project already requires it.

Game state should remain local to the game.

---

# Persistence

Initially, use browser storage only if easy to implement.

For example:

```text
localStorage
```

Possible saved information:

* High score
* Completed challenges
* Last played game

Persistence should not block the initial implementation.

---

# Animations

Use the existing animation library already used by the portfolio.

Animations should be subtle.

Examples:

* Card hover
* Challenge transition
* Correct answer feedback
* Progress animation
* Flex item movement

Avoid:

* Excessive bouncing
* Heavy animations
* Animations that affect performance

Respect reduced motion preferences if the existing application supports them.

---

# Accessibility

The games must be accessible.

Requirements:

* Keyboard navigation.
* Focus states.
* Buttons should be actual buttons.
* Form controls should have labels.
* Do not rely only on color for correct/incorrect feedback.
* Support screen readers where practical.
* Maintain sufficient contrast.

---

# Mobile Responsiveness

The `/play` experience must work well on mobile.

Desktop layout:

```text
Controls | Live Preview
```

Mobile layout:

```text
Live Preview
────────────
Controls
────────────
Generated CSS
```

The Flexbox playground should remain usable on small screens.

---

# Performance

Important requirements:

* Do not negatively affect the main portfolio homepage.
* Avoid loading all game code on unrelated pages.
* Use route-level code splitting provided by Next.js.
* Keep challenge data lightweight.
* Avoid unnecessary re-renders.
* Do not introduce heavy dependencies.

---

# SEO

Because these pages are interactive tools, still add appropriate metadata.

Examples:

```text
Play – Interactive Frontend Challenges
```

For CSS:

```text
CSS Flexbox Playground – Learn Flexbox Visually
```

For JavaScript:

```text
JavaScript Challenge – Test Your JavaScript Knowledge
```

Follow the existing Next.js metadata pattern used by the project.

---

# Visual Design

The `/play` section should:

* Match the current portfolio.
* Reuse existing colors.
* Reuse existing typography.
* Reuse existing card styles.
* Reuse existing navigation/footer.
* Support existing dark/light mode behavior if available.

Do not introduce a completely different gaming UI theme.

The user should feel:

```text
"This is part of Rajesh's portfolio."
```

---

# Development Process

Please work in this order:

## Step 1

Analyze the existing repository and identify:

* App Router or Pages Router.
* Existing component structure.
* Styling approach.
* Existing animation library.
* Existing layout components.
* Existing navigation.
* Existing theme system.

Report the findings briefly.

---

## Step 2

Create a concrete implementation plan for the repository.

Identify:

* Files to create.
* Files to modify.
* Reusable components.
* Data structures.

---

## Step 3

Implement `/play` landing page.

Do not modify unrelated parts of the website.

---

## Step 4

Implement JavaScript Challenge.

Add at least:

* 10 meaningful questions.
* Easy/medium difficulty.
* Score tracking.
* Explanation after answering.
* Results screen.

Ensure technical answers are correct.

---

## Step 5

Implement CSS Flexbox Lab.

Add at least:

* 6 progressive challenges.
* Live preview.
* Target preview.
* Interactive controls.
* Hint system.
* Generated CSS.
* Completion detection.

---

## Step 6

Test:

* Desktop.
* Mobile.
* Keyboard navigation.
* Refresh behavior.
* Navigation.
* Game restart.
* Challenge progression.

---

# Code Quality Requirements

* TypeScript should be properly typed.
* Avoid `any`.
* Keep components reasonably small.
* Separate UI from challenge data.
* Avoid duplicated logic.
* Use meaningful variable names.
* Follow the repository's ESLint and formatting conventions.
* Do not create giant files.
* Add comments only where logic is genuinely non-obvious.

---

# Final Deliverables

After implementation, provide:

1. Summary of what was implemented.
2. List of routes added.
3. List of major components created.
4. List of challenge data added.
5. Any assumptions made.
6. Suggestions for Phase 2.

---

# Future Phase 2 Ideas

Do NOT implement these unless there is time and the existing implementation is complete.

Potential future features:

## CSS Grid Lab

Challenges involving:

* Columns
* Rows
* Areas
* Gap
* Responsive layouts

---

## Bug Hunter

Show a broken UI or code example.

The user must:

* Identify the problem.
* Select the correct fix.
* See the result visually.

---

## React Challenge

Interactive concepts:

* State updates
* useEffect
* Re-rendering
* Props
* Memoization

---

## Leaderboard / Stats

Potentially track:

* Total challenges completed.
* High score.
* Favorite category.
* Completion percentage.

Only implement this later if there is a real reason.

---

# Final Product Philosophy

The final product should not feel like:

```text
A random collection of browser games.
```

It should feel like:

```text
An interactive frontend playground built by a frontend engineer.
```

The experience should demonstrate:

* Frontend architecture.
* Interactive UI development.
* React skills.
* CSS knowledge.
* UX thinking.
* Animation.
* Component design.
* Educational experience design.

Prioritize quality over quantity.

Start with a polished `/play`, JavaScript Challenge, and CSS Flexbox Lab. Build the architecture so additional challenges can be added easily in the future.
