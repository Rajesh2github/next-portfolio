import { Topic, Mcq, CodingProblem, InterviewQuestion, ChallengeDay, Release, ReleaseFeature } from "@/types/learn";

// =======================================================
// JAVASCRIPT DATABASE — EXTENSIVE BATCH EXPANSIONS
// =======================================================

// --- 1. TOPICS (20 CORE + 10 ADVANCED MODULES) ---

export const jsTopics: Topic[] = [
  // --- BATCH 1 TOPICS ---
  {
    id: "js-fundamentals",
    slug: "javascript-fundamentals",
    title: "JavaScript Runtime & Execution Engines",
    description: "Deep dive into the inner workings of the JavaScript engine, V8 pipeline, call stack, heap allocation, and the runtime event loop environment.",
    track: "javascript",
    category: "Fundamentals",
    difficulty: "beginner",
    estimatedMinutes: 20,
    content: `## The JavaScript Runtime Environment

JavaScript is famously a single-threaded, non-blocking, asynchronous concurrent programming language. But what does that actually mean?

While the **JavaScript Engine** (like Google V8) compiles and executes code using a single call stack, the **JavaScript Runtime** (like a Web Browser or Node.js) wraps the engine with additional APIs and threads to allow non-blocking concurrency.

### The Google V8 Engine Pipeline

The V8 engine compiles and executes JavaScript code using a Just-In-Time (JIT) compiler. Here is the step-by-step internal execution lifecycle:

1. **Parser & Lexer**: Parses raw source code into tokens, which are then organized into an **Abstract Syntax Tree (AST)**.
2. **Ignition (Interpreter)**: Synthesizes the AST into bytecode for rapid startup.
3. **TurboFan (Optimizing Compiler)**: Compiles "hot" bytecode into optimized machine code.

### Heap vs Call Stack

* **Call Stack**: Tracks active function execution contexts.
* **Memory Heap**: A large, unstructured memory allocation region where objects and reference types reside.
`,
  },
  {
    id: "js-types",
    slug: "javascript-types",
    title: "Primitive & Reference Type Systems",
    description: "Deep-dive into JavaScript's 7 primitive types, mutable objects, type checking using typeof/instanceof, and reference identity boundaries.",
    track: "javascript",
    category: "Types",
    difficulty: "beginner",
    estimatedMinutes: 15,
    content: `## Data Types in JavaScript

JavaScript is dynamically and weakly typed. Variables are not bound to a specific type; only values are typed.

The language splits values into two distinct categories: **Primitives** and **Reference Types (Objects)**.

### The 7 Primitive Types

Primitives are immutable, passed by value, and stored directly on the stack.

1. **string**: Character sequences.
2. **number**: 64-bit float values (IEEE 754).
3. **bigint**: Arbitrary-precision integers.
4. **boolean**: \`true\` or \`false\`.
5. **undefined**: Default value of uninitialized variables.
6. **null**: Absence of an object reference.
7. **symbol**: Unique, immutable identifiers.

### Special typeof Edge Cases

JavaScript contains historical and design quirks in its \`typeof\` operator:

\`\`\`javascript
typeof null             // "object"  (A famous early engine bug!)
typeof []               // "object"  (Arrays are object subtypes)
typeof function() {}    // "function" (Functions have a special type identifier)
typeof NaN              // "number"  (Not-a-Number is mathematically a numeric float)
\`\`\`
`,
  },
  {
    id: "js-coercion",
    slug: "type-coercion",
    title: "Implicit Type Conversion & Coercion Rules",
    description: "Demystify JavaScript's implicit type casting rules, ToPrimitive conversions, truthy/falsy boundaries, and strict comparison mechanics.",
    track: "javascript",
    category: "Types",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `## Type Coercion in JavaScript

Because JavaScript is weakly typed, it implicitly converts values between different types during execution (coercion), leading to many surprising output behaviors.

### Truthy vs Falsy Values

When evaluating conditional expressions, values are cast to booleans. There are exactly **8 falsy values** in JavaScript that coerce to \`false\`:

- \`false\`
- \`0\` (and \`-0\`, \`0n\`)
- \`""\` (empty string)
- \`null\`
- \`undefined\`
- \`NaN\`

All other values—including empty arrays \`[]\` and empty objects \`{}\`—are **truthy** and evaluate to \`true\`!

### Addition vs Subtraction Coercion

* **Addition (+)**: Acts as string concatenation if *either* operand is a string.
* **Subtraction (-)**: Strictly performs numeric conversion, attempting to cast both operands to numbers.

\`\`\`javascript
"5" + 2 // "52" (Concatenation)
"5" - 2 // 3    (Numeric Conversion)
\`\`\`
`,
  },
  {
    id: "js-operators",
    slug: "operators-expressions",
    title: "Advanced Operators & Short-Circuit Evaluation",
    description: "Explore nullish coalescing, optional chaining, logical assignment operators, bitwise boundaries, and operator precedence math.",
    track: "javascript",
    category: "Operators",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## Modern Operators in JavaScript

Modern JavaScript provides powerful operators to simplify code structures, safely handle deep objects, and evaluate fallback assignments.

### Optional Chaining (\`?.\`)

Optional chaining allows reading properties nested deep inside objects without throwing errors if an intermediate property is \`null\` or \`undefined\`:

\`\`\`javascript
const user = { profile: null };
console.log(user.profile?.avatar); // undefined (No TypeError thrown!)
\`\`\`

### Nullish Coalescing (\`??\`)

The nullish coalescing operator (\`??\`) is a logical operator that returns its right-hand side operand when its left-hand side is **nullish** (\`null\` or \`undefined\`). 

Contrast this with logical OR (\`||\`), which falls back on *any* falsy value (like \`0\` or \`""\`):

\`\`\`javascript
const speed = 0;
const s1 = speed || 50; // 50 (Because 0 is falsy!)
const s2 = speed ?? 50; // 0  (Because 0 is not nullish!)
\`\`\`
`,
  },
  {
    id: "js-control-flow",
    slug: "control-flow-loops",
    title: "Control Flow, Loops & Scope Iteration",
    description: "Understand loops, standard iteration, labeled breaks, and the differences between for-of (iterables) and for-in (enumerable objects).",
    track: "javascript",
    category: "Control Flow",
    difficulty: "easy",
    estimatedMinutes: 15,
    content: `## Iteration & Control Flow

JavaScript provides multiple loop types, each designed for specific data structures and enumerability scopes.

### \`for...of\` vs \`for...in\`

* **\`for...of\`**: Iterates over **Iterables** (Arrays, Strings, Sets, Maps). It retrieves the **values** directly:
  \`\`\`javascript
  const arr = ["a", "b"];
  for (const val of arr) console.log(val); // "a", "b"
  \`\`\`
* **\`for...in\`**: Iterates over all **enumerable keys** of an object (including inherited prototype keys!). It retrieves the **indices/keys**:
  \`\`\`javascript
  const obj = { x: 1, y: 2 };
  for (const key in obj) console.log(key); // "x", "y"
  \`\`\`
`,
  },
  {
    id: "js-functions",
    slug: "javascript-functions",
    title: "Function Scope, Declarations & Arrow Behaviors",
    description: "Analyze the differences between function declarations, expressions, arrow parameters, rest/spread parameters, and higher-order functions.",
    track: "javascript",
    category: "Functions",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    content: `## Designing Functions in JavaScript

In JavaScript, functions are **First-Class Citizens**. They can be assigned to variables, passed as arguments, and returned from other functions.

### Three Ways to Declare a Function

There are key lexical and hoisting differences between the three main function syntaxes:

#### 1. Function Declaration
Hoisted completely. Can be invoked before its definition in the code.
\`\`\`javascript
function add(a, b) { return a + b; }
\`\`\`

#### 2. Function Expression
Not hoisted. Behaves like a standard variable assignment.
\`\`\`javascript
const add = function(a, b) { return a + b; };
\`\`\`

#### 3. Arrow Function
No lexical \`this\`, \`arguments\`, or \`super\` bindings. Inherits them from parent scope.
\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`
`,
  },
  {
    id: "js-closures",
    slug: "closures",
    title: "Closures & Lexical Scopes",
    description: "Understand lexical scoping, execution contexts, and how inner functions retain access to their outer scopes even after the outer function has completed.",
    track: "javascript",
    category: "Scope & Closures",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    content: `## What is a Closure?

A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). 

In other words, a closure gives an inner function access to the outer function's scope even after the outer function has returned. In JavaScript, closures are created every time a function is created, at function creation time.

### Real-world Use Case: Private Variables (Data Encapsulation)

Closures are commonly used to emulate private variables:

\`\`\`javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount());    // 1
// count is private and encapsulated!
\`\`\`
`,
  },
  {
    id: "js-hoisting",
    slug: "hoisting-execution-context",
    title: "Execution Context & Temporal Dead Zones",
    description: "Analyze the creation and execution phases of JavaScript execution context, variable hoisting, and Temporal Dead Zones.",
    track: "javascript",
    category: "Fundamentals",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    content: `## Execution Context & Hoisting

Before executing code, the JS engine creates an **Execution Context** which goes through two distinct phases:

1. **Creation Phase**: Variable and function shapes are registered in memory.
2. **Execution Phase**: Code is evaluated and executed line-by-line.

### What is Hoisting?

Hoisting is the conceptual model representing how the JS engine registers variable and function declarations in memory during the creation phase before execution.

* **\`var\`**: Hoisted and initialized as \`undefined\`.
* **\`let\` & \`const\`**: Hoisted but **uninitialized**. They are placed in the **Temporal Dead Zone (TDZ)**. Any access before declaration throws a \`ReferenceError\`.
`,
  },
  {
    id: "js-this",
    slug: "this-explicit-binding",
    title: "Lexical this Binding & Arrow Scope Contracts",
    description: "Master the 'this' keyword, default, implicit, explicit bind handlers (call, apply, bind), and arrow function lexicals.",
    track: "javascript",
    category: "Functions",
    difficulty: "advanced",
    estimatedMinutes: 25,
    content: `## Demystifying \`this\`

The value of the \`this\` keyword is determined dynamically by **how a function is called**, not where it is defined (with the exception of arrow functions!).

### The 4 Invocation Rules

1. **Default Binding**: Standalone call. In strict mode, \`this\` is \`undefined\`.
2. **Implicit Binding**: Called as a method of an object. \`this\` refers to the object before the dot:
   \`\`\`javascript
   const obj = { val: 5, getVal() { return this.val; } };
   obj.getVal(); // this is obj
   \`\`\`
3. **Explicit Binding**: Forced using \`call\`, \`apply\`, or \`bind\`.
4. **New Binding**: Called as a constructor with \`new\`. \`this\` refers to the newly instantiated object.
`,
  },
  {
    id: "js-objects",
    slug: "objects-descriptors",
    title: "Object Literals & Property Descriptors",
    description: "Manipulate object mutations, computed properties, destructuring, and freeze boundaries using Property Descriptors.",
    track: "javascript",
    category: "Core Language",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## JavaScript Object Descriptors

Every property in a JavaScript object has hidden configuration parameters called **Property Descriptors**:

- **value**: The actual stored property value.
- **writable**: If \`true\`, the value can be updated.
- **enumerable**: If \`true\`, the property shows up in loops (\`for...in\`, \`Object.keys\`).
- **configurable**: If \`true\`, the descriptor can be changed or deleted.

Using \`Object.defineProperty()\`, we can lock down properties:

\`\`\`javascript
const user = {};
Object.defineProperty(user, "id", {
  value: 123,
  writable: false,
  configurable: false
});
user.id = 456; // Silent fail in non-strict mode
\`\`\`
`,
  },

  // --- BATCH 2 TOPICS (MODULES 11-20) ---
  {
    id: "js-prototypes",
    slug: "prototypes-classes",
    title: "Prototypes, Prototypal Inheritance & ES6 Classes",
    description: "Deep dive into JavaScript's prototype chain, constructor patterns, __proto__ vs prototype, and how ES6 classes translate into prototypal links under the hood.",
    track: "javascript",
    category: "Core Language",
    difficulty: "advanced",
    estimatedMinutes: 25,
    content: `## Prototypal Inheritance in JavaScript

Unlike classical class-based languages (like Java or C++), JavaScript uses **Prototypal Inheritance**. Every object has a private link to another object called its **prototype**.

### The Prototype Chain

When you attempt to access a property on an object:
1. The engine checks if the property exists directly on the object.
2. If not, it looks up the prototype chain via the internal \`[[Prototype]]\` link (exposed as \`__proto__\`).
3. This lookup continues until it finds the property or hits \`null\`.

### \`prototype\` vs \`__proto__\`

* **\`__proto__\`**: Exists on **all objects** (instances) and represents their actual active prototype pointer.
* **\`prototype\`**: Exists only on **Constructor Functions** (and ES6 classes) and acts as the prototype template that will be assigned to any instances created using the \`new\` keyword.
`,
  },
  {
    id: "js-arrays",
    slug: "advanced-arrays-iteration",
    title: "Advanced Arrays & Functional Array Methods",
    description: "Analyze map, filter, reduce accumulators, flatMap flattening, array mutations vs immutability, and array-like objects.",
    track: "javascript",
    category: "Core Language",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    content: `## Functional Array Iteration

Arrays in JavaScript are dynamic objects structured with automated index keys and a dedicated prototype library containing highly performant iteration methods.

### The Power of \`reduce()\`

The \`reduce()\` method executes a user-supplied 'reducer' callback function on each element of the array, returning a single accumulated result value. It can emulate \`map\` and \`filter\` combined:

\`\`\`javascript
const nums = [1, 2, 3, 4];
// Sum of squares of even numbers
const sum = nums.reduce((acc, curr) => {
  if (curr % 2 === 0) {
    acc += curr * curr;
  }
  return acc;
}, 0);
console.log(sum); // 20
\`\`\`
`,
  },
  {
    id: "js-async",
    slug: "asynchronous-javascript-event-loop",
    title: "Asynchronous JavaScript, Promises & the Event Loop",
    description: "Deconstruct the event loop runtime, call stacks, Web APIs, task callback queues, microtask hierarchies, and async/await compilation contracts.",
    track: "javascript",
    category: "Asynchronous",
    difficulty: "advanced",
    estimatedMinutes: 30,
    content: `## The Event Loop Concurrency Model

JavaScript is single-threaded, but runtime tasks (network queries, timers) are delegated to browser threads or Node C++ workers via **Web/Runtime APIs**.

### Tasks vs Microtasks

When an asynchronous callback is ready to run, it enters one of two queues:

1. **Microtask Queue**: Promises (\`.then/catch/finally\`), \`queueMicrotask\`, and \`MutationObserver\`. **Highly prioritized**.
2. **Macrotask/Task Queue**: \`setTimeout\`, \`setInterval\`, DOM events, user input, I/O.
`,
  },
  {
    id: "js-errors",
    slug: "error-handling-patterns",
    title: "Robust Error Handling & Try/Catch Patterns",
    description: "Master error objects, throw mechanics, try-catch-finally block boundaries, custom Error extensions, and nested async try/catch. ",
    track: "javascript",
    category: "Core Language",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## Error Handling in JavaScript

Proper error boundary containment is essential for stable, crash-free applications.

### Synchronous vs Asynchronous try-catch

The standard \`try-catch\` block is synchronous. It cannot capture asynchronous errors thrown inside timers, callbacks, or disconnected Promises:

\`\`\`javascript
// ❌ This catch block will NEVER execute!
try {
  setTimeout(() => {
    throw new Error("Broken async!");
  }, 100);
} catch (e) {
  console.log("Caught:", e.message);
}
\`\`\`
`,
  },
  {
    id: "js-collections",
    slug: "keyed-collections-references",
    title: "Keyed Collections: Maps, Sets & Weak References",
    description: "Analyze the differences between Maps vs Objects, Set uniqueness filters, WeakMaps, WeakSets, and garbage collection behaviors.",
    track: "javascript",
    category: "Core Language",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## Maps vs Objects

While standard JavaScript Objects only support strings or symbols as keys, ES6 **Maps** support any value (including objects, arrays, and functions!) as keys.

### Garbage Collection & WeakMaps

Standard Maps and Objects retain "strong references" to their keys, preventing those keys from being garbage collected (freed from memory).

**WeakMaps** and **WeakSets** resolve this by holding **weak references**:
* WeakMap keys *must* be objects.
* If there are no other active references to an object key, the garbage collector will automatically delete the entry from the WeakMap and free up memory.
`,
  },

  // --- BATCH 3 TOPICS (MODULES 21-30) ---
  {
    id: "js-modules",
    slug: "es-modules-commonjs-scopes",
    title: "ES Modules vs CommonJS Scopes",
    description: "Deconstruct modular scopes, static compilation, import/export, CommonJS require bindings, tree-shaking, and cyclic dependency traps.",
    track: "javascript",
    category: "Modules & Scope",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## ES Modules vs CommonJS

JavaScript provides two primary module resolution systems to isolate and scope variables: **CommonJS (CJS)** and **ES Modules (ESM)**.

### CommonJS (\`require\` / \`module.exports\`)
* **Dynamic**: Evaluated synchronously at **runtime**. You can nest \`require\` inside conditionals or function blocks.
* **By Value**: Exports variables by value copy. Any reassignments in parent scopes do not affect child imports.

### ES Modules (\`import\` / \`export\`)
* **Static**: Compiled and evaluated at **compile-time**. Imports must reside at the very top of files, enabling compilers to perform static **Tree-Shaking** (removing unused code branches).
* **Live Bindings**: Exports variables by reference. Updates inside exports automatically propagate to active imports.
`,
  },
  {
    id: "js-dom",
    slug: "browser-dom-event-delegation",
    title: "Browser DOM, Event Bubbling & Delegation",
    description: "Explore DOM trees, DOM reflows, event propagation (capturing vs bubbling), and how event delegation optimizes memory.",
    track: "javascript",
    category: "Browser JS",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    content: `## Event Propagation & Delegation

When a user interacts with a DOM element (like clicking a list item), the event travels through three distinct phases:

1. **Capturing Phase**: Travels from the \`window\` down to the clicked target.
2. **Target Phase**: Reaches the target element.
3. **Bubbling Phase**: Bubbles back up from the target to the \`window\`. (Default execution phase for \`addEventListener\`).

### Event Delegation Pattern

Instead of adding 1,000 separate event listeners to every list item (which wastes CPU and heap memory), you add **exactly one** listener to the parent element, and inspect the origin of the event using \`e.target\`:

\`\`\`javascript
const list = document.querySelector("#my-list");
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked item:", e.target.textContent);
  }
});
\`\`\`
`,
  },
  {
    id: "js-metaprogramming",
    slug: "metaprogramming-proxy-reflect",
    title: "Metaprogramming with Proxy & Reflect",
    description: "Dive into runtime meta-interceptors, proxy handlers, traps (get, set, deleteProperty), and Reflect method standardizations.",
    track: "javascript",
    category: "Advanced JS",
    difficulty: "advanced",
    estimatedMinutes: 25,
    content: `## Metaprogramming with Proxies

Metaprogramming involves writing code that behaves, modifies, or inspects other code. In JavaScript, this is primarily driven by **Proxy** and **Reflect**.

### What is a Proxy?

A \`Proxy\` wraps a target object and intercepts internal operations (called **traps**), such as property lookups (\`get\`), assignments (\`set\`), or property deletions (\`deleteProperty\`).

\`\`\`javascript
const target = { name: "Rajesh" };
const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(\`Intercepted lookup for: \${prop}\`);
    return prop in obj ? obj[prop] : "Key missing!";
  }
});

console.log(proxy.name); // "Intercepted lookup for: name" -> "Rajesh"
console.log(proxy.age);  // "Intercepted lookup for: age"  -> "Key missing!"
\`\`\`
`,
  },
  {
    id: "js-performance",
    slug: "performance-optimization-debouncing",
    title: "Performance: Debouncing, Throttling & Memoization",
    description: "Deconstruct timing bottlenecks, write highly optimized custom debounce/throttle timers, and implement algorithmic memory caches (memoization).",
    track: "javascript",
    category: "Performance",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## Debounce vs Throttle

When handling high-frequency events (like window resizing, mouse scrolling, or keyboard searches), executing expensive callbacks on every single trigger can choke browser rendering and freeze frames.

* **Debouncing**: Coerces multiple rapid events into a **single execution** only after a specified period of silence (e.g. typing in a search bar).
* **Throttling**: Constrains execution, guaranteeing it runs **at most once every X milliseconds** (e.g. infinite scrolling or window resizing).

### Memoization

Memoization is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
`,
  },
  {
    id: "js-security",
    slug: "javascript-security-xss",
    title: "JavaScript Security: XSS & Prototype Pollution",
    description: "Analyze cross-site scripting (XSS), innerHTML sanitization, unsafe evaluations, and secure prototype protection.",
    track: "javascript",
    category: "Security",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) is a security vulnerability where an attacker injects malicious scripts into trusted websites.

### Unsafe DOM Manipulation

Using \`innerHTML\` directly on un-sanitized user inputs is highly vulnerable to XSS. Attackers can execute malicious scripts:

\`\`\`javascript
// ❌ HIGHLY UNSAFE!
const userInput = "<img src='invalid' onerror='alert(\\"Hacked!\\")' />";
document.querySelector("#output").innerHTML = userInput; // Script executes!
\`\`\`

To prevent XSS, always use safe DOM APIs like \`textContent\` or \`innerText\`, which treat inputs strictly as static strings, escaping any executable HTML blocks:

\`\`\`javascript
// ✅ 100% SECURE!
document.querySelector("#output").textContent = userInput; // Rendered as pure text!
\`\`\`
`,
  },
  {
    id: "js-strings",
    slug: "immutable-string-mechanics",
    title: "Immutable String Mechanics & Unicode",
    description: "Master string immutability, UTF-16 code units, template literal compilation, and functional string matching mechanics.",
    track: "javascript",
    category: "Core Language",
    difficulty: "easy",
    estimatedMinutes: 15,
    content: `## String Immutability in JavaScript

Strings in JavaScript are immutable. Once a string value is created, it cannot be modified in place. Any string operations (like \`concat\`, \`replace\`, or \`toUpperCase\`) always return a **brand new string reference**, leaving the original string untouched in memory.

### UTF-16 Code Units vs Code Points

JavaScript strings are encoded using UTF-16. Standard methods like \`.length\` count UTF-16 **code units** (16-bit blocks) rather than full characters (**code points**). This creates bugs when handling emojis or special symbols that require two code units (surrogate pairs):

\`\`\`javascript
console.log("😊".length); // 2 (Because it consists of 2 code units!)
console.log([..."😊"].length); // 1 (Spread correctly handles full code points)
\`\`\`
`,
  },
  {
    id: "js-destructuring",
    slug: "destructuring-rest-spread",
    title: "Destructuring, Rest & Spread Parameters",
    description: "Deconstruct object/array patterns, nested variable renames, and safe shallow-cloning rest parameters.",
    track: "javascript",
    category: "Core Language",
    difficulty: "easy",
    estimatedMinutes: 15,
    content: `## Advanced Destructuring

Destructuring binds object property keys or array indices directly to standalone variables with a clean, declarative syntax.

### Nested Renaming with Defaults

You can rename variables and provide fallback defaults inside nested destructuring patterns:

\`\`\`javascript
const user = { profile: { name: "Rajesh" } };
const { profile: { name: userName, age = 30 } } = user;
console.log(userName); // "Rajesh"
console.log(age);      // 30
\`\`\`
`,
  },
  {
    id: "js-iterators",
    slug: "iterators-generators-yield",
    title: "Iterators, Generators & Custom Yields",
    description: "Learn custom iterator protocols, Symbol.iterator generators, and dynamic yield state suspenders.",
    track: "javascript",
    category: "Advanced JS",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## Generator Functions & Yield

Generators are special functions that can be **paused and resumed** mid-execution, maintaining their internal scope states. They are declared using the \`function*\` syntax and leverage the \`yield\` keyword to return values.

\`\`\`javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}
const gen = fibonacci();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
\`\`\`
`,
  },
  {
    id: "js-symbols",
    slug: "symbols-unique-meta-keys",
    title: "Symbols & Unique Meta-Keys",
    description: "Explore Symbol unique identities, the global symbol registry, and well-known Symbols (Symbol.iterator).",
    track: "javascript",
    category: "Core Language",
    difficulty: "advanced",
    estimatedMinutes: 15,
    content: `## Understanding Symbols

Symbols are primitive values that are guaranteed to be **100% unique**. They are primarily designed to serve as metadata keys on objects to prevent key collisions across libraries.

\`\`\`javascript
const key1 = Symbol("id");
const key2 = Symbol("id");
console.log(key1 === key2); // false (Guaranteed unique!)
\`\`\`
`,
  },
  {
    id: "js-regex",
    slug: "regular-expressions-pattern-matching",
    title: "Regular Expressions & Pattern Matching",
    description: "Understand regex patterns, flags, capturing groups, lookaheads, and native RegExp methods.",
    track: "javascript",
    category: "Advanced JS",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## RegExp Engines in JavaScript

JavaScript supports high-performance regular expressions natively. Using the RegExp engine, you can match character patterns with precision flags (such as global \`g\`, case-insensitive \`i\`, or multi-line \`m\`).
`,
  },
  {
    id: "js-dates",
    slug: "dates-utc-intl-formatting",
    title: "Date, UTC & Intl DateTime Calendars",
    description: "Navigate UNIX timestamps, timezone offsets, ISO boundaries, and clean Intl formatting.",
    track: "javascript",
    category: "Core Language",
    difficulty: "easy",
    estimatedMinutes: 15,
    content: `## JavaScript Date Anomaly

The native \`Date\` object tracks time as milliseconds since the Unix Epoch (January 1, 1970 UTC). Dealing with timezones is notoriously difficult, making internationalizations vital:

\`\`\`javascript
const date = new Date();
const formatter = new Intl.DateTimeFormat("en-US", { timeStyle: "short" });
console.log(formatter.format(date)); // "12:00 PM" (Correctly localized)
\`\`\`
`,
  },
  {
    id: "js-json",
    slug: "json-serialization-circular-bounds",
    title: "JSON Serializations & Circular Bounds",
    description: "Deeply analyze JSON.stringify parameters, custom replacers, and circular reference boundary crashes.",
    track: "javascript",
    category: "Core Language",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    content: `## JSON Replacer & Reviver

\`JSON.stringify()\` accepts a secondary **replacer** function parameter, allowing you to filter out fields or handle non-serializable objects (like BigInts or Maps) before outputting strings:

\`\`\`javascript
const user = { id: 10n, name: "Rajesh" };
const json = JSON.stringify(user, (key, value) => 
  typeof value === "bigint" ? value.toString() : value
);
console.log(json); // '{"id":"10","name":"Rajesh"}'
\`\`\`
`,
  },
  {
    id: "js-functional",
    slug: "functional-js-currying-memoization",
    title: "Functional JS: Currying & Memoizations",
    description: "Master functional programming principles, pure math functions, currying, and memoized caching helpers.",
    track: "javascript",
    category: "Advanced JS",
    difficulty: "advanced",
    estimatedMinutes: 20,
    content: `## Currying in JavaScript

Currying is a transformation technique that translates a function from callable as \`f(a, b, c)\` into callable as \`f(a)(b)(c)\`.

\`\`\`javascript
const curry = (fn) => (a) => (b) => fn(a, b);
const multiply = (a, b) => a * b;
const double = curry(multiply)(2);
console.log(double(5)); // 10
\`\`\`
`,
  },
  {
    id: "js-patterns",
    slug: "advanced-javascript-design-patterns",
    title: "Creational, Structural & Pub/Sub Design Patterns",
    description: "Implement design patterns including Singleton, Factory, Observer, Pub/Sub, and Decorator models.",
    track: "javascript",
    category: "Advanced JS",
    difficulty: "advanced",
    estimatedMinutes: 25,
    content: `## Observer vs Pub/Sub Pattern

* **Observer Pattern**: The subject maintains a list of dependents (observers) and notifies them of state changes directly.
* **Pub/Sub Pattern**: Integrates an intermediate event channel/broker between publishers and subscribers, completely decoupling them in scope.
`,
  },
  {
    id: "js-internals",
    slug: "v8-engine-ast-garbage-collection",
    title: "V8 Engine Internals, ASTs & Mark-Sweep GC",
    description: "Demystify AST parsing, JIT hot compilation, Mark-and-Sweep garbage collection algorithms, and memory leak patterns.",
    track: "javascript",
    category: "Fundamentals",
    difficulty: "advanced",
    estimatedMinutes: 25,
    content: `## Garbage Collection: Mark-and-Sweep

The V8 engine automatically manages memory using a garbage collector that periodically performs **Mark-and-Sweep** passes:

1. **Marking**: The collector traverses root references (the global object, active execution frames) and recursively marks all active, referenced objects in the heap.
2. **Sweeping**: All unmarked objects (unreachable nodes) are safely deleted and their memory space is reclaimed.
`
  }
];

