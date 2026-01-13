export interface WithdrawReason {
  id: string;
  label: string;
}

export interface WithdrawRequest {
  reasons: string[];
}

export interface WithdrawResponse {
  success: boolean;
  message?: string;
}
