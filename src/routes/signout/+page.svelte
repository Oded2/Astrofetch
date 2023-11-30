<script>
  import { hrefs } from "$lib/index.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Title from "$lib/Title.svelte";
  export let data;
  const { supabase } = data;
  onMount(async () => {
    await supabase.auth.signOut();
    goto(hrefs.home);
  });
</script>

<Title title="Sign Out" />
