export type IPOStatus =
  | "OPEN"
  | "CLOSED"
  | "UPCOMING"
  | "ALLOTMENT_PENDING"
  | "ALLOTMENT"
  | "LISTING_PENDING"
  | "LISTED";

export const IPOStatusColorMap: Record<IPOStatus, string> = {
  OPEN: "success",
  CLOSED: "dark",
  ALLOTMENT_PENDING: "warning",
  ALLOTMENT: "error",
  LISTING_PENDING: "warning",
  LISTED: "error",
  UPCOMING: "info",
};