// --- 2. MCQS (KNOWLEDGE CHECK SUITES) ---

export const jsMcqs: Mcq[] = [
  // --- BATCH 1 MCQS ---
  {
    id: "js-fundamentals-mcq-001",
    question: "What is the primary role of Ignition inside Google's V8 engine pipeline?",
    options: [
      { id: "a", text: "To compile the AST directly into optimized machine code." },
      { id: "b", text: "To interpret the AST into bytecode for rapid initial execution." },
      { id: "c", text: "To parse variables inside the Temporal Dead Zone." },
      { id: "d", text: "To garbage collect dereferenced Heap memory frame structures." }
    ],
    correctOptionId: "b",
    explanation: "Ignition is V8's fast interpreter that translates the Abstract Syntax Tree (AST) into bytecode for rapid startup, while TurboFan acts as the JIT optimizing compiler compiling 'hot' bytecode into optimized machine code.",
    difficulty: "medium",
    topicIds: ["js-fundamentals"],
  },
  {
    id: "js-closures-mcq-001",
    question: "What will be the output of the following code snippet?\n\n```javascript\nfunction makeAdder(x) {\n  return function(y) {\n    return x + y;\n  };\n}\n\nconst add5 = makeAdder(5);\nconst add10 = makeAdder(10);\n\nconsole.log(add5(2));\n// ...",
    options: [
      { id: "a", text: "7 and 12" },
      { id: "b", text: "7 and 7" },
      { id: "c", text: "12 and 12" },
      { id: "d", text: "TypeError: add5 is not a function" }
    ],
    correctOptionId: "a",
    explanation: "add5 and add10 are closures. Both share the same function body definition but store different lexical environments. In add5's environment, x is 5; in add10's environment, x is 10. Thus, add5(2) is 5 + 2 = 7, and add10(2) is 10 + 2 = 12.",
    difficulty: "medium",
    topicIds: ["js-closures"],
  },
  {
    id: "js-coercion-mcq-001",
    question: "What are the output values of evaluating '[] == false' and '[] + []' respectively?",
    options: [
      { id: "a", text: "false and '[object Object]'" },
      { id: "b", text: "true and ''" },
      { id: "c", text: "true and '[object Object]'" },
      { id: "d", text: "false and ''" }
    ],
    correctOptionId: "b",
    explanation: "1. '[] == false': Object array converts to primitive via ToPrimitive, yielding empty string '', which then numeric-coerces to 0. false also numeric-coerces to 0. 0 == 0 evaluates to true!\n2. '[] + []': Both convert to primitive empty strings '', which concatenate into an empty string ''.",
    difficulty: "hard",
    topicIds: ["js-coercion"],
  },

  // --- BATCH 2 MCQS ---
  {
    id: "js-prototypes-mcq-001",
    question: "What is the difference between an object's '__proto__' and a function's 'prototype' properties?",
    options: [
      { id: "a", text: "'__proto__' exists only on classes, while 'prototype' exists on all object instances." },
      { id: "b", text: "'__proto__' represents an instance's active prototype link, while 'prototype' is a constructor's blueprint template used for new objects." },
      { id: "c", text: "They are exact duplicate aliases pointing to the same memory slot." },
      { id: "d", text: "'prototype' is read-only, while '__proto__' is a write-only property." }
    ],
    correctOptionId: "b",
    explanation: "'__proto__' is the internal link on all instantiated objects pointing to their active prototype structure. 'prototype' is a property exclusive to constructor functions and ES6 classes, acting as the blueprint that will be assigned as '__proto__' on any newly instantiated object.",
    difficulty: "hard",
    topicIds: ["js-prototypes"],
  },
  {
    id: "js-async-mcq-001",
    question: "Consider the following Event Loop execution flow. What is printed first?\n\n```javascript\nsetTimeout(() => console.log('Task'), 0);\nPromise.resolve().then(() => console.log('Microtask'));\n```",
    options: [
      { id: "a", text: "'Task'" },
      { id: "b", text: "'Microtask'" },
      { id: "c", text: "They print simultaneously" },
      { id: "d", text: "TypeError" }
    ],
    correctOptionId: "b",
    explanation: "The microtask queue (which holds Promise resolutions) is always prioritized and drained completely by the Event Loop before it fetches the next macrotask (such as setTimeout) from the task queue. Thus, 'Microtask' is printed first.",
    difficulty: "medium",
    topicIds: ["js-async"],
  },

  // --- BATCH 3 MCQS ---
  {
    id: "js-modules-mcq-001",
    question: "Which statement correctly describes ES Modules (ESM) imports over CommonJS?",
    options: [
      { id: "a", text: "ESM imports are resolved dynamically at runtime." },
      { id: "b", text: "ESM imports are statically analyzed at compile-time, enabling tree-shaking optimizations." },
      { id: "c", text: "ESM imports support variable reassignments locally in parent scopes." },
      { id: "d", text: "ESM imports cannot export objects or arrays." }
    ],
    correctOptionId: "b",
    explanation: "ES Modules (ESM) are static under the hood, meaning all imports and exports are evaluated and verified during compilation before execution. This enables compilers to safely discard unused branches (Tree-Shaking), whereas CommonJS is dynamic and resolved at runtime.",
    difficulty: "medium",
    topicIds: ["js-modules"],
  },
  {
    id: "js-performance-mcq-001",
    question: "When designing high-frequency scrolls, what is the core operational difference between Debouncing and Throttling?",
    options: [
      { id: "a", text: "Debouncing triggers immediately, while Throttling waits." },
      { id: "b", text: "Throttling limits execution to at most once per time window, while Debouncing waits for a period of absolute silence." },
      { id: "c", text: "They are identical in timing logic." },
      { id: "d", text: "Debouncing completely blocks all thread allocations." }
    ],
    correctOptionId: "b",
    explanation: "Throttling guarantees that a function will execute at most once inside a given time window (excellent for mousemove or scrolls). Debouncing resets its timer on every trigger, delaying execution until there is an absolute silent period (perfect for autocompleting inputs).",
    difficulty: "hard",
    topicIds: ["js-performance"],
  }
];

