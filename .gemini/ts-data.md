# Task: Generate the Complete TypeScript Learning Track

The `/learn` platform architecture is already implemented and verified.

The JavaScript learning track is being developed separately.

Now build the **complete TypeScript learning track** under:

```text
/learn/typescript
```

This must be a **first-class independent learning track**, not a thin extension of JavaScript.

The TypeScript curriculum should teach a developer:

```text
JavaScript knowledge
        ↓
TypeScript fundamentals
        ↓
Type system
        ↓
Functions and objects
        ↓
Interfaces and type aliases
        ↓
Generics
        ↓
Advanced type manipulation
        ↓
Utility types
        ↓
Modules and configuration
        ↓
TypeScript + JavaScript ecosystem
        ↓
TypeScript + React
        ↓
TypeScript + Next.js
        ↓
Advanced patterns
        ↓
Performance / architecture
        ↓
Interview preparation
        ↓
Problem solving
```

---

# 1. IMPORTANT EXECUTION RULE

Before generating anything:

1. Inspect the existing `/learn` architecture.
2. Inspect the existing JavaScript content architecture.
3. Inspect the TypeScript schemas.
4. Inspect the content loader.
5. Inspect the existing MDX setup.
6. Inspect existing validation scripts.
7. Inspect existing sample TypeScript content, if any.
8. Follow existing naming conventions.
9. Reuse the existing learning components.
10. Do NOT create a second content architecture.

TypeScript must use the same platform architecture as JavaScript while maintaining completely separate content.

---

# 2. PRIMARY CONTENT GOAL

Create a comprehensive TypeScript learning platform containing:

```text
30+ major modules
60-day TypeScript challenge
60+ coding problems
300+ MCQs
200+ interview questions
150+ output/type-prediction questions
100+ TypeScript examples
10+ advanced playground examples
TypeScript compiler/configuration guide
React + TypeScript section
Next.js + TypeScript section
Advanced type-system reference
```

The content must be interconnected using stable IDs.

---

# 3. TARGET AUDIENCE

The curriculum should support:

### Beginner

Developers who know basic JavaScript and want to learn TypeScript.

### Intermediate

Frontend developers working with:

* React
* Next.js
* Node.js
* APIs
* large codebases

### Advanced

Developers preparing for:

* Senior Frontend Engineer
* Staff Frontend Engineer
* Full-Stack Engineer
* TypeScript-heavy roles

---

# 4. TYPE SCRIPT PREREQUISITE

Make it clear that TypeScript is built on JavaScript.

The first module should explain:

```text
JavaScript
+
Static type checking
+
Type system
+
Developer tooling
=
TypeScript
```

Explain:

* What TypeScript is
* Why TypeScript exists
* TypeScript vs JavaScript
* Compilation
* Transpilation
* Type checking
* Type erasure
* Runtime behavior
* TypeScript does NOT exist at runtime
* JavaScript output
* TypeScript compiler
* TypeScript language service
* Editor integration

Use practical examples.

---

# 5. MODULE 1 — TYPESCRIPT FUNDAMENTALS

Topics:

* What is TypeScript?
* Why TypeScript?
* TypeScript vs JavaScript
* Type checking
* Static typing
* Structural typing
* Compile-time vs runtime
* Type erasure
* TypeScript compiler
* `tsc`
* TypeScript language service
* TypeScript playground
* `.ts`
* `.tsx`
* Basic compilation

Example:

```ts
let username: string = "Rajesh";
let age: number = 30;
let active: boolean = true;
```

Explain what happens during compilation.

### Required content

For this module create:

* 10+ examples
* 15+ MCQs
* 5+ output/type-prediction questions
* 5+ interview questions
* 2 coding problems

---

# 6. MODULE 2 — BASIC TYPES

Deeply cover:

* string
* number
* boolean
* bigint
* symbol
* null
* undefined
* object
* arrays
* tuples
* functions

Also cover:

* Type annotations
* Type inference
* Literal values
* Literal types

Examples:

```ts
let name = "Rajesh";

let count: number = 10;

const role = "developer";
```

Explain why:

```ts
let x = "hello";
const y = "hello";
```

can behave differently from the type-system perspective.

---

# 7. MODULE 3 — TYPE INFERENCE

Cover:

* Basic inference
* Variable inference
* Function return inference
* Parameter inference
* Contextual typing
* Best common type
* Literal inference
* Array inference
* Object inference
* Generic inference

