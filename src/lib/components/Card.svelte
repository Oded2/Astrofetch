<script>
  export let image = "";
  export let title = "";
  export let description = "";
</script>

<div class="card bg-secondary shadow-xl image-full">
  {#if image.length > 0}
    <figure>
      <img class="aspect-square" src={image} alt={title} />
    </figure>
  {/if}
  <div class="card-body">
    <h2 class="card-title underline underline-offset-4">{title}</h2>
    <p>{description}</p>
    <div class="card-actions justify-end">
      <slot />
    </div>
  </div>
</div>
