import { supabase } from "$lib/supabaseClient.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const username = params.slug;
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("username", username);
  if (profile.length == 0)
    throw error(404, { message: `User "${username}" not found.` });
  const { data: items } = await supabase
    .from("items")
    .select()
    .eq("user_id", profile[0].user_id);
  return { profile: profile[0], items };
}
