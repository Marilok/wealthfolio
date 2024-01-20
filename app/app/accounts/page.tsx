import { defaultCurrency } from "@/data/settings";
import { convertCurrency } from "@/functions";
import { getAccounts } from "@/functions/getAccounts";
import { getPlatforms } from "@/functions/getPlatforms";
import { Currency } from "@/types";
import UI from "./ui";

export const dynamic = "force-dynamic";

type BalanceValue = {
  currency: Currency;
  value: number;
};

async function getAggregateBalances(accounts: any[]) {
  const aggregatedBalances: BalanceValue[] = [];
  for (const account of accounts) {
    for (const balance of account.account_balances || []) {
      const { currency, balance: balanceValue } = balance;
      const existingBalance = aggregatedBalances.find(
        (item) => item.currency === currency,
      );
      if (existingBalance) {
        existingBalance.value += balanceValue;
      } else {
        aggregatedBalances.push({ currency, value: balanceValue });
      }
    }
  }

  return aggregatedBalances;
}

async function getTotalValue(aggregatedBalances: BalanceValue[]) {
  let totalValue = 0;

  for (const item of aggregatedBalances) {
    const value = await convertCurrency(
      item.currency,
      defaultCurrency,
      item.value,
    );
    totalValue += value;
  }

  return totalValue;
}

export default async function Page() {
  const platforms = await getPlatforms();
  const accounts = await getAccounts();

  const aggregatedBalances = await getAggregateBalances(accounts);
  const totalValue = await getTotalValue(aggregatedBalances);

  return (
    <UI
      platforms={platforms || []}
      totalValue={totalValue}
      aggregatedBalances={aggregatedBalances}
    />
  );
}
