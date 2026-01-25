import { HOME_NOTICE_ENDPOINT, HOME_SEARCH_POPULAR_ENDPOINT, http } from "@/src/shared/api";
import { GlobalListType, GlobalSearchItem, NoticeCount, PopularResponse } from "../../model/type";
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

interface OverviewParamType {
  q: string;
}

describe("핀포인트 home 글로벌 서치 결과", () => {
  it.skip("검색 리스트 SUCCESS", async () => {
    const param: OverviewParamType = {
      q: "청년",
    };

    const Mock: GlobalListType = {
      notices: {
        content: [
          {
            id: "19498",
            title:
              "광주역세권 청년혁신타운 통합공공임대주택(일자리연계형 지원주택) 입주자 추가모집공고",
            agency: "경기주택도시공사",
            housingType: "오피스텔",
            supplyType: "통합공공임대",
            announceDate: "2025-12-23",
            applyStart: "2026-01-06",
            applyEnd: "2026-01-09",
            targetGroups: ["무주택자", "청년"],
            liked: false,
          },
        ],
        hasNext: false,
      },
      complexes: {
        content: [
          {
            id: "19498",
            title:
              "광주역세권 청년혁신타운 통합공공임대주택(일자리연계형 지원주택) 입주자 추가모집공고",
            agency: "경기주택도시공사",
            housingType: "오피스텔",
            supplyType: "통합공공임대",
            announceDate: "2025-12-23",
            applyStart: "2026-01-06",
            applyEnd: "2026-01-09",
            targetGroups: ["무주택자", "청년"],
            liked: false,
          },
        ],
        hasNext: false,
      },
      targetGroups: {
        content: [
          {
            id: "19498",
            title:
              "광주역세권 청년혁신타운 통합공공임대주택(일자리연계형 지원주택) 입주자 추가모집공고",
            agency: "경기주택도시공사",
            housingType: "오피스텔",
            supplyType: "통합공공임대",
            announceDate: "2025-12-23",
            applyStart: "2026-01-06",
            applyEnd: "2026-01-09",
            targetGroups: ["무주택자", "청년"],
            liked: false,
          },
        ],
        hasNext: false,
      },
      regions: {
        content: [],
        hasNext: false,
      },
      houseTypes: {
        content: [],
        hasNext: false,
      },
    };

    const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/overview`;
    (http.get as jest.Mock).mockResolvedValue({
      data: Mock,
    });

    const result = await getNoticeByPinPoint<IResponse<GlobalListType>>({
      url,
      params: param,
    });

    expect(http.get).toHaveBeenCalledWith(url, param, undefined);
    expect(result).toEqual(Mock);
  });
});

interface CategoryType {
  type: "NOTICE" | "COMPLEX" | "TARGET_GROUP" | "REGION" | "HOUSE_TYPE";
  q: string;
  page: number;
}

describe("핀포인트 home 글로벌 서치 인기검색어", () => {
  it("글로벌 서치 페이지 네이션", async () => {
    const param: CategoryType = {
      type: "NOTICE",
      q: "청년",
      page: 1,
    };

    const Mock: GlobalSearchItem[] = [
      {
        id: "19498",
        title:
          "광주역세권 청년혁신타운 통합공공임대주택(일자리연계형 지원주택) 입주자 추가모집공고",
        agency: "경기주택도시공사",
        housingType: "오피스텔",
        supplyType: "통합공공임대",
        announceDate: "2025-12-23",
        applyStart: "2026-01-06",
        applyEnd: "2026-01-09",
        targetGroups: ["무주택자", "청년"],
        liked: false,
      },
    ];

    const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/category`;
    (http.get as jest.Mock).mockResolvedValue({
      data: Mock,
    });

    const result = await getNoticeByPinPoint<IResponse<GlobalSearchItem[]>>({
      url,
      params: param,
    });

    expect(http.get).toHaveBeenCalledWith(url, param, undefined);
    expect(result).toEqual(Mock);
  });
});

it("글로벌 서치 페이지 네이션 - 실패", async () => {
  const param: CategoryType = {
    type: "NOTICE",
    q: "청년",
    page: 1,
  };

  const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/category`;

  const error = new Error("Network Error");

  (http.get as jest.Mock).mockRejectedValue(error);

  await expect(
    getNoticeByPinPoint<IResponse<PopularResponse>>({
      url,
      params: param,
    })
  ).rejects.toThrow("Network Error");

  expect(http.get).toHaveBeenCalledWith(url, param, undefined);
});
