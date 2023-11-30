import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

export const hrefs = {
  home: "/",
  signup: "/signup",
  login: "/login",
  fetch: "/protected/fetch",
  account: "/protected/account",
  signout: "/signout",
  viewer: "/viewer",
  forgotpassword: "/forgotpassword",
  passwordreset: "/protected/passwordreset",
  profile: "/profile/slug",
  profileUID: "/profile",
  apiAuth: "/apis/auth/callback",
  apiNasa: "/apis/nasa",
  exGithub: "https://github.com/Oded2/Astrofetch",
};

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);
