import IlrCalculator from "./IlrCalculator";

// Maps a tool slug (from an AppRecord's `tools` list) to the component that
// renders it. Adding a new tool to an app means adding an AppTool entry in
// src/lib/apps.ts and, if it doesn't already exist, one entry here.
export const toolComponents: Record<
  string,
  (props: { accent: string }) => React.ReactElement
> = {
  "ilr-calculator": IlrCalculator,
};
