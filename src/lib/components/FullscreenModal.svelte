<script>
  import FloatElement from "./FloatElement.svelte";
  export let visible = false;
</script>

{#if visible}
  <div
    class="z-10 min-h-screen w-screen max-w-full overflow-auto absolute top-0 bg-gray-700 h-full"
  >
    <slot />
  </div>
  <FloatElement>
    <button on:click={() => (visible = false)} class="btn btn-neutral"
      >Exit</button
    >
  </FloatElement>
{/if}
