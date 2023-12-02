import { NASA } from "$env/static/private";
import { error, redirect } from "@sveltejs/kit";
import {
  addParamsString,
  dateToStr,
  formatDate,
} from "../../../hooks.client.js";
import { hrefs } from "$lib/index.js";

const minDate = "1995-06-16";
const apiUrl = "https://api.nasa.gov/planetary/apod";

export async function load({ params }) {
  const date = params.slug;
  if (date.length != 10) throw error(400, { message: "Invalid Date" });
  if (date < minDate)
    throw error(400, {
      message: `Date must be before ${formatDate(new Date(minDate))}`,
    });
  if (date > dateToStr())
    throw error(400, { message: "Date cannot be after today" });
  const response = await fetch(
    addParamsString(apiUrl, { date, api_key: NASA })
  );
  if (!response.ok)
    throw error(response.status, { message: response.statusText });
  const item = await response.json();
  throw redirect(301, addParamsString(hrefs.viewer, item));
}