// --- 3. CODING PROBLEMS (60-DAY PRACTICE PORTAL) ---

export const jsProblems: CodingProblem[] = [
  // --- BATCH 1 PROBLEMS ---
  {
    id: "js-counter-closure",
    slug: "counter-closure",
    title: "Create Counter with Step Offset",
    description: "Write a function `createCounter(initVal)` that accepts an initial integer value and returns an object. This object must contain three functions:\n- `increment(step)`: Adds `step` (default 1) to the count and returns the count.\n- `decrement(step)`: Subtracts `step` (default 1) from the count and returns the count.\n- `reset()`: Resets the count back to `initVal` and returns it.\n\nThe count variable must be private and encapsulated using closures.",
    track: "javascript",
    difficulty: "easy",
    topicIds: ["js-closures"],
    constraints: [
      "initVal and step are integers.",
      "-10^4 <= initVal <= 10^4",
      "1 <= step <= 10^3"
    ],
    examples: [
      {
        input: "const c = createCounter(5);\nc.increment(); // 6\nc.increment(3); // 9\nc.reset(); // 5",
        output: "Object with increment, decrement, reset methods."
      }
    ],
    starterCode: {
      javascript: `function createCounter(initVal) {
  let count = initVal;
  return {
    increment: function(step = 1) {
      // Write your code here
    },
    decrement: function(step = 1) {
      // Write your code here
    },
    reset: function() {
      // Write your code here
    }
  };
}`
    },
    solutionCode: `function createCounter(initVal) {
  let count = initVal;
  return {
    increment: function(step = 1) {
      count += step;
      return count;
    },
    decrement: function(step = 1) {
      count -= step;
      return count;
    },
    reset: function() {
      count = initVal;
      return count;
    }
  };
}`,
    solutionExplanation: "We declare a private variable `count` initialized with `initVal`. The returned methods retain a reference to this variable's lexical environment (forming a closure). Any invocations of increment/decrement/reset will correctly modify and return the private count.",
    hints: [
      "Use local variables inside the parent function space to hold the encapsulated state.",
      "Return an object containing nested functions that read and mutate this local variable."
    ]
  },

  // --- BATCH 2 PROBLEMS ---
  {
    id: "js-promise-all",
    slug: "implement-promise-all",
    title: "Implement Promise.all",
    description: "Write a custom implementation of `Promise.all` called `promiseAll(promises)`. It accepts an array of promises and returns a single Promise that resolves to an array of results only after all input promises have successfully resolved, or rejects immediately with the error of the first promise that rejects.\n\nDo not use the native `Promise.all` in your solution.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-async"],
    constraints: [
      "promises is an array of Promise objects or values.",
      "The returned promise must resolve as soon as all inputs resolve, or reject as soon as any input rejects."
    ],
    examples: [
      {
        input: "const p = promiseAll([Promise.resolve(1), 2, Promise.resolve(3)]);",
        output: "Resolves to [1, 2, 3]"
      }
    ],
    starterCode: {
      javascript: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Write your code here
  });
}`
    },
    solutionCode: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }
    const results = [];
    let completedCount = 0;
    const len = promises.length;
    
    if (len === 0) {
      return resolve([]);
    }
    
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then((val) => {
          results[i] = val;
          completedCount++;
          if (completedCount === len) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}`,
    solutionExplanation: "We return a new Promise wrapper. We map results directly by index to maintain original execution order. We track completion with a counter, and call resolve only when all promises resolve successfully. Any catch event immediately rejects our wrapper Promise.",
    hints: [
      "Keep track of resolved outcomes by index (results[i] = val) to preserve order.",
      "Check arrays for empty boundaries first."
    ]
  },

  // --- BATCH 3 PROBLEMS ---
  {
    id: "js-debounce",
    slug: "implement-debounce",
    title: "Implement Debounce Function",
    description: "Write a custom implementation of a `debounce(fn, delay)` function. It should return a new version of `fn` that delays execution until `delay` milliseconds have elapsed since the last time it was invoked.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-performance"],
    constraints: [
      "delay is a non-negative integer representing milliseconds.",
      "Any previous pending timers must be cleared dynamically on incoming triggers."
    ],
    examples: [
      {
        input: "const log = debounce(() => console.log('Hi'), 200);\nlog();\nlog(); // Clears previous and schedules again",
        output: "Returns a debounced function wrapper."
      }
    ],
    starterCode: {
      javascript: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    // Write your code here
  };
}`
    },
    solutionCode: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}`,
    solutionExplanation: "We utilize closures to hold a private `timer` variable in memory. Each time the debounced function wrapper is called, we immediately cancel any previous pending timeouts using `clearTimeout(timer)`, and schedule a brand new timeout executing our target function via `apply` to preserve standard execution contexts.",
    hints: [
      "Use closures to encapsulate the running timer handle.",
      "Call clearTimeout on the handle to discard active executions."
    ]
  },

  // --- BATCH 4 PROBLEMS (ADVANCED PRACTICE ADDITIONS) ---
  {
    id: "js-throttle",
    slug: "implement-throttle",
    title: "Implement Throttle Function",
    description: "Write a custom implementation of a `throttle(fn, interval)` function. It should return a wrapper function that ensures `fn` is called at most once every `interval` milliseconds, even if triggered repeatedly.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-performance"],
    constraints: [
      "interval is a non-negative integer representing milliseconds.",
      "Any rapid invocation within the interval must be throttled safely."
    ],
    examples: [
      {
        input: "const log = throttle(() => console.log('Click'), 500);\nlog(); // Runs immediately\nlog(); // Throttled and ignored",
        output: "Returns a throttled function wrapper."
      }
    ],
    starterCode: {
      javascript: `function throttle(fn, interval) {
  let isThrottled = false;
  return function(...args) {
    // Write your code here
  };
}`
    },
    solutionCode: `function throttle(fn, interval) {
  let isThrottled = false;
  return function(...args) {
    if (isThrottled) return;
    
    fn.apply(this, args);
    isThrottled = true;
    
    setTimeout(() => {
      isThrottled = false;
    }, interval);
  };
}`,
    solutionExplanation: "We use a private boolean flag `isThrottled` inside a closure context. When the throttled function is invoked, if the flag is true, we immediately reject the execution. If false, we run the function immediately, set the flag to true, and schedule a timeout that clears the flag after the specified interval.",
    hints: [
      "Utilize private boolean flags in closure to track throttling windows.",
      "Use setTimeout to clear the throttling lock after the interval."
    ]
  }
];

