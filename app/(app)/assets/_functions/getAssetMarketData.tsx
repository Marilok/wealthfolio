"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getAssetMarketData() {
  const supabase = createServerActionClient({ cookies });
  const { data: assets, error } = await supabase
    .from("assets")
    .select("id, symbol, currency, purchase_price, quantity");

  if (error) {
    throw error;
  }

  const getPerfomance = (
    currentPrice: number,
    purchasePrice: number,
    quantity: number,
  ) => {
    const currentValue = currentPrice * quantity;
    const purchaseValue = purchasePrice * quantity;
    const performance = (
      ((currentValue - purchaseValue) / purchaseValue) *
      100
    ).toFixed(2);
    return Number(performance);
  };

  // const assetsWithMarketData: any[] = await Promise.all(
  //   assets!.map(async (asset: any) => {
  //     const currentPrice = await getCurrentPrice({ symbol: asset.symbol });
  //     return {
  //       ...asset,
  //       currentPrice: currentPrice,
  //       perfomancePercentage: getPerfomance(
  //         currentPrice,
  //         asset.purchase_price,
  //         asset.quantity,
  //       ),
  //       currentValue: Number((currentPrice * asset.quantity).toFixed(2)),
  //     };
  //   }),
  // );

  const assetsWithMarketData = [
    {
      id: 1,
      symbol: "AAPL",
      currency: "USD",
      purchase_price: 100,
      quantity: 10,
      currentPrice: 100,
      perfomancePercentage: 0,
      currentValue: 1000,
      portfolioShare: 0,
    },
    {
      id: 2,
      symbol: "TSLA",
      currency: "USD",
      purchase_price: 100,
      quantity: 10,
      currentPrice: 100,
      perfomancePercentage: 0,
      currentValue: 1000,
      portfolioShare: 0,
    },
    {
      id: 3,
      symbol: "BTC",
      currency: "USD",
      purchase_price: 100,
      quantity: 10,
      currentPrice: 100,
      perfomancePercentage: 0,
      currentValue: 1000,
      portfolioShare: 0,
    },
  ];

  function calculateAllocation() {
    const totalValue = assetsWithMarketData.reduce(
      (accumulator, asset) => accumulator + asset.currentValue,
      0,
    );

    assetsWithMarketData.forEach((asset) => {
      asset.portfolioShare = Number(
        (asset.currentValue / totalValue).toFixed(2),
      );
    });
  }
  calculateAllocation();
  return assetsWithMarketData as any[];
}