Include tricky examples.

Example:

```ts
let value = "hello";

value = 10;
```

Explain the compiler behavior.

---

# 8. MODULE 4 — `any`, `unknown`, `never`, `void`

Deep-dive into:

### any

* Why it exists
* Problems
* Type safety loss

### unknown

* Safe alternative
* Narrowing

### never

* Functions that never return
* Exhaustive checks
* Impossible states

### void

* Function return types

Compare:

```text
any
unknown
never
void
```

Include many MCQs and interview questions.

---

# 9. MODULE 5 — TYPE ASSERTIONS

Cover:

```ts
as
```

Angle bracket syntax where relevant.

Topics:

* Type assertion
* Type casting terminology
* Assertions vs runtime conversion
* Double assertions
* `unknown` intermediary
* Non-null assertion `!`
* Risks of assertions

Important:

Explain that:

```ts
const value = "123" as number;
```

does NOT convert the string into a number.

---

# 10. MODULE 6 — ARRAYS AND TUPLES

Cover:

```ts
string[]
Array<string>
readonly string[]
```

Tuples:

```ts
[string, number]
```

Advanced tuples:

* Optional tuple elements
* Rest tuple elements
* Readonly tuples
* Named tuple elements

Examples:

```ts
const user: [string, number] = ["Rajesh", 30];
```

---

# 11. MODULE 7 — OBJECT TYPES

Cover:

* Object type annotations
* Optional properties
* Readonly properties
* Index signatures
* Nested objects
* Function properties
* Excess property checking
* Object inference

Example:

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};
```

Explain excess property checking deeply.

---

# 12. MODULE 8 — TYPE ALIASES

Cover:

```ts
type
```

Topics:

* Basic aliases
* Object aliases
* Primitive aliases
* Function aliases
* Tuple aliases
* Union aliases
* Intersection aliases
* Generic aliases
* Recursive aliases

---

# 13. MODULE 9 — INTERFACES

Deep-dive:

* Interface basics
* Optional properties
* readonly
* Methods
* Function interfaces
* Extending interfaces
* Multiple inheritance
* Declaration merging
* Index signatures
* Hybrid types
* Interface vs type

Provide a detailed comparison:

```text
interface vs type
```

Explain when each is preferable.

---

# 14. MODULE 10 — UNION TYPES

Cover:

```ts
string | number
```

Topics:

* Union types
* Literal unions
* Nullable unions
* Function parameter unions
* Union properties
* Union arrays
* Discriminated unions

Example:

```ts
type Status =
  | "loading"
  | "success"
  | "error";
```

---

# 15. MODULE 11 — INTERSECTION TYPES

Cover:

```ts
A & B
```

Topics:

* Combining types
* Object intersections
* Function intersections
* Conflicting properties
* Intersection vs inheritance
* Practical use cases

---

# 16. MODULE 12 — TYPE NARROWING

This must be a major module.

Cover:

* `typeof`
* `instanceof`
* `in`
* Equality narrowing
* Truthiness narrowing
* Assignment narrowing
* Control-flow analysis
* Discriminated unions
* User-defined type guards
* `is`
* Assertion functions
* Exhaustive checking

Example:

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

Create many type-prediction questions.

---

# 17. MODULE 13 — FUNCTIONS

Cover:

* Parameter types
* Return types
* Optional parameters
* Default parameters
* Rest parameters
* Function types
* Call signatures
* Construct signatures
* Function overloads
* Generic functions
* Callback typing
* Higher-order functions
* `this` parameter

Examples:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

---

# 18. MODULE 14 — FUNCTION OVERLOADS

Deep-dive:

```ts
function parse(value: string): string;
function parse(value: number): number;
```

Cover:

* Overload signatures
* Implementation signature
* Overload compatibility
* Generic alternative
* When overloads are useful
* When overloads should be avoided

---

# 19. MODULE 15 — GENERICS

This should be one of the largest modules.

Cover:

* Generic functions
* Generic types
* Generic interfaces
* Generic classes
* Generic constraints
* `extends`
* `keyof`
* Generic defaults
* Multiple generic parameters
* Generic inference
* Generic callbacks
* Generic factories

Example:

```ts
function identity<T>(value: T): T {
  return value;
}
```

Explain:

```text
T
inference
constraints
relationships between types
```

---

# 20. MODULE 16 — `keyof`, `typeof`, `in`

Deep-dive:

### keyof

```ts
type Keys = keyof User;
```

### typeof

```ts
type UserType = typeof user;
```

### indexed access

```ts
type Name = User["name"];
```

### in

Mapped types and narrowing.

Provide many practical examples.

---

# 21. MODULE 17 — INDEXED ACCESS TYPES

Cover:

```ts
User["name"]
User[keyof User]
Array[number]
```

Explain practical applications.

---

# 22. MODULE 18 — CONDITIONAL TYPES

Deep-dive:

```ts
T extends U ? X : Y
```

Cover:

* Conditional types
* Generic conditional types
* Nested conditional types
* Distributive conditional types
* Preventing distribution
* `infer`

Examples:

```ts
type IsString<T> =
  T extends string ? true : false;
