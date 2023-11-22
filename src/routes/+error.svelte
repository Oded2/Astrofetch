<script>
  import { page } from "$app/stores";
  import Title from "$lib/Title.svelte";
  const url = $page;
</script>

<main>
  <div class="container mx-auto py-10">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">{`${url.status} Error`}</h1>
      <h2 class="text-3xl">{url.error.message}</h2>
    </div>
  </div>
</main>

<Title title={`${url.status} Error`} />
