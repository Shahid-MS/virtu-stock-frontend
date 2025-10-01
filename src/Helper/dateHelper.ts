export function dateConverter(d: string | number | Date): string {
  const date = new Date(d);
  return isNaN(date.getTime())
    ? "Invalid date"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export function dateandTimeConverter(d: string | number | Date): string {
  const date = new Date(d);
  return isNaN(date.getTime())
    ? "Invalid date"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
}
