import { JavaScriptChallenge } from "../../types";

export const javascriptChallenges: JavaScriptChallenge[] = [
  {
    id: "coercion-array-equality",
    category: "Type Coercion",
    difficulty: "medium",
    question: "What is the output of the following equality check?",
    code: `console.log([] == false);`,
    options: [
      { id: "true", label: "true" },
      { id: "false", label: "false" },
      { id: "undefined", label: "undefined" },
      { id: "error", label: "TypeError" },
    ],
    correctAnswer: "true",
    explanation:
      "When comparing an array to a boolean with loose equality `==`, JavaScript uses type coercion. First, the boolean `false` is coerced to a number (`0`). Then, the array `[]` is coerced to a primitive. Since `[].toString()` is empty string `''`, it is further coerced to the number `0`. Finally, `0 == 0` evaluates to `true`.",
  },
  {
    id: "typeof-array",
    category: "Types",
    difficulty: "easy",
    question: "What is logged when checking the type of an array?",
    code: `console.log(typeof []);`,
    options: [
      { id: "array", label: '"array"' },
      { id: "object", label: '"object"' },
      { id: "null", label: '"null"' },
      { id: "undefined", label: '"undefined"' },
    ],
    correctAnswer: "object",
    explanation:
      "In JavaScript, arrays are structural objects. The `typeof` operator returns `'object'` for arrays, objects, and even `null`. To properly check if a value is an array, you should use `Array.isArray(value)`.",
  },
  {
    id: "event-loop-async",
    category: "Event Loop",
    difficulty: "hard",
    question: "In what order will the letters be logged to the console?",
    code: `setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => console.log("B"));

console.log("C");`,
    options: [
      { id: "abc", label: "A -> B -> C" },
      { id: "cab", label: "C -> A -> B" },
      { id: "cba", label: "C -> B -> A" },
      { id: "bca", label: "B -> C -> A" },
    ],
    correctAnswer: "cba",
    explanation:
      "First, `console.log('C')` runs synchronously in the call stack. Next, `Promise.resolve().then()` registers its callback in the **Microtask Queue** (which takes high priority). `setTimeout` registers its callback in the **Macrotask Queue**. Once the call stack is empty, microtasks run first, logging 'B', and then macrotasks run, logging 'A'.",
  },
  {
    id: "closure-loop-var",
    category: "Closures",
    difficulty: "medium",
    question: "What is printed when this loop executes?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
    options: [
      { id: "012", label: "0, 1, 2" },
      { id: "333", label: "3, 3, 3" },
      { id: "222", label: "2, 2, 2" },
      { id: "error", label: "ReferenceError" },
    ],
    correctAnswer: "333",
    explanation:
      "Because `var` is function-scoped (or globally scoped here) rather than block-scoped, there is only one shared variable `i` for all iterations. By the time the `setTimeout` callbacks execute, the loop has completed, and the value of `i` has become `3`. Using `let` instead of `var` would create a new block-scoped variable for each iteration, logging 0, 1, 2.",
  },
  {
    id: "floating-point",
    category: "Arithmetic",
    difficulty: "easy",
    question: "What is the result of this floating-point comparison?",
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: [
      { id: "true", label: "true" },
      { id: "false", label: "false" },
      { id: "null", label: "null" },
      { id: "error", label: "TypeError" },
    ],
    correctAnswer: "false",
    explanation:
      "JavaScript represents numbers using 64-bit binary floating-point format (IEEE 754). Decimals like `0.1` and `0.2` cannot be represented perfectly in binary, resulting in tiny rounding errors. `0.1 + 0.2` actually equals `0.30000000000000004`, which is not strictly equal to `0.3`.",
  },
  {
    id: "arrow-this",
    category: "this Binding",
    difficulty: "medium",
    question: "What is the output when calling both greet functions?",
    code: `const obj = {
  name: "Rajesh",
  greet1() {
    console.log(this.name);
  },
  greet2: () => {
    console.log(this.name);
  }
};

obj.greet1();
obj.greet2();`,
    options: [
      { id: "both", label: '"Rajesh" and "Rajesh"' },
      { id: "greet1", label: '"Rajesh" and undefined (or window.name)' },
      { id: "greet2", label: 'undefined and "Rajesh"' },
      { id: "error", label: "TypeError" },
    ],
    correctAnswer: "greet1",
    explanation:
      "Regular methods (like `greet1`) have their `this` dynamically bound to the calling object (`obj`). Arrow functions (like `greet2`) do not have their own `this` binding; instead, they lexically inherit `this` from their outer scope. At the module/global scope level, `this` refers to the global object (or `undefined` in strict mode), where `name` does not exist.",
  },
  {
    id: "hoisting",
    category: "Hoisting",
    difficulty: "medium",
    question: "What is logged when referencing variables before assignment?",
    code: `console.log(a);
console.log(b);

var a = 1;
let b = 2;`,
    options: [
      { id: "undef-undef", label: "undefined and undefined" },
      { id: "undef-error", label: "undefined and ReferenceError" },
      { id: "error-error", label: "ReferenceError and ReferenceError" },
      { id: "1-2", label: "1 and 2" },
    ],
    correctAnswer: "undef-error",
    explanation:
      "Variables declared with `var` are hoisted and initialized with `undefined`. Variables declared with `let` (and `const`) are also hoisted, but they are not initialized. They remain in the **Temporal Dead Zone (TDZ)** from the start of the block until the declaration is evaluated. Referencing them early throws a `ReferenceError`.",
  },
  {
    id: "plus-coercion",
    category: "Type Coercion",
    difficulty: "easy",
    question: "What is logged when executing these expressions?",
    code: `console.log("1" + 2);
console.log(+"1" + 2);`,
    options: [
      { id: "12-3", label: '"12" and 3' },
      { id: "3-3", label: "3 and 3" },
      { id: "12-12", label: '"12" and "12"' },
      { id: "error", label: "TypeError" },
    ],
    correctAnswer: "12-3",
    explanation:
      "In the first expression, the `+` operator acts as string concatenation because one operand is a string, producing `'12'`. In the second expression, the unary `+` prefix `+\"1\"` acts as a numeric coercion, converting '1' to the number 1. Then, `1 + 2` is evaluated as standard math, producing `3`.",
  },
  {
    id: "object-keys",
    category: "Objects",
    difficulty: "medium",
    question: "What value is logged from obj[b]?",
    code: `const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
    options: [
      { id: "123", label: "123" },
      { id: "456", label: "456" },
      { id: "undefined", label: "undefined" },
      { id: "error", label: "TypeError" },
    ],
    correctAnswer: "456",
    explanation:
      "In JavaScript, standard object keys are strings. When passing an object as a key (like `a[b]`), the object is automatically coerced to a string by calling its `toString()` method, yielding `'[object Object]'`. Both `a[b]` and `a[c]` write to the same key `'[object Object]'`, meaning `a[c] = 456` overwrites the value `123` with `456`.",
  },
  {
    id: "comma-operator",
    category: "Syntax",
    difficulty: "hard",
    question: "What is the final value assigned to variable x?",
    code: `let x = (1, 2, 3);
console.log(x);`,
    options: [
      { id: "1", label: "1" },
      { id: "3", label: "3" },
      { id: "error", label: "SyntaxError" },
      { id: "array", label: "[1, 2, 3]" },
    ],
    correctAnswer: "3",
    explanation:
      "The comma operator `,` evaluates each of its operands from left to right and returns the value of the last operand. In the grouped expression `(1, 2, 3)`, first `1` is evaluated, then `2`, then `3`, and finally `3` is returned and assigned to `x`.",
  },
];
