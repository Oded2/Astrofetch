import { NASA } from "$env/static/private";
import { hrefs, supabase } from "$lib/index.js";
import { error, redirect } from "@sveltejs/kit";
import { addParamsString } from "../../../../hooks.client.js";

const minDate = "1995-06-16";
const apiUrl = "https://api.nasa.gov/planetary/apod";

function findMinDate(birthday = "") {
  const date = "1995-06-" + birthday.slice(-2);
  if (date >= minDate) return date;
  return date.replace("1995", "1996");
}

export async function load({ params }) {
  const { data } = await supabase
    .from("profiles")
    .select("birthday")
    .eq("username", params.slug);
  if (data.length == 0) throw error(404, "User not found");
  let birthday = data[0].birthday;
  if (!birthday) throw error(400, "User has not set a birthday");
  if (birthday < minDate) birthday = findMinDate(birthday);
  const response = await fetch(
    addParamsString(apiUrl, { date: birthday, api_key: NASA })
  );
  if (!response.ok)
    throw error(response.status, { message: response.statusText });
  const item = await response.json();
  throw redirect(301, addParamsString(hrefs.viewer, item));
}
