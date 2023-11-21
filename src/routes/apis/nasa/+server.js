import { NASA } from "$env/static/private";
import { addParamsString } from "../../../hooks.client.js";
import { json } from "@sveltejs/kit";

const apiUrl = "https://api.nasa.gov/planetary/apod";
export async function POST({ request }) {
  const { start, end } = await request.json();
  const url = addParamsString(apiUrl, {
    api_key: NASA,
    start_date: start,
    end_date: end,
  });
  const response = await fetch(url);
  return json(await response.json());
}
