import { http } from "@/src/shared/api/http";
import { IMAGES_PRESIGNED_URL_ENDPOINT } from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlData {
  /** PUT 업로드에 사용할 presigned URL */
  presignedUrl: string;
  /** 업로드 완료 후 접근할 이미지 URL */
  imageUrl: string;
  /** presigned URL 만료 시간(초) */
  expiresIn: number;
}

export type PresignedUrlResponse = IResponse<PresignedUrlData>;

/**
 * 프로필 이미지 업로드용 presigned URL 발급
 * POST /v1/images/presigned-url
 */
export const getPresignedUrl = (body: PresignedUrlRequest) => {
  return http.post<PresignedUrlResponse, PresignedUrlRequest>(
    IMAGES_PRESIGNED_URL_ENDPOINT,
    body
  );
};
