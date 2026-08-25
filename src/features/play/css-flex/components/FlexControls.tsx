"use client";

import clsx from "clsx";

type ControlConfig = {
  property: string;
  options: string[];
};

type FlexControlsProps = {
  availableControls: ControlConfig[];
  currentStyles: Record<string, string>;
  onStyleChange: (property: string, value: string) => void;
};

export default function FlexControls({
  availableControls,
  currentStyles,
  onStyleChange,
}: FlexControlsProps) {
  // Convert camelCase property to kebab-case
  const formatProperty = (prop: string) => {
    return prop.replace(/([A-Z])/g, "-$1").toLowerCase();
  };

  return (
    <div className="flex flex-col gap-5">
      {availableControls.map((control) => {
        const propName = control.property;
        const activeValue = currentStyles[propName] || "";

        return (
          <div key={propName} className="flex flex-col gap-2">
            {/* Control Label */}
            <label className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {formatProperty(propName)}
            </label>

            {/* Interactive Button Options */}
            <div className="flex flex-wrap gap-1.5">
              {control.options.map((option) => {
                const isActive = activeValue === option;

                return (
                  <button
                    key={option}
                    onClick={() => onStyleChange(propName, option)}
                    className={clsx(
                      "cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[11px] font-medium leading-normal transition-all shadow-sm active:scale-[0.97]",
                      isActive
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border/30 bg-secondary/30 text-foreground hover:bg-secondary/50 hover:border-border/50"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
