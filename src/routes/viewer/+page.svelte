<script>
  import Title from "$lib/Title.svelte";

  export let data;
  const { item } = data;
</script>

<main class="absolute top-0 left-0 w-full">
  <div class="hero min-h-screen" style="background-image: url({item.url});">
    <div class="hero-overlay bg-opacity-60" />
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-96">
        <h1 class="mb-5 text-5xl font-bold">{item.title}</h1>
        <p class="mb-5">
          {item.explanation}
        </p>
        <!-- <button class="btn btn-primary">Get Started</button> -->
      </div>
    </div>
  </div>
</main>

<Title title={item.title} />
