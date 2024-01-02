"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getPlatforms() {
  const supabase = createServerActionClient({ cookies });
  const { data: platforms } = await supabase
    .from("platforms")
    .select("id, name, url, icon");

  return platforms;
}
