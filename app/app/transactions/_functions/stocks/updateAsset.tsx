"use server";

import { Currency } from "@/types";
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function updateAsset(
  symbol: string,
  quantity: number,
  currency: Currency,
  unit_price?: number,
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

  const { data: existingAsset, error: existingAssetError } = await supabase
    .from("assets")
    .select("id, quantity, purchase_price")
    .eq("symbol", symbol)
    .single();

  if (existingAssetError && existingAssetError.code !== "PGRST116") {
    throw existingAssetError;
  }

  const calculateAveragePrice = (
    existingQuantity: number,
    existingPrice: number,
    newQuantity: number,
    newPrice: number,
  ) => {
    return (
      (existingQuantity * existingPrice + newQuantity * newPrice) /
      (existingQuantity + newQuantity)
    );
  };

  if (existingAsset) {
    const { data: transactions, error } = await supabase
      .from("assets")
      .update({
        quantity: existingAsset.quantity + quantity,
        purchase_price: calculateAveragePrice(
          existingAsset.quantity,
          existingAsset.purchase_price,
          quantity || existingAsset.purchase_price,
          unit_price || existingAsset.purchase_price,
        ),
      })
      .eq("id", existingAsset.id);

    if (error) {
      throw error;
    }
    return transactions;
  }

  const { error: newAssetError } = await supabase
    .from("assets")
    .insert([{ symbol, quantity, currency, purchase_price: unit_price }]);
  if (newAssetError) {
    throw newAssetError;
  }
}
