import { ListingListPage } from "@/src/entities/listings/model/type";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

type GetSearchFirstPageProps = {
  q: string;
  sortType: string;
  status: string;
};

type SearchBffResponse = {
  success: boolean;
  data?: ListingListPage;
};

export async function getSearchNoticeInitialFromBff({
  q,
  sortType,
  status,
}: GetSearchFirstPageProps) {
  const keyword = q.trim();
  if (!keyword) return null;

  const { baseUrl, forwardedHeaders } = await getBffRequestContext();
  const query = new URLSearchParams({
    q: keyword,
    page: "1",
    offSet: "10",
    sortType,
    status,
  });

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
