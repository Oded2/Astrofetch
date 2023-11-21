<script>
  import hrefs from "$lib/hrefs.json";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  export let data;
  const { supabase } = data;
  onMount(async () => {
    await supabase.auth.signOut();
    goto(hrefs.home);
  });
</script>
