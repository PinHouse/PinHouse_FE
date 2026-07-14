import { ListingListPage } from "@/src/entities/listings/model/type";
import { createListingSearchParams, ListingSearchCriteria } from "@/src/features/listings/model";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

type SearchBffResponse = {
  success: boolean;
  data?: ListingListPage;
};

export async function getSearchNoticeInitialFromBff({
  keyword,
  sortType,
  status,
  page,
  offSet,
}: ListingSearchCriteria) {
  if (!keyword) return null;

  const { baseUrl, forwardedHeaders } = await getBffRequestContext();
  const query = createListingSearchParams(
    {
      keyword,
      page,
      offSet,
      sortType,
      status,
    },
    "q"
  );

  const res = await fetch(`${baseUrl}/api/listings/search?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: forwardedHeaders,
  });

  if (!res.ok) return null;
  const body = (await res.json()) as SearchBffResponse;
  if (!body?.success || !body.data) return null;

  return body.data;
}
