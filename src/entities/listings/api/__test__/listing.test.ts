// tests/features/listing/api/listing.api.test.ts
import { IResponse } from "@/src/shared/types";
import axios from "axios";
import { requestListingList } from "@/src/entities/listings/api/listingsApi";
import { ListingItem, ListingListData } from "../../model/type";
import { LISTING_LIST_NOTICES } from "@/src/shared/api";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("공고API(POST)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("공고API SUCCESS", async () => {
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
    const fakeData: ListingListData = {
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
    const result = await requestListingList(params);
    expect(mockedAxios.post).toHaveBeenCalledWith(LISTING_LIST_NOTICES, params, undefined);
    expect(result).toEqual(fakeResponse);
  });

  it("공고API실패", async () => {
    const params = { page: 1, offSet: 10 };
    const error = new Error("Network Error");
    mockedAxios.post.mockRejectedValue(error);
    await expect(requestListingList(params)).rejects.toThrow("Network Error");
  });
});
