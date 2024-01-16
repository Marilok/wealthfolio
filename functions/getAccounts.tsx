"use server";

import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getAccounts() {
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

  const { data: accounts, error } = await supabase
    .from("accounts")
    .select(
      "id, name, platform_id (id, name, url, icon), notes, account_balances ( id, currency, balance), transactions",
    )
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return accounts;
}
