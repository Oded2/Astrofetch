import { error } from "@sveltejs/kit";

export function load({ url }) {
  const searchParams = url.searchParams;
  const item = {
    date: searchParams.get("date"),
    title: searchParams.get("title"),
    url: searchParams.get("url"),
    media_type: searchParams.get("media_type"),
    explanation: searchParams.get("explanation"),
  };
  if (
    !item.date ||
    !item.title ||
    !item.url ||
    !item.media_type ||
    !item.explanation
  )
    throw error(400, "Invalid URL Parameters");
  const message = searchParams.get("message") ?? "";
  return { item, message };
}
