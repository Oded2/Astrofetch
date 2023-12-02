<script>
  import Title from "$lib/Title.svelte";
  import Container from "$lib/components/Container.svelte";
  import ItemViewer from "$lib/components/ItemViewer.svelte";
  import { onMount } from "svelte";

  export let data;
  const { item } = data;
  let mount = false;
  onMount(() => (mount = true));
</script>

<main class="bg-gray-950 overflow-hidden">
  <Container margin={false} padding={false}>
    <ItemViewer {item} exitButton={false} allowShare={mount}></ItemViewer>
  </Container>
</main>

<Title title={item.title} />
