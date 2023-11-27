<script>
  import hrefs from "$lib/hrefs.json";
  import FormCard from "$lib/components/FormCard.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  import {
    createToast,
    dateAdjust,
    dateToStr,
    fetchFromEndpoint,
    formatDate,
  } from "../../../hooks.client.js";
  import Title from "$lib/Title.svelte";
  import AstroCard from "$lib/components/AstroCard.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import AstroGridContainer from "$lib/components/AstroGridContainer.svelte";
  import Container from "$lib/components/Container.svelte";
  export let data;
  const { supabase, session } = data;
  const minDate = "1995-06-16";
  const ogStart = dateToStr(dateAdjustDays(-30));
  const ogEnd = dateToStr();
  const adjustOptions = [7, 30, 100];
  let toast;
  let start = ogStart;
  let end = ogEnd;
  let progress = false;
  let fetchComplete = false;
  let items = [];

  function verify() {
    return start < end;
  }

  function formatDateStr(str = "") {
    return formatDate(new Date(str), { month: "long", day: "numeric" });
  }
  async function submit() {
    if (!verify()) return;
    progress = true;
    const response = await fetchFromEndpoint(hrefs.apiNasa, { start, end });
    items = await response.json();
    fetchComplete = true;
    progress = false;
  }
  function dateAdjustDays(days = 0, date = new Date(), max) {
    return dateAdjust(days * 24 * 60 * 60 * 1000, date, max);
  }
  function getRandomDate(startDate, endDate) {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();
    const randomTimestamp =
      startTimestamp + Math.random() * (endTimestamp - startTimestamp + 1); // +1 to include the end date
    const randomDate = new Date(randomTimestamp);
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const day = String(randomDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
</script>

<main>
  <Container>
    <div class="text-center mb-7">
      <h1 class="text-6xl font-bold">
        Astro<span class="text-accent">Fetch</span>
      </h1>
    </div>
    {#if fetchComplete}
      <div class="mb-3">
        <button class="btn btn-primary" on:click={() => (fetchComplete = false)}
          >New Fetch</button
        >
      </div>
      <div class="mb-5">
        <span class="font-bold"
          >{formatDateStr(start)} to {formatDateStr(end)}</span
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
                error={start > end}
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
                      disabled={end.length > 0 &&
                        start.length > 0 &&
                        end ==
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
                type="submit"
                disabled={progress}
                class="btn btn-primary w-full"
              >
                {#if progress}
                  <span class="loading loading-spinner loading-lg"></span>
                {:else}
                  Fetch
                {/if}
              </button>
              <button
                type="button"
                class="btn btn-secondary w-full"
                disabled={start === ogStart && end === ogEnd}
                on:click={() => {
                  start = ogStart;
                  end = ogEnd;
                }}>Reset</button
              >
              <button
                type="button"
                class="btn btn-accent w-full"
                on:click={() => {
                  start = getRandomDate(minDate, dateToStr());
                  end = dateToStr(dateAdjustDays(30, new Date(start)));
                }}>Randomize</button
              >
            </div>
          </FormCard>
        </div>
      </form>
    {/if}
  </Container>
</main>

<ToastSetup {toast} />

<Title title="Fetch" />
