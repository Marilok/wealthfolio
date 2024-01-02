"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function deleteAccount(id: number) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase
    .from("account_balances")
    .delete()
    .eq("account_id", id);

  if (error) {
    throw error;
  }

  const { error: errorDeposits } = await supabase
    .from("deposits")
    .delete()
    .eq("account_id", id);

  if (errorDeposits) {
    throw errorDeposits;
  }

  const { error: error2 } = await supabase
    .from("accounts")
    .delete()
    .eq("id", id);

  if (error2) {
    throw error2;
  }
}
