export enum AllotmentStatus {
  ALLOTMENT_PENDING = "ALLOTMENT_PENDING",
  ALLOTED = "ALLOTED",
  NOT_ALLOTED = "NOT_ALLOTED",
}

export const IPOAllotmentColorMap: Record<AllotmentStatus, string> = {
  [AllotmentStatus.ALLOTMENT_PENDING]: "warning",
  [AllotmentStatus.ALLOTED]: "success",
  [AllotmentStatus.NOT_ALLOTED]: "error",
};
