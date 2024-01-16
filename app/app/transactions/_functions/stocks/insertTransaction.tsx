"use server";

import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function insertTransaction(
  stockId: number,
  type: string,
  quantity: number,
  unit_price: number,
  fee: number,
  date: string,
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

  //@ts-expect-error
  const { error } = await supabase
    .from("stock_transactions")
    .insert([
      { stock_id: stockId, type, quantity, unit_price, fee, date, notes },
    ]);

  if (error) {
    throw error;
  }
}
