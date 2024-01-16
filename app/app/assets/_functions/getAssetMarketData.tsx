"use server";

import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getAssetMarketData() {
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

  const { data: stocks, error } = await supabase
    .from("stocks")
    .select("id, symbol, currency, purchase_price, quantity")
    .order("symbol", { ascending: true });

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

  // let assetsWithMarketData: any[] = await Promise.all(
  //   stocks!.map(async (asset: any) => {
  //     const currentPrice = await getCurrentPrice({ symbol: asset.symbol });
  //     return {
  //       ...asset,
  //       category: "stock",
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
      currentPrice: 10,
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

  assetsWithMarketData = assetsWithMarketData.map((asset) => ({
    ...asset,
    profit: (asset.currentPrice - asset.purchase_price) * asset.quantity,
  }));

  return assetsWithMarketData as any[];
}
