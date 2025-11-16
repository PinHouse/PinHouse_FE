import { LISTING_LIST_NOTICES } from "@/src/shared/api";
import { http } from "../../../shared/api/http";
import {
  ListingListApiResponse,
  ListingListFilterBody,
  ListingListPage,
  ListingListParams,
} from "../model/type";
import { IResponse } from "@/src/shared/types";

export const requestListingList = async (
  params: ListingListParams,
  reqbody: ListingListFilterBody
) => {
  const body = {
    page: params.page ?? 1,
    offSet: params.offSet ?? 10,
  };

  const res = await http.post<IResponse, ListingListFilterBody>(LISTING_LIST_NOTICES, reqbody, {
    params: body,
  });

  return res.data as ListingListPage;
};
