export async function load({ parent }) {
  const { supabase, session } = await parent();
  const { data } = await supabase
    .from("items")
    .select()
    .eq("user_id", session.user.id);
  return { items: data };
}
