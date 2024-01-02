import { getAccounts } from "../../../functions/getAccounts";
import UI from "./_components/ui";
import { getTransactions } from "./_functions/getTransactions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const accounts = await getAccounts();
  const transactions = await getTransactions();
  return <UI accounts={accounts} transactions={transactions} />;
}
