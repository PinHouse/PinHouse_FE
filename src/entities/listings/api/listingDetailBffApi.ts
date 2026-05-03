import type {
  Environmnt,
  ListingDetailData,
  ListingDetailResponse,
  ListingRentalDetailVM,
  ListingSummary,
  LstingBody,
  UnitTypeRespnse,
} from "@/src/entities/listings/model/type";

type BffResponse<T> = {
  success: boolean;
  data?: T;
};

async function requestBff<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    credentials: "include",
    ...init,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch listing detail BFF.");
  }

  const body = (await res.json()) as BffResponse<T>;
  if (!body.success || body.data === undefined || body.data === null) {
    throw new Error("Invalid listing detail BFF response.");
  }

  return body.data;
}

function appendArrayParam(query: URLSearchParams, key: string, values?: string[]) {
  values?.forEach(value => {
    if (value) query.append(key, value);
  });
}

export async function getListingDetailBasicFromBff(
  noticeId: string,
  body: LstingBody
): Promise<ListingDetailResponse> {
  const data = await requestBff<ListingDetailData>(
    `/api/listings/detail/${encodeURIComponent(noticeId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return {
    success: true,
    code: 200,
    message: "OK",
    data,
  };
}

export async function getListingComplexSummaryFromBff({
  complexId,
  pinPointId,
}: {
  complexId: string;
  pinPointId?: string;
}): Promise<ListingSummary> {
  const query = new URLSearchParams();
  if (pinPointId) query.set("pinPointId", pinPointId);

  const queryString = query.toString();
  return requestBff<ListingSummary>(
    `/api/listings/detail/complexes/${encodeURIComponent(complexId)}${queryString ? `?${queryString}` : ""}`
  );
}

export async function getListingComplexInfraFromBff(complexId: string): Promise<Environmnt> {
  return requestBff<Environmnt>(
    `/api/listings/detail/complexes/${encodeURIComponent(complexId)}/infra`
  );
}

export async function getListingComplexResourceFromBff<T>({
  complexId,
  resource,
}: {
  complexId: string;
  resource: string;
}): Promise<T> {
  return requestBff<T>(
    `/api/listings/detail/complexes/${encodeURIComponent(complexId)}/${encodeURIComponent(resource)}`
  );
}

export async function getListingComplexTransitFromBff<T>({
  complexId,
  pinPointId,
}: {
  complexId: string;
  pinPointId?: string;
}): Promise<T> {
  const query = new URLSearchParams();
  if (pinPointId) query.set("pinPointId", pinPointId);

  const queryString = query.toString();
  return requestBff<T>(
    `/api/listings/detail/complexes/${encodeURIComponent(complexId)}/transit${queryString ? `?${queryString}` : ""}`
  );
}

export async function getListingDetailFilterFromBff<T>({
  noticeId,
  filterType,
}: {
  noticeId: string;
  filterType: string;
}): Promise<T> {
  return requestBff<T>(
    `/api/listings/detail/${encodeURIComponent(noticeId)}/filter/${encodeURIComponent(filterType)}`
  );
}

export async function getListingCompareFromBff({
  noticeId,
  sortType,
  nearbyFacilities,
  pinPointId,
}: {
  noticeId: string;
  sortType: string;
  nearbyFacilities?: string[];
  pinPointId?: string;
}): Promise<UnitTypeRespnse> {
  const query = new URLSearchParams({ sortType });
  if (pinPointId) query.set("pinPointId", pinPointId);
  appendArrayParam(query, "nearbyFacilities", nearbyFacilities);

  return requestBff<UnitTypeRespnse>(
    `/api/listings/detail/${encodeURIComponent(noticeId)}/compare?${query.toString()}`
  );
}

export type { ListingRentalDetailVM };
