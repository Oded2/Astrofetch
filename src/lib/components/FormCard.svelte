<script>
  export let title = "";
</script>

<div class="h-full card w-96 bg-gray-900 shadow-xl mb-5">
  <div class="card-body">
    {#if title.length > 0}
      <div class="mb-4">
        <h1 class="font-bold text-xl">{title}</h1>
      </div>
    {/if}
    <slot />
  </div>
</div>
