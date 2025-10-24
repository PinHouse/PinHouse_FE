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

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;

/**
 * 로그아웃 처리 함수
 */
const handleLogout = () => {
  // 1. is_auth 쿠키를 false로 설정
  document.cookie = "is_auth=false; path=/; max-age=86400";
  // 2. localStorage 정리
  localStorage.clear();
  // 3. 로그인 페이지로 리다이렉트
  window.location.href = "/login";
  console.log("🚪 토큰 갱신 실패로 인한 로그아웃 처리 완료");
};

/**
 * 엑세스 토큰 재발급
 * 원시 axios 인스턴스를 사용하여 interceptor를 우회
 */
export const refreshAccessToken = async () => {
  const response = await api.put("/auth");
  console.log(response);
  return response;
};
/**
 * 토큰 갱신 함수
 */
const refreshToken = async (): Promise<boolean> => {
  try {
    console.log("🔄 토큰 갱신 시도 중...");
    await refreshAccessToken();
    console.log("✅ 토큰 갱신 성공");
    return true;
  } catch (error) {
    console.error("❌ 토큰 갱신 실패:", error);
    return false;
  }
};

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
const onError = async <T extends IResponse>(error: AxiosError<T>) => {
  const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

  // 401 에러이고 아직 재시도하지 않은 경우
  if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshSuccess = await refreshToken();

      if (refreshSuccess) {
        // 토큰 갱신 성공 시 원래 요청 재시도
        return api(originalRequest);
      } else {
        // 토큰 갱신 실패 시 로그아웃 처리
        handleLogout();
        return Promise.reject(error);
      }
    } catch (refreshError) {
      // 토큰 갱신 중 에러 발생
      handleLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // 401이 아닌 다른 에러들
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
