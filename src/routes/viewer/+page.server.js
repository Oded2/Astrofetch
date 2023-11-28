import { error } from "@sveltejs/kit";

export function load({ url }) {
  const item = {};
  url.searchParams.forEach((value, key) => (item[key] = value));
  if (
    !item.date ||
    !item.title ||
    !item.url ||
    !item.media_type ||
    !item.explanation
  )
    throw error(400, "Invalid URL Parameters");
  return { item };
}
