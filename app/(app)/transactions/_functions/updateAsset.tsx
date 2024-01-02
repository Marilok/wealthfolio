"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function updateAsset(symbol: string, quantity: number) {
  const supabase = createServerActionClient({ cookies });
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      "id, symbol, type, quantity, unit_price, fee, currency, date, account_id ( name, platform_id)",
    );

  if (error) {
    throw error;
  }
  return transactions;
}
