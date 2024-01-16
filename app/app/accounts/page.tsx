import { getPlatforms } from "@/functions/getPlatforms";
import UI from "./ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  const platforms = await getPlatforms();
  return <UI platforms={platforms || []} />;
}
