import { LISTING_LIST_NOTICES } from "@/src/shared/api";
import { http } from "../../../shared/api/http";
import { ListingListFilterBody, ListingListPage, ListingListParams } from "../model/type";
import { IResponse } from "@/src/shared/types";

export const requestListingList = async <
  TData extends IResponse,
  TReqBody extends object,
  TParams extends object,
  TReturn,
>(
  url: string,
  params: TParams,
  reqBody: TReqBody
): Promise<TReturn> => {
  const res = await http.post<TData, TReqBody>(url, reqBody, {
    params,
  });

  return res.data as TReturn;
};
