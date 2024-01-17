"use server";

import { Account, Currency } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { updateAccountBalance } from "../updateAccountBalance";

export async function deleteTransaction(
  transactionId: number,
  account_id: Account["id"],
  currency: Currency,
  type: string,
  quantity: number,
  unit_price: number,
  fee: number,
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

  const amount =
    type == "BUY"
      ? quantity * unit_price + fee
      : -(quantity * unit_price) + fee;

  try {
    await updateAccountBalance(account_id, currency, amount);
  } catch (error) {
    console.error(error);
  }

  // update stocks
  const { error: stockError } = await supabase
    .from("stocks")
    .update({
      quantity: type == "BUY" ? -quantity : quantity,
      unit_price: type == "BUY" ? -unit_price : unit_price,
    })
    .eq("id", account_id);

  // if quantity is 0, delete stock

  const { error } = await supabase
    .from("stock_transactions")
    .delete()
    .eq("id", transactionId);

  if (error) {
    throw error;
  }

  const { data: transactionCount, error: transactionCountError } =
    await supabase
      .from("accounts")
      .select("transactions")
      .eq("id", account_id)
      .single();

  if (transactionCountError) {
    throw transactionCountError;
  }

  const { error: updateError } = await supabase
    .from("accounts")
    .update({ transactions: transactionCount.transactions - 1 })
    .eq("id", account_id);
}
