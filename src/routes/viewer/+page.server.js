import { NASA } from "$env/static/private";
import { addParamsString } from "../../hooks.client.js";

const apiUrl = "https://api.nasa.gov/planetary/apod";

export async function load({ url }) {
  const date = url.searchParams.get("date");
  const newUrl = addParamsString(apiUrl, {
    api_key: NASA,
    date: date,
  });
  const response = await fetch(newUrl);
  return { item: await response.json() };
}
