<script>
  import FloatElement from "./FloatElement.svelte";
  export let visible = true;
</script>

{#if visible}
  <div class="z-10 min-h-screen w-screen absolute top-0 bg-gray-700 h-full">
    <slot />
  </div>
  <FloatElement>
    <button on:click class="btn btn-neutral">Exit</button>
  </FloatElement>
{/if}
