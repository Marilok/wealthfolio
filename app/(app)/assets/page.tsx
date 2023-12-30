"use server";

import { transactions } from "@/app/data";
import { Asset } from "@/types";
import ClientPage from "./clientPage";
import { getCurrentPrice } from "./getCurrentPrice";

async function generateAssetsFromTransactions(transactions: any) {
  const assets = [] as Asset[];

  transactions.forEach((transaction: any) => {
    if (transaction.type === "BUY") {
      const asset = assets.find(
        (asset: any) => asset.symbol == transaction.symbol,
      );
      if (asset) {
        asset.quantity = Number(asset.quantity) + Number(transaction.quantity);
      } else {
        assets.push({
          name: transaction.name,
          quantity: Number(transaction.quantity),
          symbol: transaction.symbol,
          currency: transaction.currency,
        });
      }
    } else if (transaction.type === "SELL") {
      const asset = assets.find((asset: any) => asset.name == transaction.name);
      if (asset) {
        asset.quantity = Number(asset.quantity) - Number(transaction.quantity);
      } else {
        assets.push({
          name: transaction.name,
          quantity: Number(-transaction.quantity),
          symbol: transaction.symbol,
          currency: transaction.currency,
        });
      }
    }
  });

  const existingAssets = assets.filter((asset) => asset.quantity > 0);

  const assetsWithValues = await Promise.all(
    existingAssets.map(async (asset) => {
      return {
        name: asset.name,
        value:
          (await await getCurrentPrice({ symbol: asset.symbol })) *
          asset.quantity,
        currency: asset.currency,
        quantity: asset.quantity,
        // perfomance: getCurrentPerfomance({symbol: asset.symbol, purchaseDate: new Date()}) ,
      };
    }),
  );

  return assetsWithValues;
}

export default async function Page() {
  const assets = await generateAssetsFromTransactions(transactions);
  console.log(assets);
  return <ClientPage assets={assets} />;
}
