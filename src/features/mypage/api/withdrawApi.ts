import { USER_DELETE_ENDPOINT } from "@/src/shared/api/endpoints";
import { http } from "@/src/shared/api/http";
import { IResponse } from "@/src/shared/types/response";
import { WithdrawRequest } from "../model/withdraw.type";

export const withdrawUser = async (data: WithdrawRequest): Promise<IResponse<void>> => {
  const response = await http.delete<IResponse<void>, WithdrawRequest>(USER_DELETE_ENDPOINT, data);
  return response;
};
