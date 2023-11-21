<script>
  import AccordionItem from "$lib/components/AccordionItem.svelte";
  import hrefs from "$lib/hrefs.json";
  import Title from "$lib/Title.svelte";
  export let data;
  const { session } = data;
</script>

<main>
  <div class="container mx-auto my-20">
    <div class="w-full text-center mb-10">
      <h1 class="text-7xl font-semibold mb-6">
        Explore the <span class="text-accent">Universe</span>
      </h1>
      <h2 class="text-lg">
        Search a photo from any date hassle free, on AstroFetch
      </h2>
    </div>
    <div class="md:grid grid-cols-2 gap-24 mb-10 px-5 md:px-0">
      <div>
        <a
          href={session ? hrefs.fetch : hrefs.signup}
          class="btn btn-primary btn-lg w-full mb-5 shadow-xl"
        >
          {#if session}
            <i class="fa-solid fa-rss" /> New Fetch
          {:else}
            Create Account
          {/if}
        </a>
      </div>

      <div>
        <a
          href={session ? hrefs.vault : hrefs.login}
          class="btn btn-secondary btn-lg w-full shadow-xl"
        >
          {#if session}
            <i class="fa-solid fa-vault" /> View Vault
          {:else}
            Login
          {/if}
        </a>
      </div>
    </div>
    <div>
      <AccordionItem checked header="What is AstroFetch?">
        <p class="text-lg">
          AstroFetch is a side project built on Svelte and DaisyUI that allows
          you to seamlessly use NASA's Api without any hassle to view the
          Astronomy Picture of the Day (APOD) and save them to your vault.
        </p>
      </AccordionItem>
      <AccordionItem header="How do I use AstroFetch?">
        <p class="text-lg">
          To use AstroFetch, simply <a class="underline" href={hrefs.login}
            >login</a
          >
          click on the
          <a class="underline" href={hrefs.fetch}>fetch</a> button.
        </p>
      </AccordionItem>
      <AccordionItem header="Contact">
        <p class="text-lg">
          If you wish to contact me, feel free to use the one-click contact
          form.
        </p>
      </AccordionItem>
    </div>
  </div>
</main>

<Title title="Home" />
