"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createTransaction(
  symbol: string,
  type: string,
  quantity: number,
  unit_price: number,
  fee: number,
  currency: string,
  date: string,
  account_id: number,
  notes?: string,
) {
  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase.from("transactions").insert([
    {
      symbol,
      type,
      quantity,
      unit_price,
      fee,
      currency,
      date,
      account_id,
      notes,
    },
  ]);

  if (error) {
    throw error;
  }
}
