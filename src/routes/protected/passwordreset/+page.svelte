<script>
  import hrefs from "$lib/hrefs.json";
  import { goto } from "$app/navigation";
  import Title from "$lib/Title.svelte";
  import FormCard from "$lib/components/FormCard.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  export let data;
  const { supabase } = data;
  let password = "";
  let confirm = "";
  let progress = false;
  async function submit() {
    if (!verify()) return;
    progress = true;
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      console.error(error);
      return;
    }
    goto(hrefs.home);
  }
  function verify() {
    if (password.length < 8 || password.length > 50) return false;
    if (password !== confirm) return false;
    return true;
  }
</script>

<main>
  <div class="container mx-auto my-10">
    <div class="flex justify-center">
      <form on:submit|preventDefault={submit}>
        <FormCard>
          <div class="mb-4">
            <label for="password" class="card-title mb-3">New Password</label>
            <FormInput
              type="password"
              required
              id="password"
              min="8"
              max="50"
              bind:value={password}
            />
            <div class="mt-2 font-light text-sm">
              Must be between 8 to 50 characters long.
            </div>
          </div>
          <div class="mb-4">
            <label for="confirm" class="card-title mb-3">Confirm Password</label
            >
            <FormInput
              type="password"
              required
              id="confirm"
              min="8"
              max="50"
              error={password !== confirm && confirm.length > 0}
              bind:value={confirm}
            />
          </div>
          <div class="card-actions">
            <button
              type="submit"
              disabled={progress}
              class="btn btn-primary w-full">Reset Password</button
            >
          </div>
        </FormCard>
      </form>
    </div>
  </div>
</main>

<Title title="Reset Password" />
