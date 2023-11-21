<script>
  import AstroCard from "$lib/components/AstroCard.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import { arrayProp, createToast } from "../../../hooks.client.js";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import AstroGridContainer from "$lib/components/AstroGridContainer.svelte";
  import Title from "$lib/Title.svelte";
  export let data;
  const { supabase, session } = data;
  let { items } = data;
  let sortBy = "date";
  let reversed = true;
  items = items.sort(GetSortOrderCustom("date", reversed));
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
  function GetSortOrderCustom(prop, reverse = false) {
    return function (a, b) {
      if (a["data"][prop] > b["data"][prop]) {
        return reverse ? -1 : 1;
      } else if (a["data"][prop] < b["data"][prop]) {
        return reverse ? 1 : -1;
      }
      return 0;
    };
  }
</script>

<main>
  <div class="md:container mx-auto my-10">
    <div class="text-center mb-7">
      <h1 class="text-6xl font-bold">
        Personal <span class="text-accent">Vault</span>
      </h1>
    </div>
    <div class="mb-7 d-flex justify-start">
      <button
        class="btn btn-accent me-2"
        on:click={() => {
          if (sortBy === "date") {
            sortBy = "title";
            items = items.sort(GetSortOrderCustom("title", !reversed));
          } else if (sortBy === "title") {
            sortBy = "date";
            items = items.sort(GetSortOrderCustom("date", reversed));
          }
        }}
        >Sort By {sortBy === "date" ? "Title" : "Date"}
      </button>
      <button
        class="btn btn-secondary"
        on:click={() => {
          reversed = !reversed;
          items = items.sort(GetSortOrderCustom(sortBy, reversed));
        }}><i class="fa-solid fa-right-left" /></button
      >
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
