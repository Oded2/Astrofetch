<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import hrefs from "$lib/hrefs.json";
  import { page } from "$app/stores";
  import NavLi from "$lib/components/NavLi.svelte";
  import "../app.css";
  export let data;
  $: supabase = data.supabase;
  $: session = data.session;
  $: activeUrl = $page.url.pathname;

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

<div class="navbar bg-base-300 justify-center">
  <div class="container">
    <div class="flex-1">
      <a href={hrefs.home}>AstroFetch</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <NavLi href={hrefs.signup} {activeUrl}>Sign Up</NavLi>
        <NavLi href={hrefs.login} {activeUrl}>Login</NavLi>
      </ul>
    </div>
  </div>
</div>
<slot />
