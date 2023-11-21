import { toasts } from "svelte-toasts";

export function dateToStr(date = new Date()) {
  return date.toISOString().split("T")[0];
}

export function randomNum(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
export function addParams(link = new URL(), params) {
  for (const key in params) {
    const value = params[key];
    link.searchParams.append(key, value);
  }
}
export function addParamsString(string = "", params = {}) {
  const link = new URL("https://youtube.com");
  addParams(link, params);
  return link.href.replace("https://youtube.com", string);
}
export function createToast(
  type,
  title,
  description = "",
  duration = 5000,
  placement = "bottom-center"
) {
  return toasts.add({
    title: title,
    description: description,
    duration: duration,
    placement: placement,
    type: type,
    theme: "dark",
    showProgress: true,
  });
}
