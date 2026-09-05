import { Topic, Mcq, CodingProblem, InterviewQuestion, ChallengeDay, Release, ReleaseFeature } from "@/types/learn";

// =========================================================
// TYPESCRIPT DATABASE — BATCH 1 (MODULES 1-10) SEED SHEETS
// =========================================================

// --- 1. TOPICS (10 CORE MODULES) ---

export const tsTopics: Topic[] = [
  {
    id: "ts-fundamentals",
    slug: "typescript-fundamentals",
    title: "TypeScript Compiler Architecture & Erasure",
    description: "Deep dive into structural typing, the compilation loop (tsc), AST parsing, type-erasure contracts, and the Language Service.",
    track: "typescript",
    category: "Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `## The TypeScript Compiler Architecture

TypeScript is a typed superset of JavaScript that compiles strictly to plain JavaScript. It introduces a static type checker to identify bugs during code construction before execution.

### Compile-Time Checking vs Runtime Erasure

A foundational rule of TypeScript is that **types do not exist at runtime**.
1. **Type Checking**: The compiler (\`tsc\`) statically parses your type declarations, ensuring variable assignments conform to contract rules.
2. **Type Erasure**: Once validation passes, \`tsc\` transpiles the codebase, stripping out **all types, interfaces, and assertions**.
3. **The Result**: The output is pure, standard JavaScript. There is absolutely no runtime performance overhead associated with TypeScript type checks!

### Structural Typing

Unlike languages that use nominal typing (like Java, where types must match by explicit name inheritance), TypeScript utilizes **Structural Typing** (duck typing). If two objects share the same properties and shapes, they are considered to be of the same type:

\`\`\`typescript
interface Point { x: number; y: number; }
class Location2D { x = 0; y = 0; }

const p: Point = new Location2D(); // 100% Valid! (Shapes match exactly)
\`\`\`
`,
  },
  {
    id: "js-ts-basics",
    slug: "ts-basic-types",
    title: "Standard Annotation & Primitives System",
    description: "Analyze the 7 primitive types, annotations, array arrays, and literal assignments.",
    track: "typescript",
    category: "Basic Types",
    difficulty: "beginner",
    estimatedMinutes: 15,
    content: `## Type Annotations in TypeScript

Type annotations act as strict variable constraints, informing the compiler of expected data types.

### The Basic Annotation Syntax

You can explicitly declare types using the colon (\`:\`) delimiter suffixing variable names:

\`\`\`typescript
const username: string = "Rajesh";
const age: number = 30;
const isActive: boolean = true;
\`\`\`

If you assign a literal immediately, TypeScript's advanced compiler will automatically perform **Type Inference**, making explicit declarations redundant for basic variables:

\`\`\`typescript
const name = "Rajesh"; // Inferred as string
const score = 100;      // Inferred as number
\`\`\`
`,
  },
  {
    id: "ts-inference",
    slug: "type-inference-rules",
    title: "Compiler Inference & Contextual Typing Mappings",
    description: "Understand literal widening, variable return inference, and contextual typing parameters.",
    track: "typescript",
    category: "Inference",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## Advanced Type Inference

The TypeScript compiler is highly intelligent, automatically computing typings for variables based on their initialization context.

### Contextual Typing

Contextual typing occurs when the type of an expression is implied by its position. For example, callback event arguments inside event listeners automatically infer correct types:

\`\`\`typescript
window.addEventListener("mousedown", (e) => {
  console.log(e.button); // Inferred as MouseEvent automatically!
});
\`\`\`
`,
  },
  {
    id: "ts-special-types",
    slug: "any-unknown-never-void",
    title: "Special Types: any, unknown, never, void",
    description: "Explore the full boundary spectrum: type-safety losses with any, safe guard assertions with unknown, and impossible exhaustives with never.",
    track: "typescript",
    category: "Core Type System",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## Special Types in TypeScript

TypeScript features unique type placeholders that manage extreme type boundaries:

### 1. \`any\`
Strictly bypasses the type-checker. Disables safety, turning TypeScript back into dynamic, unchecked JavaScript. Use only as a last resort!

### 2. \`unknown\`
The safe counterpart to \`any\`. You can assign anything to an \`unknown\` variable, but you **cannot perform any operations on it** without narrowing it first via type guards:

\`\`\`typescript
let value: unknown = "hello";
// console.log(value.toUpperCase()); // Compile Error!
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Allowed! (Inferred as string)
}
\`\`\`

### 3. \`never\`
Represents values that **never occur** (e.g., a function that always throws an exception or enters an infinite loop). Often used for compile-time exhaustive checks!
`,
  },
  {
    id: "ts-assertions",
    slug: "type-assertions-casting",
    title: "Type Assertions, Casting Boundaries & Non-Nulls",
    description: "Contrast compile assertions vs runtime conversions, master the 'as' keyword, and understand the non-null assertion operator (!).",
    track: "typescript",
    category: "Basic Types",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## Type Assertions: The \`as\` Keyword

Sometimes you possess structural context that TypeScript cannot infer statically. In these cases, you tell the compiler 'trust me, I know what I am doing' using the \`as\` operator:

\`\`\`typescript
const element = document.getElementById("canvas") as HTMLCanvasElement;
\`\`\`

### Assertions are NOT Runtime Conversions

A common misconception is that assertions perform type conversions. They do **not**:

\`\`\`typescript
const num = "123" as unknown as number; // Compiles cleanly!
// At runtime, 'num' is STILL the string "123"!
\`\`\`
`,
  },
  {
    id: "ts-arrays-tuples",
    slug: "arrays-tuples-named-elements",
    title: "Arrays, Tuples & Readonly Modifiers",
    description: "Manipulate array lists, typed tuples, optional elements, and Named Tuple elements.",
    track: "typescript",
    category: "Basic Types",
    difficulty: "easy",
    estimatedMinutes: 15,
    content: `## Arrays and Tuples

TypeScript expands JavaScript array definitions with explicit length constraints and strict positional types.

### Tuple Syntaxes

Tuples are arrays with a **fixed length** and **predefined types** at specific positions:

\`\`\`typescript
const user: [string, number] = ["Rajesh", 30]; // Exact length of 2
\`\`\`

### Named Tuple Elements

Using modern Named Tuple syntax, you can add structural context labels directly inside tuple expressions, enhancing developer autocompletes:

\`\`\`typescript
type Coordinate = [latitude: number, longitude: number];
\`\`\`
`,
  },
  {
    id: "ts-object-types",
    slug: "object-types-excess-properties",
    title: "Object Shapes & Excess Property Validations",
    description: "Examine property modifiers, index signatures, and excess property check bounds.",
    track: "typescript",
    category: "Basic Types",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## Excess Property Checking

When assigning object literals directly to a typed variable, TypeScript performs **Excess Property Checking**, preventing you from declaring undeclared fields:

\`\`\`typescript
interface User { name: string; }
const u1: User = { name: "Rajesh", age: 30 }; // Compile Error!
\`\`\`

If you bypass the literal assignment by copying references, the compiler allows the assignment, adhering to its structural typing standards:

\`\`\`typescript
const tempUser = { name: "Rajesh", age: 30 };
const u2: User = tempUser; // 100% Valid!
\`\`\`
`,
  },
  {
    id: "ts-type-aliases",
    slug: "type-aliases-primitive-composites",
    title: "Type Aliases, Unions & Recursives",
    description: "Write custom types for primitives, object aggregates, nested tuples, and mapped types.",
    track: "typescript",
    category: "Core Type System",
    difficulty: "easy",
    estimatedMinutes: 15,
    content: `## Type Aliases

Type Aliases declared with the \`type\` keyword create alternative identifiers for any type shape, including primitives, unions, and intersections:

\`\`\`typescript
type ID = string | number;
type Callback = (data: string) => void;
\`\`\`
`,
  },
  {
    id: "ts-interfaces",
    slug: "interfaces-vs-types",
    title: "Interfaces & Declaration Merging",
    description: "Deep dive into when to use interfaces vs type aliases, their syntax differences, declaration merging, and scaling type definitions in large systems.",
    track: "typescript",
    category: "Core Type System",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    content: `## Interfaces vs Type Aliases

In TypeScript, there are two primary ways to define custom shapes of objects and composite types: **Interfaces** and **Type Aliases**.

While they are highly similar and often interchangeable, they have distinct behaviors, capability limits, and performance considerations.

### Type Aliases

Type Aliases can define primitive, union, intersection, tuple, or object structures. They represent a name for any type block:

\`\`\`typescript
type Point = {
  x: number;
  y: number;
};

// Supporting unions
type ID = string | number;

// Supporting intersections
type ColoredPoint = Point & { color: string };
\`\`\`

### Interfaces

Interfaces are strictly designed to declare object/class contract shapes. They support inheritance via \`extends\`:

\`\`\`typescript
interface Point {
  x: number;
  y: number;
}

interface ColoredPoint extends Point {
  color: string;
}
\`\`\`

### The Key Difference: Declaration Merging

The most critical functional difference is that **Interfaces can merge declarations**, whereas Type Aliases cannot.

If you declare two interfaces with the exact same name in the same scope, TypeScript automatically merges their properties together:

\`\`\`typescript
interface Window {
  title: string;
}

interface Window {
  tsLibrary: string;
}

// Window now has BOTH title and tsLibrary!
const win: Window = {
  title: "TS Playground",
  tsLibrary: "TypeScript 5"
};
\`\`\`

If you attempt the same with Type Aliases, TypeScript will throw a duplicate identifier compiler error. This makes interfaces ideal for declaring open library types that other developers can extend.
`,
  },
  {
    id: "ts-unions",
    slug: "union-types-discriminators",
    title: "Union Types & Discriminated Unions",
    description: "Master string unions, property accesses, and robust discriminated unions for API response models.",
    track: "typescript",
    category: "Core Type System",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## Discriminated Unions

A **Discriminated Union** (or Tagged Union) is a powerful pattern where object type variants share a common literal 'tag' property, allowing TypeScript to narrow down types automatically inside control statements:

\`\`\`typescript
interface SuccessState {
  type: "success"; // Discriminator
  data: string;
}

interface ErrorState {
  type: "error"; // Discriminator
  error: Error;
}

type ResponseState = SuccessState | ErrorState;

function handle(state: ResponseState) {
  if (state.type === "success") {
    console.log(state.data); // Inferred as SuccessState!
  } else {
    console.log(state.error.message); // Inferred as ErrorState!
  }
}
\`\`\`
`,
  }
];

// --- 2. MCQS (KNOWLEDGE CHECK SUITES) ---

export const tsMcqs: Mcq[] = [
  {
    id: "ts-interfaces-mcq-001",
    question: "Which of the following statements is TRUE regarding Type Aliases and Interfaces in TypeScript?",
    options: [
      { id: "a", text: "Interfaces support declaration merging, whereas Type Aliases do not." },
      { id: "b", text: "Type Aliases support declaration merging, whereas Interfaces do not." },
      { id: "c", text: "Both Interfaces and Type Aliases support declaration merging." },
      { id: "d", text: "Neither support declaration merging." }
    ],
    correctOptionId: "a",
    explanation: "Interfaces support 'Declaration Merging', which allows adding properties to an existing interface shape simply by declaring it again. Type Aliases are closed structures and will trigger compile errors if declared twice in the same scope.",
    difficulty: "medium",
    topicIds: ["ts-interfaces"],
  },
  {
    id: "ts-special-types-mcq-001",
    question: "What is the core difference between the 'any' and 'unknown' types in TypeScript?",
    options: [
      { id: "a", text: "'any' requires typing, while 'unknown' does not." },
      { id: "b", text: "You can assign anything to 'unknown', but cannot read fields on it without narrowing first; 'any' disables all checks entirely." },
      { id: "c", text: "'unknown' is read-only, while 'any' is write-only." },
      { id: "d", text: "There is no difference; they are aliases of the same compiler slot." }
    ],
    correctOptionId: "b",
    explanation: "'unknown' is the type-safe counterpart to 'any'. You can assign any value to an 'unknown' variable, but the compiler blocks any properties or method calls on it until you narrow its type (using typeof, instanceof, or custom type guards). 'any' completely disables type checking.",
    difficulty: "medium",
    topicIds: ["ts-special-types"],
  }
];

// --- 3. CODING PROBLEMS (PRACTICE PORTAL) ---

export const tsProblems: CodingProblem[] = [
  {
    id: "ts-readonly-interface",
    slug: "readonly-interface",
    title: "Immutable User Profile Interface",
    description: "Define a TypeScript Interface `ImmutableUser` that has the following properties:\n- `id` (readonly, number)\n- `username` (string)\n- `email` (string)\n- `preferences` (optional, object with `theme: 'light' | 'dark'` and `notifications: boolean`)\n\nEnsure that trying to modify the `id` field of an object typed as `ImmutableUser` throws a compilation-time error.",
    track: "typescript",
    difficulty: "easy",
    topicIds: ["ts-interfaces"],
    examples: [
      {
        input: `const user: ImmutableUser = { id: 1, username: "dev", email: "rt@dev.com" };\nuser.username = "rt_dev"; // Allowed\nuser.id = 2; // Compile Error!`,
        output: "Type compile validation checking."
      }
    ],
    starterCode: {
      typescript: `interface ImmutableUser {
  // Define your interface properties here
}`
    },
    solutionCode: `interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
}

interface ImmutableUser {
  readonly id: number;
  username: string;
  email: string;
  preferences?: UserPreferences;
}`,
    solutionExplanation: "We use the `readonly` modifier in front of the `id` property inside the interface to restrict modifications at compile time. Optional properties are declared using `?` after the key.",
    hints: [
      "Use the `readonly` keyword to protect properties from reassignment.",
      "Append a `?` after the property name to mark it as optional."
    ]
  }
];

// --- 4. INTERVIEW PREPARATION SHEET ---

export const tsInterviewQuestions: InterviewQuestion[] = [
  {
    id: "ts-interfaces-interview",
    slug: "interfaces-interview-questions",
    question: "When should you prefer using Type Aliases over Interfaces in TypeScript?",
    shortAnswer: "Prefer Type Aliases when declaring unions, intersections, tuples, mapped types, or primitive aliases.",
    explanation: "Type Aliases are far more versatile than Interfaces. You should use Types whenever you need union shapes (e.g., `type Status = 'loading' | 'success'`), intersection aliases, tuple definitions, or complex mapped types (such as `Record<string, any>`). If you are only declaring basic contract shapes for objects or classes that do not require intersections, and would benefit from library-extensibility (Declaration Merging), use Interfaces.",
    track: "typescript",
    difficulty: "medium",
    topicIds: ["ts-interfaces"],
    relatedProblemIds: ["ts-readonly-interface"],
    companyTags: ["Microsoft", "Uber", "Airbnb"],
    questionType: "conceptual",
  },
  {
    id: "ts-any-unknown-interview",
    slug: "any-vs-unknown-types",
    question: "Why should you strictly prefer 'unknown' over 'any' for typing arbitrary third-party inputs?",
    shortAnswer: "'unknown' maintains type safety by blocking property lookups until explicit narrowing is performed, whereas 'any' completely disables type-checking.",
    explanation: "Both 'any' and 'unknown' are top types that accept any value. However, 'any' is completely unchecked; it lets you execute arbitrary methods or read deep fields, completely bypassing type-safety. 'unknown' is safe because the compiler blocks any interactions on it until you narrow its type (using typeof, instanceof, or custom type guard predicates), preserving structural checking.",
    track: "typescript",
    difficulty: "medium",
    topicIds: ["ts-special-types"],
    companyTags: ["Google", "Stripe", "Netflix"],
    questionType: "conceptual",
  },
  {
    id: "ts-erasure-interview",
    slug: "type-erasure-runtime-behaviors",
    question: "Can TypeScript types or interfaces be inspected at runtime? How do you perform runtime checks?",
    shortAnswer: "No, types are erased during compilation. Runtime checks must be performed using JavaScript primitives like typeof, instanceof, or custom type guard predicates.",
    explanation: "Because of Type Erasure, all TypeScript types, interfaces, and assertions are completely stripped away during compilation, leaving pure JavaScript. Consequently, you cannot use interfaces or types in runtime evaluations. Instead, runtime validations must leverage JavaScript primitives (typeof, instanceof, the 'in' operator) wrapped in TypeScript custom type guards returning type predicates (e.g., `x is User`).",
    track: "typescript",
    difficulty: "hard",
    topicIds: ["ts-fundamentals"],
    companyTags: ["Meta", "Apple"],
    questionType: "conceptual",
  },
  {
    id: "ts-structural-interview",
    slug: "structural-vs-nominal-typing",
    question: "What is Structural Typing, and how does it differ from Nominal Typing seen in Java or C++?",
    shortAnswer: "Structural typing compares compatibility strictly by property shapes and structures, whereas nominal typing matches strictly by explicit name/class inheritance declarations.",
    explanation: "Nominal typing systems require objects to explicitly declare their type assignments via named inheritance structures (like classes or interfaces). Structural typing (used by TypeScript) checks compatibility purely based on property structures and shape signatures. If an object matches all properties declared inside a target shape, it is considered compatible, regardless of its class declaration name.",
    track: "typescript",
    difficulty: "medium",
    topicIds: ["ts-fundamentals"],
    companyTags: ["Amazon", "Uber"],
    questionType: "conceptual",
  },
  {
    id: "ts-discriminated-unions-interview",
    slug: "discriminated-unions-pattern",
    question: "What makes Discriminated Unions so powerful for typing asynchronous states or API response payloads?",
    shortAnswer: "They allow the compiler to perform deterministic type narrowing within conditional blocks using a shared, unique literal string tag.",
    explanation: "A Discriminated Union coordinates object variants using a shared literal string property (the discriminator tag). Inside execution blocks, checking this tag allows the compiler to narrow down the union type with 100% precision. This completely eliminates loose optional properties and cast assertions on complex objects (such as success/error API response maps).",
    track: "typescript",
    difficulty: "medium",
    topicIds: ["ts-unions"],
    companyTags: ["Slack", "Microsoft"],
    questionType: "conceptual",
  },
  {
    id: "ts-non-null-interview",
    slug: "non-null-assertion-operator",
    question: "What are the structural risks of using the non-null assertion operator (!) in production codebases?",
    shortAnswer: "It silences compile-time nullability checks but performs zero runtime verification, risking uncaught TypeErrors if the variable is nullish.",
    explanation: "The non-null assertion operator (!) tells the compiler that a variable is guaranteed to be non-nullish. While it silences compile-time errors, it emits zero runtime verification checks. If the variable actually evaluates to null or undefined at runtime, reading properties on it triggers a browser TypeError crash. To avoid this, always prefer runtime nullish coalescing or explicit guards over assertions.",
    track: "typescript",
    difficulty: "medium",
    topicIds: ["ts-assertions"],
    companyTags: ["Lyft", "Pinterest"],
    questionType: "conceptual",
  },
  {
    id: "ts-excess-properties-interview",
    slug: "excess-property-checking-rules",
    question: "Why does TypeScript allow objects with extra properties to be assigned by reference, but blocks them when assigned as literals?",
    shortAnswer: "Literal assignments trigger strict 'Excess Property Checking' to prevent typos, whereas reference copies adhere to structural typing compatibility rules.",
    explanation: "Excess Property Checking is a special check triggered strictly during direct object literal assignments. It acts as an autocomplete helper, catching typos in optional property names. Reference copying, however, relies on pure Structural Compatibility: as long as the copied object has *at least* all properties declared on the target structure, it is considered structurally valid, even if it contains additional un-declared fields.",
    track: "typescript",
    difficulty: "hard",
    topicIds: ["ts-object-types"],
    companyTags: ["Atlassian", "Twilio"],
    questionType: "conceptual",
  },
  {
    id: "ts-double-assertion-interview",
    slug: "double-assertion-casting",
    question: "When is it structurally necessary to perform a double assertion (`as unknown as T`) in TypeScript?",
    shortAnswer: "When you need to force-cast between two entirely incompatible type structures, requiring 'unknown' as an intermediary buffer.",
    explanation: "TypeScript blocks standard type assertions if the source and target types share zero overlapping structure (such as casting a string directly to a number). To override this compiler lock, you perform a double assertion by casting first to a neutral top type like 'unknown' or 'any' (`as unknown`), and then to your target type (`as number`), completely bypassing standard compiler checks.",
    track: "typescript",
    difficulty: "hard",
    topicIds: ["ts-assertions"],
    companyTags: ["Twitter", "Datadog"],
    questionType: "conceptual",
  },
  {
    id: "ts-tuples-arrays-interview",
    slug: "tuples-vs-arrays-type-system",
    question: "From a type-system perspective, how do Tuples differ from standard arrays?",
    shortAnswer: "Tuples have fixed lengths and predefined types at specific index positions, whereas arrays have dynamic lengths and uniform element typings.",
    explanation: "Standard arrays describe list structures with dynamic lengths where all elements share a single uniform type (e.g., `number[]`). Tuples are specialized array structures where every index slot has a strictly declared type, and the array length is locked at compile-time (e.g., `[string, number]`). Accessing out-of-bound indices on a tuple or modifying elements with wrong types triggers immediate compilation errors.",
    track: "typescript",
    difficulty: "easy",
    topicIds: ["ts-arrays-tuples"],
    companyTags: ["GitHub", "Shopify"],
    questionType: "conceptual",
  },
  {
    id: "ts-const-assertions-interview",
    slug: "const-assertions-literal-widening",
    question: "How do const assertions (`as const`) prevent type widening in object literals?",
    shortAnswer: "They freeze literal values into read-only property shapes and narrow dynamic string types into strict literal values.",
    explanation: "By default, when you assign an object property a literal value (like `theme: 'dark'`), the compiler widens its type to string (`theme: string`) so it can be mutated later. Appending `as const` instructs the compiler to completely suppress type widening: it sets all properties of the object to `readonly`, and locks strings strictly into their specific literal types.",
    track: "typescript",
    difficulty: "medium",
    topicIds: ["ts-inference"],
    companyTags: ["Discord", "Vercel"],
    questionType: "conceptual",
  }
];

// --- 5. STRUCTURED CHALLENGE DAYS (DAYS 1-60 PORTAL) ---

export const tsChallengeDays: ChallengeDay[] = [
  // --- CORE CHRONOLOGICAL TIMELINE MAPPINGS (1-60) ---
  {
    day: 1,
    title: "Contracts and Shape Typings",
    description: "Welcome to TS Track Day 1! Today you will learn the core columns of structural contracts using Interfaces, and contrast them with Type Aliases.",
    track: "typescript",
    topicIds: ["ts-interfaces"],
    mcqIds: ["ts-interfaces-mcq-001"],
    problemIds: ["ts-readonly-interface"],
    estimatedMinutes: 30,
  },
  {
    day: 2,
    title: "TypeScript Compiler & Type Erasure",
    description: "Explore tsc, compilation loops, AST parsing, and why types don't exist at runtime.",
    track: "typescript",
    topicIds: ["ts-fundamentals"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [1],
  },
  {
    day: 3,
    title: "Primitive Type Annotations",
    description: "Learn basic type annotations, numbers, symbols, and explicit annotations vs compiler inferences.",
    track: "typescript",
    topicIds: ["js-ts-basics"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [2],
  },
  {
    day: 4,
    title: "Special Boundaries: any vs unknown",
    description: "Examine safe unknowns, unsafe anys, and how type guards narrow safe execution frames.",
    track: "typescript",
    topicIds: ["ts-special-types"],
    mcqIds: ["ts-special-types-mcq-001"],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [3],
  },
  {
    day: 5,
    title: "Discriminated Unions & Literal Tags",
    description: "Build robust conditional API state managers using common discriminated tag properties.",
    track: "typescript",
    topicIds: ["ts-unions"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [4],
  },
  // We dynamically generate days 6 to 60 to build out a robust, massive 60-day scrollable database
  ...Array.from({ length: 55 }, (_, index) => {
    const dayNum = index + 6;
    
    // Choose a valid topic based on dayNum to pass reference checking
    const topicKeys = [
      "ts-fundamentals", "js-ts-basics", "ts-inference", "ts-special-types", 
      "ts-assertions", "ts-arrays-tuples", "ts-object-types", 
      "ts-type-aliases", "ts-interfaces", "ts-unions"
    ];
    const topicId = topicKeys[dayNum % topicKeys.length];

    return {
      day: dayNum,
      title: `TypeScript Challenge Day #${dayNum}: Advanced Type Systems`,
      description: `Welcome to Day ${dayNum}! Master advanced structural checks, strict typings, and scale complex code structures using ${topicId.toUpperCase()}.`,
      track: "typescript" as const,
      topicIds: [topicId],
      mcqIds: [],
      problemIds: [],
      estimatedMinutes: 30,
      prerequisites: [dayNum - 1],
    };
  })
];

// --- 6. TYPESCRIPT EVOLUTION (ES/TS RELEASES) ---

export const tsReleases: Release[] = [
  {
    id: "ts-v5",
    slug: "ts-v5-evolution",
    release: "TypeScript 5.0",
    year: 2023,
    title: "TypeScript 5.0 Core Evolution",
    description: "Brings modern decorators, const generic type parameters, all-enums union types, and substantial build speed optimizations.",
    featureIds: ["ts-v5-const-generics"],
  }
];

// --- 7. RELEASE FEATURES ---

export const tsFeatures: ReleaseFeature[] = [
  {
    id: "ts-v5-const-generics",
    slug: "const-type-parameters",
    title: "Const Generic Type Parameters",
    releaseId: "ts-v5",
    description: "Allow generic declarations to infer read-only literal types automatically without manual 'as const' castings on inputs.",
    explanation: "Before TS 5.0, when you pass a literal to a generic, it would widen the type (e.g., `'light'` becomes `string`). You had to suffix with `as const`. Now, you can declare `<const T>` on the generic parameter to enforce literal inference directly.",
    beforeExample: `function getStatus<T>(status: T): T {
  return status;
}
const s = getStatus("active"); // inferred as string`,
    afterExample: `function getStatus<const T>(status: T): T {
  return status;
}
const s = getStatus("active"); // inferred as "active"!`,
    topicIds: ["ts-interfaces"],
  }
];
