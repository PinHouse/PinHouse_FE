import { ListingsSectionPage } from "@/src/widgets/listingsSection";
import {
  DEFAULT_LISTINGS_STATUS,
  parseListingsFilterCriteriaFromSearchParams,
} from "@/src/features/listings/model";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function Listings({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const urlSearchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearchParams.set(key, value);
    }
  });

  const initialFilter = parseListingsFilterCriteriaFromSearchParams(urlSearchParams);

  return <ListingsSectionPage initialFilter={initialFilter} initialStatus={DEFAULT_LISTINGS_STATUS} />;
}
