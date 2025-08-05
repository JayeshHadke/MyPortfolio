type DateRange = string;

function parseDateRange(range: DateRange): [Date, Date] {
  const [startStr, endStr] = range.split(" - ");
  const start = new Date(`${startStr} 1`);
  const end = endStr.toLowerCase() === "present" ? new Date() : new Date(`${endStr} 1`);
  return [start, end];
}

function mergeIntervals(intervals: [Date, Date][]): [Date, Date][] {
  if (intervals.length === 0) return [];

  // Sort by start date
  intervals.sort((a, b) => a[0].getTime() - b[0].getTime());

  const merged: [Date, Date][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [lastStart, lastEnd] = merged[merged.length - 1];
    const [currStart, currEnd] = intervals[i];

    if (currStart <= lastEnd) {
      // Overlap → merge
      merged[merged.length - 1][1] = new Date(Math.max(lastEnd.getTime(), currEnd.getTime()));
    } else {
      // No overlap → push
      merged.push([currStart, currEnd]);
    }
  }

  return merged;
}

export function getTotalDuration(dateRanges: DateRange[]): string {
  const intervals = dateRanges.map(parseDateRange);
  const merged = mergeIntervals(intervals);

  let totalMonths = 0;

  merged.forEach(([start, end]) => {
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) return `${years}Yr${years > 1 ? "s" : ""} ${months}Mo`;
  if (years > 0) return `${years}Yr${years > 1 ? "s" : ""}`;
  return `${months}Mo`;
}
