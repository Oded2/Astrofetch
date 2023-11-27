<script>
  import Container from "./../../lib/components/Container.svelte";
  import hrefs from "$lib/hrefs.json";
  import { goto } from "$app/navigation";
  import FormInput from "$lib/components/FormInput.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import { createToast } from "../../hooks.client.js";
  import FormCard from "$lib/components/FormCard.svelte";
  import Title from "$lib/Title.svelte";
  export let data;
  const { supabase } = data;
  let toast;
  let email = "";
  let password = "";
  let progress = false;
  async function submit() {
    progress = true;
    const error = await handleLogin();
    progress = false;
    if (error) {
      toast = createToast("error", "Error", error.message, 5000);
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
  <Container>
    <div class="flex justify-center">
      <FormCard>
        <form on:submit|preventDefault={submit}>
          <div class="mb-4">
            <label for="email" class="card-title mb-2">Email</label>
            <FormInput
              id="email"
              required
              bind:value={email}
              type="email"
              placeholder="someone@domain.com"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="card-title mb-2">Password</label>
            <FormInput
              id="password"
              required
              bind:value={password}
              type="password"
              min="8"
              max="50"
            />
            <div class="mt-2 font-light text-sm">
              <a href={hrefs.forgotpassword} class="underline"
                >Forgot Password?</a
              >
            </div>
          </div>
          <div class="card-actions">
            <button
              disabled={progress}
              type="submit"
              class="btn btn-primary text-lg w-full">Login</button
            >
          </div>
        </form>
      </FormCard>
    </div>
  </Container>
</main>

<ToastSetup {toast} />

<Title title="Login" />