```

---

# 23. MODULE 19 — `infer`

Cover:

* Infer basics
* Function return type extraction
* Array element extraction
* Promise extraction
* Nested inference
* Conditional type inference

Examples:

```ts
type Return<T> =
  T extends (...args: any[]) => infer R
    ? R
    : never;
```

---

# 24. MODULE 20 — MAPPED TYPES

Cover:

```ts
{
  [K in keyof T]: ...
}
```

Topics:

* Basic mapped types
* Optional modifiers
* readonly modifiers
* Key remapping
* Conditional mapped types
* Template literal mapped types

---

# 25. MODULE 21 — TEMPLATE LITERAL TYPES

Cover:

```ts
type EventName =
  `on${string}`;
```

Topics:

* Template literal types
* String unions
* Key remapping
* Intrinsic string manipulation types
* Practical API typing

---

# 26. MODULE 22 — UTILITY TYPES

Create a complete utility-type reference.

At minimum:

```text
Partial
Required
Readonly
Record
Pick
Omit
Exclude
Extract
NonNullable
ReturnType
Parameters
ConstructorParameters
InstanceType
ThisParameterType
OmitThisParameter
ThisType
Awaited
Uppercase
Lowercase
Capitalize
Uncapitalize
```

For EVERY utility type include:

```text
What it does
Syntax
Example
Before
After
Real-world use
Implementation concept
Interview question
MCQ
Related utility types
```

Also implement simplified versions manually where educationally useful.

Example:

```ts
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
```

---

# 27. MODULE 23 — RECURSIVE TYPES

Cover:

* Recursive type aliases
* Tree structures
* JSON types
* Nested objects
* Recursive utility types
* DeepPartial
* DeepReadonly
* Recursive conditional types

---

# 28. MODULE 24 — ENUMS

Cover:

* Numeric enums
* String enums
* Heterogeneous enums
* Const enums
* Runtime behavior
* Enum alternatives
* `as const`
* Union literals vs enums

Discuss modern TypeScript recommendations.

---

# 29. MODULE 25 — CLASSES

Cover:

* Class properties
* Constructor
* Methods
* Access modifiers
* public
* private
* protected
* readonly
* static
* abstract classes
* implements
* extends
* parameter properties
* getters
* setters
* override
* class fields
* private `#` fields

Compare TypeScript `private` with JavaScript `#private`.

---

# 30. MODULE 26 — ABSTRACT CLASSES AND INTERFACES

Cover:

* Abstract classes
* Abstract methods
* Interfaces
* `implements`
* Multiple interfaces
* Interface composition
* Abstract class vs interface

Include practical examples.

---

# 31. MODULE 27 — DECLARATION FILES

Deep-dive:

```text
.d.ts
```

Cover:

* Declaration files
* Ambient declarations
* `declare`
* `declare module`
* `declare global`
* Global types
* Third-party library types
* Module augmentation
* Interface augmentation

---

# 32. MODULE 28 — MODULES

Cover:

* ES modules
* Imports
* Exports
* Type-only imports
* Type-only exports
* `import type`
* `export type`
* Module resolution
* Path aliases
* Declaration generation

---

# 33. MODULE 29 — NAMESPACE AND LEGACY TYPESCRIPT

Cover:

* Namespaces
* Internal modules
* Why namespaces are less common today
* Legacy TypeScript code
* When developers encounter them

Do not encourage outdated patterns unnecessarily.

---

# 34. MODULE 30 — TSConfig

Create a complete `tsconfig.json` guide.

Cover:

