// tests/features/listing/api/listing.api.test.ts
import { IResponse } from "@/src/shared/types";
import axios from "axios";
import { PostBasicRequest, requestListingList } from "@/src/entities/listings/api/listingsApi";
import {
  LikeReturn,
  ListingItem,
  PopularKeywordItem,
  PopularKeywordResponse,
} from "../../model/type";
import { http, LIKE_ENDPOINT, NOTICE_ENDPOINT, POPULAR_SEARCH_ENDPOINT } from "@/src/shared/api";

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
      content: fakeItems,
      hasNext: false,
      page: 1,
    };
    const fakeResponse: IResponse = {
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
      IResponse,
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
        IResponse,
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
      PopularKeywordResponse,
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
