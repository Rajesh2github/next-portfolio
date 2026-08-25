import { QuizChallenge } from "../../types";

export const reactChallenges: QuizChallenge[] = [
  {
    id: "state-batching",
    category: "React State",
    difficulty: "medium",
    question: "What is the final value of the 'count' state after the button click is processed?",
    code: `export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}`,
    options: [
      { id: "1", label: "1" },
      { id: "3", label: "3" },
      { id: "0", label: "0" },
      { id: "rerender", label: "Causes infinite re-renders" },
    ],
    correctAnswer: "1",
    explanation:
      "React batches state updates that happen inside the same event handler. When `handleClick` runs, the value of `count` is still `0` for all three calls. The updates resolve to `setCount(0 + 1)` three times. The final state is set to `1` on the next render. To increment sequentially, you should use the updater function syntax: `setCount(prev => prev + 1)`."
  },
  {
    id: "effect-dependencies",
    category: "React Effects",
    difficulty: "medium",
    question: "A search dashboard fetches results on input changes. What is wrong with this useEffect configuration?",
    code: `useEffect(() => {
  fetch(\`/api/search?q=\${query}\`)
    .then((res) => res.json())
    .then((data) => setResults(data));
}, []); // Empty dependencies`,
    options: [
      { id: "loop", label: "It creates an infinite rendering loop." },
      { id: "no-trigger", label: "The fetch only runs once on mount and will never run when 'query' changes." },
      { id: "wrong-syntax", label: "The fetch call must be wrapped in useMemo." },
      { id: "error", label: "It triggers a server-side syntax crash." },
    ],
    correctAnswer: "no-trigger",
    explanation:
      "The dependency array `[]` tells React to run the effect *only once* after the component mounts. Because the `query` state is omitted from the dependency array, when `query` changes, the effect will NOT re-run, resulting in stale dashboard metrics. To fix this, add `query` to the dependency array: `[query]`."
  },
  {
    id: "stale-closures",
    category: "React Hooks",
    difficulty: "hard",
    question: "Inside this custom click handler, what count value is printed in the alert after the user clicks the button once and waits 3 seconds?",
    code: `export default function AlertCounter() {
  const [count, setCount] = useState(0);

  const showAlert = () => {
    setTimeout(() => {
      alert("Current Count: " + count);
    }, 3000);
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={showAlert}>Show Alert</button>
    </div>
  );
}`,
    options: [
      { id: "stale", label: "The value of count when 'Show Alert' was clicked (stale closure)." },
      { id: "latest", label: "The latest count value, including any increments during the 3 seconds." },
      { id: "error", label: "Throws a null ref render error." },
      { id: "undefined", label: "Alert displays 'Current Count: undefined'." },
    ],
    correctAnswer: "stale",
    explanation:
      "This is a classic 'stale closure' issue in React. Functions inside components close over scope variables (like state `count`) during render. When `showAlert` is called, it schedules a timeout using the snapshot value of `count` at that specific render. Even if you click 'Increment' during the 3 seconds, the timeout callback still reads the old snapshot. To read the latest state, use a React ref (`useRef`) to capture updates."
  },
  {
    id: "composition-renders",
    category: "React Rendering",
    difficulty: "hard",
    question: "When Parent state 'text' updates, does the heavy child component <ExpensiveChild /> re-render?",
    code: `function Parent() {
  const [text, setText] = useState("");
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ExpensiveChild />
    </div>
  );
}`,
    options: [
      { id: "yes", label: "Yes, it re-renders on every keystroke in the input." },
      { id: "no", label: "No, because it doesn't receive any props." },
      { id: "maybe", label: "Only if text matches child keys." },
      { id: "memo", label: "No, Next.js automatically memoizes children." },
    ],
    correctAnswer: "yes",
    explanation:
      "Whenever a component's state changes, React re-renders that component *and all of its nested children recursively*, regardless of whether those children receive any props! Because `<ExpensiveChild />` is declared inside `Parent`, it re-renders on every keystroke. To prevent this, you should wrap the child in `React.memo` or extract the input state into a smaller wrapper component."
  }
];
