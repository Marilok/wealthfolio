"use server";

import { Currency } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createDeposit(
  accountId: number,
  depositOrWithdraw: "deposit" | "withdraw",
  amount: number,
  currency: Currency,
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

  const { data, error } = await supabase.from("deposits").insert([
    {
      account_id: accountId,
      type: depositOrWithdraw,
      amount,
      currency,
      notes,
    },
  ]);

  const { data: existingAccount, error: updateBalanceError } = await supabase
    .from("account_balances")
    .select("id, balance")
    .eq("account_id", accountId)
    .eq("currency", currency)
    .single();

  if (updateBalanceError && updateBalanceError.code !== "PGRST116") {
    throw updateBalanceError;
  }

  if (existingAccount) {
    const updatedBalance =
      depositOrWithdraw === "deposit"
        ? existingAccount.balance + amount
        : existingAccount.balance - amount;

    const { data: updateBalance, error: updateBalanceError } = await supabase
      .from("account_balances")
      .update({ balance: updatedBalance })
      .eq("id", existingAccount.id);

    if (updateBalanceError) {
      throw updateBalanceError;
    }
  } else {
    const { data: updateBalance, error: updateBalanceError } = await supabase
      .from("account_balances")
      .insert([
        {
          account_id: accountId,
          balance: depositOrWithdraw === "deposit" ? amount : -amount,
          currency,
        },
      ]);

    if (updateBalanceError) {
      throw updateBalanceError;
    }
  }

  const { data: createDeposit, error: createDepositError } = await supabase
    .from("account_deposits")
    .insert([
      {
        account_id: accountId,
        type: depositOrWithdraw,
        amount,
        currency,
        notes,
      },
    ]);

  if (createDepositError) {
    throw createDepositError;
  }

  if (error) {
    throw error;
  }
}
