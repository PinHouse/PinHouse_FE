import { getWithSlice } from "../api/homeApi";

export const getNoticeByPinPoint = <T, P extends Record<string, any> = Record<string, any>>({
  params,
  url,
}: {
  params?: P;
  url: string;
}) => {
  return getWithSlice<T, P>(url, params);
};
