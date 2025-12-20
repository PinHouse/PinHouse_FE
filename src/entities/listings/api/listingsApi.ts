import { IResponse } from "@/src/shared/types";
import { HTTP_METHODS } from "@/src/shared/api";
import { HttpMethod, RequestOptions } from "../model/type";

export const requestListingList = async <
  TData,
  TResponse extends IResponse<TData>,
  TReqBody extends object | undefined = undefined,
  TParams extends object | undefined = undefined,
  TReturn = TResponse,
>(
  url: string,
  method: HttpMethod,
  options?: {
    params?: TParams;
    body?: TReqBody;
  }
): Promise<TReturn> => {
  const apiCall = HTTP_METHODS[method];
  const res = await apiCall<TResponse, TReturn>(url, options?.body as any, {
    params: options?.params,
  });

  return res.data as TReturn;
};

export const PostBasicRequest = async <
  TData,
  TResponse extends IResponse<TData>,
  TReqBody extends object,
  TReturn,
>(
  url: string,
  method: HttpMethod,
  body?: TReqBody
): Promise<TReturn> => {
  const apiCall = HTTP_METHODS[method];
  const res = await apiCall<TResponse, TReqBody>(url, body);

  return res as unknown as TReturn;
};

export const PostParamsBodyRequest = async <
  TData,
  TResponse extends IResponse<TData>,
  TReqBody extends object = {},
  TReturn = TResponse,
  TQuery extends object = object,
>(
  url: string,
  method: HttpMethod,
  body?: TReqBody,
  options?: RequestOptions<TQuery>
): Promise<TReturn> => {
  const apiCall = HTTP_METHODS[method];

  const res = await apiCall<TResponse, TReqBody>(url, body, {
    params: options?.query,
  });

  return res as unknown as TReturn;
};
