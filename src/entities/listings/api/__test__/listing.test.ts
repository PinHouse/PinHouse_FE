// tests/features/listing/api/listing.api.test.ts
import { IResponse } from "@/src/shared/types";
import axios from "axios";
import {
  getNoticeParam,
  getNoticeSheetFilter,
  PostBasicRequest,
  PostParamsBodyRequest,
  requestListingList,
} from "@/src/entities/listings/api/listingsApi";
import {
  AreaTypeResponse,
  CostResponse,
  DistrictResponse,
  LikeReturn,
  ListingItem,
  ListingItemResponse,
  ListingRouteInfo,
  ListingSummary,
  ListingUnitType,
  PinPointPlace,
  PopularKeywordItem,
  UnitType,
  UnitTypeRespnse,
} from "../../model/type";
import {
  COMPLEXES_ENDPOINT,
  http,
  LIKE_ENDPOINT,
  NOTICE_ENDPOINT,
  PINPOINT_CREATE_ENDPOINT,
  POPULAR_SEARCH_ENDPOINT,
} from "@/src/shared/api";

jest.mock("@/src/shared/api/http", () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("공고API(POST)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.skip("공고API SUCCESS", async () => {
    const params = { page: 1, offSet: 10 };
    const fakeItems: ListingItem[] = [
      {
        id: "19246",
        thumbnailUrl: null,
        name: "평택시 …",
        supplier: "LH",
        complexes: 2,
        type: "행복주택",
        housingType: "아파트",
        announcePeriod: "2025-11-07",
        applyPeriod: "2025-11-18~2025-11-19",
        liked: false,
      },
    ];

    const fakeData = {
      totalCount: 9,
      totalElements: 0,
      content: fakeItems,
      notices: [],
      hasNext: false,
      page: 1,
    };

    const fakeResponse: ListingItemResponse = {
      success: true,
      code: 200,
      message: "호출이 성공적으로 완료되었습니다.",
      data: fakeData,
      error: undefined,
    };

    mockedAxios.post.mockResolvedValue({ data: fakeResponse });
    const result = await requestListingList(NOTICE_ENDPOINT, "post", {
      params,
      body: undefined,
    });
    expect(mockedAxios.post).toHaveBeenCalledWith(NOTICE_ENDPOINT, params, undefined);
    expect(result).toEqual(fakeResponse);
  });

  it.skip("공고API실패", async () => {
    const params = { page: 1, offSet: 10 };
    const error = new Error("Network Error");
    mockedAxios.post.mockRejectedValue(error);
    await expect(
      requestListingList(NOTICE_ENDPOINT, "post", {
        params,
        body: undefined,
      })
    ).rejects.toThrow("Network Error");
  });
});

describe("좋아요 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("좋아요API 성공", async () => {
    const fakeResponse: LikeReturn = {
      success: true,
      code: 201,
      message: "성공",
    };

    mockedAxios.post.mockResolvedValue(fakeResponse);

    const result = await PostBasicRequest<
      LikeReturn,
      IResponse<LikeReturn>,
      {
        targetId: number;
        type: "NOTICE";
      },
      LikeReturn
    >(LIKE_ENDPOINT, "post", {
      targetId: 1994,
      type: "NOTICE",
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      LIKE_ENDPOINT,
      {
        targetId: 1994,
        type: "NOTICE",
      },
      { params: undefined }
    );

    expect(result).toEqual(fakeResponse);
  });

  it.skip("좋아요API 실패", async () => {
    const error = new Error("Network Error");

    mockedAxios.post.mockRejectedValue(error);

    await expect(
      PostBasicRequest<
        LikeReturn,
        IResponse<LikeReturn>,
        {
          targetId: number;
          type: "NOTICE";
        },
        LikeReturn
      >(LIKE_ENDPOINT, "post", {
        targetId: 1994,
        type: "NOTICE",
      })
    ).rejects.toThrow("Network Error");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      LIKE_ENDPOINT,
      {
        targetId: "123",
        type: "NOTICE",
      },
      { params: undefined }
    );
  });
});

