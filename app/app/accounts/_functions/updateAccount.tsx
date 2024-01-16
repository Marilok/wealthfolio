"use server";

import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function updateAccount(
  accountId: number,
  name: string,
  platform_id: number,
  notes?: string,
) {
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const { error } = await supabase
    .from("accounts")
    .update({ name, platform_id, notes })
    .eq("id", accountId);

  if (error) {
    throw error;
  }
}
