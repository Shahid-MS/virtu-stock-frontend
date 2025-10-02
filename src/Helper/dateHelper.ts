export function dateFormat(d?: string | number | Date | null): string {
  if (d === undefined || d === null) return "Invalid date";

  const date = new Date(d);
  return isNaN(date.getTime())
    ? "Invalid date"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export function dateandTimeFormat(d?: string | number | Date | null): string {
  if (d === undefined || d === null) return "Invalid date";

  const date = new Date(d);
  return isNaN(date.getTime())
    ? "Invalid date"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
}