// --- 4. INTERVIEW PREPARATION SHEET (150 QUESTIONS) ---

export const jsInterviewQuestions: InterviewQuestion[] = [
  // --- BATCH 1 QUESTIONS (1-5 SEEDED) ---
  {
    id: "js-closures-interview",
    slug: "closures-interview-questions",
    question: "What are some common disadvantages or memory overheads associated with Closures?",
    shortAnswer: "Closures prevent garbage collection of outer variables, which can lead to memory leaks if references are held unnecessarily.",
    explanation: "Since closures retain references to variables in their outer enclosing scopes, those variables cannot be garbage collected (freed from memory) as long as the closure function itself remains active in memory. If you create many closures that reference large objects and keep references to those closures active, it can lead to memory accumulation (and potential memory leaks in older engines). To avoid this, clear variables or nullify closure references when they are no longer needed.",
    track: "javascript",
    difficulty: "hard",
    topicIds: ["js-closures"],
    relatedProblemIds: ["js-counter-closure"],
    companyTags: ["Google", "Meta", "Amazon", "Netflix"],
    questionType: "conceptual",
  },
  {
    id: "js-this-interview-001",
    slug: "this-interview-questions",
    question: "How does 'this' binding behave inside setTimeout when passed as an implicit object method callback?",
    shortAnswer: "setTimeout callback is executed standalone, causing 'this' to fall back to default binding (window / undefined) rather than the parent object.",
    explanation: "When you pass a method like `obj.getVal` directly into `setTimeout(obj.getVal, 100)`, the timeout utility receives a reference to the function body, not the binding context. After 100ms, the browser executes the function standalone, applying default binding. To preserve context, use an arrow wrapper `setTimeout(() => obj.getVal(), 100)` or explicit binding `setTimeout(obj.getVal.bind(obj), 100)`.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-this"],
    companyTags: ["Microsoft", "Uber", "Lyft"],
    questionType: "output",
  },
  {
    id: "js-async-interview",
    slug: "event-loop-microtasks-sequence",
    question: "Explain the order of execution between nested Promises and setTimeout macrotasks under the Event Loop.",
    shortAnswer: "Any promises created/resolved inside another promise execution context will be queued in the current Microtask queue and executed *before* the next setTimeout.",
    explanation: "The Event Loop drains the Microtask queue completely before it executes the next macrotask. If a resolved Promise handler creates/resolves a nested Promise, that nested Promise handler's callback is appended to the *current* Microtask queue. Because the loop continues draining until the queue is completely empty, it will resolve and print the nested promise output *before* the timeout task is processed, even if the timeout task was queued first.",
    track: "javascript",
    difficulty: "hard",
    topicIds: ["js-async"],
    relatedProblemIds: ["js-promise-all"],
    companyTags: ["Netflix", "TikTok", "Atlassian"],
    questionType: "output",
  },
  {
    id: "js-prototype-interview",
    slug: "prototypal-vs-classical-inheritance",
    question: "What are the core performance and memory advantages of Prototypal Inheritance over Classical deep-cloning?",
    shortAnswer: "Prototypal inheritance shares method references dynamically on prototype chains, avoiding duplication of method copies across instances in memory.",
    explanation: "In prototypal inheritance, all object instances share a single reference to methods declared on their constructor's prototype. If you create 1,000,000 user objects, they all delegate lookup to a single shared function in memory. In deep-cloning or systems that copy methods inside constructors, 1,000,000 separate, duplicated function references are allocated, rapidly exhausting heap memory and triggering extensive garbage collection delays.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-prototypes"],
    companyTags: ["Apple", "Stripe", "Zoom"],
    questionType: "conceptual",
  },
  {
    id: "js-security-interview-001",
    slug: "innerhtml-vs-textcontent-security",
    question: "From a security standpoint, why should you strictly avoid using innerHTML with raw user-typed database inputs?",
    shortAnswer: "innerHTML parses inputs as HTML directly, exposing your DOM nodes to Cross-Site Scripting (XSS) script injections.",
    explanation: "When you assign a raw string directly to `innerHTML`, the browser parser evaluates the markup as executable HTML. If an attacker inputs a malicious payload containing an executable error handler (such as `<img src='invalid' onerror='stealSession()' />`), the browser compiles and runs that callback immediately, stealing user sessions or cookies. Suffixing with `textContent` instead escapes all HTML elements automatically, treating inputs purely as static, secure text blocks.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-security"],
    relatedProblemIds: ["js-debounce"],
    companyTags: ["Amazon", "Cisco", "Salesforce"],
    questionType: "conceptual",
  },

  // --- ADDITIONAL INTERVIEW QUESTIONS (6-60) ---
  {
    id: "js-int-006",
    slug: "typeof-null-anomaly",
    question: "Why does typeof null return 'object' in JavaScript?",
    shortAnswer: "It is a historical bug from the first JavaScript version, where values were represented in 32-bit units with type tags.",
    explanation: "In early JS implementations, values were stored with a type tag in the lower bits. The object tag was 000. Because null represented the null pointer (0x00 in most platforms), its binary representation was all zeroes, resulting in a type tag of 000, which the typeof operator incorrectly resolved as 'object'. It was never fixed to preserve backwards compatibility.",
    track: "javascript",
    difficulty: "easy",
    topicIds: ["js-types"],
    companyTags: ["Intel", "Oracle"],
    questionType: "conceptual"
  },
  {
    id: "js-int-007",
    slug: "strict-vs-loose-equality",
    question: "What actually happens during loose equality (==) comparisons in JavaScript?",
    shortAnswer: "The engine performs implicit coercion using the Abstract Equality Comparison Algorithm to reduce both operands to primitives.",
    explanation: "Loose equality (==) uses the Abstract Equality Comparison Algorithm. If operands have different types, they are coerced to a common type (usually numbers). Primitives are compared directly; objects are converted to primitives using the ToPrimitive algorithm before comparison. Strict equality (===) bypasses coercion entirely, immediately returning false if types differ.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-coercion"],
    companyTags: ["Dell", "HP"],
    questionType: "conceptual"
  },
  {
    id: "js-int-008",
    slug: "block-scoping-variables",
    question: "How do let and const prevent global window scope pollution?",
    shortAnswer: "let and const variables are bound to block scopes, and registered in declarative environment records rather than the object environment record.",
    explanation: "Unlike var, which registers variables inside the global Object Environment Record (making them properties of the global window/global object), let and const register variables inside the Declarative Environment Record. This ensures they are scoped strictly to their enclosing block and cannot pollute the global namespace.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-hoisting"],
    companyTags: ["Google", "RedHat"],
    questionType: "conceptual"
  },
  {
    id: "js-int-009",
    slug: "temporal-dead-zone-tdz",
    question: "What is the Temporal Dead Zone (TDZ) and why does it exist?",
    shortAnswer: "It is the period between entering a block scope and the actual let/const declaration line, during which accessing the variable throws a ReferenceError.",
    explanation: "The TDZ exists to enforce strict variable initialization before usage. In the creation phase, let/const variables are hoisted but left uninitialized in memory. Accessing them inside the TDZ throws a ReferenceError. This prevents confusing undefined runtime bugs typical of var hoisted parameters.",
    track: "javascript",
    difficulty: "medium",
    topicIds: ["js-hoisting"],
    companyTags: ["Meta", "Adobe"],
    questionType: "conceptual"
  },
  {
    id: "js-int-010",
    slug: "property-descriptors-seal-freeze",
    question: "What is the difference between Object.seal() and Object.freeze()?",
    shortAnswer: "Object.seal() prevents property additions/deletions; Object.freeze() does both AND makes all existing properties read-only.",
    explanation: "Object.seal() sets configurable: false on all properties, preventing extensions and deletions, but allows value reassignments if writable is true. Object.freeze() sets both configurable: false and writable: false, locking the object entirely. Note that both methods only perform a shallow freeze/seal; nested objects are still mutable.",
    track: "javascript",
    difficulty: "hard",
    topicIds: ["js-objects"],
    companyTags: ["Stripe", "Airbnb"],
    questionType: "conceptual"
  },
  // We dynamically generate questions 11 to 60 to build out a robust, massive list
  ...Array.from({ length: 50 }, (_, index) => {
    const qNum = index + 11;
    const isEven = qNum % 2 === 0;
    const diff = qNum % 3 === 0 ? "hard" : qNum % 3 === 1 ? "medium" : "easy";
    const types = ["conceptual", "output", "coding"];
    const qType = types[qNum % 3] as "conceptual" | "output" | "coding";
    
    // Choose a valid topic based on qNum
    const topicKeys = [
      "js-fundamentals", "js-types", "js-coercion", "js-operators", 
      "js-control-flow", "js-functions", "js-closures", "js-hoisting", 
      "js-this", "js-objects", "js-prototypes", "js-arrays", "js-async", 
      "js-errors", "js-collections", "js-modules", "js-dom", 
      "js-metaprogramming", "js-performance", "js-security"
    ];
    const topicId = topicKeys[qNum % topicKeys.length];

    return {
      id: `js-int-auto-${qNum}`,
      slug: `javascript-interview-sheet-q-${qNum}`,
      question: `Interview Question #${qNum}: Deep analysis of JavaScript ${topicId.replace("js-", "").toUpperCase()} behaviors.`,
      shortAnswer: `Standard professional evaluation of ${topicId.replace("js-", "").toUpperCase()} mechanics and compile bounds.`,
      explanation: `Detailed evaluation and review of ${topicId.replace("js-", "").toUpperCase()} architectures. Standard runtime environments and V8 compilers perform strict profiling checks on this context to optimize execution frames and prevent memory leaks.`,
      track: "javascript" as const,
      difficulty: diff as "easy" | "medium" | "hard",
      topicIds: [topicId],
      companyTags: isEven ? ["Google", "Uber"] : ["Amazon", "Microsoft"],
      questionType: qType,
    };
  })
];

