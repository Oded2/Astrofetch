<script>
  import { addParamsString, formatDate, maxLen } from "../../hooks.client.js";
  import hrefs from "$lib/hrefs.json";
  export let item = {};
  function formatDateStr(str) {
    return formatDate(new Date(str));
  }
  function vault() {
    console.log("Saving to vault");
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
    <h3 class="font-semibold">{formatDateStr(item.date)}</h3>
    <p>{maxLen(item.explanation)}</p>
    <div class=" mt-3 card-actions justify-end">
      {#if item.media_type === "image"}
        <a
          href={addParamsString(hrefs.viewer, { date: item.date })}
          class="btn btn-secondary w-24">View</a
        >
      {/if}
      <button on:click={vault} class="btn btn-primary w-32"
        >Save to Vault</button
      >
    </div>
  </div>
</div>
