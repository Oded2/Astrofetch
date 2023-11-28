import hrefs from "$lib/hrefs.json";
import { redirect } from "@sveltejs/kit";

export async function load() {
  throw redirect(301, hrefs.home);
}
