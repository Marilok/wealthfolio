"use client";

import { defaultCurrency } from "@/data/settings";
import { convertCurrency, formatMonetaryValue } from "@/functions";

export default async function AggregatedCash({ list }: { list: any }) {
  const balanceMap: { [currency: string]: number } = {};

  let total = 0;

  for (const account of list.items) {
    for (const balance of account.account_balances) {
      const { currency, balance: value } = balance;
      if (currency === defaultCurrency) {
        total += value;
      } else {
        const converted = await convertCurrency(
          currency,
          defaultCurrency,
          value,
        );

        total += converted;
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 ml-auto text-right">
      {formatMonetaryValue(total, defaultCurrency)}
    </div>
  );
}
