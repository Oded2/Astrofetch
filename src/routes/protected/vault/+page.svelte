<script>
  import AstroCard from "$lib/components/AstroCard.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import { createToast } from "../../../hooks.client.js";
  export let data;
  const { supabase, session, items } = data;
  const finalItems = console.log(items);
  let toast;
</script>

<main>
  <div class="container mx-auto my-10">
    <div class="text-center mb-7">
      <h1 class="text-6xl font-bold">
        Personal <span class="text-accent">Vault</span>
      </h1>
    </div>
    <div class="grid grid-cols-3 gap-8">
      {#each items as item}
        <AstroCard
          on:duplicate={() =>
            (toast = createToast(
              "error",
              "Duplicate",
              "This item is already in your vault"
            ))}
          on:success={() =>
            (toast = createToast(
              "success",
              "Added to Vault",
              "This item has been added to your vault"
            ))}
          {supabase}
          userId={session.user.id}
          item={item.data}
        />
      {/each}
    </div>
  </div>
</main>

<ToastSetup {toast} />
