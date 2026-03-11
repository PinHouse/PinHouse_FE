import { ListingsSearchPage } from "@/src/widgets/listingsSection";

type Props = {
  searchParams?: Promise<{
    query?: string;
  }>;
};

export default async function PropertySearch({ searchParams }: Props) {
  const params = await searchParams;
  return <ListingsSearchPage query={params?.query ?? ""} />;
}
