import { HOME_NOTICE_ENDPOINT, HOME_SEARCH_POPULAR_ENDPOINT, http } from "@/src/shared/api";
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
  it.skip("공고 카운트 SUCCESS", async () => {
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

interface PopularParamType {
  limit: number;
}

interface PopularResponse {
  keyword: string;
  count: number;
  lastSearchedAt: string;
}

describe("핀포인트 home 글로벌 서치 인기검색어", () => {
  it.skip("인기검색어 SUCCESS", async () => {
    const param: PopularParamType = {
      limit: 10,
    };

    const Mock: PopularResponse[] = [
      {
        keyword: "복정",
        count: 6,
        lastSearchedAt: "2026-01-17T15:04:18.932Z",
      },
      {
        keyword: "중원",
        count: 1,
        lastSearchedAt: "2026-01-17T14:56:36.974Z",
      },
    ];

    const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/popular`;
    (http.get as jest.Mock).mockResolvedValue({
      data: Mock,
    });

    const result = await getNoticeByPinPoint<IResponse<PopularResponse>>({
      url,
      params: param,
    });

    expect(http.get).toHaveBeenCalledWith(url, param, undefined);
    expect(result).toEqual(Mock);
  });
});
