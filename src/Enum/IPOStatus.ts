export type IPOStatus =
  | "OPEN"
  | "CLOSED"
  | "UPCOMING"
  | "LISTING_PENDING"
  | "LISTED";

export const IPOStatusColorMap: Record<IPOStatus, string> = {
  OPEN: "success",
  CLOSED: "error",
  LISTING_PENDING: "warning",
  LISTED: "error",
  UPCOMING: "info",
};
