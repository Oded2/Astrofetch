<script>
  export let activeUrl = "";
  export let href = "";
  export let preload = "hover";
</script>

<li>
  <a
    data-sveltekit-preload-data={preload}
    class:text-accent={activeUrl === href}
    {href}><slot /></a
  >
</li>
