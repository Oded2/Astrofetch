<script>
  export let image = "";
  export let title = "";
  export let description = "";
</script>

<div class="card shadow-xl image-full h-full">
  {#if image.length > 0}
    <figure>
      <img class="aspect-square" src={image} alt={title} />
    </figure>
  {/if}
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p class="text-xl">{description}</p>
    <div class="card-actions justify-end">
      <slot />
    </div>
  </div>
</div>
