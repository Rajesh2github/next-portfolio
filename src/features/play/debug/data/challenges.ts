import { DetectiveChallenge } from "../../types";

export const debugChallenges: DetectiveChallenge[] = [
  {
    id: "state-mutation-loop",
    title: "Case #1: The Missing State Render",
    description: "An itemized listing component doesn't update the UI when the user clicks 'Add Item'—even though logging confirms items are being added to the array.",
    difficulty: "easy",
    symptom: "Clicking 'Add Item' button logs array contents but does not trigger a visual update in the render list.",
    code: `export default function ItemList() {
  const [items, setItems] = useState(["Apple", "Banana"]);

  const handleAddItem = () => {
    // Adding new item to the inventory list
    items.push("Orange");
    console.log("Current inventory:", items);
  };

  return (
    <div>
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}`,
    consoleLogs: [
      "Current inventory: ['Apple', 'Banana', 'Orange']",
      "Current inventory: ['Apple', 'Banana', 'Orange', 'Orange']",
      "⚠️ [React] Render count: 1 (Warning: state updates did not trigger re-render)"
    ],
    options: [
      { id: "wrong-1", label: "Change items to 'let items = [...]' instead of using useState.", correct: false },
      { id: "correct", label: "Use setter function with shallow copy: 'setItems([...items, \"Orange\"])'.", correct: true },
      { id: "wrong-2", label: "Call 'setItems(items)' right after doing 'items.push(\"Orange\")'.", correct: false },
      { id: "wrong-3", label: "Wrap 'items.push' inside a React 'useMemo' hook to force memoization.", correct: false }
    ],
    explanation:
      "React relies on reference equality to detect state changes. When you do `items.push()`, you directly mutate the original array reference. Since the reference of `items` remains the same, React's virtual DOM reconciliation skips re-rendering. Creating a new array reference via shallow copy `[...items, 'Orange']` and passing it to `setItems` notifies React that state has indeed changed, prompting a UI update."
  },
  {
    id: "z-index-stacking",
    title: "Case #2: The Hidden Modal Layer",
    description: "A developer added a feedback modal with 'z-index: 9999', but the modal remains partially hidden behind the static website header which only has 'z-index: 10'.",
    difficulty: "medium",
    symptom: "Feedback Modal modal-backdrop and elements are clipped and hidden beneath the main Header navigation banner.",
    code: `// Global CSS Styles
.header-navigation {
  position: fixed;
  top: 0;
  z-index: 10;
}

.parent-wrapper {
  opacity: 0.99; /* Opacity filter is applied */
}

.feedback-modal {
  position: absolute;
  z-index: 9999; /* Higher z-index than header! */
}`,
    consoleLogs: [
      "🖥️ Viewport Layout Tree computed.",
      "⚠️ CSS Layout Warning: .parent-wrapper created a new stacking context due to 'opacity' property."
    ],
    options: [
      { id: "wrong-1", label: "Increase '.feedback-modal' z-index to 999999.", correct: false },
      { id: "wrong-2", label: "Change '.feedback-modal' position from 'absolute' to 'static'.", correct: false },
      { id: "correct", label: "Move the modal outside '.parent-wrapper' (or remove opacity) to break out of the local stacking context.", correct: true },
      { id: "wrong-3", label: "Add 'z-index: 10000' to the '.parent-wrapper' selector.", correct: false }
    ],
    explanation:
      "A z-index only works relative to elements in the *same* Stacking Context. Properties like `opacity` (< 1), `transform`, or `filter` on a parent (like `.parent-wrapper`) automatically generate a brand new stacking context. This locks the modal's z-index inside the parent boundary. Moving the modal outside of that container (or using React Portals to render it at body root) lets it align with the global stacking context, resolving the overlap."
  },
  {
    id: "infinite-effect-loop",
    title: "Case #3: The Server Flood Loop",
    description: "A dashboard page suddenly crashes or hangs after loading. The backend server reports a massive flood of incoming API requests originating from this single user.",
    difficulty: "hard",
    symptom: "Network connection is choked. Server receives endless duplicate GET calls to fetch analytics data.",
    code: `export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch analytics payload from API
    fetch("/api/dashboard-analytics")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      });
  });

  return <p>Analytics metric: {data?.visits}</p>;
}`,
    consoleLogs: [
      "🖥️ Dashboard loaded.",
      "⚠️ [Console] Rendering metrics panel...",
      "⚠️ [Console] Rendering metrics panel...",
      "⚠️ [Console] Rendering metrics panel...",
      "🛑 [Chrome] Warning: Script execution taking too long. Memory usage climbing."
    ],
    networkRequests: [
      { url: "/api/dashboard-analytics", method: "GET", status: 200, response: "{ visits: 5420 }" },
      { url: "/api/dashboard-analytics", method: "GET", status: 200, response: "{ visits: 5420 }" },
      { url: "/api/dashboard-analytics", method: "GET", status: 200, response: "{ visits: 5420 }" },
      { url: "/api/dashboard-analytics", method: "GET", status: 200, response: "{ visits: 5420 }" },
      { url: "/api/dashboard-analytics", method: "GET", status: 200, response: "{ visits: 5420 }" }
    ],
    options: [
      { id: "wrong-1", label: "Change fetch from 'useEffect' to 'useLayoutEffect'.", correct: false },
      { id: "correct", label: "Add an empty dependency array '[]' as the second parameter to 'useEffect'.", correct: true },
      { id: "wrong-2", label: "Wrap the fetch block inside a 'useCallback' wrapper.", correct: false },
      { id: "wrong-3", label: "Remove the 'setData(resData)' state setter call from the callback promise.", correct: false }
    ],
    explanation:
      "By default, a `useEffect` block with no dependency array runs on *every single render*. Inside this effect, calling `setData()` updates the component state. Updating state triggers a re-render. Re-rendering runs the effect again, which fetches and calls `setData` again, resulting in an infinite API fetch loop. Adding `[]` as the second argument restricts the effect to run exactly once (when the component mounts)."
  },
  {
    id: "event-bubble-leak",
    title: "Case #4: The Ghost Button Click",
    description: "A clickable cards wrapper holds a 'Favorite' button inside it. When the user clicks the nested 'Favorite' button, the item favorites successfully but the page also redirects them to the card details page.",
    difficulty: "medium",
    symptom: "Clicking a child action button bubbles up and executes the parent container click handler.",
    code: `export default function ProductCard({ product }) {
  const handleCardClick = () => {
    // Navigate to full details page
    window.location.href = \`/products/\${product.id}\`;
  };

  const handleFavoriteClick = () => {
    // Toggle favorite state
    toggleFavorite(product.id);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <h3>{product.name}</h3>
      <button onClick={handleFavoriteClick}>❤️ Favorite</button>
    </div>
  );
}`,
    consoleLogs: [
      "⚡ Dispatching: favorite product #12",
      "🌐 Navigating: product detail page (/products/12)",
      "⚠️ [Router] Warning: Multiple navigation requests triggered concurrently."
    ],
    options: [
      { id: "wrong-1", label: "Remove 'onClick' from the parent 'div' element.", correct: false },
      { id: "wrong-2", label: "Wrap 'handleFavoriteClick' inside a React transition hook.", correct: false },
      { id: "correct", label: "Call 'e.stopPropagation()' in the nested button's click handler.", correct: true },
      { id: "wrong-3", label: "Change parent trigger from 'onClick' to 'onDoubleClick'.", correct: false }
    ],
    explanation:
      "In the DOM, events 'bubble up' from children to parents. When the button is clicked, the click event fires on the button first, and then propagates up to the product-card `div`, executing the parent's navigation handler as well. Calling `e.stopPropagation()` inside the button's handler prevents the click event from climbing further up the tree, securing the boundary."
  }
];