describe("인기검색어", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.skip("인기검색어 API 성공", async () => {
    const fakeResponse: PopularKeywordItem[] = [
      {
        keyword: "행복주택",
        count: 24,
        lastSearchedAt: "2025-11-25T12:24:05.183Z",
      },
      {
        keyword: "성남",
        count: 2,
        lastSearchedAt: "2025-11-23T07:15:33.137Z",
      },
      {
        keyword: "주택",
        count: 1,
        lastSearchedAt: "2025-11-23T09:06:55.342Z",
      },
      {
        keyword: "1",
        count: 1,
        lastSearchedAt: "2025-11-23T09:06:47.010Z",
      },
      {
        keyword: "국민임대주택",
        count: 1,
        lastSearchedAt: "2025-11-23T07:15:48.146Z",
      },
      {
        keyword: "수원당수",
        count: 1,
        lastSearchedAt: "2025-11-23T07:15:22.506Z",
      },
      {
        keyword: "청년",
        count: 1,
        lastSearchedAt: "2025-11-23T07:14:59.668Z",
      },
      {
        keyword: "임대주택",
        count: 1,
        lastSearchedAt: "2025-11-23T07:14:54.009Z",
      },
    ];

    (http.get as jest.Mock).mockResolvedValue({
      data: fakeResponse,
    });

    const result = await requestListingList<
      PopularKeywordItem[],
      IResponse<PopularKeywordItem[]>,
      undefined,
      { limit: number },
      PopularKeywordItem[]
    >(POPULAR_SEARCH_ENDPOINT, "get", { params: { limit: 10 } });

    expect(http.get).toHaveBeenCalledWith(POPULAR_SEARCH_ENDPOINT, undefined, {
      params: { limit: 10 },
    });

    expect(result).toEqual(fakeResponse);
  });
});

describe("단지정보상세조회API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("단지정보 API 성공", async () => {
    const mockListingOne: ListingSummary = {
      id: "19390#1",
      name: "양주회천 A25BL",
      address: "경기도 양주시",
      heating: "지역난방",
      totalHouseholds: 0,
      totalSupplyInNotice: 472,
      infra: ["공원", "동물 관련시설", "산책로", "스포츠 시설"],
      unitCount: 2,
      unitTypes: ["26A", "26A1"],
      distance: {
        totalTime: "1시간 13분",
        totalTimeMinutes: 73,
        totalDistance: 35.7,
        routes: [
          {
            type: "WALK",
            minutesText: "2분",
            lineText: null,
            line: null,
            bgColorHex: "#BBBAC5",
          },
          {
            type: "SUBWAY",
            minutesText: "59분",
            lineText: "수도권 1호선",
            line: {
              code: 1,
              label: "수도권 1호선",
              bgColorHex: "#3356B4",
            },
            bgColorHex: "#3356B4",
          },
          {
            type: "WALK",
            minutesText: "1분",
            lineText: null,
            line: null,
            bgColorHex: "#BBBAC5",
          },
          {
            type: "BUS",
            minutesText: "7분",
            lineText: "73, 28",
            line: {
              code: 3,
              label: "마을버스",
              bgColorHex: "#86C34B",
            },
            bgColorHex: "#86C34B",
          },
          {
            type: "WALK",
            minutesText: "4분",
            lineText: null,
            line: null,
            bgColorHex: "#BBBAC5",
          },
        ],
      },
    };

    (http.get as jest.Mock).mockResolvedValue({
      data: mockListingOne,
    });

    const result = await requestListingList<
      ListingSummary,
      IResponse<ListingSummary>,
      undefined,
      { complexId: string; pinPointId: string },
      ListingSummary
    >(COMPLEXES_ENDPOINT, "get", {
      params: { complexId: "19390#1", pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251" },
    });

    expect(http.get).toHaveBeenCalledWith(COMPLEXES_ENDPOINT, undefined, {
      params: { complexId: "19390#1", pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251" },
    });

    expect(result).toEqual(mockListingOne);
  });
});

describe("인프라상세조회", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("인프라상세 API 성공", async () => {
    const mockListingOne: { infra: string[] } = {
      infra: ["도서관", "공원", "동물 관련시설", "스포츠 시설"],
    };

    (http.get as jest.Mock).mockResolvedValue({
      data: mockListingOne,
    });

    const result = await PostBasicRequest<any, IResponse<any>, any, any>(
      `${COMPLEXES_ENDPOINT}/infra/19409#1`,
      "get",
      {}
    );
    expect(http.get).toHaveBeenCalledWith(`${COMPLEXES_ENDPOINT}/infra/19409#1`, {});

    expect(result).toEqual({ data: mockListingOne });
  });
});

