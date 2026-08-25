import { QuizChallenge } from "../../types";

export const vitalsChallenges: QuizChallenge[] = [
  {
    id: "vitals-lcp",
    category: "LCP (Largest Contentful Paint)",
    difficulty: "easy",
    question: "A client lands on a portfolio page. The hero banner image takes 5.4 seconds to load (yielding a failing LCP). Which optimization represents the fastest, most effective way to lower LCP?",
    code: `<!-- Hero layout -->
<div>
  <h1>Welcome to my website</h1>
  <img src="/images/high-res-raw-hero.png" />
</div>`,
    options: [
      { id: "wrong-1", label: "Convert the image to a low-quality .gif animation." },
      { id: "correct", label: "Compress to next-gen WebP/AVIF format, set dimensions, and add 'fetchpriority=\"high\"'." },
      { id: "wrong-2", label: "Add the 'loading=\"lazy\"' attribute to the hero image tag." },
      { id: "wrong-3", label: "Convert the image into a Base64 string embedded in inline CSS." },
    ],
    correctAnswer: "correct",
    explanation:
      "Largest Contentful Paint (LCP) tracks render speed for the largest block on the screen (often a hero image). Setting `fetchpriority=\"high\"` prompts the browser to fetch the image immediately, rather than waiting for layout tree compilation. Compression toAVIF/WebP shrinks byte size. Note: NEVER lazy load hero images—lazy loading explicitly delays fetch operations, hurting LCP!"
  },
  {
    id: "vitals-cls",
    category: "CLS (Cumulative Layout Shift)",
    difficulty: "medium",
    question: "A top-banner advertisement loads lazily above your page content. When it pops in, it pushes the blog text down by 200px. What is the correct way to stop this Cumulative Layout Shift?",
    code: `<!-- Top Banner Container -->
<div className="advertisement-wrapper">
  {isAdLoaded && <AdComponent />}
</div>`,
    options: [
      { id: "wrong-1", label: "Transition the Ad component entrance using a slow 2-second CSS opacity fade." },
      { id: "correct", label: "Provide a fixed aspect-ratio/min-height on the parent wrapper class before the ad hydrates." },
      { id: "wrong-2", label: "Apply 'position: absolute' to the main blog content below the wrapper." },
      { id: "wrong-3", label: "Load the ad inside a separate React iframe container." },
    ],
    correctAnswer: "correct",
    explanation:
      "Cumulative Layout Shift (CLS) measures layout instability. Shifting content by injecting lazy elements causes poor user experiences. Providing a reserved placeholder space (e.g. `<div className=\"min-h-[200px]\">`) holds the space open, so when the ad pops in, no surrounding content shifts, keeping CLS at a perfect 0."
  },
  {
    id: "vitals-inp",
    category: "INP (Interaction to Next Paint)",
    difficulty: "hard",
    question: "A user clicks a toggle button on a dashboard. The browser freezes for 350ms (failing INP limits) before updating the active highlight. What is causing this interaction block?",
    code: `function ToggleButton() {
  const handleToggle = () => {
    // 1. Instantly trigger state update
    setToggle(!toggle);
    // 2. Execute sync heavy array filters
    runHeavySyncBlockingLoop(); 
  };
  return <button onClick={handleToggle}>Toggle</button>;
}`,
    options: [
      { id: "wrong-1", label: "Replace the standard onClick trigger with onMouseEnter." },
      { id: "correct", label: "Wrap the heavy sync loop in 'startTransition' or yield to the browser main thread using setTimeout." },
      { id: "wrong-2", label: "Change the state handler to use standard document cookie variables." },
      { id: "wrong-3", label: "Use CSS hardware-accelerated transforms inside the toggle class." },
    ],
    correctAnswer: "correct",
    explanation:
      "Interaction to Next Paint (INP) measures the latency of all user interactions. If a click triggers a synchronous, long-running JavaScript task (like a heavy loop), the main thread remains blocked and cannot paint the next visual frame, causing jank. Yielding the main thread (using `setTimeout`, Web Workers, or React 18's `startTransition`) lets the paint update immediately, solving INP delay."
  },
  {
    id: "vitals-cls-images",
    category: "CLS (Cumulative Layout Shift)",
    difficulty: "easy",
    question: "You render a list of blog card images. As images load, cards jump from 0px height to 200px height. What classic markup mistake causes this CLS error?",
    code: `<img src="/images/blog-card.png" className="w-full h-auto" />`,
    options: [
      { id: "no-size", label: "Omitting explicit 'width' and 'height' aspect attributes on the image tag." },
      { id: "wrong-1", label: "Failing to apply border radius rounding parameters." },
      { id: "wrong-2", label: "Omitting lazy load directives on image list elements." },
      { id: "wrong-3", label: "Rendering images without standard shadow wrapper overlays." },
    ],
    correctAnswer: "no-size",
    explanation:
      "When you define `width` and `height` attributes on standard `<img>` nodes (even if styled with responsive classes like `w-full h-auto`), modern browsers calculate the visual aspect ratio *before* bytes download. This lets the browser reserve the correct layout box dimensions instantly, preventing shifts when the image loads."
  }
];
