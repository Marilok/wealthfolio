"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function updateAsset(
  symbol: string,
  quantity: number,
  currency: string,
  unit_price: number,
) {
  const supabase = createServerActionClient({ cookies });

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
          quantity,
          unit_price,
        ),
      })
      .eq("id", existingAsset.id);

    if (error) {
      throw error;
    }
    return transactions;
  }

  const { data: newAsset, error: newAssetError } = await supabase
    .from("assets")
    .insert([{ symbol, quantity, currency, purchase_price: unit_price }]);
  if (newAssetError) {
    throw newAssetError;
  }
}
