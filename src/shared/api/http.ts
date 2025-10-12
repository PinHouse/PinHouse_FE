import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { IResponse } from "../types/response";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 *
 * @param res
 */
const onResponse = <T extends IResponse>(res: AxiosResponse<T>) => {
  const { success } = res.data;
  //HTTP는 성공이지만 비지니스 로직 성공/실패 유무 고려
  if (success) {
    return res;
  } else {
    const { code, message } = res.data;
    //Error 처리
    console.error(code, message);
    return Promise.reject(res);
  }
};

/**
 * (HTTP 자체가 실패한 경우)
 * @param error
 */
const onError = <T extends IResponse>(error: AxiosError<T>) => {
  if (error.response) {
    const { code, message } = error.response.data;
    //Error 처리
    console.error(code, message);
  }
  return Promise.reject(error);
};

const responseToData = <T extends IResponse>(res: AxiosResponse<T>): T => {
  return res.data;
};

api.interceptors.response.use(onResponse, onError);

export const http = {
  /**
   * HTTP GET Method
   * @param url api 엔드포인트
   * @param params `optional` query parameter
   * @param options `optional` AxiosRequestConfig
   */
  get: async <T extends IResponse, P = undefined>(
    url: string,
    params?: P,
    options?: AxiosRequestConfig
  ) => {
    return api.get<T>(url, { params, ...options }).then(responseToData);
  },

  /**
   * HTTP POST Method
   * @param url api 엔드포인트
   * @param data `optional` body
   * @param options `optional` AxiosRequestConfig
   */
  post: async <T extends IResponse, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig
  ) => {
    return api.post<T>(url, data, options).then(responseToData);
  },

  /**
   * HTTP PUT Method
   * @param url api 엔드포인트
   * @param data `optional` body
   * @param options `optional` AxiosRequestConfig
   */
  put: async <T extends IResponse, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig
  ) => {
    return api.put<T>(url, data, options).then(responseToData);
  },

  /**
   * HTTP PATCH Method
   * @param url api 엔드포인트
   * @param data `optional` body
   * @param options `optional` AxiosRequestConfig
   */
  patch: async <T extends IResponse, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig
  ) => {
    return api.patch<T>(url, data, options).then(responseToData);
  },

  /**
   * HTTP DELETE Method
   * @param url api 엔드포인트
   * @param data `optional` body
   * @param options `optional` AxiosRequestConfig
   */
  delete: async <T extends IResponse, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig
  ) => {
    return api.delete<T>(url, { data, ...options }).then(responseToData);
  },
} as const;
