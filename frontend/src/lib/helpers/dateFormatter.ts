import { DateTime } from "luxon";

// undefined en 1er argument -> utilise la locale du device
const DATE_FORMATTER = Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDate(date: string): string;
export function formatDate(date: Date): string;
export function formatDate(date: string | Date): string {
  return typeof date === "string"
    ? DATE_FORMATTER.format(new Date(date))
    : DATE_FORMATTER.format(date);
}

export function toRelative(date: string) {
  DateTime.fromISO(date);
  return DateTime.fromISO(date).setLocale("fr").toRelative();
}
export function toDateTime(date: string) {
  return new Date(date).toLocaleString("fr-FR");
}
