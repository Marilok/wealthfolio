"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getAccounts() {
  const supabase = createServerActionClient({ cookies });
  const { data: accounts, error } = await supabase
    .from("accounts")
    .select(
      "id, name, platform_id ( name, url, icon), notes, account_balances ( id, currency, balance ), transactions(count)",
    );

  if (error) {
    throw error;
  }

  return accounts;
}
