<script>
  export let title = "";
  export let width = true;
</script>

<div class="h-full card bg-gray-900 shadow-xl mb-5" class:w-96={width}>
  <div class="card-body">
    {#if title.length > 0}
      <div class="mb-4">
        <h1 class="font-bold text-xl">{title}</h1>
      </div>
    {/if}
    <slot />
  </div>
</div>
