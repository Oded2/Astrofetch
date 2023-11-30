<script>
  import { createEventDispatcher } from "svelte";
  import FloatElement from "./FloatElement.svelte";
  export let visible = true;
  const dispatch = createEventDispatcher();
</script>

{#if visible}
  <div
    class="z-10 min-h-screen w-screen max-w-full overflow-auto absolute top-0 bg-gray-700 h-full"
  >
    <slot />
  </div>
  <FloatElement>
    <button on:click={() => dispatch("exit")} class="btn btn-neutral"
      >Exit</button
    >
  </FloatElement>
{/if}