```text
target
module
moduleResolution
lib
strict
noImplicitAny
strictNullChecks
strictFunctionTypes
strictBindCallApply
strictPropertyInitialization
noImplicitThis
useUnknownInCatchVariables
alwaysStrict
noUnusedLocals
noUnusedParameters
noImplicitReturns
noFallthroughCasesInSwitch
exactOptionalPropertyTypes
noUncheckedIndexedAccess
allowJs
checkJs
jsx
resolveJsonModule
esModuleInterop
allowSyntheticDefaultImports
isolatedModules
verbatimModuleSyntax
skipLibCheck
baseUrl
paths
declaration
sourceMap
outDir
rootDir
```

Explain each with examples.

Create several sample configurations:

```text
Beginner
Strict production
React
Next.js
Library
Node.js
```

---

# 35. MODULE 31 — STRICT MODE

Deep-dive into:

* `strict`
* Strict null checks
* Strict function types
* Strict property initialization
* Implicit any
* Unknown catch variables
* Why strict mode matters

---

# 36. MODULE 32 — TYPE COMPATIBILITY

Cover:

* Structural typing
* Assignability
* Compatibility
* Excess property checking
* Function compatibility
* Parameter bivariance
* Return type compatibility
* Variance
* Covariance
* Contravariance
* Invariance

This should be an advanced module.

---

# 37. MODULE 33 — VARIANCE

Deep-dive:

```text
Covariance
Contravariance
Bivariance
Invariance
```

Use practical examples with:

* Functions
* Arrays
* Generics
* Callbacks

---

# 38. MODULE 34 — TYPE-SAFE API DESIGN

Cover:

* API response types
* Request types
* Error types
* DTOs
* Discriminated API states
* Result types
* Optional values
* Runtime validation
* TypeScript vs runtime validation

Important concept:

Explain why TypeScript alone cannot validate external API data at runtime.

---

# 39. MODULE 35 — TYPESCRIPT + ASYNC JAVASCRIPT

Cover:

* Promise typing
* Async function return types
* Generic promises
* Error typing
* `unknown` in catch
* `Promise.all`
* `Promise.allSettled`
* Async generators
* Typed fetch wrappers
* API client patterns

---

# 40. MODULE 36 — TYPESCRIPT + REACT

Create a major practical module.

Cover:

* Component props
* Children
* Event types
* Form events
* Mouse events
* Keyboard events
* Change events
* useState
* useEffect
* useRef
* useReducer
* useMemo
* useCallback
* Context API
* Custom hooks
* Generic components
* Forward refs
* Component composition
* Discriminated component props
* Polymorphic components

Examples must use modern React TypeScript patterns.

---

# 41. MODULE 37 — TYPESCRIPT + NEXT.JS

Cover:

* Server components
* Client components
* Props
* Route parameters
* Search parameters
* Server actions
* API routes / route handlers
* Metadata
* Layouts
* Loading
* Error boundaries
* Middleware
* Environment variables
* Typed configuration
* Data fetching
* Form handling

Keep examples compatible with modern Next.js architecture.

---

# 42. MODULE 38 — TYPESCRIPT + NODE.JS

Cover:

* Node APIs
* Environment variables
* Express-style APIs
* Request/response typing
* Middleware typing
* Configuration
* Error handling
* Generic repositories
* Service patterns

---

# 43. MODULE 39 — ADVANCED TYPE-SAFE PATTERNS

Cover:

* Result type
* Option type
* Branded types
* Nominal typing techniques
* Type-safe builders
* Fluent APIs
* Generic factories
* Type-safe event emitters
* Type-safe configuration
* Type-safe state machines
* Exhaustive pattern matching

---

# 44. MODULE 40 — TYPE-LEVEL PROGRAMMING

Advanced module.

Cover:

* Conditional types
* Mapped types
* Template literal types
* Recursive types
* `infer`
* Type transformations
* Type-level string manipulation
* Type-level arrays
* Type-level object transformations
* Compile-time computation concepts

Include progressively harder examples.

---

# 45. MODULE 41 — TYPESCRIPT PERFORMANCE

Cover:

* Compiler performance
* Large type graphs
* Complex conditional types
* Recursive types
* Project references
* Incremental builds
* `skipLibCheck`
* Type-checking performance
* Declaration generation
* Build optimization

---

# 46. MODULE 42 — TYPESCRIPT ARCHITECTURE

