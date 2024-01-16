"use server";

import { Currency } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { updateAccountBalance } from "../../transactions/_functions/updateAccountBalance";

export async function createTransfer(
  sender_accountId: number,
  receiver_accoundId: number,
  amount: number,
  currency: Currency,
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
  const { data, error } = await supabase
    .from("account_transfers")
    .insert([
      { from: sender_accountId, to: receiver_accoundId, amount, currency },
    ]);

  if (error) {
    throw error;
  }

  try {
    await updateAccountBalance(sender_accountId, currency, -amount);
  } catch (error) {
    throw error;
  }

  try {
    await updateAccountBalance(receiver_accoundId, currency, amount);
  } catch (error) {
    throw error;
  }
}
