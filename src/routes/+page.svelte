<script>
  import AccordionItem from "$lib/components/AccordionItem.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  import hrefs from "$lib/hrefs.json";
  import Title from "$lib/Title.svelte";
  import { createToast } from "../hooks.client.js";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  export let data;
  const { session } = data;
  const formspree = "https://formspree.io/f/meqbwbjl";
  let toast;
  let progress = false;
  let email = session ? session.user.email : "";
  let name = "";
  let message = "";
  async function contact() {
    progress = true;
    await fetch(formspree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        message,
      }),
    });
    progress = false;
    toast = createToast("success", "Success", "Message sent successfully");
    message = "";
  }
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
      <AccordionItem header="Contact" checked>
        <form on:submit|preventDefault={contact}>
          <div class="mb-4">
            <label for="email" class="card-title mb-2">Email</label>
            <FormInput
              type="email"
              id="email"
              placeholder="someone@domain.com"
              required
              bind:value={email}
            />
          </div>
          <div class="mb-4">
            <label for="name" class="card-title mb-2">Name</label>
            <FormInput
              type="text"
              id="name"
              placeholder="Your name"
              required
              bind:value={name}
            />
          </div>
          <div class="mb-4">
            <label for="message" class="card-title mb-2">Message</label>
            <FormInput
              type="textarea"
              rows="3"
              cols="0"
              required
              id="message"
              bind:value={message}
            />
          </div>
          <div class="card-actions justify-end">
            <button
              disabled={progress}
              type="submit"
              class="btn btn-primary px-10">Submit</button
            >
          </div>
        </form>
      </AccordionItem>
    </div>
  </div>
</main>

<ToastSetup {toast} />

<Title title="Home" />
