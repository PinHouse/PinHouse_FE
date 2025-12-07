import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { IResponse } from "../types/response";
import { logout } from "@/src/features/login/utils/logout";

// 토큰 갱신 상태 관리
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// 토큰 갱신 전용 axios 인스턴스 (인터셉터 없음)
const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 갱신 함수
const refreshToken = async () => {
  try {
    // 인터셉터가 없는 별도 인스턴스 사용
    const response = await refreshApi.put("/auth", {});
    return response.data;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw error;
  }
};

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

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
const onResponse = <T extends IResponse<any>>(res: AxiosResponse<T>) => {
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
const onError = async <T extends IResponse<any>>(error: AxiosError<T>) => {
  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean;
  };

  // 401 에러이고 아직 재시도하지 않은 경우
  if (error.response?.status === 401 && !originalRequest._retry) {
    console.log("401 에러 발생");
    if (isRefreshing) {
      // 이미 토큰 갱신 중이면 대기열에 추가
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshToken();
      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      // 토큰 갱신 실패 시 로그아웃 처리
      console.error("토큰 갱신 실패, 로그아웃 처리:", refreshError);

      // 로그아웃 처리는 비동기로 실행 (현재 요청의 에러 처리를 먼저 완료)
      // Promise.resolve()를 사용하여 다음 이벤트 루프에서 실행
      Promise.resolve().then(() => {
        logout();
      });

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  if (error.response) {
    const { code, message } = error.response.data;
    //Error 처리
    console.error(code, message);
  }
  return Promise.reject(error);
};

const responseToData = <T extends IResponse<any>>(res: AxiosResponse<T>): T => {
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
  get: async <T extends IResponse<any>, P = undefined>(
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
  post: async <T extends IResponse<any>, D = undefined>(
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
  put: async <T extends IResponse<any>, D = undefined>(
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
  patch: async <T extends IResponse<any>, D = undefined>(
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
  delete: async <T extends IResponse<any>, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig
  ) => {
    return api.delete<T>(url, { data, ...options }).then(responseToData);
  },
} as const;
