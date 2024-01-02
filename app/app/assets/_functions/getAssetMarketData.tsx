"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getCurrentPrice } from "./getCurrentPrice";

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

  const assetsWithMarketDatas: any[] = await Promise.all(
    assets!.map(async (asset: any) => {
      const currentPrice = await getCurrentPrice({ symbol: asset.symbol });
      return {
        ...asset,
        currentPrice: currentPrice,
        perfomancePercentage: getPerfomance(
          currentPrice,
          asset.purchase_price,
          asset.quantity,
        ),
        currentValue: Number((currentPrice * asset.quantity).toFixed(2)),
      };
    }),
  );

  let assetsWithMarketData = [
    {
      id: 1,
      symbol: "AAPL",
      category: "stock",
      currency: "USD",
      purchase_price: 100,
      quantity: 10,
      currentPrice: 100,
      perfomancePercentage: -5.8,
      currentValue: 1000,
    },
    {
      id: 2,
      symbol: "TSLA",
      category: "stock",
      currency: "USD",
      purchase_price: 100,
      quantity: 10,
      currentPrice: 100,
      perfomancePercentage: 10,
      currentValue: 1000,
    },
    {
      id: 3,
      symbol: "BTC",
      category: "crypto",
      currency: "USD",
      purchase_price: 100,
      quantity: 10,
      currentPrice: 400,
      perfomancePercentage: 14,
      currentValue: 4000,
    },
  ];

  function calculatePortfolioShare() {
    const totalValue = assetsWithMarketData.reduce(
      (acc, asset) => acc + asset.currentValue,
      0,
    );
    return assetsWithMarketData.map((asset) => ({
      ...asset,
      portfolioShare: Number(
        ((asset.currentValue / totalValue) * 100).toFixed(2),
      ),
    }));
  }

  assetsWithMarketData = calculatePortfolioShare();
  console.log(assetsWithMarketData);
  return assetsWithMarketData as any[];
}
