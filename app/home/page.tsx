import { HomeSectionPage } from "@/src/widgets/homeSection/homeSectionPage";

type SearchParams = Record<string, string | string[] | undefined>;

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const initialChatOpen = Object.prototype.hasOwnProperty.call(params, "chat");

  return <HomeSectionPage initialChatOpen={initialChatOpen} />;
}
