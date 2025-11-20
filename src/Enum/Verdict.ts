export type Verdict = "STRONG_BUY" | "BUY" | "WAIT" | "AVOID" | "NOT_REVIEWED";

export const verdictColorMap: Record<Verdict, string> = {
  STRONG_BUY: "success",
  BUY: "success",
  WAIT: "warning",
  AVOID: "error",
  NOT_REVIEWED: "info",
};
