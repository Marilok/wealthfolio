"use server";

import { Currency } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function updateAccountBalance(
  account_id: number,
  currency: Currency,
  amount: number,
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

  const { data: existingBalance, error: existingBalanceError } = await supabase
    .from("account_balances")
    .select("id, balance")
    .eq("account_id", account_id)
    .eq("currency", currency)
    .single();

  if (existingBalanceError && existingBalanceError.code !== "PGRST116") {
    throw existingBalanceError;
  }
  if (existingBalance) {
    const { data, error } = await supabase
      .from("account_balances")
      .update({ balance: existingBalance.balance + amount })
      .eq("id", existingBalance.id);

    if (error) {
      throw error;
    }
  } else {
    const { data: newBalance, error: newBalanceError } = await supabase
      .from("account_balances")
      .insert([{ account_id, balance: amount, currency }]);

    if (newBalanceError) {
      throw newBalanceError;
    }
  }
}
