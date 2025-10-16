export type IPOStatus = "OPEN" | "CLOSED" | "UPCOMING";

export const IPOStatusColorMap: Record<IPOStatus, string> = {
  OPEN: "success",
  CLOSED: "error",
  UPCOMING: "info",
};
