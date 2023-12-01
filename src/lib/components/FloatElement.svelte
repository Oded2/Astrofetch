<script>
  export let visible = true;
</script>

{#if visible}
  <div class=" mt-10 md:mt-0">
    <div class="mx-5 mb-5 print:invisible z-50 bottom-0 right-0 fixed">
      <slot />
    </div>
  </div>
{/if}
