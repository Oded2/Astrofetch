<script>
  import Title from "$lib/Title.svelte";
  import Container from "$lib/components/Container.svelte";
  import ItemViewer from "$lib/components/ItemViewer.svelte";
  import { onMount } from "svelte";

  export let data;
  const { item } = data;
  let origin;
  onMount(() => (origin = location.origin));
</script>

<main class="bg-gray-950 overflow-hidden">
  <Container margin={false} padding={false}>
    {#if origin}
      <ItemViewer {item} exitButton={false}></ItemViewer>
    {/if}
  </Container>
</main>

<Title title={item.title} />
