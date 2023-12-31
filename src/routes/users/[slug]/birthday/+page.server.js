import { NASA } from "$env/static/private";
import { hrefs, supabase } from "$lib/index.js";
import { error, redirect } from "@sveltejs/kit";
import { addParamsString, formatDate } from "../../../../hooks.client.js";

const minDate = "1995-06-16";
const apiUrl = "https://api.nasa.gov/planetary/apod";

function findMinDate(birthday = "") {
  const date = "1995" + birthday.slice(-6);
  if (date >= minDate) return date;
  return date.replace("1995", "1996");
}

export async function load({ params }) {
  const { data } = await supabase
    .from("profiles")
    .select("birthday, display_name")
    .eq("username", params.slug);
  if (data.length == 0) throw error(404, { message: "User not found" });
  const birthday = data[0].birthday;
  const name = data[0].display_name;
  if (!birthday) throw error(400, { message: "User has not set a birthday" });
  let newBirthday = birthday;
  if (birthday < minDate) newBirthday = findMinDate(birthday);
  const response = await fetch(
    addParamsString(apiUrl, { date: newBirthday, api_key: NASA })
  );
  if (!response.ok)
    throw error(response.status, {
      message: `Api Error: ${response.statusText}`,
    });
  const item = await response.json();
  if (newBirthday !== birthday)
    item.message = `
  Note: ${name} was born on ${formatDate(
      new Date(birthday)
    )}, prior to the initiation of NASA's Astronomy Picture of the Day (APOD). Therefore, the APOD presented is the earliest one on the user's birthday since APOD's inception.`;

  throw redirect(301, addParamsString(hrefs.viewer, item));
}