describe("방타입상세조회", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("방타입상세조회 API 성공", async () => {
    const mockListingOne: ListingUnitType[] = [
      {
        typeId: "14273225a9d04e28abd211e3",
        typeCode: "34",
        thumbnail: null,
        quota: 5,
        exclusiveAreaM2: 34.28,
        deposit: {
          min: {
            total: 8517000,
            contract: 0,
            balance: 16641100,
            monthPay: 140510,
          },
          normal: {
            total: 17517000,
            contract: 875900,
            balance: 16641100,
            monthPay: 114510,
          },
          max: {
            total: 29517000,
            contract: 12875900,
            balance: 16641100,
            monthPay: 45510,
          },
        },
        liked: false,
      },
      {
        typeId: "dfefd714df2b41999198b4da",
        typeCode: "42",
        thumbnail: null,
        quota: 10,
        exclusiveAreaM2: 42.87,
        deposit: {
          min: {
            total: 12431000,
            contract: 0,
            balance: 23209400,
            monthPay: 181560,
          },
          normal: {
            total: 24431000,
            contract: 1221600,
            balance: 23209400,
            monthPay: 146560,
          },
          max: {
            total: 39431000,
            contract: 16221600,
            balance: 23209400,
            monthPay: 58560,
          },
        },
        liked: false,
      },
    ];

    (http.get as jest.Mock).mockResolvedValue({
      data: mockListingOne,
    });

    const result = await PostBasicRequest<ListingUnitType[], IResponse<any>, {}, ListingUnitType[]>(
      `${COMPLEXES_ENDPOINT}/unit/19409#1`,
      "get",
      {}
    );
    expect(http.get).toHaveBeenCalledWith(`${COMPLEXES_ENDPOINT}/unit/19409#1`, {});

    expect(result).toEqual({ data: mockListingOne });
  });
});

describe("노선정보 상세조회", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("노선정보 상세조회 API 성공", async () => {
    const mockListingOne: ListingRouteInfo = {
      totalCount: 3,
      routes: [
        {
          routeIndex: 0,
          summary: [
            {
              displayText: "1시간 8분",
              totalMinutes: 68,
              totalDistanceKm: 284.3,
              totalFareWon: 0,
              transferCount: 1,
            },
          ],
          distance: [
            {
              type: "AIR",
              minutesText: "60분",
              lineText: "항공",
              line: null,
              bgColorHex: "#2C7A7B",
            },
            {
              type: "TRAIN",
              minutesText: "8분",
              lineText: "KTX",
              line: {
                code: 1,
                label: "KTX",
                bgColorHex: "#3356B4",
              },
              bgColorHex: "#3356B4",
            },
          ],
          step: [
            {
              action: "START",
              primaryText: "김포국제공항",
              line: "항공",
              minutes: "0분",
              colorHex: "#2C7A7B",
              stepIndex: 0,
              stopName: "김포국제공항",
              type: "AIR",
            },
            {
              action: "TRANSFER",
              primaryText: "광주송정",
              line: "KTX",
              minutes: "60분",
              colorHex: "#3356B4",
              stepIndex: 1,
              stopName: "광주송정",
              type: "TRAIN",
            },
            {
              action: "ARRIVAL",
              primaryText: "나주",
              line: null,
              minutes: "8분",
              colorHex: "#3356B4",
              stepIndex: 2,
              stopName: "나주",
              type: "TRAIN",
            },
          ],
        },
        {
          routeIndex: 1,
          summary: [
            {
              displayText: "1시간 50분",
              totalMinutes: 110,
              totalDistanceKm: 322.8,
              totalFareWon: 0,
              transferCount: 1,
            },
          ],
          distance: [
            {
              type: "TRAIN",
              minutesText: "41분",
              lineText: "KTX",
              line: {
                code: 1,
                label: "KTX",
                bgColorHex: "#3356B4",
              },
              bgColorHex: "#3356B4",
            },
            {
              type: "TRAIN",
              minutesText: "69분",
              lineText: "SRT",
              line: {
                code: 8,
                label: "SRT",
                bgColorHex: "#E5046C",
              },
              bgColorHex: "#E5046C",
            },
          ],
          step: [
            {
              action: "START",
              primaryText: "서울",
              line: "KTX",
              minutes: "0분",
              colorHex: "#3356B4",
              stepIndex: 0,
              stopName: "서울",
              type: "TRAIN",
            },
            {
              action: "TRANSFER",
              primaryText: "오송",
              line: "SRT",
              minutes: "41분",
              colorHex: "#E5046C",
              stepIndex: 1,
              stopName: "오송",
              type: "TRAIN",
            },
            {
              action: "ARRIVAL",
              primaryText: "나주",
              line: null,
              minutes: "69분",
              colorHex: "#E5046C",
              stepIndex: 2,
              stopName: "나주",
              type: "TRAIN",
            },
          ],
        },
        {
          routeIndex: 2,
          summary: [
            {
              displayText: "1시간 52분",
              totalMinutes: 112,
              totalDistanceKm: 305.3,
              totalFareWon: 0,
              transferCount: 0,
            },
          ],
          distance: [
            {
              type: "TRAIN",
              minutesText: "112분",
              lineText: "SRT",
              line: {
                code: 8,
                label: "SRT",
                bgColorHex: "#E5046C",
              },
              bgColorHex: "#E5046C",
            },
          ],
          step: [
            {
              action: "START",
              primaryText: "수서",
              line: "SRT",
              minutes: "0분",
              colorHex: "#E5046C",
              stepIndex: 0,
              stopName: "수서",
              type: "TRAIN",
            },
            {
              action: "ARRIVAL",
              primaryText: "나주",
              line: null,
              minutes: "112분",
              colorHex: "#E5046C",
              stepIndex: 1,
              stopName: "나주",
              type: "TRAIN",
            },
          ],
        },
      ],
    };
    (http.get as jest.Mock).mockResolvedValue({
      data: mockListingOne,
    });
    const result = await PostBasicRequest<
      ListingRouteInfo,
      IResponse<ListingRouteInfo>,
      {},
      ListingRouteInfo
    >(`${COMPLEXES_ENDPOINT}/transit/19407#1`, "get", {});
    expect(http.get).toHaveBeenCalledWith(`${COMPLEXES_ENDPOINT}/transit/19407#1`, {});
    expect(result).toEqual({ data: mockListingOne });
  });
});