Cover practical architecture:

* Domain types
* DTOs
* Shared types
* API contracts
* Feature-based types
* Type ownership
* Avoiding circular dependencies
* Avoiding giant type files
* Type boundaries
* Public vs internal types
* Library API design

---

# 47. MODULE 43 — COMMON TYPESCRIPT MISTAKES

Create a dedicated section for mistakes such as:

* Overusing `any`
* Excessive assertions
* Ignoring nullability
* Using enums unnecessarily
* Giant interfaces
* Overly complex generics
* Type duplication
* Incorrect generic constraints
* Using TypeScript for runtime validation
* Ignoring compiler errors
* Weak tsconfig
* `as unknown as`
* Incorrect React typing
* Incorrect event typing

Every mistake should have:

```text
Bad example
Why it is bad
Better version
Explanation
Interview question
```

---

# 48. MODULE 44 — TYPESCRIPT DESIGN PATTERNS

Cover:

* Generic repository
* Factory
* Builder
* Adapter
* Strategy
* Observer
* Dependency injection
* Type-safe event emitter
* Result pattern
* State machine
* Command pattern

Focus on type-safe implementation.

---

# 49. 60-DAY TYPESCRIPT CHALLENGE

Create a complete 60-day TypeScript learning path.

Suggested progression:

## Days 1–10

```text
TypeScript fundamentals
Basic types
Inference
any
unknown
never
void
Assertions
Arrays
Tuples
Objects
```

## Days 11–20

```text
Type aliases
Interfaces
Unions
Intersections
Narrowing
Functions
Overloads
Generics
keyof
typeof
```

## Days 21–30

```text
Indexed access
Conditional types
infer
Mapped types
Template literal types
Utility types
Recursive types
Enums
Classes
Abstract classes
```

## Days 31–40

```text
Declaration files
Modules
Module resolution
tsconfig
Strict mode
Type compatibility
Variance
Advanced generics
```

## Days 41–50

```text
Type-safe APIs
Async TypeScript
React TypeScript
Hooks
Generic components
Forms
Context
Custom hooks
Next.js TypeScript
```

## Days 51–60

```text
Advanced patterns
Type-level programming
Architecture
Performance
Design patterns
Common mistakes
Interview preparation
Real-world TypeScript problems
Final project/revision
```

Every day must include:

```text
Day
Title
Learning objectives
Topics
Examples
MCQs
Output/type-prediction questions
Coding problem
Interview question
Prerequisites
Estimated time
```

---

# 50. TYPESCRIPT CODING PROBLEMS

Create at least:

**60 coding problems**

Difficulty:

```text
Easy: 25
Medium: 25
Hard: 10
```

Problems should test TypeScript itself, not just generic algorithms.

Examples:

```text
Generic identity
Typed map
Typed filter
Typed reduce
Generic API response
Type-safe event emitter
Typed debounce
Typed throttle
DeepPartial
DeepReadonly
DeepRequired
DeepPick
DeepOmit
Flatten tuple
TupleToUnion
UnionToIntersection
First element of tuple
Last element of tuple
Promise type extraction
Function return extraction
Typed object keys
Typed object entries
Typed groupBy
Type-safe builder
Result type
Option type
Branded ID
State machine
Typed router
Typed event map
Type-safe configuration
```

Each problem must contain:

```text
id
title
description
difficulty
topicIds
constraints
examples
starterCode
expected behavior
hints
solution
solutionExplanation
timeComplexity
spaceComplexity
```

Provide both:

```text
TypeScript solution
Explanation of the type-level reasoning
```

where appropriate.

---

# 51. MCQ DATABASE

Create at least:

**300 MCQs**

Cover all major modules.

Distribution should approximately be:

```text
Fundamentals          20
Basic types           20
Inference             15
any/unknown/never     15
Objects/interfaces    20
Unions/intersections  20
Narrowing             20
Functions             20
Generics              30
keyof/typeof          15
Conditional types     20
Mapped types          20
Utility types         25
Classes               15
Modules               10
tsconfig              20
Compatibility         15
React                 15
Next.js               10
Advanced types        20
```

Every MCQ must contain:

```text
id
question
options
correctOptionId
explanation
difficulty
topicIds
```

Rules:

