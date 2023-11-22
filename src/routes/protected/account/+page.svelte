<script>
  import Title from "$lib/Title.svelte";
  import FormCard from "$lib/components/FormCard.svelte";
  import FormInput from "$lib/components/FormInput.svelte";
  import ToastSetup from "$lib/components/ToastSetup.svelte";
  import hrefs from "$lib/hrefs.json";
  import { createToast, dateToStr } from "../../../hooks.client.js";
  export let data;
  const { supabase, session, profile } = data;
  const today = dateToStr();
  let toast;
  let progress = false;
  let ogEmail = session.user.email;
  let email = session.user.email;
  let ogUsername = profile.username;
  let username = profile.username;
  let ogDisplayName = profile.display_name;
  let displayName = profile.display_name;
  let ogBio = profile.bio;
  let bio = profile.bio;
  let ogDob = profile.birthday ? profile.birthday : "";
  let dob = profile.birthday ? profile.birthday : "";
  async function changeEmail() {
    progress = true;
    const { error } = await supabase.auth.updateUser({ email });
    progress = false;
    if (error) {
      console.error(error.message);
      return;
    }
    ogEmail = email;
    toast = createToast(
      "info",
      "Email Address Changed",
      `An email has been sent to ${email} with a confirmation link.`,
      7000
    );
  }
  async function updateProfile() {
    if (!verifyProfile()) return;
    progress = true;
    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        display_name: displayName,
        bio,
        birthday: dob.length == 0 ? null : dob,
      })
      .eq("user_id", session.user.id);
    progress = false;
    if (error) {
      if (error.code === "23505")
        toast = createToast("error", "Username Unavailable");
      console.error(error.message);
      return;
    }
    ogUsername = username;
    ogDisplayName = displayName;
    ogBio = bio;
    ogDob = dob;
    toast = createToast(
      "success",
      "Profile Updated",
      "Your AstroFetch profile has been successfully updated"
    );
  }
  function verifyProfile() {
    return (
      username.length > 0 &&
      username.length <= 50 &&
      displayName.length > 0 &&
      displayName.length <= 50 &&
      bio.length <= 150
    );
  }
</script>

<main>
  <div class="container mx-auto my-10">
    <div class="grid md:grid-cols-2 gap-4">
      <div class="flex justify-center lg:justify-end">
        <FormCard>
          <form on:submit|preventDefault={changeEmail}>
            <div class="mb-4">
              <h1 class="font-bold text-xl">Account Settings</h1>
            </div>
            <div class="mb-4">
              <label for="email" class="card-title mb-2">Email</label>
              <FormInput
                type="email"
                bind:value={email}
                required
                placeholder="someone@domain.com"
              />
            </div>
            <div class="card-actions">
              <button
                type="submit"
                disabled={email === ogEmail || progress}
                class="btn btn-primary w-full mb-2">Change Email</button
              >
              <a href={hrefs.passwordreset} class="btn btn-secondary w-full"
                >Reset Password</a
              >
            </div>
          </form>
        </FormCard>
      </div>
      <div class="flex justify-center lg:justify-start">
        <FormCard>
          <form on:submit|preventDefault={updateProfile}>
            <div class="mb-4">
              <h1 class="font-bold text-xl">Profile Settings</h1>
            </div>
            <div class="mb-4">
              <label for="username" class="card-title mb-2">Username</label>
              <FormInput
                id="username"
                type="text"
                required
                max="50"
                bind:value={username}
              />
            </div>
            <div class="mb-4">
              <label for="display" class="card-title mb-2">Display Name</label>
              <FormInput
                id="username"
                type="text"
                required
                max="50"
                bind:value={displayName}
              />
            </div>
            <div class="mb-4">
              <label for="bio" class="card-title mb-2">Bio</label>
              <FormInput id="bio" type="text" max="150" bind:value={bio} />
              <div class="mt-2 font-light text-sm">
                {`${bio.length}/150`}
              </div>
            </div>
            <div class="mb-4">
              <label for="dob" class="card-title mb-2">Birthday</label>
              <FormInput id="dob" type="date" max={today} bind:value={dob} />
              <div class="mt-2 font-light text-sm">
                Note: your birthday will be public. If you wish to, you can
                leave it empty.
              </div>
            </div>
            <div class="card-actions">
              <button
                disabled={(ogUsername === username &&
                  ogDisplayName === displayName &&
                  ogBio === bio &&
                  ogDob === dob) ||
                  progress}
                type="submit"
                class="btn btn-primary w-full">Update Profile</button
              >
            </div>
          </form>
        </FormCard>
      </div>
    </div>
  </div>
</main>

<ToastSetup {toast} />

<Title title="Account" />
