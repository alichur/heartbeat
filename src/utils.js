// for use in data with no dates.
// turns a lonely time string into a date function
export function getDateFromOrphanTime(timeString) {
  return Date.parse(`01 Jan 1970 ${timeString} GMT`);
}
