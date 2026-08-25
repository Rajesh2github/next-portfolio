import { FlexChallenge } from "../../types";

export const flexChallenges: FlexChallenge[] = [
  {
    id: "enable-flex",
    title: "1. Enable Flexbox",
    description: "Start by enabling Flexbox layout on the container to align the items horizontally in a row.",
    difficulty: "easy",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "display",
        options: ["block", "flex"],
      },
    ],
    initialStyles: {
      display: "block",
    },
    solution: {
      display: "flex",
    },
    hint: "To start using Flexbox, you need to set the display property of the parent container to 'flex'.",
  },
  {
    id: "center-horizontally",
    title: "2. Center Items Horizontally",
    description: "Align all of the flex items perfectly in the horizontal center of the container.",
    difficulty: "easy",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "justifyContent",
        options: ["flex-start", "center", "flex-end", "space-between"],
      },
    ],
    initialStyles: {
      display: "flex",
      justifyContent: "flex-start",
    },
    solution: {
      display: "flex",
      justifyContent: "center",
    },
    hint: "The property 'justify-content' controls alignment along the main axis (horizontally in a row). Try setting it to 'center'.",
  },
  {
    id: "center-vertically",
    title: "3. Center Items Vertically",
    description: "Keep the items horizontally centered, and also align them vertically in the exact center.",
    difficulty: "easy",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "justifyContent",
        options: ["center"], // Locked for this challenge to keep focus
      },
      {
        property: "alignItems",
        options: ["flex-start", "center", "flex-end", "stretch"],
      },
    ],
    initialStyles: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    solution: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    hint: "While 'justify-content' aligns items horizontally, 'align-items' aligns items along the cross axis (vertically). Try setting it to 'center'.",
  },
  {
    id: "direction-column",
    title: "4. Vertical Stack (Column)",
    description: "Change the layout direction so that items stack vertically as a column, and make them occupy the horizontal center of the container.",
    difficulty: "medium",
    container: { height: "240px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "flexDirection",
        options: ["row", "column"],
      },
      {
        property: "alignItems",
        options: ["flex-start", "center", "flex-end"],
      },
    ],
    initialStyles: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    solution: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    hint: "Use 'flex-direction: column' to stack items vertically. Remember, in a column direction, the main axis becomes vertical, and the cross axis becomes horizontal, so 'align-items' centers them horizontally.",
  },
  {
    id: "spacing-gap",
    title: "5. Spacing and Gaps",
    description: "Align items in a row, center them vertically and horizontally, and add some visual breathing room (gap) between the items.",
    difficulty: "medium",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "justifyContent",
        options: ["center"],
      },
      {
        property: "alignItems",
        options: ["center"],
      },
      {
        property: "gap",
        options: ["0px", "8px", "16px", "24px"],
      },
    ],
    initialStyles: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0px",
    },
    solution: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
    },
    hint: "The 'gap' property is a modern way to apply spacing specifically between items in a flex container without affecting edges. Try setting it to '16px'.",
  },
  {
    id: "opposite-ends",
    title: "6. Opposite Ends",
    description: "Align the items in a row, vertically centered, and push them to the absolute outer edges of the container with space distributed evenly between them.",
    difficulty: "hard",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "justifyContent",
        options: ["flex-start", "center", "flex-end", "space-between", "space-around"],
      },
      {
        property: "alignItems",
        options: ["flex-start", "center", "flex-end"],
      },
    ],
    initialStyles: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    solution: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    hint: "To push items to opposite ends with space between, look into the distribution values of 'justify-content'. Specifically 'space-between'. Set vertical alignment to 'center'.",
  },
];
