<script>
  export let title = "";
  export let id = "drawer";
</script>

<div class="drawer">
  <input {id} type="checkbox" class="drawer-toggle" checked />
  <div class="drawer-side">
    <label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {#if title.length > 0}
        <div class="mb-6">
          <h1 class="font-bold text-2xl">{title}</h1>
        </div>
      {/if}
      <slot />
    </div>
  </div>
</div>
