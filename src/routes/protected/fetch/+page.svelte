<script>
  import hrefs from "$lib/hrefs.json";
  import FormCard from "$lib/components/FormCard.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  import {
    createToast,
    dateAdjust,
    dateToStr,
    fetchFromEndpoint,
  } from "../../../hooks.client.js";
  import Title from "$lib/Title.svelte";
  import AstroCard from "$lib/components/AstroCard.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import AstroGridContainer from "$lib/components/AstroGridContainer.svelte";
  export let data;
  const { supabase, session } = data;
  const minDate = "1995-06-16";
  const ogStart = dateToStr(dateAdjustDays(-30));
  const ogEnd = dateToStr();
  const adjustOptions = [7, 30, 365];
  let toast;
  let start = ogStart;
  let end = ogEnd;
  let notes = "";
  let progress = false;
  let fetchComplete = false;
  let items = [];
  async function submit() {
    progress = true;
    items = await fetchFromEndpoint(hrefs.apiNasa, { start, end });
    fetchComplete = true;
    progress = false;
  }
  function reset() {
    start = ogStart;
    end = ogEnd;
    notes = "";
  }
  function dateAdjustDays(days = 0, date = new Date(), max) {
    return dateAdjust(days * 24 * 60 * 60 * 1000, date, max);
  }
</script>

<main>
  <div class="container mx-auto my-10">
    <div class="text-center mb-7">
      <h1 class="text-6xl font-bold">
        Astro<span class="text-accent">Fetch</span>
      </h1>
    </div>
    {#if fetchComplete}
      <div class="mb-5">
        <button class="btn btn-primary" on:click={() => (fetchComplete = false)}
          >New Fetch</button
        >
      </div>
      <AstroGridContainer>
        {#each items as item}
          <AstroCard
            on:duplicate={() =>
              (toast = createToast(
                "error",
                "Duplicate",
                "This item is already in your vault"
              ))}
            on:success={() =>
              (toast = createToast(
                "success",
                "Added to Vault",
                "This item has been added to your vault"
              ))}
            {supabase}
            userId={session.user.id}
            {item}
          />
        {/each}
      </AstroGridContainer>
    {:else}
      <form on:submit|preventDefault={submit}>
        <div class="flex justify-center">
          <FormCard>
            <div class="mb-4">
              <label for="start" class="card-title mb-2">Start Date</label>
              <FormInput
                type="date"
                required
                id="start"
                bind:value={start}
                min={minDate}
                max={dateToStr()}
              />
            </div>
            <div class="mb-4">
              <label for="end" class="card-title mb-2">End Date</label>
              <FormInput
                type="date"
                required
                id="end"
                bind:value={end}
                min={minDate}
                max={dateToStr()}
              />
              <div class="mt-2">
                <fieldset class="grid grid-cols-3 gap-x-3">
                  {#each adjustOptions as option}
                    <button
                      type="button"
                      on:click={() =>
                        (end = dateToStr(
                          dateAdjustDays(option, new Date(start), new Date())
                        ))}
                      disabled={end ==
                        dateToStr(
                          dateAdjustDays(option, new Date(start), new Date())
                        )}
                      class="btn btn-accent text-base"
                      >{option.toLocaleString()} Days
                    </button>
                  {/each}
                </fieldset>
              </div>
            </div>
            <div class="card-actions justify-around">
              <button
                type="button"
                class="btn btn-secondary px-10"
                on:click={reset}>Reset</button
              >
              <button
                type="submit"
                disabled={progress}
                class="btn btn-primary px-10">Submit</button
              >
            </div>
          </FormCard>
        </div>
      </form>
    {/if}
  </div>
</main>

<ToastSetup {toast} />

<Title title="Fetch" />
