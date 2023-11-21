<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import hrefs from "$lib/hrefs.json";
  import { page } from "$app/stores";
  import "../app.css";
  export let data;
  $: supabase = data.supabase;
  $: session = data.session;

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });
    return () => subscription.unsubscribe();
  });
</script>

<h1>Hello</h1>

<slot />
