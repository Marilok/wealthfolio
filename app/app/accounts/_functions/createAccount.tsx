"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createAccount(
  name: string,
  platform_id: number,
  balance: number,
  currency: string,
  notes?: string,
) {
  const supabase = createServerActionClient({ cookies });

  const { data: account, error } = await supabase
    .from("accounts")
    .insert([{ name: name, platform_id: platform_id, notes: notes }])
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  const account_id = account!.id;

  const { error: error2 } = await supabase
    .from("account_balances")
    .insert([{ currency: currency, account_id: account_id, balance: balance }]);

  if (error2) {
    throw error2;
  }
}
