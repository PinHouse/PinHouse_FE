import { HOME_NOTICE_ENDPOINT, http } from "@/src/shared/api";
import { NoticeCount } from "../../model/type";
import { IResponse } from "@/src/shared/types";
import { getNoticeByPinPoint } from "../../interface/homeInterface";

jest.mock("@/src/shared/api/http", () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
  },
}));

interface paramType {
  pinPoint: string;
  maxTime: number;
}

describe("핀포인트 기준 공고 카운트", () => {
  it("공고 카운트 SUCCESS", async () => {
    const param: paramType = {
      pinPoint: "83ec36ce-8fc1-4f62-8983-397c2729fc22",
      maxTime: 30,
    };
    const url = `${HOME_NOTICE_ENDPOINT}-count`;
    (http.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          count: 1,
        },
      },
    });

    const result = await getNoticeByPinPoint<IResponse<NoticeCount>>({
      url,
      params: param,
    });

    expect(http.get).toHaveBeenCalledWith(url, param, undefined);
    expect(result).toEqual({
      data: {
        count: 1,
      },
    });
  });
});
