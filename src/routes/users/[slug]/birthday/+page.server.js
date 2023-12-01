import { NASA } from "$env/static/private";
import { hrefs, supabase } from "$lib/index.js";
import { error, redirect } from "@sveltejs/kit";
import { addParamsString, formatDate } from "../../../../hooks.client.js";

const minDate = "1995-06-16";
const apiUrl = "https://api.nasa.gov/planetary/apod";

export async function load({ params }) {
  const { data } = await supabase
    .from("profiles")
    .select("birthday")
    .eq("username", params.slug);
  const birthday = data[0].birthday;
  if (birthday < minDate)
    throw error(400, {
      message: `APOD is only available since ${formatDate(new Date(minDate))}`,
    });
  const response = await fetch(
    addParamsString(apiUrl, { date: birthday, api_key: NASA })
  );
  const item = await response.json();
  throw redirect(301, addParamsString(hrefs.viewer, item));
}
