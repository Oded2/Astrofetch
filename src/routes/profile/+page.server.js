import hrefs from "$lib/hrefs.json";
import { supabase } from "$lib/index.js";
import { redirect, error } from "@sveltejs/kit";

export async function load({ url }) {
  const userId = url.searchParams.get("user_id");
  if (!userId) throw redirect(301, hrefs.home);
  const { data, error: supabaseError } = await supabase
    .from("profiles")
    .select("username")
    .eq("user_id", userId);
  if (supabaseError) throw error(400, "An error has occured");
  throw redirect(301, hrefs.profile.replace("slug", data[0].username));
}
