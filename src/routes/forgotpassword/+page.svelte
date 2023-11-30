<script>
  import { hrefs } from "$lib/index.js";
  import Title from "$lib/Title.svelte";
  import FormCard from "$lib/components/FormCard.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  import { supabase } from "$lib/supabaseClient.js";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import { createToast } from "../../hooks.client.js";
  import Container from "$lib/components/Container.svelte";
  let toast;
  let progress = false;
  let email = "";

  async function submit() {
    progress = true;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: location.origin + hrefs.passwordreset,
    });
    if (error) console.error(error);
    toast = createToast(
      "info",
      "Instructions sent.",
      `A link with the instructions for resetting your password has been sent to ${email}. Email may take a couple moments to arrive.`,
      10000
    );
  }
</script>

<main>
  <Container>
    <div class="flex justify-center">
      <form on:submit|preventDefault={submit}>
        <FormCard>
          <div class="mb-4">
            <label for="email" class="card-title mb-2">Email</label>
            <FormInput
              type="email"
              required
              bind:value={email}
              placeholder="someone@domain.com"
              id="email"
            />
          </div>
          <div class="card-actions justify-end">
            <button disabled={progress} type="submit" class="btn btn-primary"
              >Send Instructions</button
            >
          </div>
        </FormCard>
      </form>
    </div>
  </Container>
</main>

<ToastSetup {toast} />

<Title title="Forgot Password" />
