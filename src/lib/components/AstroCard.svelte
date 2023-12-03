<script>
  import { formatDate, formatDateTime, maxLen } from "../../hooks.client.js";
  import { supabase as supabaseClient } from "$lib/index.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let item = {};
  export let supabase = supabaseClient;
  export let userId = "";
  export let isPersonal = false;
  export let progress = false;
  export let dateVaulted = "";
  let saving = false;
  function formatDateStr(str) {
    return formatDate(new Date(str));
  }
  async function vault() {
    saving = true;
    const { data } = await supabase
      .from("items")
      .select()
      .eq("data", JSON.stringify(item))
      .eq("user_id", userId);
    if (data.length > 0) {
      isPersonal = true;
      saving = false;
      dispatch("duplicate");
      return;
    }
    const { error } = await supabase
      .from("items")
      .insert({ user_id: userId, data: item });

    if (error) {
      saving = false;
      console.error(error.message);
      return;
    }
    isPersonal = true;
    saving = false;
  }
  async function remove() {
    progress = true;
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("data", JSON.stringify(item))
      .eq("user_id", userId);
    progress = false;
    if (error) {
      console.error(error.message);
      return;
    }
    isPersonal = false;
    dispatch("delete");
  }
</script>

<div
  class="h-full card bg-gray-900 shadow-xl min-h-[400px!important] max-h-[95vh]"
>
  <figure>
    {#if item.media_type === "image"}
      <img
        class="aspect-square sm:hover:scale-110 transition object-cover w-full"
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
    <div class="mt-3 card-actions justify-end font-quicksand">
      {#if isPersonal}
        <button
          disabled={progress}
          class="btn btn-warning w-full sm:w-auto"
          on:click={remove}>Remove from Vault</button
        >
      {/if}
      {#if item.media_type === "image" || item.media_type === "video"}
        <button
          on:click={() => dispatch("view")}
          class="btn btn-secondary w-full sm:w-24">View</button
        >
      {/if}
      {#if !isPersonal && userId.length > 0}
        <button
          disabled={saving}
          on:click={vault}
          class="btn btn-primary w-full sm:w-32">Save to Vault</button
        >
      {/if}
    </div>
  </div>
</div>
