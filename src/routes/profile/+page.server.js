import hrefs from "$lib/hrefs.json";
import { redirect } from "@sveltejs/kit";

export function load() {
  throw redirect(301, hrefs.home);
}
