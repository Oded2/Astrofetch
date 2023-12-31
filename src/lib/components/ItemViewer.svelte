<script>
  import { createEventDispatcher } from "svelte";
  import { formatDate, waitForElm } from "../../hooks.client.js";
  import Drawer from "./Drawer.svelte";
  import FloatElement from "./FloatElement.svelte";
  import { hrefs } from "$lib/index.js";
  import ShareModal from "./ShareModal.svelte";
  import { page } from "$app/stores";
  export let item = {};
  export let exitButton = true;
  export let message = "";
  export let lastItem = "";

  const origin = $page.url.origin;
  const dispatch = createEventDispatcher();

  function formatDateStr(str = "") {
    return formatDate(new Date(str));
  }
</script>

<div class="hero min-h-screen py-5" id="viewer">
  <div class="hero-content flex-col xl:flex-row">
    <div class="text-center xl:text-left">
      <h1 class="text-5xl font-bold pb-2">{item.title}</h1>
      <h2
        class:mb-2={message.length > 0}
        class:mb-4={message.length == 0}
        class="text-xl font-semibold"
      >
        {formatDateStr(item.date)}
      </h2>
      {#if message.length > 0}
        <h3 class="text-lg mb-4 font-semibold text-left">
          {message}
        </h3>
      {/if}
      <p class="text-lg pb-3 text-left">
        {item.explanation}
      </p>
      {#if item.copyright}
        <h2 class="text-xl mb-2">&copy; {item.copyright}</h2>
      {/if}
      <label class="btn btn-neutral print:invisible" for="options"
        >Options</label
      >
    </div>

    <div class="mb-10 xl:mb-0 w-full">
      {#if item.media_type === "image"}
        <img
          class="rounded-xl shadow-2xl xl:min-w-[32rem] m-auto w-full xl:w-auto xl:max-w-screen-sm 2xl:max-w-screen-md sm:hover:scale-110 transition-all max-h-[90vh]"
          src={item.url}
          alt={item.title}
        />
      {:else if item.media_type === "video"}
        <iframe
          class="rounded-lg xl:max-w-screen-sm aspect-video w-full xl:w-auto xl:h-[300px]"
          src={item.url}
          title={item.title}
          frameborder="0"
        />
      {/if}
    </div>
  </div>
</div>

<Drawer id="options" title="Options">
  <div class="pb-4 mb-2 border-b border-gray-600">
    <a
      href="data:text/json;charset=utf-8,{JSON.stringify(item)}"
      download="{item.title}.json"
      class="btn btn-primary w-full">Export Item as JSON</a
    >
  </div>
  <div class="mb-6">
    {#if item.media_type === "image"}
      <a href={item.url} target="_blank" class="btn btn-secondary w-full mb-3"
        >Open Image</a
      >
    {/if}
    <a
      href="data:text;charset=utf-8,{item.explanation}"
      download="{item.title} Explanation.txt"
      class="btn btn-secondary w-full">Export Explanation as TXT</a
    >
  </div>
</Drawer>

<ShareModal
  id="share"
  link={origin + hrefs.viewerDate.replace("slug", item.date)}
></ShareModal>

<FloatElement>
  <label for="share" class="btn btn-secondary">Share</label>
  {#if exitButton}
    <button
      class="btn btn-primary shadow-2xl ms-2"
      on:click={() => {
        dispatch("exit");
        waitForElm(`#${lastItem}`).then((e) =>
          e.scrollIntoView({ block: "center" })
        );
      }}
      >Exit
    </button>
  {/if}
</FloatElement>

<style>
  :global(main) {
    overflow: hidden;
  }
</style>
