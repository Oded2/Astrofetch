<script>
  import Title from "$lib/Title.svelte";
  import Container from "$lib/components/Container.svelte";
  import ItemViewer from "$lib/components/ItemViewer.svelte";

  export let data;
  const { item, message } = data;
</script>

<main class="bg-gray-950 overflow-hidden">
  <Container margin={false} padding={false}>
    <ItemViewer {message} {item} exitButton={false}></ItemViewer>
  </Container>
</main>

<Title title={item.title} />
