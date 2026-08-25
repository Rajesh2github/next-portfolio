"use client";

type GeneratedCSSProps = {
  styles: Record<string, string>;
};

export default function GridGeneratedCSS({ styles }: GeneratedCSSProps) {
  // Convert camelCase to kebab-case
  const formatProperty = (prop: string) => {
    return prop.replace(/([A-Z])/g, "-$1").toLowerCase();
  };

  const containerLines: { property: string; val: string }[] = [];
  const itemBlocks: Record<string, { property: string; val: string }[]> = {};

  Object.entries(styles)
    .filter(([, value]) => value && value !== "")
    .forEach(([key, value]) => {
      if (key.startsWith("item")) {
        const match = key.match(/^item([A-Za-z]+)_(.+)$/);
        if (match) {
          const itemId = match[1].toLowerCase();
          const prop = formatProperty(match[2]);
          if (!itemBlocks[itemId]) itemBlocks[itemId] = [];
          itemBlocks[itemId].push({ property: prop, val: value });
        }
      } else {
        containerLines.push({ property: formatProperty(key), val: value });
      }
    });

  return (
    <div className="w-full">
      <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Generated CSS
      </div>

      <div className="overflow-hidden rounded-xl border border-border/40 bg-zinc-950 p-4 font-mono text-xs shadow-sm md:text-sm">
        {/* Terminal Header */}
        <div className="mb-3 flex items-center justify-between border-b border-zinc-800/60 pb-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
            styles.css
          </span>
        </div>

        {/* Code Output */}
        <pre className="text-zinc-300 leading-6 select-all overflow-x-auto">
          <code>
            {/* Container Block */}
            <span className="text-amber-400">.container</span> {"{"}
            {"\n"}
            {containerLines.map((line, index) => (
              <span key={index} className="block pl-4">
                <span className="text-cyan-400">{line.property}</span>:{" "}
                <span className="text-emerald-400">{line.val}</span>;
              </span>
            ))}
            {"}"}

            {/* Individual Item Blocks */}
            {Object.entries(itemBlocks).map(([itemId, lines]) => (
              <div key={itemId} className="mt-4">
                <span className="text-amber-400">.item-{itemId}</span> {"{"}
                {"\n"}
                {lines.map((line, index) => (
                  <span key={index} className="block pl-4">
                    <span className="text-cyan-400">{line.property}</span>:{" "}
                    <span className="text-emerald-400">{line.val}</span>;
                  </span>
                ))}
                {"}"}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
