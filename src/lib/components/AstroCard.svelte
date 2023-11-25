<script>
  import {
    addParamsString,
    formatDate,
    formatDateTime,
    maxLen,
  } from "../../hooks.client.js";
  import hrefs from "$lib/hrefs.json";
  import { supabase as supabaseClient } from "$lib/supabaseClient.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let item = {};
  export let supabase = supabaseClient;
  export let userId = "";
  export let isPersonal = false;
  export let progress = false;
  export let dateVaulted = "";
  let isSaved = false;
  function formatDateStr(str) {
    return formatDate(new Date(str));
  }
  async function vault() {
    isSaved = true;
    const { data } = await supabase
      .from("items")
      .select()
      .eq("data", JSON.stringify(item))
      .eq("user_id", userId);
    if (data.length > 0) {
      dispatch("duplicate");
      return;
    }
    const { error } = await supabase
      .from("items")
      .insert({ user_id: userId, data: item });

    if (error) {
      isSaved = false;
      console.error(error.message);
      return;
    }
    dispatch("success");
  }
</script>

<div class="h-full card bg-gray-900 shadow-xl">
  <figure>
    {#if item.media_type === "image"}
      <img
        class="aspect-square hover:scale-110 transition object-cover"
        src={item.url}
        alt={item.title}
      />
    {:else if item.media_type === "video"}
      <iframe
        class="aspect-square h-full w-full"
        src={item.url}
        frameborder="0"
        title={item.title}
      />
    {/if}
  </figure>
  <div class="card-body">
    <h2 class="card-title font-bold">{item.title}</h2>
    <h3 class="font-semibold text-lg">{formatDateStr(item.date)}</h3>
    {#if dateVaulted.length > 0}
      <h4 class="font-semibold">
        <span class="font-medium">Vaulted:</span>
        {formatDateTime(new Date(dateVaulted))}
      </h4>
    {/if}
    <p>{maxLen(item.explanation)}</p>
    <div class="mt-3 card-actions justify-end">
      {#if isPersonal}
        <button
          disabled={progress}
          class="btn btn-warning"
          on:click={() => dispatch("delete")}>Remove from Vault</button
        >
      {/if}
      {#if item.media_type === "image" || item.media_type === "video"}
        <a
          target="_blank"
          data-sveltekit-preload-data="off"
          href={addParamsString(hrefs.viewer, item)}
          class="btn btn-secondary w-24">View</a
        >
      {/if}
      {#if !isPersonal && userId.length > 0}
        <button disabled={isSaved} on:click={vault} class="btn btn-primary w-32"
          >Save to Vault</button
        >
      {/if}
    </div>
  </div>
</div>
