<script>
  import Title from "$lib/Title.svelte";
  import Container from "$lib/components/Container.svelte";
  import Drawer from "$lib/components/Drawer.svelte";
  import { formatDate } from "../../hooks.client.js";

  export let data;
  const { item } = data;

  function formatDateStr(str = "") {
    return formatDate(new Date(str));
  }
</script>

<main class="bg-gray-950 overflow-hidden">
  <Container margin={false} padding={false}>
    <div class="hero min-h-screen">
      <div class="hero-content flex-col xl:flex-row">
        <div class="text-center xl:text-left">
          <h1 class="text-5xl font-bold pb-2">{item.title}</h1>
          <h2 class="text-xl pb-4 font-semibold">{formatDateStr(item.date)}</h2>
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
        {#if item.media_type === "image" || item.media_type === "video"}
          <div class="mb-10 sm:mb-0 w-full">
            {#if item.media_type === "video"}
              <iframe
                class="rounded-lg lg:max-w-screen-sm aspect-video"
                src={item.url}
                title={item.title}
                frameborder="0"
              />
            {/if}
            {#if item.media_type === "image"}
              <img
                class="rounded-xl shadow-2xl lg:min-w-[32rem] m-auto w-full lg:w-auto lg:max-w-screen-md sm:hover:scale-110 transition-all"
                src={item.url}
                alt={item.title}
              />
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </Container>
</main>

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

<Title title={item.title} />

<style>
  img {
    max-height: 95vh;
  }
  iframe {
    height: 300px;
    width: auto;
  }
</style>
