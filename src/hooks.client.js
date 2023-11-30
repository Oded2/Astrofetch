import { toasts } from "svelte-toasts";

const dateOptions = { month: "long", day: "numeric", year: "numeric" };

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
  duration = 2000,
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

export async function fetchFromEndpoint(ref = "", params = {}) {
  return await fetch(ref, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
    },
  });
}
export function hasNormalCharacters(inputString = "") {
  return inputString.length == 0 ? true : /^[a-zA-Z0-9]+$/.test(inputString);
}

export function dateAdjust(milliseconds = 0, date = new Date(), max) {
  const result = new Date(date.valueOf() + milliseconds);
  if (max && result > max) return max;
  return result;
}
export function formatDate(date = new Date(), options = dateOptions) {
  const formatDate = date.toLocaleDateString("en-US", options);
  return formatDate;
}

export function maxLen(string = "", maxLen = 200) {
  if (maxLen >= string.length) {
    return string;
  }
  let newString = "";
  for (let i in string) {
    if (i == maxLen - 3) {
      return newString + "...";
    }
    newString += string[i];
  }
  return string;
}

export function arrayProp(arr = [], prop) {
  const newArr = [];
  for (const i of arr) newArr.push(i[prop]);
  return newArr;
}

export function GetSortOrder(prop, reverse = false) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return reverse ? -1 : 1;
    } else if (a[prop] < b[prop]) {
      return reverse ? 1 : -1;
    }
    return 0;
  };
}

export function calculateMinutes(startDate = new Date(), endDate = new Date()) {
  const timeDifference = endDate.valueOf() - startDate.valueOf();
  const minutes = Math.floor(timeDifference / 60000);
  return minutes;
}

export function getTimeStr(date = new Date()) {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function formatDateTime(date = new Date(), options = dateOptions) {
  return `${formatDate(date, options)} at ${getTimeStr(date)}`;
}

export function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
