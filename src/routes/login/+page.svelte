<script>
  import FormInput from "$lib/components/FormInput.svelte";
  import SignupCard from "../../lib/components/cards/SignupCard.svelte";
  let email = "";
  let password = "";
  let inProgress = false;
</script>

<main>
  <div class="container mx-auto my-10">
    <div class="flex justify-center">
      <SignupCard>
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
      </SignupCard>
    </div>
  </div>
</main>
