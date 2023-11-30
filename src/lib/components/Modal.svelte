<script>
  export let id = "modal";
  export let title = "";
</script>

<input type="checkbox" {id} class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    {#if title.length > 0}
      <h3 class="font-bold text-lg mb-3">{title}</h3>
    {/if}
    <slot />
    <div class="modal-action">
      <label for={id} class="btn">Close</label>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <label for={id}>close</label>
  </form>
</div>
