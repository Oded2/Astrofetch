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
        {#if session}
          <NavLi {activeUrl} href={hrefs.account}>Account</NavLi>
          <NavLi {activeUrl} href={hrefs.signout}>Sign Out</NavLi>
        {:else}
          <NavLi href={hrefs.signup} {activeUrl}>Sign Up</NavLi>
          <NavLi href={hrefs.login} {activeUrl}>Login</NavLi>
        {/if}
      </ul>
    </div>
  </div>
</div>
<slot />

<style>
  :global(html) {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
  }
</style>
