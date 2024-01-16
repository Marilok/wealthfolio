import { getAccounts } from "@/functions/getAccounts";
import UI from "./_components/ui";
import { getStocksTransactions } from "./_functions/stocks/getStocksTransactions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const accounts = await getAccounts();
  const stocks = await getStocksTransactions();
  return <UI accounts={accounts} stocks={stocks} />;
}
