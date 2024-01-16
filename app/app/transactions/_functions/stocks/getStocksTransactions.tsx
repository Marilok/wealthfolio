"use server";

import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getStocksTransactions() {
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

  const { data: getStocksTransactions, error } = await supabase
    .from("stock_transactions")
    .select(
      "id, stock_id (symbol, currency, account_id(id, name, platform_id)), type, date, unit_price, quantity, fee, notes",
    )
    .order("date", { ascending: false });

  if (error) {
    throw error;
  }

  return getStocksTransactions;
}