describe("핀포인트 목록 조회", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("핀포인트 목록 조회", async () => {
    const mockListingOne: PinPointPlace[] = [
      {
        id: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251",
        name: "나의 시청",
        address: "서울 중구 세종대로 110 서울특별시청",
        longitude: 126.977918351844,
        latitude: 37.566370776634,
        isFirst: true,
      },
    ];
    (http.get as jest.Mock).mockResolvedValue({
      data: mockListingOne,
    });
    const result = await PostBasicRequest<
      PinPointPlace[],
      IResponse<PinPointPlace[]>,
      {},
      PinPointPlace[]
    >(`${PINPOINT_CREATE_ENDPOINT}`, "get", {});
    expect(http.get).toHaveBeenCalledWith(`${PINPOINT_CREATE_ENDPOINT}`, {});
    expect(result).toEqual({ data: mockListingOne });
  });
});

describe("핀포인트 공고단지 필터 시트 조회", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("핀포인트 공고단지 필터 시트 조회", async () => {
    const mockResponse = {
      typeCodes: ["26", "33", "36", "39", "46", "51", "59"],
    };

    (http.get as jest.Mock).mockResolvedValue(mockResponse);
    const url = `${NOTICE_ENDPOINT}/19347/filter/area`;
    const result = await getNoticeSheetFilter<IResponse<AreaTypeResponse>, AreaTypeResponse>(url);

    expect(result?.typeCodes).toHaveLength(7);
    expect(result?.typeCodes[0]).toBe("26");
  });
});

describe("핀포인트 공고단지 필터 시트 조회", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.skip("핀포인트 공고단지 필터 시트 조회", async () => {
    const MOCK_PRICE_DISTRIBUTION: CostResponse = {
      minPrice: 8_485_000,
      maxPrice: 28_853_000,
      avgPrice: 17_888_384,
      priceDistribution: [
        {
          rangeStart: 8_485_000,
          rangeEnd: 10_051_768,
          count: 2,
        },
        {
          rangeStart: 10_051_769,
          rangeEnd: 11_618_537,
          count: 2,
        },
        {
          rangeStart: 11_618_538,
          rangeEnd: 13_185_306,
          count: 0,
        },
      ],
    };

    (http.get as jest.Mock).mockResolvedValue(MOCK_PRICE_DISTRIBUTION);
    const url = `${NOTICE_ENDPOINT}/19347/filter/cost`;
    const result = await getNoticeSheetFilter<IResponse<CostResponse>, CostResponse>(url);

    expect(result).toMatchObject({
      minPrice: 8_485_000,
      maxPrice: 28_853_000,
      avgPrice: 17_888_384,
    });

    expect(result?.priceDistribution).toHaveLength(3);
    expect(result?.priceDistribution[0]).toMatchObject({
      rangeStart: 8_485_000,
      count: 2,
    });
  });
});

describe("방비교 API 조회", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("비교 API 조회", async () => {
    const MOCK_PRICE_DISTRIBUTION: UnitType[] = [
      {
        typeId: "fc82f471ebc2480db6c06177",
        typeCode: "16A",
        complex: {
          complexId: "18214#5",
          name: "양주고읍A-13",
          address: "경기도 양주시 고읍남로 94",
        },
        area: {
          exclusiveAreaM2: 16.89,
          exclusiveAreaPyeong: 5.11,
        },
        cost: {
          totalDeposit: 1644,
          monthlyRent: 75350,
        },
        nearbyFacilities: ["공원", "동물 관련시설", "스포츠 시설"],
        totalTime: "1시간 17분",
        isLiked: false,
        group: ["일반"],
      },
    ];

    (http.get as jest.Mock).mockResolvedValue(MOCK_PRICE_DISTRIBUTION);
    const params = {
      pinPoint: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251",
      sortType: "핀포인트 거리순",
      nearbyFacilities: ["도서관"],
    };
    const url = `${NOTICE_ENDPOINT}/18214/compare`;
    const result = await getNoticeParam<UnitTypeRespnse>(url, params);
    expect(result).toMatchObject(MOCK_PRICE_DISTRIBUTION);
  });
});
