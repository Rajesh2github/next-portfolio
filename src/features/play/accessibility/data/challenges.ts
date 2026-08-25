import { DetectiveChallenge } from "../../types";

export const accessibilityChallenges: DetectiveChallenge[] = [
  {
    id: "unsemantic-button",
    title: "Case #1: The Unclickable Link",
    description: "A developer created an item deletion button using a standard <div> element. Mouse users can click it, but keyboard-only and screen-reader users cannot focus or activate it.",
    difficulty: "easy",
    symptom: "Screen-readers completely ignore the button in tab order. Keyboard 'Tab' focus skips past it entirely.",
    code: `<div className="delete-icon" onClick={handleDelete}>
  <span>🗑️ Delete Item</span>
</div>`,
    consoleLogs: [
      "🖥️ Rendering document list...",
      "⚠️ [A11y] Warn: Click listener added to non-interactive element <div>. Element lacks role and tabIndex."
    ],
    options: [
      { id: "wrong-1", label: "Add 'tabIndex={0}' and an 'onKeyDown' listener manually to the <div>.", correct: false },
      { id: "correct", label: "Change the <div> wrapper to a semantic <button> element.", correct: true },
      { id: "wrong-2", label: "Apply 'aria-live=\"polite\"' directly to the <div> container.", correct: false },
      { id: "wrong-3", label: "Increase the delete icon size to make it more hoverable.", correct: false }
    ],
    explanation:
      "Using a semantic `<button>` tag automatically grants focusability (`tabindex=\"0\"`), native keyboard support (triggers on both Enter and Space keys), and a native interactive accessibility role ('button') for screen readers out of the box. While you can polyfill `div` elements, using semantic HTML elements is the gold standard of digital accessibility."
  },
  {
    id: "unlinked-input-label",
    title: "Case #2: The Contextless Textbox",
    description: "A subscription form renders a label and a textbox. However, a screen reader reads the textbox as just 'Blank edit text', omitting the 'Enter your email' context.",
    difficulty: "medium",
    symptom: "Aria accessibility tree registers the input element as unlabeled. Screen readers fail to connect label to form field.",
    code: `<label>Enter your email:</label>
<input type="email" placeholder="you@domain.com" />`,
    consoleLogs: [
      "🖥️ Billing layout rendered.",
      "⚠️ [A11y] Warn: Input field lacks accessible label description."
    ],
    options: [
      { id: "wrong-1", label: "Change placeholder to 'Enter your email' inside the input.", correct: false },
      { id: "wrong-2", label: "Wrap both elements inside an unpositioned <span> container.", correct: false },
      { id: "correct", label: "Link them using 'htmlFor' on label and matching 'id' on input.", correct: true },
      { id: "wrong-3", label: "Apply 'aria-label=\"email\"' to the label element itself.", correct: false }
    ],
    explanation:
      "Screen readers do not automatically associate adjacent text labels with `<input>` textboxes. Linking them explicitly using `htmlFor` on the `<label>` and a matching `id` on the `<input>` establishes an explicit relation in the accessibility tree. Now, when a reader focuses the input, it reads the label's content automatically."
  },
  {
    id: "contrast-failure",
    title: "Case #3: The Invisible Policy Text",
    description: "An important legal policy note is rendered at the bottom of the page. Visually impaired users are reporting that the text is completely unreadable and washes out into the background.",
    difficulty: "medium",
    symptom: "Text contrast ratio fails WCAG AA and AAA accessibility contrast thresholds (4.5:1 minimum).",
    code: `/* Background color: #121212 (Dark slate) */

.policy-footer-note {
  color: #4a4a4a; /* Medium-dark gray */
  background-color: #121212;
  font-size: 12px;
}`,
    consoleLogs: [
      "🖥️ Layout nodes loaded successfully.",
      "⚠️ [WCAG Contrast Analyzer] Contrast ratio is 2.1:1. Minimum required for small text is 4.5:1."
    ],
    options: [
      { id: "wrong-1", label: "Increase the font size of the note to 16px.", correct: false },
      { id: "wrong-2", label: "Apply 'font-weight: bold' to make the gray lines thicker.", correct: false },
      { id: "correct", label: "Change the text color code to '#9e9e9e' (or lighter) to achieve a contrast ratio above 4.5:1.", correct: true },
      { id: "wrong-3", label: "Change font-family to a monospace font to improve readability.", correct: false }
    ],
    explanation:
      "WCAG 2.1 AA rules state that standard body text (under 18px / 14pt bold) must maintain a contrast ratio of at least 4.5:1 against its background. Using `#4a4a4a` on `#121212` yields a tiny 2.1:1 ratio. Moving the gray color code higher (e.g. `#9e9e9e`) opens the contrast gap to 5.2:1, making the content fully readable for users with visual acuity losses."
  },
  {
    id: "missing-alt",
    title: "Case #4: The Missing Image Description",
    description: "A catalog card renders a product image. Screen readers read out the raw filename 'product_img_final_compressed_ver3_blue.jpg', cluttering the auditory user experience.",
    difficulty: "easy",
    symptom: "Screen-readers read raw image filenames instead of descriptive alternatives. No alt attribute is declared.",
    code: `<img src="/images/product_blue_v2.jpg" />`,
    consoleLogs: [
      "🖥️ Product detail page hydrated.",
      "⚠️ [A11y] Warn: <img> element lacks a descriptive 'alt' attribute."
    ],
    options: [
      { id: "wrong-1", label: "Add 'title=\"blue-product\"' to the image selector.", correct: false },
      { id: "correct", label: "Add an 'alt' attribute describing the product: 'alt=\"Rajesh's premium leather tech pouch in royal blue\"'.", correct: true },
      { id: "wrong-2", label: "Write a descriptive label above the image with absolute positioning.", correct: false },
      { id: "wrong-3", label: "Add 'name=\"blue-pouches\"' attribute inside the image node.", correct: false }
    ],
    explanation:
      "If an `<img>` tag is missing an `alt` attribute, screen readers will fall back to announcing the raw filename, which is often unreadable. Adding a descriptive, natural language `alt` attribute explains the visual context to users with sight limitations. For purely decorative elements, use an empty alt string `alt=\"\"` so screen readers know to gracefully skip past it."
  }
];
