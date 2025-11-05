export type Verdict = "STRONG_BUY" | "BUY" | "HOLD" | "AVOID" | "NOT_REVIEWED";

export const verdictColorMap: Record<Verdict, string> = {
  STRONG_BUY: "success",
  BUY: "success",
  HOLD: "warning",
  AVOID: "error",
  NOT_REVIEWED: "info",
};
