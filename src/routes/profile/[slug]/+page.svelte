<script>
  import AstroCard from "$lib/components/AstroCard.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import {
    createToast,
    calculateMinutes,
    GetSortOrder,
  } from "../../../hooks.client.js";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import AstroGridContainer from "$lib/components/AstroGridContainer.svelte";
  import Title from "$lib/Title.svelte";
  export let data;
  const { supabase, session, profile } = data;
  let { items } = data;
  let sortBy = "date";
  let reversed = false;
  items = items.sort(GetSortOrderCustom("date", true));
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
  function calculateAgeStr(str = "") {
    const date = new Date(str);
    const minutes = calculateMinutes(date, new Date());
    return Math.floor(minutes / 60 / 24 / 365.25);
  }
</script>

<main>
  <div class="md:container mx-auto my-10">
    <div class="text-center mb-7">
      <h1 class="text-6xl font-bold mb-2">
        {`${profile.display_name}'s`} <span class="text-accent">Vault</span>
      </h1>
      {#if profile.bio.length > 0}
        <h4 class="text-xl">{profile.bio}</h4>
      {/if}
      {#if profile.birthday}
        <h4 class="text-xl">{calculateAgeStr(profile.birthday)} Years Old</h4>
      {/if}
    </div>
    <div class="mb-7 flex flex-col justify-start">
      <div class="mb-4">
        <label class="flex mb-2 font-bold text-xl" for="sort">Sort</label>
        <select
          bind:value={sortBy}
          on:change={() => {
            if (sortBy === "date")
              items.sort(GetSortOrderCustom("date", !reversed));
            else if (sortBy === "dateAdded")
              items.sort(GetSortOrder("created_at", !reversed));
            else if (sortBy === "title")
              items.sort(GetSortOrderCustom("title", reversed));
            items = items;
          }}
          id="sort"
          class="select select-bordered w-full max-w-xs"
        >
          <option value="date" selected>Date</option>
          <option value="dateAdded">Date Added</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div class="flex">
        <input
          type="checkbox"
          bind:checked={reversed}
          on:change={() => (items = items.reverse())}
          class="checkbox mr-2"
        />
        <label for="reversed" class="flex font-bold text-xl">Reverse</label>
      </div>
    </div>
    <div class="border-b border-b-gray-600 pb-9">
      <AstroGridContainer>
        {#each items as item (item)}
          <div
            animate:flip={{ duration: 200 }}
            transition:fade={{ duration: 200 }}
          >
            <AstroCard
              isPersonal={session ? session.user.id === profile.user_id : false}
              {supabase}
              userId={session ? session.user.id : ""}
              item={item.data}
              dateVaulted={item.created_at}
              {progress}
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
              on:delete={() => deleteFromVault(item)}
            />
          </div>
        {/each}
      </AstroGridContainer>
    </div>
  </div>
</main>

<ToastSetup {toast} />

<Title title={`${profile.display_name}'s Vault`} />
