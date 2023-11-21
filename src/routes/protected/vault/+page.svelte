<script>
  import AstroCard from "$lib/components/AstroCard.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import { createToast } from "../../../hooks.client.js";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import AstroGridContainer from "$lib/components/AstroGridContainer.svelte";
  import Title from "$lib/Title.svelte";
  export let data;
  const { supabase, session } = data;
  let { items } = data;
  let toast;
  let progress = false;
  async function deleteFromVault(item = {}) {
    progress = true;
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("data", JSON.stringify(item.data))
      .eq("user_id", session.user.id);
    progress = false;
    if (error) {
      console.error(error.message);
      return;
    }
    for (const i in items) if (items[i].data === item.data) items.splice(i, 1);
    items = items;
  }
</script>

<main>
  <div class="md:container mx-auto my-10">
    <div class="text-center mb-7">
      <h1 class="text-6xl font-bold">
        Personal <span class="text-accent">Vault</span>
      </h1>
    </div>
    <AstroGridContainer>
      {#each items as item (item)}
        <div
          animate:flip={{ duration: 200 }}
          transition:fade={{ duration: 200 }}
        >
          <AstroCard
            isPersonal
            {supabase}
            userId={session.user.id}
            item={item.data}
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
          >
            <button
              disabled={progress}
              class="btn btn-warning"
              on:click={() => deleteFromVault(item)}>Remove from Vault</button
            >
          </AstroCard>
        </div>
      {/each}
    </AstroGridContainer>
  </div>
</main>

<ToastSetup {toast} />

<Title title="Personal Vault" />
