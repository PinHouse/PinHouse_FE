export interface WithdrawReason {
  id: string;
  label: string;
}

export interface WithdrawRequest {
  reason: string;
}

export interface WithdrawResponse {
  success: boolean;
  message?: string;
}

