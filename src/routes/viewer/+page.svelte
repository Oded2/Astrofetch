<script>
  import Title from "$lib/Title.svelte";
  import { formatDate } from "../../hooks.client.js";

  export let data;
  const { item } = data;
  function formatDateStr(str = "") {
    return formatDate(new Date(str));
  }
</script>

<main class="bg-gray-950">
  <div class="container mx-auto">
    <div class="hero min-h-screen">
      <div class="hero-content flex-col xl:flex-row">
        <div class="text-center xl:text-left">
          <h1 class="text-5xl font-bold pb-2">{item.title}</h1>
          <h2 class="text-xl pb-4 font-semibold">{formatDateStr(item.date)}</h2>
          <p class="text-lg pb-3 text-left">
            {item.explanation}
          </p>
          {#if item.copyright}
            <h2 class="text-xl">&copy; {item.copyright}</h2>
          {/if}
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
            class="rounded-2xl shadow-2xl md:max-w-screen-md hover:scale-110 transition-all"
            src={item.url}
            alt={item.title}
          />
        {/if}
      </div>
    </div>
  </div>
</main>

<Title title={item.title} />

<style>
  img {
    max-height: 90vh;
  }
  div.h-custom {
    height: 32rem;
  }
</style>
