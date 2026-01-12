import { IResponse } from "@/src/shared/types";
import { NoticeByPinPointParams, NoticeContent, SliceResponse } from "../model/type";
import { getWithSlice } from "../api/homeApi";

export const getNoticeByPinPoint = ({
  params,
  url,
}: {
  params: NoticeByPinPointParams;
  url: string;
}) => {
  return getWithSlice<SliceResponse<NoticeContent>, NoticeByPinPointParams>(url, params);
};
