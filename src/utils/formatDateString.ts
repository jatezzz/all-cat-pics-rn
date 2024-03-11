import { format, parseISO } from "date-fns";

export function formatDateString(
  input: string,
  fromFormat: string = "yyyy-MM-dd'T'HH:mm:ss.SSSX", // Adjusted to match date-fns tokens
  toFormat: string = "MMM d, yyyy"
): string {
  try {
    // Assuming input is in ISO format, we can use parseISO directly. Adjust as necessary.
    const date = parseISO(input);
    return format(date, toFormat);
  } catch (error) {
    console.error("Error formatting date string:", error);
    return "";
  }
}
