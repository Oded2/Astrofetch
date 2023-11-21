<script>
  import hrefs from "$lib/hrefs.json";
  import { goto } from "$app/navigation";
  import FormInput from "$lib/components/FormInput.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import { createToast } from "../../hooks.client.js";
  import FormCard from "$lib/components/FormCard.svelte";
  export let data;
  const { supabase } = data;
  let toast;
  let email = "";
  let password = "";
  let inProgress = false;
  async function submit() {
    inProgress = true;
    const error = await handleLogin();
    inProgress = false;
    if (error) {
      toast = createToast("error", "Error", error.message);
      return;
    }
    goto(hrefs.home);
  }
  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error;
  }
</script>

<main>
  <div class="container mx-auto my-10">
    <div class="flex justify-center">
      <FormCard>
        <form on:submit|preventDefault={submit}>
          <div class="mb-4">
            <label for="email" class="card-title mb-2">Email</label>
            <FormInput
              required={true}
              bind:value={email}
              type="email"
              placeholder="someone@domain.com"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="card-title mb-2">Password</label>
            <FormInput
              required={true}
              bind:value={password}
              type="password"
              min="8"
              max="50"
            />
          </div>
          <div class="card-actions">
            <button
              disabled={inProgress}
              type="submit"
              class="btn btn-primary text-lg w-full">Login</button
            >
          </div>
        </form>
      </FormCard>
    </div>
  </div>
</main>

<ToastSetup {toast} />
