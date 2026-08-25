import { GridChallenge } from "../../types";

export const gridChallenges: GridChallenge[] = [
  {
    id: "enable-grid",
    title: "1. Enable CSS Grid",
    description: "Initialize the container layout to use CSS Grid to prepare for grid-based track division.",
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
        options: ["block", "grid"],
      },
    ],
    initialStyles: {
      display: "block",
    },
    solution: {
      display: "grid",
    },
    hint: "Change the container's 'display' property to 'grid' to activate CSS Grid layout on this parent component.",
  },
  {
    id: "grid-columns",
    title: "2. Track Columns",
    description: "Divide the grid into 3 equal-width columns using the fraction unit (fr).",
    difficulty: "easy",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "gridTemplateColumns",
        options: ["none", "1fr", "1fr 1fr", "1fr 1fr 1fr"],
      },
    ],
    initialStyles: {
      display: "grid",
      gridTemplateColumns: "none",
    },
    solution: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    hint: "Use 'grid-template-columns' to set up columns. Standardize on '1fr 1fr 1fr' to divide the grid into three equal columns.",
  },
  {
    id: "grid-gaps",
    title: "3. Grid Spacing",
    description: "Divide the layout into three columns and add a gap between both vertical columns and horizontal rows.",
    difficulty: "easy",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "gridTemplateColumns",
        options: ["1fr 1fr 1fr"],
      },
      {
        property: "gap",
        options: ["0px", "12px", "20px", "32px"],
      },
    ],
    initialStyles: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "0px",
    },
    solution: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "20px",
    },
    hint: "Use the 'gap' (or grid-gap) property to space grid rows and columns apart. Try setting it to '20px'.",
  },
  {
    id: "grid-spanning",
    title: "4. Item Spanning",
    description: "Align items in a 3-column grid, and make Item A expand to span exactly 2 grid column tracks.",
    difficulty: "medium",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30", style: { gridColumn: "span 1" }, solutionStyle: { gridColumn: "span 2" } },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "gridTemplateColumns",
        options: ["repeat(3, 1fr)"],
      },
      {
        property: "itemA_gridColumn",
        options: ["span 1", "span 2", "span 3"],
      },
    ],
    initialStyles: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      itemA_gridColumn: "span 1",
    },
    solution: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      itemA_gridColumn: "span 2",
    },
    hint: "Individual grid items can be spanned using 'grid-column'. Select 'span 2' on the 'item-a-grid-column' control.",
  },
  {
    id: "grid-align",
    title: "5. Cell Alignment",
    description: "Center all grid item boxes both horizontally and vertically inside their individual grid cells.",
    difficulty: "medium",
    container: { height: "180px" },
    items: [
      { id: "a", label: "A", colorClass: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
      { id: "b", label: "B", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
      { id: "c", label: "C", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    ],
    availableControls: [
      {
        property: "gridTemplateColumns",
        options: ["1fr 1fr 1fr"],
      },
      {
        property: "placeItems",
        options: ["stretch", "start", "center", "end"],
      },
    ],
    initialStyles: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "12px",
      placeItems: "stretch",
    },
    solution: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "12px",
      placeItems: "center",
    },
    hint: "Use the 'place-items' shorthand property to set both 'align-items' and 'justify-items' at once. Try setting it to 'center'.",
  },
];
