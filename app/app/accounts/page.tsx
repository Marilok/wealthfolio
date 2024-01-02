import { getAccounts } from "../../../functions/getAccounts";
import { getPlatforms } from "../../../functions/getPlatforms";
import UI from "./ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  const accounts = await getAccounts();
  const platforms = await getPlatforms();
  return <UI accounts={accounts} platforms={platforms!} />;
}
