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

<main class="bg-gray-950">
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
          {#if item.media_type === "video"}
            <div class="h-custom mt-6">
              <iframe
                class="w-full h-full rounded-lg"
                src={item.url}
                title={item.title}
                frameborder="0"
              />
            </div>
          {/if}
        </div>
        {#if item.media_type === "image"}
          <img
            class="rounded-2xl shadow-2xl lg:max-w-screen-md sm:hover:scale-110 transition-all"
            src={item.url}
            alt={item.title}
          />
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
    max-height: 90vh;
  }
  div.h-custom {
    height: 32rem;
  }
</style>
