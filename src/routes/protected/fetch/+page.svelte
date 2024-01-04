<script>
  import ItemViewer from "$lib/components/ItemViewer.svelte";
  import { hrefs } from "$lib/index.js";
  import FormCard from "$lib/components/FormCard.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  import {
    createToast,
    dateAdjust,
    dateToStr,
    fetchFromEndpoint,
    formatDate,
    randomNum,
    waitForElm,
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
  let view = false;
  let viewItem = {};
  let lastItem = "";

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
    const temp = await response.json();
    if (!temp[0]) {
      toast = createToast(
        "error",
        "Error",
        "An API error has occured, please try again.",
        5000
      );
      progress = false;
      return;
    }
    items = temp;
    fetchComplete = true;
    progress = false;
  }
  function dateAdjustDays(days = 0, date = new Date(), max) {
    return dateAdjust(days * 24 * 60 * 60 * 1000, date, max);
  }
  function getRandomDate(startDate, endDate) {
    const startTimestamp = new Date(startDate).valueOf();
    const endTimestamp = new Date(endDate).valueOf();
    const randomTimestamp = randomNum(startTimestamp, endTimestamp);
    const randomDate = new Date(randomTimestamp);
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const day = String(randomDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
</script>

<main class:bg-gray-950={view}>
  <Container padding={!view} margin={!view}>
    {#if view}
      <ItemViewer
        item={viewItem}
        on:exit={() => {
          view = false;
          waitForElm(`#${lastItem}`).then((event) => {
            event.scrollIntoView({ block: "center" });
          });
        }}
      ></ItemViewer>
    {:else}
      <div class="text-center mb-7">
        <h1 class="text-6xl font-bold">
          Astro<span class="text-accent">Fetch</span>
        </h1>
      </div>
      {#if fetchComplete}
        <div class="mb-3">
          <button
            type="button"
            class="btn btn-primary"
            on:click={() => (fetchComplete = false)}>New Fetch</button
          >
          <button
            type="button"
            class="btn btn-secondary ml-2"
            on:click={() => (items = items.reverse())}
          >
            <i class="fa-solid fa-right-left"></i>
          </button>
        </div>
        <div class="mb-5">
          <span class="font-bold"
            >{formatDateStr(start)} to {formatDateStr(end)}</span
          >
        </div>
        <AstroGridContainer>
          {#each items as item, index (item)}
            <div id={`item${index}`}>
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
                on:view={() => {
                  lastItem = `item${index}`;
                  viewItem = item;
                  view = true;
                }}
              />
            </div>
          {/each}
        </AstroGridContainer>
      {:else}
        <form on:submit|preventDefault={submit}>
          <div class="flex justify-center">
            <FormCard width={false}>
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
                <div class="mt-2 grid grid-cols-3 gap-x-3">
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
    {/if}
  </Container>
</main>

<ToastSetup {toast} />

<Title title="Fetch" />
