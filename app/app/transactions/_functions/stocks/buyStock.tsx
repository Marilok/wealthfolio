"use server";

import { Currency } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { calculateAveragePrice } from "../calculateAveragePrice";
import { updateAccountBalance } from "../updateAccountBalance";
import { insertTransaction } from "./insertTransaction";

export async function buyStock(
  symbol: string,
  type: string,
  quantity: number,
  unit_price: number,
  fee: number,
  currency: Currency,
  date: string,
  account_id: number,
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
  await updateAccountBalance(
    account_id,
    currency,
    -(quantity * unit_price) - fee,
  );

  const { data: existingStock, error: updateStockError } = await supabase
    .from("stocks")
    .select("id, quantity, purchase_price, account_id (transactions)")
    .eq("account_id", account_id)
    .eq("symbol", symbol)
    .eq("currency", currency)
    .single();

  if (updateStockError && updateStockError.code !== "PGRST116") {
    throw updateStockError;
  }

  if (existingStock) {
    const { error: updateAssetError } = await supabase
      .from("stocks")
      .update({
        quantity: existingStock.quantity + quantity,
        purchase_price: calculateAveragePrice(
          existingStock.quantity,
          existingStock.purchase_price,
          quantity || existingStock.purchase_price,
          unit_price || existingStock.purchase_price,
        ),
      })
      .eq("id", existingStock.id);

    await insertTransaction(
      existingStock.id,
      type,
      quantity,
      unit_price,
      fee,
      date,
      notes,
    );

    await supabase.from("accounts").update({
      // @ts-expect-error
      transactions: existingStock.account_id.transactions + 1,
    });

    if (updateAssetError) {
      throw updateAssetError;
    }
  }

  if (!existingStock) {
    const { data: newStock, error: insertAssetError } = await supabase
      .from("stocks")
      .insert([
        {
          symbol,
          account_id,
          purchase_price: unit_price,
          quantity: quantity,
          currency,
        },
      ])
      .select("id")
      .single();

    const { data: transactionsCount, error: transactionsCountError } =
      await supabase
        .from("accounts")
        .select("transactions")
        .eq("id", account_id)
        .single();

    await supabase
      .from("accounts")
      .update({
        transactions: transactionsCount!.transactions + 1,
      })
      .eq("id", account_id);

    await insertTransaction(
      newStock!.id,
      type,
      quantity,
      unit_price,
      fee,
      date,
      notes,
    );
    if (insertAssetError) {
      throw insertAssetError;
    }
  }
}