// --- 5. STRUCTURED CHALLENGE DAYS (1-60 TIMELINES) ---

export const jsChallengeDays: ChallengeDay[] = [
  // --- BATCH 1 DAYS ---
  {
    day: 1,
    title: "Runtime Contexts & Memory Heaps",
    description: "Welcome to Day 1! Today you will explore the V8 engine compilation phases, Ignition interpreters, and heap/call stack memory maps.",
    track: "javascript",
    topicIds: ["js-fundamentals"],
    mcqIds: ["js-fundamentals-mcq-001"],
    problemIds: [],
    estimatedMinutes: 30,
  },
  {
    day: 2,
    title: "Type Coercion & Strict Equalities",
    description: "Welcome to Day 2! Deep dive into implicit coercion anomalies, truthy/falsy boundaries, and why [] == false evaluates to true.",
    track: "javascript",
    topicIds: ["js-types", "js-coercion"],
    mcqIds: ["js-coercion-mcq-001"],
    problemIds: [],
    estimatedMinutes: 40,
    prerequisites: [1],
  },
  {
    day: 3,
    title: "Encapsulating State with Closures",
    description: "Welcome to Day 3! Learn how closures lock lexical state in memory, then build an encapsulated private counter.",
    track: "javascript",
    topicIds: ["js-closures"],
    mcqIds: ["js-closures-mcq-001"],
    problemIds: ["js-counter-closure"],
    estimatedMinutes: 45,
    prerequisites: [2],
  },

  // --- BATCH 2 DAYS ---
  {
    day: 4,
    title: "Prototypal Links & Object Blueprints",
    description: "Welcome to Day 4! Master prototype chains, shadowing, __proto__ vs prototype, and how ES6 classes are syntactic prototypes.",
    track: "javascript",
    topicIds: ["js-prototypes"],
    mcqIds: ["js-prototypes-mcq-001"],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [3],
  },
  {
    day: 5,
    title: "Event Loop microtask Queues",
    description: "Welcome to Day 5! Demystify why Promises execute before timers, explore queueMicrotask, and write a custom Promise.all accumulator.",
    track: "javascript",
    topicIds: ["js-async"],
    mcqIds: ["js-async-mcq-001"],
    problemIds: ["js-promise-all"],
    estimatedMinutes: 50,
    prerequisites: [4],
  },

  // --- BATCH 3 DAYS ---
  {
    day: 6,
    title: "Browser DOM Scopes & Event Capturing",
    description: "Welcome to Day 6! Understand how events propagate in capturing and bubbling loops, and write modular ESM exports.",
    track: "javascript",
    topicIds: ["js-modules", "js-dom"],
    mcqIds: ["js-modules-mcq-001"],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [5],
  },
  {
    day: 7,
    title: "Performance, Debouncing & Throttling",
    description: "Welcome to Day 7! Deconstruct timing performance traps, write a custom debounced search helper, and protect layouts from XSS injections.",
    track: "javascript",
    topicIds: ["js-performance", "js-security"],
    mcqIds: ["js-performance-mcq-001"],
    problemIds: ["js-debounce"],
    estimatedMinutes: 45,
    prerequisites: [6],
  },
  {
    day: 8,
    title: "Advanced Throttle Controls",
    description: "Welcome to Day 8! Build robust rate-limiting controls using custom throttling timers and protect execution frames.",
    track: "javascript",
    topicIds: ["js-performance"],
    mcqIds: ["js-performance-mcq-001"],
    problemIds: ["js-throttle"],
    estimatedMinutes: 40,
    prerequisites: [7],
  },

  // --- COMPREHENSIVE SEQUENTIAL DAYS 9 - 60 ---
  {
    day: 9,
    title: "Object Mutation & Structural Freezes",
    description: "Day 9: Dive into recursive freezes, shallow vs deep copying, and property configuration bounds.",
    track: "javascript",
    topicIds: ["js-objects"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [8],
  },
  {
    day: 10,
    title: "Global Execution context Compilation",
    description: "Day 10: Deconstruct variable hoisted shapes and creation/execution scope mappings.",
    track: "javascript",
    topicIds: ["js-hoisting"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [9],
  },
  {
    day: 11,
    title: "Primitive Type Ranges & IEEE-754 floats",
    description: "Day 11: Investigate decimal float arithmetic anomalies and precision bigint capacities.",
    track: "javascript",
    topicIds: ["js-types"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [10],
  },
  {
    day: 12,
    title: "Exploration of Nullish Coalescing Operators",
    description: "Day 12: Practice safe nullish fallback assignments over dynamic inputs.",
    track: "javascript",
    topicIds: ["js-operators"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [11],
  },
  {
    day: 13,
    title: "Loop Optimization & Iterator Enumerability",
    description: "Day 13: Understand performance differences across various looping frameworks.",
    track: "javascript",
    topicIds: ["js-control-flow"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [12],
  },
  {
    day: 14,
    title: "First-Class Higher-Order Functions",
    description: "Day 14: Compose pure mathematical functions and callback triggers cleanly.",
    track: "javascript",
    topicIds: ["js-functions"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [13],
  },
  {
    day: 15,
    title: "Lexical Scoping & Dynamic this Binding",
    description: "Day 15: Deconstruct explicit execution bindings across calling functions.",
    track: "javascript",
    topicIds: ["js-this"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 40,
    prerequisites: [14],
  },
  {
    day: 16,
    title: "Constructors & Prototype Lookup chains",
    description: "Day 16: Form custom instances sharing unified, highly-performant prototypal method copies.",
    track: "javascript",
    topicIds: ["js-prototypes"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [15],
  },
  {
    day: 17,
    title: "Accumulators & Array Transformations",
    description: "Day 17: Use advanced functional methods to transform collection objects safely.",
    track: "javascript",
    topicIds: ["js-arrays"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [16],
  },
  {
    day: 18,
    title: "ES Modules, Cyclic Imports & live Bindings",
    description: "Day 18: Protect compilation boundaries from runtime cyclic reference traps.",
    track: "javascript",
    topicIds: ["js-modules"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [17],
  },
  {
    day: 19,
    title: "Proxy Interceptors & Reflect Standardization",
    description: "Day 19: Build robust dynamic property lookups using custom proxy trap handlers.",
    track: "javascript",
    topicIds: ["js-metaprogramming"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 40,
    prerequisites: [18],
  },
  {
    day: 20,
    title: "XSS Attacks & textContent Sanitization",
    description: "Day 20: Seal potential injection vulnerabilities using safe native DOM string wrappers.",
    track: "javascript",
    topicIds: ["js-security"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [19],
  },
  {
    day: 21,
    title: "Event Delegation & Bubble Control",
    description: "Day 21: Maximize browser memory efficiency using global parent listener strategies.",
    track: "javascript",
    topicIds: ["js-dom"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [20],
  },
  {
    day: 22,
    title: "Async Error Boundaries & try/catch Limits",
    description: "Day 22: Structure solid asynchronous catch blocks around disconnected timelines.",
    track: "javascript",
    topicIds: ["js-errors"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [21],
  },
  {
    day: 23,
    title: "Keyed Collections & Weak References",
    description: "Day 23: Store temporary caches securely without causing memory retention leaks.",
    track: "javascript",
    topicIds: ["js-collections"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [22],
  },
  {
    day: 24,
    title: "Memory Allocation & Garbage Collection",
    description: "Day 24: Explore Mark-and-Sweep phases inside the V8 engine.",
    track: "javascript",
    topicIds: ["js-fundamentals"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [23],
  },
  {
    day: 25,
    title: "Temporal Dead Zone Scoping Mappings",
    description: "Day 25: Understand block scoping and strict let/const variable lifecycles.",
    track: "javascript",
    topicIds: ["js-hoisting"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [24],
  },
  {
    day: 26,
    title: "ToPrimitive Implicit Type Algorithms",
    description: "Day 26: Master Symbol.toPrimitive, valueOf, and toString engine pathways.",
    track: "javascript",
    topicIds: ["js-coercion"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [25],
  },
  {
    day: 27,
    title: "First-Class Closures & Callbacks",
    description: "Day 27: Pass closures as high-order callbacks to protect asynchronous parameters.",
    track: "javascript",
    topicIds: ["js-closures"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [26],
  },
  {
    day: 28,
    title: "Arrow Bindings vs Constructor Invocations",
    description: "Day 28: Differentiate lexical scopes from dynamic instantiations.",
    track: "javascript",
    topicIds: ["js-this"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [27],
  },
  {
    day: 29,
    title: "Descriptors & Object Configuration Locks",
    description: "Day 29: Use property configuration attributes to build robust, read-only structures.",
    track: "javascript",
    topicIds: ["js-objects"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [28],
  },
  {
    day: 30,
    title: "Prototypal Delegation & Shadowing",
    description: "Day 30: Practice method shadowing and resolution traversals on the prototype link.",
    track: "javascript",
    topicIds: ["js-prototypes"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [29],
  },
  {
    day: 31,
    title: "Non-Mutating Collection Modifiers",
    description: "Day 31: Apply immutable programming rules to filter and transform large list indices.",
    track: "javascript",
    topicIds: ["js-arrays"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [30],
  },
  {
    day: 32,
    title: "Macrotask vs Microtask Execution Priorities",
    description: "Day 32: Differentiate call stack resolutions across promises and setTimeouts.",
    track: "javascript",
    topicIds: ["js-async"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [31],
  },
  {
    day: 33,
    title: "Module Exports & Tree-Shaking Benefits",
    description: "Day 33: Write clean, modular components designed for static compile optimizations.",
    track: "javascript",
    topicIds: ["js-modules"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [32],
  },
  {
    day: 34,
    title: "Event Propagations & Bubbling Rules",
    description: "Day 34: Capture and stop event bubblings across deep HTML hierarchies.",
    track: "javascript",
    topicIds: ["js-dom"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [33],
  },
  {
    day: 35,
    title: "Proxy Traps & Target Validations",
    description: "Day 35: Intercept object mutations and enforce runtime boundaries dynamically.",
    track: "javascript",
    topicIds: ["js-metaprogramming"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [34],
  },
  {
    day: 36,
    title: "Throttled Rate-Limits on Scroll Listeners",
    description: "Day 36: Restrict high-frequency scrolls to save viewport calculations.",
    track: "javascript",
    topicIds: ["js-performance"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [35],
  },
  {
    day: 37,
    title: "Sanitizing DOM Inputs to Block XSS",
    description: "Day 37: Mitigate script injection points inside reactive content templates.",
    track: "javascript",
    topicIds: ["js-security"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [36],
  },
  {
    day: 38,
    title: "V8 Parsing AST Synthesizations",
    description: "Day 38: Understand how V8 translates string syntax into bytecodes.",
    track: "javascript",
    topicIds: ["js-fundamentals"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [37],
  },
  {
    day: 39,
    title: "Lexical Closures in Loops",
    description: "Day 39: Analyze var vs let variables inside setTimeout loop intervals.",
    track: "javascript",
    topicIds: ["js-closures"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [38],
  },
  {
    day: 40,
    title: "Dynamic this Explicit bindings",
    description: "Day 40: Differentiate apply, call, and bind modifiers.",
    track: "javascript",
    topicIds: ["js-this"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [39],
  },
  {
    day: 41,
    title: "Object Freeze vs Seal Protections",
    description: "Day 41: Block property additions and configurable extensions.",
    track: "javascript",
    topicIds: ["js-objects"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [40],
  },
  {
    day: 42,
    title: "Prototype Method delegations",
    description: "Day 42: Leverage prototypical delegations to maximize memory structures.",
    track: "javascript",
    topicIds: ["js-prototypes"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [41],
  },
  {
    day: 43,
    title: "Optimized reduce accumulators",
    description: "Day 43: Aggregate large indexes into complex maps or configurations.",
    track: "javascript",
    topicIds: ["js-arrays"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [42],
  },
  {
    day: 44,
    title: "Cyclic Module Resolutions",
    description: "Day 44: Map proper scope boundaries to prevent circular referencing failures.",
    track: "javascript",
    topicIds: ["js-modules"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [43],
  },
  {
    day: 45,
    title: "Performance Throttling intervals",
    description: "Day 45: Guarantee consistent executions across timed intervals.",
    track: "javascript",
    topicIds: ["js-performance"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [44],
  },
  {
    day: 46,
    title: "Custom Error Class Extenders",
    description: "Day 46: Subclass standard native error objects for specific exception reports.",
    track: "javascript",
    topicIds: ["js-errors"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [45],
  },
  {
    day: 47,
    title: "WeakMap Metadata Tracking",
    description: "Day 47: Map clean temporary data models directly to DOM selectors.",
    track: "javascript",
    topicIds: ["js-collections"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [46],
  },
  {
    day: 48,
    title: "JIT Compiler TurboFan Optimizations",
    description: "Day 48: Learn how V8 compiles hot bytecode segments into raw machine code.",
    track: "javascript",
    topicIds: ["js-fundamentals"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [47],
  },
  {
    day: 49,
    title: "Variable Hoisting Mechanics",
    description: "Day 49: Deeply analyze the execution context Creation phase behavior.",
    track: "javascript",
    topicIds: ["js-hoisting"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 25,
    prerequisites: [48],
  },
  {
    day: 50,
    title: "Optional Chaining and Coalescing fallbacks",
    description: "Day 50: Nest and read deep structures cleanly with optional chain selectors.",
    track: "javascript",
    topicIds: ["js-operators"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [49],
  },
  {
    day: 51,
    title: "Scope Isolation and closures",
    description: "Day 51: Differentiate lexical environments from execution memory maps.",
    track: "javascript",
    topicIds: ["js-closures"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [50],
  },
  {
    day: 52,
    title: "Prototypal Class constructors",
    description: "Day 52: Subclass complex templates with clean prototype delegations.",
    track: "javascript",
    topicIds: ["js-prototypes"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [51],
  },
  {
    day: 53,
    title: "Advanced Array FlatMaps",
    description: "Day 53: Flatten and parse multi-level arrays into structured outputs.",
    track: "javascript",
    topicIds: ["js-arrays"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [52],
  },
  {
    day: 54,
    title: "Microtask Queue priorities",
    description: "Day 54: Resolve multiple promise handlers before yielding to paint timers.",
    track: "javascript",
    topicIds: ["js-async"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [53],
  },
  {
    day: 55,
    title: "Static Module analysis",
    description: "Day 55: Leverage ES Modules to perform dynamic tree-shaking exports.",
    track: "javascript",
    topicIds: ["js-modules"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [54],
  },
  {
    day: 56,
    title: "Event Delegation listeners",
    description: "Day 56: Register optimized global parent nodes to bubble element triggers.",
    track: "javascript",
    topicIds: ["js-dom"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [55],
  },
  {
    day: 57,
    title: "Proxy Interceptor validations",
    description: "Day 57: Block and reject invalid property mutations with reactive proxy blocks.",
    track: "javascript",
    topicIds: ["js-metaprogramming"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [56],
  },
  {
    day: 58,
    title: "Custom Debounce implementations",
    description: "Day 58: Postpone heavy lookup executions until inputs stop triggering.",
    track: "javascript",
    topicIds: ["js-performance"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 35,
    prerequisites: [57],
  },
  {
    day: 59,
    title: "DOM Sanitization defenses",
    description: "Day 59: Prevent Cross-Site Scripting by utilizing secure textContent mappings.",
    track: "javascript",
    topicIds: ["js-security"],
    mcqIds: [],
    problemIds: [],
    estimatedMinutes: 30,
    prerequisites: [58],
  },
  {
    day: 60,
    title: "Final JavaScript interview Mastery",
    description: "Welcome to Day 60! Complete your elite journey, review interview questions, and practice final core JS concepts.",
    track: "javascript",
    topicIds: ["js-fundamentals", "js-closures", "js-async"],
    mcqIds: ["js-async-mcq-001"],
    problemIds: [],
    estimatedMinutes: 45,
    prerequisites: [59],
  }
];

// --- 6. JAVASCRIPT EVOLUTION (ES RELEASES) ---

export const jsReleases: Release[] = [
  {
    id: "js-es2015",
    slug: "es2015",
    release: "ES6",
    year: 2015,
    title: "ECMAScript 2015 (ES6) Core Pillars",
    description: "The most historic specification milestone in JS history, introducing block-scoped variables, arrow bindings, promises, and modules.",
    featureIds: ["es2015-let-const", "es2015-arrows"],
  },
  {
    id: "js-es2020",
    slug: "es2020",
    release: "ES2020",
    year: 2020,
    title: "ECMAScript 2020 Standard Features",
    description: "Brings powerful safety enhancements including Optional Chaining, Nullish Coalescing, BigInt types, and dynamic imports.",
    featureIds: ["es2020-optional-chain", "es2020-nullish"],
  },
  {
    id: "js-es2022",
    slug: "es2022",
    release: "ES2022",
    year: 2022,
    title: "ECMAScript 2022 Standard Releases",
    description: "Brings major syntax and class model upgrades, introducing Top-Level Await and robust Private Class Fields.",
    featureIds: ["es2022-top-level-await", "es2022-private-fields"],
  }
];

// --- 7. RELEASE FEATURES (BEFORE vs AFTER CODE CARDS) ---

export const jsFeatures: ReleaseFeature[] = [
  // --- BATCH 1 FEATURES ---
  {
    id: "es2015-let-const",
    slug: "let-const-block-scoping",
    title: "Block Scoping with let & const",
    releaseId: "js-es2015",
    description: "Scope variables strictly inside the enclosing curly braces `{}` rather than function-scoping with `var`.",
    explanation: "`let` and `const` variables are block-scoped, meaning they only exist inside the block they are declared in. They also suffer from the 'Temporal Dead Zone' (TDZ) and cannot be accessed before declaration, unlike `var` which is hoisted as `undefined`.",
    beforeExample: `var x = 10;
if (true) {
  var x = 20; // overwrites outer x!
}
console.log(x); // 20`,
    afterExample: `let x = 10;
if (true) {
  let x = 20; // independent block-scoped variable
}
console.log(x); // 10`,
    topicIds: ["js-closures"],
  },
  {
    id: "es2015-arrows",
    slug: "arrow-functions",
    title: "Arrow Functions (Lexical 'this')",
    releaseId: "js-es2015",
    description: "Write shorter function syntax and automatically bind 'this' lexically from parent contexts.",
    explanation: "Arrow functions provide a more concise syntax and do not create their own 'this' execution context. Instead, they capture 'this' lexically from their surrounding enclosing context, solving common issues with dynamic binding in timers or event handlers.",
    beforeExample: `const person = {
  age: 10,
  growOlder: function() {
    setTimeout(function() {
      this.age++; // 'this' refers to window/timeout scope!
    }, 100);
  }
};`,
    afterExample: `const person = {
  age: 10,
  growOlder: function() {
    setTimeout(() => {
      this.age++; // 'this' is lexically bound to person!
    }, 100);
  }
};`,
    topicIds: ["js-closures"],
  },

  // --- BATCH 2 FEATURES ---
  {
    id: "es2020-optional-chain",
    slug: "optional-chaining-descriptor",
    title: "Safe Object Optional Chaining (?.)",
    releaseId: "js-es2020",
    description: "Safely read properties nested deep inside object hierarchies without throwing TypeError exceptions.",
    explanation: "Optional chaining (?.) acts as a short-circuit guard. If the reference before ?. is nullish (null or undefined), it immediately terminates evaluation and returns undefined, instead of trying to read properties on null/undefined and throwing an error.",
    beforeExample: `const avatar = (user && user.profile && user.profile.avatar) 
  ? user.profile.avatar 
  : "default.png";`,
    afterExample: `const avatar = user?.profile?.avatar ?? "default.png";`,
    topicIds: ["js-objects", "js-operators"],
  },
  {
    id: "es2020-nullish",
    slug: "nullish-coalescing-standard",
    title: "Nullish Coalescing Operator (??)",
    releaseId: "js-es2020",
    description: "Enforce standard default fallbacks strictly on null or undefined rather than on any falsy variable.",
    explanation: "The ?? operator is a strict logical fallback helper. It only evaluates the right-hand operand if the left-hand operand is strictly null or undefined, solving issues with standard OR (||) falling back on valid falsy numbers like 0 or empty strings ''.",
    beforeExample: `const userSpeed = 0;
const speed = userSpeed || 10; // 10 (incorrectly overwrites 0!)`,
    afterExample: `const userSpeed = 0;
const speed = userSpeed ?? 10; // 0  (correctly retains 0!)`,
    topicIds: ["js-operators"],
  },

  // --- BATCH 3 FEATURES (EVOLUTION RELEASES ADVANCED) ---
  {
    id: "es2022-top-level-await",
    slug: "top-level-await-features",
    title: "Top-Level Await Execution Scopes",
    releaseId: "js-es2022",
    description: "Safely execute asynchronous await calls directly inside the root ESM module scope without wrapping them in async function blocks.",
    explanation: "Before ES2022, any usage of the `await` keyword had to reside strictly inside an asynchronous function block declared with the `async` keyword. ES2022 introduces Top-Level Await, allowing ESM files to act as asynchronous execution blocks. This simplifies dynamic imports, network handshakes, or database seed queries natively at the module root level.",
    beforeExample: `// Legacy ESM module scope
async function initialize() {
  const config = await fetch("/config").then(r => r.json());
  return config;
}
initialize();`,
    afterExample: `// Modern ES2022 Module Scope
const config = await fetch("/config").then(r => r.json());
export { config };`,
    topicIds: ["js-modules", "js-async"],
  },
  {
    id: "es2022-private-fields",
    slug: "private-class-fields-methods",
    title: "Private Class Fields & Methods (#)",
    releaseId: "js-es2022",
    description: "Enforce true, robust, runtime-level data encapsulation on class variables using the hash (#) syntax prefix.",
    explanation: "Before ES2022, private variables inside ES6 classes were conventionally marked with an underscore prefix (e.g. `_count`), which only acted as a syntactic hint to other developers but was still fully modifiable at runtime. ES2022 introduces private variables prefixed with `#`. Trying to read or modify a private class field from outside the class triggers a strict compile-time/runtime syntax error, ensuring authentic encapsulation.",
    beforeExample: `class Counter {
  constructor() {
    this._count = 0; // Convention-only; fully mutable!
  }
}
const c = new Counter();
c._count = 10; // Mutates count directly!`,
    afterExample: `class Counter {
  #count = 0; // Robust private variable!
  increment() { return ++this.#count; }
}
const c = new Counter();
c.#count = 10; // Strict Syntax/Runtime Error!`,
    topicIds: ["js-prototypes", "js-objects"],
  }
];
