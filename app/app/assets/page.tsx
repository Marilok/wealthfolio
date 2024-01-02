import { getAssetMarketData } from "./_functions/getAssetMarketData";
import UI from "./ui";
export const dynamic = "force-dynamic";

export default async function Page() {
  const assetsWithMarketData = await getAssetMarketData();
  return <UI assets={assetsWithMarketData} />;
}
