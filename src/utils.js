export function formatDateTime(dateString, timeString) {
  if (timeString) {
    return Date.parse(`${dateString}T${timeString}`);
  }
  return Date.parse(dateString);
}
