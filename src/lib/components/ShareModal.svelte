<script>
  import Modal from "./Modal.svelte";
  export let id = "share";
  export let title = "Share";
  export let link = "";
</script>

<Modal {id} {title}>
  <div class="join w-full">
    <button
      class="btn btn-accent rounded-r-none"
      on:click={() => navigator.clipboard.writeText(link)}>Copy Link</button
    >
    <input
      value={link}
      type="text"
      class="input w-full rounded-l-none disabled:cursor-text"
      disabled
    />
  </div>
</Modal>
