// src/hooks.server.js
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import hrefs from "$lib/hrefs.json";

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };
  if (event.url.pathname.startsWith("/protected")) {
    const session = await event.locals.getSession();
    if (!session) {
      throw redirect(301, hrefs.login);
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
