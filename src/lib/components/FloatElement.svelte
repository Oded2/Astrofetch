<script>
  export let visible = true;
</script>

{#if visible}
  <div class="m-5 print:invisible z-50 bottom-0 right-0 fixed">
    <slot />
  </div>
{/if}
