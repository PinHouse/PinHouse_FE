export interface IResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  error?: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ErrorCode {
  message?: string;
  httpStatus?: string;
  code?: number;
}
