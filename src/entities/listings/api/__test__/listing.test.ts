// tests/features/listing/api/listing.api.test.ts
import { IResponse } from "@/src/shared/types";
import axios from "axios";
import { PostBasicRequest, requestListingList } from "@/src/entities/listings/api/listingsApi";
import {
  BasicInfo,
  Complex,
  LikeReturn,
  ListingDetailData,
  ListingDetailResponse,
  ListingItem,
  ListingItemResponse,
  ListingSummary,
  PopularKeywordItem,
  PopularKeywordResponse,
} from "../../model/type";
import {
  COMPLEXES_ENDPOINT,
  http,
  HTTP_METHODS,
  LIKE_ENDPOINT,
  NOTICE_ENDPOINT,
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

// describe("공고상세조회(POST)", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it.skip("공고상세조회 SUCCESS", async () => {
//     const basicInfoMock: BasicInfo = {
//       id: "19230",
//       type: "국민임대",
//       housingType: "아파트",
//       supplier: "LH",
//       name: "남양주시지역 국민임대주택 예비입주자모집(2025.11.05공고)",
//       period: "2025년 11월 17일 ~ 2025년 11월 19일",
//     };

//     const nonFilteredComplexesMock: Complex[] = [
//       {
//         id: "19230#7",
//         name: "미리내4-2",
//         address: "경기도 남양주시 별내4로 25",
//         heating: "지역난방",
//         infra: ["도서관", "공원", "동물 관련시설", "스포츠 시설", "빨래방"],
//         unitCount: 3,
//       },
//       {
//         id: "19230#8",
//         name: "미리내4-4",
//         address: "경기도 남양주시 별내3로 23",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#12",
//         name: "별빛3-6",
//         address: "경기도 남양주시 별내3로 64-16",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 1,
//       },
//       {
//         id: "19230#14",
//         name: "별사랑2-5",
//         address: "경기도 남양주시 별내5로 189",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#4",
//         name: "진접24",
//         address: "경기도 남양주시 진접읍 해밀예당1로 295",
//         heating: "개별난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 1,
//       },
//     ];

//     const filterdData: Complex[] = [
//       {
//         id: "19230#7",
//         name: "미리내4-2",
//         address: "경기도 남양주시 별내4로 25",
//         heating: "지역난방",
//         infra: ["도서관", "공원", "동물 관련시설", "스포츠 시설", "빨래방"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#8",
//         name: "미리내4-4",
//         address: "경기도 남양주시 별내3로 23",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#12",
//         name: "별빛3-6",
//         address: "경기도 남양주시 별내3로 64-16",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 1,
//       },
//       {
//         id: "19230#14",
//         name: "별사랑2-5",
//         address: "경기도 남양주시 별내5로 189",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//     ];

//     const listingDetailMock: ListingDetailData = {
//       basicInfo: basicInfoMock,
//       filtered: {
//         totalCount: 4,
//         complexes: filterdData,
//       },
//       nonFiltered: {
//         totalCount: 5,
//         complexes: nonFilteredComplexesMock,
//       },
//     };

//     const fakeResponse: ListingDetailResponse = {
//       success: true,
//       code: 200,
//       message: "호출이 성공적으로 완료되었습니다.",
//       data: listingDetailMock,
//     };

//     const listingDetilBody = {
//       sortType: "거리 순",
//       pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251",
//       transitTime: 100,
//       maxDeposit: 50000000,
//       maxMonthPay: 300000,
//     };

//     (http.post as jest.Mock).mockResolvedValue({
//       fakeResponse,
//     });

//     const result = await PostBasicRequest(`${NOTICE_ENDPOINT}/19230`, "post", listingDetilBody);
//     expect(http.post).toHaveBeenCalledWith(`${NOTICE_ENDPOINT}/19230`, listingDetilBody);
//     expect(result).toEqual({ fakeResponse });
//   });

//   it.skip("공고상세실패", async () => {
//     const basicInfoMock: BasicInfo = {
//       id: "19230",
//       type: "국민임대",
//       housingType: "아파트",
//       supplier: "LH",
//       name: "남양주시지역 국민임대주택 예비입주자모집(2025.11.05공고)",
//       period: "2025년 11월 17일 ~ 2025년 11월 19일",
//     };

//     const nonFilteredComplexesMock: Complex[] = [
//       {
//         id: "19230#7",
//         name: "미리내4-2",
//         address: "경기도 남양주시 별내4로 25",
//         heating: "지역난방",
//         infra: ["도서관", "공원", "동물 관련시설", "스포츠 시설", "빨래방"],
//         unitCount: 3,
//       },
//       {
//         id: "19230#8",
//         name: "미리내4-4",
//         address: "경기도 남양주시 별내3로 23",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#12",
//         name: "별빛3-6",
//         address: "경기도 남양주시 별내3로 64-16",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 1,
//       },
//       {
//         id: "19230#14",
//         name: "별사랑2-5",
//         address: "경기도 남양주시 별내5로 189",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#4",
//         name: "진접24",
//         address: "경기도 남양주시 진접읍 해밀예당1로 295",
//         heating: "개별난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 1,
//       },
//     ];

//     const filterdData: Complex[] = [
//       {
//         id: "19230#7",
//         name: "미리내4-2",
//         address: "경기도 남양주시 별내4로 25",
//         heating: "지역난방",
//         infra: ["도서관", "공원", "동물 관련시설", "스포츠 시설", "빨래방"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#8",
//         name: "미리내4-4",
//         address: "경기도 남양주시 별내3로 23",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//       {
//         id: "19230#12",
//         name: "별빛3-6",
//         address: "경기도 남양주시 별내3로 64-16",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 1,
//       },
//       {
//         id: "19230#14",
//         name: "별사랑2-5",
//         address: "경기도 남양주시 별내5로 189",
//         heating: "지역난방",
//         infra: ["공원", "동물 관련시설", "스포츠 시설"],
//         unitCount: 2,
//       },
//     ];

//     const listingDetailMock: ListingDetailData = {
//       basicInfo: basicInfoMock,
//       filtered: {
//         totalCount: 4,
//         complexes: filterdData,
//       },
//       nonFiltered: {
//         totalCount: 5,
//         complexes: nonFilteredComplexesMock,
//       },
//     };

//     const fakeResponse: ListingDetailResponse = {
//       success: true,
//       code: 200,
//       message: "호출이 성공적으로 완료되었습니다.",
//       data: listingDetailMock,
//     };

//     const listingDetilBody = {
//       sortType: "거리 순",
//       pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251",
//       transitTime: 100,
//       maxDeposit: 50000000,
//       maxMonthPay: 300000,
//     };

//     const error = new Error("Network Error");
//     (http.post as jest.Mock).mockRejectedValue(error);
//     await expect(
//       PostBasicRequest(`${NOTICE_ENDPOINT}/19230`, "post", listingDetilBody)
//     ).rejects.toThrow("Network Error");
//   });
// });

// 19401#1
// fec9aba3-0fd9-4b75-bebf-9cb7641fd251

describe("단지정보상세조회API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("단지정보 API 성공", async () => {
    const mockListingOne: ListingSummary = {
      id: "19401#1",
      name: "완주삼봉A-1BL",
      address: "전북특별자치도 완주군",
      heating: "개별난방",
      totalHouseholds: 0,
      totalSupplyInNotice: 9,
      infra: ["공원", "스포츠 시설"],
      unitCount: 2,
      unitTypes: ["21A", "26B"],
      distance: {
        totalTime: "1시간 3분",
        totalTimeMinutes: 63,
        totalDistance: 196.9,
        routes: [
          {
            type: "TRAIN",
            minutesText: "63분",
            lineText: "SRT",
            line: {
              code: 8,
              label: "SRT",
              bgColorHex: "#E5046C",
            },
            bgColorHex: "#E5046C",
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
      params: { complexId: "19401#1", pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251" },
    });

    expect(http.get).toHaveBeenCalledWith(COMPLEXES_ENDPOINT, undefined, {
      params: { complexId: "19401#1", pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251" },
    });

    expect(result).toEqual(mockListingOne);
  });
});
