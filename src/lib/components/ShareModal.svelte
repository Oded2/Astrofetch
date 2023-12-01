<script>
  import Modal from "./Modal.svelte";
  export let id = "share";
  export let title = "Share";
  export let link = "";

  let copyText = link;
</script>

<Modal {id} {title}>
  <div class="join w-full">
    <button
      class="btn btn-accent rounded-r-none"
      on:click={() => {
        navigator.clipboard.writeText(link);
        copyText = "Link copied to clipboard";
        setTimeout(() => (copyText = link), 3000);
      }}>Copy Link</button
    >
    <input
      value={copyText}
      type="text"
      class="input w-full rounded-l-none disabled:cursor-text"
      disabled
    />
  </div>
</Modal>
