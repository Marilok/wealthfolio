"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createDeposit(
  accountId: number,
  depositOrWithdraw: string,
  amount: number,
  currency: string,
  notes?: string,
) {
  const supabase = createServerActionClient({ cookies });

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

  if (error) {
    throw error;
  }
}
