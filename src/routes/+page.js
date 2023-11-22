export async function load({ parent }) {
  const { supabase, session } = await parent();
  if (!session) return;
  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("user_id", session.user.id);
  return { username: data[0].username };
}
