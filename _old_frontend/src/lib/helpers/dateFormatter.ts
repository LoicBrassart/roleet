const DATE_FORMATTER = Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "medium",
});

export function formatDate(date: string): string;
export function formatDate(date: Date): string;
export function formatDate(date: string | Date): string {
  return typeof date === "string"
    ? DATE_FORMATTER.format(new Date(date))
    : DATE_FORMATTER.format(date);
}
