"use server";

import { Account, Currency, Platform } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createDeposit } from "./createDeposit";

export async function createAccount(
  name: Account["name"],
  platform_id: Platform["id"],
  balance: number,
  currency: Currency,
  notes?: Account["notes"],
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

  const { data: account, error } = await supabase
    .from("accounts")
    .insert([{ name: name, platform_id: platform_id, notes: notes }])
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  const account_id = account!.id;

  try {
    await createDeposit(
      account_id,
      "deposit",
      balance,
      currency,
      "Initial deposit",
    );
  } catch (error) {
    throw error;
  }
}