* Exactly one correct answer.
* All distractors should be plausible.
* Do not use ambiguous wording.
* Do not depend on undocumented compiler behavior.
* Explain the reasoning.
* Include code-based questions.
* Include conceptual questions.
* Include practical questions.
* Include interview-style questions.

---

# 52. OUTPUT / TYPE-PREDICTION QUESTIONS

Create at least:

**150 questions**

These are extremely important for TypeScript interview preparation.

Questions should ask what TypeScript will infer, accept, reject, or report.

Examples:

```ts
let value = "hello";

value = 10;
```

Ask:

> Does this compile?

---

Example:

```ts
type User = {
  name: string;
};

const user = {
  name: "Rajesh",
  age: 30
};

const x: User = user;
```

Ask:

> Does this compile? Why?

---

Example:

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity("hello");
```

Ask:

> What is the inferred type of `result`?

---

Cover:

```text
Inference
Narrowing
Generics
Unions
Intersections
keyof
typeof
Conditional types
Mapped types
infer
Utility types
Functions
Variance
React props
```

Each question requires:

```text
Code
Compile result
Inferred type
Explanation
Concept
Difficulty
```

---

# 53. INTERVIEW QUESTIONS

Create at least:

**200 TypeScript interview questions**

Categories:

```text
Fundamentals
Types
Inference
any / unknown / never
Interfaces
Type aliases
Unions
Intersections
Narrowing
Functions
Overloads
Generics
keyof
typeof
Conditional types
infer
Mapped types
Template literal types
Utility types
Enums
Classes
Declaration files
Modules
tsconfig
Strict mode
Type compatibility
Variance
React
Next.js
Node.js
Architecture
Performance
Advanced TypeScript
```

Every question should contain:

```text
question
shortAnswer
detailedExplanation
example
commonMistake
topicIds
relatedProblemIds
difficulty
```

Do not create fake company-specific claims.

Use:

```text
commonly discussed interview topic
interview-style question
senior-level interview question
```

instead of claiming that a particular company definitely asks a question.

---

# 54. EXAMPLE CODE LIBRARY

Create at least:

**100 standalone TypeScript examples**

Organize examples by topic.

Every example should contain:

```text
id
title
description
code
expectedBehavior
explanation
topicIds
difficulty
```

Examples should include:

```text
Basic annotation
Inference
Union
Intersection
Interface
Type alias
Generic function
Generic class
Generic constraint
keyof
typeof
Indexed access
Conditional type
infer
Mapped type
Template literal type
Partial
Pick
Omit
Record
ReturnType
Awaited
DeepPartial
Branded types
Type guard
Assertion function
Overload
Declaration merging
Module augmentation
Typed API
Typed React component
Generic React component
Typed custom hook
Typed reducer
Typed context
Typed Next.js route
Typed server action
```

---

# 55. CONCEPT PLAYGROUND

Create at least:

**20 TypeScript concept playground examples**

Examples:

```text
Type inference
Union narrowing
Discriminated union
Generic inference
keyof
typeof
Conditional types
infer
Mapped types
Template literal types
Utility types
Recursive types
Function variance
Structural typing
Branded types
Exhaustive checking
Generic React component
Type-safe API
Result type
State machine
```

These are static educational examples.

Do NOT implement a full code execution engine.

---

# 56. UTILITY TYPE PLAYGROUND

Create interactive-ready examples for:

```text
Partial
Required
Readonly
Pick
Omit
Record
Exclude
Extract
NonNullable
ReturnType
Parameters
Awaited
InstanceType
ConstructorParameters
```

For each:

```text
Original type
Transformation
Resulting type
Explanation
Real-world example
```

---

# 57. TYPESCRIPT INTERVIEW PATTERNS

Create a dedicated collection of common TypeScript interview patterns.

Examples:

```text
What is structural typing?
type vs interface?
any vs unknown?
never vs void?
What does keyof do?
What does infer do?
What are conditional types?
What are mapped types?
What are distributive conditional types?
What is type narrowing?
What is declaration merging?
What is module augmentation?
What is variance?
Why use strict?
Why doesn't TypeScript validate API responses?
What is type erasure?
What is the difference between private and #private?
How does TypeScript compile?
```

---

# 58. REAL-WORLD TYPE-SAFE PROBLEMS

Create practical problems based on real frontend development.

Examples:

### API

```text
Create a typed API response
Create a typed fetch wrapper
Create error/result types
```

### React

```text
Create a generic table
Create typed form fields
Create polymorphic component
Create typed event handler
Create reusable modal props
```

### Next.js

```text
Type route parameters
Type search parameters
Type API route
Type server action
Type metadata
```

### Architecture

```text
Typed event bus
Typed state machine
Typed configuration
Typed repository
Typed service layer
```

---

# 59. TYPE-SAFE JAVASCRIPT MIGRATION

Create a complete module explaining how to migrate JavaScript to TypeScript.

Cover:

```text
.js → .ts
JSX → TSX
Add types incrementally
allowJs
checkJs
JSDoc
strict migration
any reduction
Third-party libraries
Declaration files
Common migration errors
```

Include:

* Migration examples
* Before/after code
* Migration problems
* MCQs
* Interview questions

---

# 60. TYPESCRIPT + JAVASCRIPT COMPARISON

Create comparison content.

Examples:

```text
JavaScript vs TypeScript
runtime vs compile-time
dynamic vs static checking
type assertion vs conversion
interface vs object
type vs interface
enum vs union
any vs unknown
private vs #private
```

Do not duplicate the JavaScript content.

Use cross-links to the JavaScript track where appropriate.

---

# 61. CONTENT RELATIONSHIP GRAPH

Build meaningful relationships.

Example:

```text
Generics
   ↓
