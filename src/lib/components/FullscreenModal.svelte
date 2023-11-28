<script>
  import FloatElement from "./FloatElement.svelte";
  import { createEventDispatcher } from "svelte";
  export let visible = true;
  const dispatch = createEventDispatcher();
</script>

{#if visible}
  <div class="z-10 min-h-screen w-screen absolute top-0 bg-gray-700 h-full">
    <slot />
  </div>
  <FloatElement>
    <button on:click={dispatch("exit")} class="btn btn-neutral">Exit</button>
  </FloatElement>
{/if}

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
