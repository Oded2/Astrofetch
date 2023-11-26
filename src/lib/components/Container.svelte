<script>
  export let margin = true;
  export let padding = true;
</script>

<div
  class="container mx-auto {padding ? 'px-2 sm:px-0' : ''}"
  class:my-10={margin}
>
  <slot />
</div>