Generic constraints
   ↓
keyof
   ↓
Mapped types
   ↓
Conditional types
   ↓
infer
   ↓
Utility types
   ↓
Advanced type-level programming
```

Another:

```text
Union
   ↓
Narrowing
   ↓
Discriminated union
   ↓
Exhaustive checking
   ↓
State machine
```

Another:

```text
React props
   ↓
Generic components
   ↓
Polymorphic components
   ↓
Advanced component APIs
```

Relationships must be meaningful.

---

# 62. CONTENT IDS

Use stable IDs.

Recommended:

```text
ts-topic-generics
ts-topic-conditional-types
ts-topic-mapped-types

ts-mcq-generics-001
ts-mcq-generics-002

ts-problem-deep-partial
ts-problem-type-safe-event-emitter

ts-interview-generics-001

ts-example-generic-function-001

ts-playground-discriminated-union
```

Follow the project's existing ID convention if different.

Never reuse IDs.

---

# 63. CONTENT ORGANIZATION

Use the existing repository architecture.

If compatible:

```text
content/
└── typescript/
    ├── topics/
    ├── challenges/
    ├── mcqs/
    ├── problems/
    ├── interview-questions/
    ├── examples/
    ├── playground/
    └── releases/
```

Do not create a competing structure.

---

# 64. MDX TOPIC FORMAT

Every major topic should contain:

```text
Introduction

What is it?

Why does it exist?

Syntax

Basic example

Real-world example

How TypeScript checks it

Common mistakes

Advanced example

Interview perspective

Practice questions

Related topics

Related problems

Related interview questions
```

Advanced topics should additionally contain:

```text
How the type system evaluates it
Common compiler errors
Type-level reasoning
Performance considerations
```

---

# 65. QUALITY REQUIREMENTS

Do not generate filler.

For every concept ask:

```text
What problem does this solve?

How does the TypeScript compiler understand it?

What JavaScript exists at runtime?

What mistakes do developers make?

What would an interviewer ask?

Can the learner practice it?

