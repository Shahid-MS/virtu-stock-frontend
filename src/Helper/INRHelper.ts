export function INRFormat(amount?: number): string {
  if (amount === undefined) return "";
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
}
