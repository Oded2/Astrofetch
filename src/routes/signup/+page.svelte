<script>
  import FormInput from "$lib/components/FormInput.svelte";
  import SignupCard from "$lib/components/cards/SignupCard.svelte";
  import { dateToStr } from "../../hooks.client.js";
  const today = dateToStr();
  let email = "";
  let username = "";
  let displayName = "";
  let dob = "";
  let password = "";
  let confirmPassword = "";
  let inProgress = false;
  $: validpass = password === confirmPassword;
  function submit() {
    function verify() {
      if (username.length == 0) return false;
      if (username.length > 50) return false;
      if (displayName.length == 0) return false;
      if (displayName.length > 50) return false;
      if (dob > today) return false;
      if (password.length < 8) return false;
      if (!validpass) return false;
      return true;
    }
    if (!verify()) {
      alert("Invalid Credentials");
      return;
    }
    alert("Form Submitted");
  }
</script>

<main>
  <div class="container mx-auto my-10">
    <form on:submit={submit}>
      <div class="grid lg:grid-cols-2 gap-4">
        <div class="flex justify-center lg:justify-end">
          <SignupCard>
            <div class="mb-4">
              <label for="email" class="card-title mb-2">Email</label>
              <FormInput
                required={true}
                type="email"
                id="email"
                placeholder="someone@domain.com"
                bind:value={email}
              />
            </div>
            <div class="mb-4">
              <label for="username" class="card-title mb-2">Username</label>
              <FormInput
                required={true}
                type="text"
                id="username"
                placeholder="Choose a username"
                bind:value={username}
                max="50"
              />
              <div class="mt-2 font-light text-sm">
                Must use latin alphabet, be less than 50 characters, and unique.
              </div>
            </div>
            <div class="mb-4">
              <label for="displayname" class="card-title mb-2"
                >Display Name</label
              >
              <FormInput
                required={true}
                type="text"
                id="displayname"
                placeholder="Choose a display name"
                bind:value={displayName}
                max="50"
              />
              <div class="mt-2 font-light text-sm">
                Must be less than 50 characters.
              </div>
            </div>
            <div class="mb-4">
              <label for="dob" class="card-title mb-2">Birthday</label>
              <FormInput
                required={true}
                type="date"
                id="dob"
                placeholder="Birthday"
                bind:value={dob}
                max={today}
              />
              <div class="mt-2 font-light text-sm">
                Your birthday is private by default, and can be changed later.
              </div>
            </div>
          </SignupCard>
        </div>
        <div class="flex justify-center lg:justify-start">
          <SignupCard>
            <div class="mb-4">
              <label for="password" class="card-title mb-2">Password</label>
              <FormInput
                required={true}
                type="password"
                id="password"
                bind:value={password}
                min="8"
                max="50"
              />
              <div class="mt-2 font-light text-sm">
                Must be atleast 8 characters long.
              </div>
            </div>
            <div class="mb-4">
              <label for="confirmpassword" class="card-title mb-2"
                >Confirm Password
              </label>
              <FormInput
                error={!validpass && confirmPassword.length > 0}
                required={true}
                type="password"
                id="confirmpassword"
                bind:value={confirmPassword}
                min="8"
                max="50"
              />
            </div>
            <div class="card-actions">
              <button
                disabled={inProgress}
                type="submit"
                class="btn btn-primary text-lg w-full">Create Account</button
              >
            </div>
          </SignupCard>
        </div>
      </div>
    </form>
  </div>
</main>
