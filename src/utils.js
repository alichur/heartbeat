// for use in data with no dates.
// turns a lonely time string "08:21:45" into a date object with arbitrary date.
// For use comparing size of times only.
export function getDateFromOrphanTime(timeString) {
  return Date.parse(`01 Jan 1970 ${timeString} GMT`);
}
