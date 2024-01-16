"use server";

import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getTransactions() {
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
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      "id, symbol, type, quantity, unit_price, fee, currency, date, account_id ( name, platform_id, id ), notes",
    )
    .order("date", { ascending: false });

  if (error) {
    throw error;
  }
  return transactions;
}
