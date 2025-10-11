export type Verdict =
  | "STRONG_BUY"
  | "BUY"
  | "HOLD"
  | "AVOID"
  | "UPCOMING"
  | "NOT_REVIEWED";

export const verdictColorMap: Record<Verdict, string> = {
  STRONG_BUY: "success",
  BUY: "success",
  HOLD: "warning",
  AVOID: "error",
  UPCOMING: "info",
  NOT_REVIEWED: "light",
};
