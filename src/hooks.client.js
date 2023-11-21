export function dateToStr(date = new Date()) {
  return date.toISOString().split("T")[0];
}
