<script>
  import AccordionItem from "$lib/components/AccordionItem.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  import hrefs from "$lib/hrefs.json";
  import Title from "$lib/Title.svelte";
  import { addParamsString, createToast } from "../hooks.client.js";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import { goto } from "$app/navigation";
  import HomeCard from "$lib/components/HomeCard.svelte";
  import sample1 from "$lib/images/med_sample1.png";
  import sample2 from "$lib/images/med_sample2.png";
  import sample3 from "$lib/images/med_sample3.png";
  import sample4 from "$lib/images/med_sample4.png";
  import Container from "$lib/components/Container.svelte";

  export let data;
  const { supabase, session } = data;
  const formspree = "https://formspree.io/f/meqbwbjl";

  let toast;
  let progress = false;
  let email = session ? session.user.email : "";
  let name = "";
  let topic = "";
  let message = "";
  let userSearch = "";

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
        topic,
        name,
        message,
      }),
    });
    progress = false;
    toast = createToast("success", "Success", "Message sent successfully");
    topic = "";
    message = "";
  }
  function gotoProgress(href = "") {
    progress = true;
    goto(href);
  }
</script>

<main>
  <Container>
    <div class="w-full text-center mb-10">
      <h1 class="text-7xl font-semibold mb-6">
        Explore the <span class="text-accent">Universe</span>
      </h1>
      <h2 class="text-lg">
        Explore various Astronomy Picture of the Day throughout the years
        seamlessly.
      </h2>
    </div>
    <div class="sm:grid grid-cols-2 gap-24 mb-10 px-5 sm:px-0">
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
      {#if session}
        <button
          disabled={progress}
          on:click={async () => {
            progress = true;
            const { data } = await supabase
              .from("profiles")
              .select("username")
              .eq("user_id", session.user.id);
            const username = data[0].username;
            goto(hrefs.profile.replace("slug", username));
          }}
          class="btn btn-secondary btn-lg w-full shadow-xl"
          ><i class="fa-solid fa-vault"></i> View Vault</button
        >
      {:else}
        <a
          href={hrefs.login}
          class="btn btn-secondary btn-lg w-full shadow-xl"
          class:btn-disabled={progress}
        >
          Login
        </a>
      {/if}
    </div>
    <div class="bg-gray-900 p-4 rounded-xl mb-10">
      <form
        class="text-center sm:text-left"
        on:submit|preventDefault={() =>
          gotoProgress(hrefs.profile.replace("slug", userSearch))}
      >
        <div class="mb-2">
          <label for="search" class=" font-bold text-xl">Profile Search</label>
        </div>
        <FormInput
          type="text"
          id="search"
          placeholder="Username"
          required
          max="50"
          bind:value={userSearch}
        />
        <div class="mt-3">
          <button
            type="submit"
            disabled={progress}
            class="btn btn-primary w-full max-w-xs">Search</button
          >
        </div>
      </form>
    </div>
    <div class="mb-10">
      <AccordionItem checked header="What is AstroFetch?">
        <p class="text-lg">
          AstroFetch is a project built on Svelte and DaisyUI that allows you to
          seamlessly use NASA's Api without any hassle to view the Astronomy
          Picture of the Day (APOD) and save them to your vault.
        </p>
      </AccordionItem>
      <AccordionItem header="How do I use AstroFetch?">
        <p class="text-lg">
          To use AstroFetch, simply <a class="underline" href={hrefs.login}
            >login</a
          >
          and navigate to the
          <a class="underline" href={hrefs.fetch}>fetch</a> page.
        </p>
      </AccordionItem>
      <AccordionItem header="Development">
        <p class="text-lg">
          As of now, AstroFetch is open source with the source code available on <a
            href={hrefs.exGithub}
            class="underline">GitHub</a
          >. AstroFetch may or not be open source in the future.
        </p>
      </AccordionItem>
      <AccordionItem header="Contact">
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
            <label for="topic" class="card-title mb-2">Topic</label>
            <FormInput
              type="text"
              id="topic"
              placeholder="The topic of your message"
              required
              bind:value={topic}
            />
          </div>
          <div class="mb-4">
            <label for="message" class="card-title mb-2">Message</label>
            <FormInput
              type="textarea"
              rows="3"
              cols="0"
              required
              placeholder="Type your message here"
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
    <div class="bg-gray-900 rounded-xl p-5">
      <h1 class="text-4xl font-bold mb-2">Features</h1>
      <h3 class="text-lg">
        Explore the various features that AstroFetch has to offer.
      </h3>
      <div class="my-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <HomeCard
            title="Easy to Use"
            image={sample1}
            description="Seamlessly browse the daily photos by simply logging in."
          ></HomeCard>
          <HomeCard
            title="Immersive Image Viewer"
            image={sample2}
            description="Explore and share images even further with the built in image viewer."
          ></HomeCard>
          <HomeCard
            title="100% Free"
            image={sample3}
            description="Explore the universe for hours without worrying about any annoying paywalls."
          ></HomeCard>
          <HomeCard
            title="Share Your Favorites"
            image={sample4}
            description="Share your vault full of your saved pictures to anyone, at anytime."
          ></HomeCard>
        </div>
      </div>
    </div>
  </Container>
</main>

<ToastSetup {toast} />

<Title title="Home" />