What other concepts depend on it?
```

---

# 66. VALIDATION

After generating every batch validate:

### IDs

* Duplicate IDs = 0
* Duplicate slugs = 0

### References

* Broken topic references = 0
* Broken MCQ references = 0
* Broken problem references = 0
* Broken interview references = 0
* Broken challenge references = 0

### MCQs

* Exactly one correct answer
* Correct option exists
* Explanation exists

### Problems

* Starter code exists
* Examples are consistent
* Solution compiles
* Explanation exists

### Examples

* TypeScript syntax is valid
* Expected behavior is correct

### Challenge

* Days 1–60 exist
* Prerequisites are valid
* All references resolve

---

# 67. IMPORTANT — COMPILE THE CODE

Do not assume example code is correct.

Where possible:

1. Extract TypeScript examples.
2. Compile them using the repository's TypeScript configuration.
3. Detect invalid examples.
4. Correct them.
5. Clearly mark intentionally-invalid examples used to demonstrate compiler errors.

For intentionally-invalid examples:

```text
expectedCompileError: true
```

and document the expected error/concept.

Do NOT silently change an example just to make it compile if the purpose is to demonstrate a TypeScript error.

---

# 68. BATCH GENERATION

Do not generate everything in one uncontrolled operation.

Use batches.

### Batch 1

```text
Modules 1–10
```

### Batch 2

```text
Modules 11–20
```

### Batch 3

```text
Modules 21–30
```

### Batch 4

```text
Modules 31–44
```

### Batch 5

```text
60-Day Challenge
```

### Batch 6

```text
300 MCQs
```

### Batch 7

```text
200 Interview Questions
```

### Batch 8

```text
150 Output/Type Prediction Questions
```

### Batch 9

```text
60 Coding Problems
```

### Batch 10

```text
100 TypeScript Examples
```

### Batch 11

```text
React + TypeScript
Next.js + TypeScript
Node.js + TypeScript
```

### Batch 12

```text
Advanced Playground
Migration Guide
Comparison Content
Revision Content
```

After each batch:

```text
Generate
→ Validate
→ Compile
→ Fix
→ Test
→ Continue
```

Do not continue if there are unresolved reference or schema errors.

---

# 69. FINAL CONTENT COUNTS

The final TypeScript track should contain at least:

```text
44 major modules

60-day challenge

60+ coding problems

300+ MCQs

200+ interview questions

150+ output/type-prediction questions

100+ standalone examples

20+ playground examples

Complete Utility Types reference

Complete TSConfig reference

React + TypeScript

Next.js + TypeScript

Node.js + TypeScript

JavaScript → TypeScript migration guide

Advanced type-system reference
```

These are minimum targets, not reasons to generate low-quality filler.

Quality is more important than hitting an exact number.

---

# 70. FINAL USER JOURNEY

A learner should be able to enter:

```text
/learn/typescript
```

and follow:

```text
Start Here
    ↓
TypeScript Fundamentals
    ↓
Types
    ↓
Inference
    ↓
Functions
    ↓
Interfaces
    ↓
Unions
    ↓
Narrowing
    ↓
Generics
    ↓
Advanced Types
    ↓
Utility Types
    ↓
Classes / Modules
    ↓
TSConfig
    ↓
Advanced Type System
    ↓
React
    ↓
Next.js
    ↓
Real-world Problems
    ↓
Interview Preparation
    ↓
Advanced Revision
```

At every stage the learner should have access to:

```text
Explanation
    ↓
Example
    ↓
MCQ
    ↓
Type Prediction
    ↓
Coding Problem
    ↓
Interview Question
    ↓
Related Concepts
```

---

# 71. DO NOT MODIFY UNRELATED FEATURES

Do NOT:

* redesign `/learn`
* redesign the portfolio
* modify JavaScript content unnecessarily
* introduce a CMS
* introduce a database
* introduce an online judge
* introduce a code execution backend
* introduce unnecessary dependencies
* duplicate components
* duplicate content architecture

Only modify the existing content infrastructure when necessary.

---

# 72. FINAL REPORT

After each batch report:

```text
Generated:
- Topics:
- Examples:
- MCQs:
- Output questions:
- Interview questions:
- Coding problems:
- Challenge days:
- Playground examples:

Validation:
- Duplicate IDs:
- Duplicate slugs:
- Broken references:
- Invalid schemas:
- Invalid examples:

Compilation:
- Valid examples:
- Intentionally invalid examples:
- Compilation failures:

Quality:
- Missing explanations:
- Missing relationships:
- Duplicate concepts:

Checks:
- TypeScript:
- Lint:
- Tests:
- Build:
```

At the end, provide a complete summary of the TypeScript learning track.

---

# FINAL PRINCIPLE

This should not become a giant collection of disconnected TypeScript articles.

Build a **learning system**.

The relationship should be:

```text
CONCEPT
   ↓
EXAMPLE
   ↓
MCQ
   ↓
TYPE PREDICTION
   ↓
CODING PROBLEM
   ↓
INTERVIEW QUESTION
   ↓
RELATED CONCEPT
   ↓
CHALLENGE DAY
```

The learner should be able to study TypeScript systematically, practice it, understand the compiler's reasoning, solve real development problems, and prepare for senior-level interviews.

The TypeScript track must remain independent from the JavaScript track while linking to JavaScript concepts when a prerequisite or comparison is genuinely useful.

Do NOT start generating content until you have inspected the existing repository and content architecture.
