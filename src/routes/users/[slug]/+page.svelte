<script>
  import AstroCard from "$lib/components/AstroCard.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import {
    createToast,
    calculateMinutes,
    GetSortOrder,
    waitForElm,
  } from "../../../hooks.client.js";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import AstroGridContainer from "$lib/components/AstroGridContainer.svelte";
  import Title from "$lib/Title.svelte";
  import Container from "$lib/components/Container.svelte";
  import ItemViewer from "$lib/components/ItemViewer.svelte";
  import { hrefs } from "$lib/index.js";
  export let data;
  const { supabase, session, profile } = data;
  let { items } = data;

  const isPersonal = session ? profile.user_id === session.user.id : false;
  const maxItems = 12;
  const pageBreakpoint = 5;
  const maxPage = parseInt(
    items.length / maxItems + (items.length % maxItems != 0 ? 1 : 0)
  );
  let currentPage = 1;
  let sortBy = "date";
  let reversed = false;
  items = items.sort(GetSortOrderCustom("date", true));
  let toast;
  let progress = false;
  let view = false;
  let viewItem = {};
  let lastItem = "";
  $: divider = parseInt((currentPage - 1) / pageBreakpoint) * pageBreakpoint;
  function remove(item = {}) {
    if (isPersonal)
      for (const i in items)
        if (items[i].data === item.data) items.splice(i, 1);

    items = items;
  }
  function GetSortOrderCustom(prop, reverse = false) {
    return function (a, b) {
      if (a["data"][prop] > b["data"][prop]) {
        return reverse ? -1 : 1;
      } else if (a["data"][prop] < b["data"][prop]) {
        return reverse ? 1 : -1;
      }
      return 0;
    };
  }
  function calculateAgeStr(str = "") {
    const date = new Date(str);
    const minutes = calculateMinutes(date, new Date());
    return Math.floor(minutes / 60 / 24 / 365.25);
  }
</script>

<main class:bg-gray-950={view}>
  <Container padding={!view} margin={!view}>
    {#if view}
      <ItemViewer
        item={viewItem}
        {lastItem}
        on:exit={() => {
          view = false;
        }}
      ></ItemViewer>
    {:else}
      <div class="text-center mb-7">
        <h1 class="text-6xl font-bold mb-2">
          {`${profile.display_name}'s`} <span class="text-accent">Vault</span>
        </h1>
        {#if profile.bio.length > 0}
          <h4 class="text-xl">{profile.bio}</h4>
        {/if}
        {#if profile.birthday}
          <h4 class="text-xl">
            <a
              data-sveltekit-preload-data="off"
              data-sveltekit-reload
              href={hrefs.birthday.replace("slug", profile.username)}
              >{calculateAgeStr(profile.birthday)} Years Old</a
            >
          </h4>
        {/if}
      </div>
      <div class="mb-7">
        <h5 class="text-lg font-semibold mb-3">
          Username: {profile.username}
        </h5>
        <label class="sm:flex font-bold text-xl" for="sort">Sort</label>
        <div>
          <select
            bind:value={sortBy}
            on:change={() => {
              if (sortBy === "date")
                items.sort(GetSortOrderCustom("date", !reversed));
              else if (sortBy === "dateAdded")
                items.sort(GetSortOrder("created_at", !reversed));
              else if (sortBy === "title")
                items.sort(GetSortOrderCustom("title", reversed));
              items = items;
            }}
            id="sort"
            class="select select-bordered w-full max-w-xs"
          >
            <option value="date" selected>Date</option>
            <option value="dateAdded">Date Added</option>
            <option value="title">Title</option>
          </select>

          <button
            type="button"
            class="btn btn-secondary sm:ml-1 mt-2"
            title="Reverse"
            on:click={() => {
              reversed = !reversed;
              items = items.reverse();
            }}
          >
            <i class="fa-solid fa-right-left"></i>
          </button>
        </div>
      </div>
      {#if items.length > maxItems}
        <div class="mb-7">
          <div class="join">
            <button
              class="join-item btn btn-secondary"
              disabled={currentPage == 1}
              on:click={() => currentPage--}>&laquo;</button
            >
            {#each { length: maxPage + (maxPage > pageBreakpoint ? pageBreakpoint % maxPage : 0) } as _, index}
              {#if divider + pageBreakpoint >= index + 1 && index + 1 > divider}
                <button
                  class="join-item btn btn-secondary"
                  class:btn-active={index + 1 == currentPage}
                  disabled={index + 1 > maxPage}
                  on:click={() => (currentPage = index + 1)}
                  >{index + 1 <= maxPage ? index + 1 : "-"}
                </button>
              {/if}
            {/each}
            <button
              class="join-item btn btn-secondary"
              disabled={currentPage == maxPage}
              on:click={() => currentPage++}>&raquo;</button
            >
          </div>
        </div>
      {/if}
      <div class="border-b border-b-gray-600 pb-9">
        <AstroGridContainer>
          {#each items as item, index (item)}
            <div
              id={`item${index}`}
              class:absolute={!(
                index < currentPage * maxItems &&
                index >= currentPage * maxItems - maxItems
              )}
              animate:flip={{ duration: 200 }}
              transition:fade={{ duration: 200 }}
            >
              {#if index < currentPage * maxItems && index >= currentPage * maxItems - maxItems}
                <AstroCard
                  {isPersonal}
                  {supabase}
                  userId={session ? session.user.id : ""}
                  item={item.data}
                  dateVaulted={item.created_at}
                  {progress}
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
                  on:delete={() => remove(item)}
                  on:view={() => {
                    lastItem = `item${index}`;
                    viewItem = item.data;
                    document.body.scrollIntoView();
                    view = true;
                  }}
                />
              {/if}
            </div>
          {/each}
        </AstroGridContainer>
      </div>
    {/if}
  </Container>
</main>

<ToastSetup {toast} />

<Title title={`${profile.display_name}'s Vault`} />
