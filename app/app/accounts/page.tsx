import { defaultCurrency } from "@/data/settings";
import { convertCurrency } from "@/functions";
import { getAccounts } from "@/functions/getAccounts";
import { getPlatforms } from "@/functions/getPlatforms";
import UI from "./ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  const platforms = await getPlatforms();
  const accounts = await getAccounts();

  let totalValue = 0;

  await Promise.all(
    accounts.map(async (account) => {
      if (account.account_balances) {
        for (const balance of account.account_balances) {
          const { currency, balance: balanceValue } = balance;
          if (currency === defaultCurrency) {
            totalValue += balanceValue;
          } else {
            const convertedValue = await convertCurrency(
              currency,
              defaultCurrency,
              balanceValue,
            );
            totalValue += convertedValue;
          }
        }
      }
    }),
  );

  return <UI platforms={platforms || []} totalValue={totalValue} />;
}
