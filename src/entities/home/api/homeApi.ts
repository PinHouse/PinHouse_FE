import { HTTP_METHODS } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { AxiosRequestConfig } from "axios";

export const getWithSlice = async <T, P extends Record<string, any>>(
  url: string,
  params: P,
  options?: AxiosRequestConfig
): Promise<T> => {
  const apiCall = HTTP_METHODS["get"];
  const response = await apiCall<IResponse<T>, P>(url, params, options);

  if (!response?.data) {
    throw new Error("Invalid API response");
  }

  return response.data;
};
