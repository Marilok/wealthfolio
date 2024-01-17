"use server";

import { Account } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function deleteAccount(id: Account["id"]) {
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
  const { error } = await supabase.from("accounts").delete().eq("id", id);

  if (error) {
    throw error;
  }

  const { error: error2 } = await supabase
    .from("account_transfers")
    .delete()
    .eq("from", id)
    .eq("to", "");

  const { error: error3 } = await supabase
    .from("account_transfers")
    .delete()
    .eq("to", id)
    .eq("from", "");
}
