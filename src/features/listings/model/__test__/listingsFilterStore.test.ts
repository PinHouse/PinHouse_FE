import {
  createListingsFilterSearchParams,
  createDefaultListingsFilterCriteria,
  normalizeListingsFilterCriteria,
  parseListingsFilterCriteriaFromSearchParams,
} from "@/src/features/listings/model/listFilterCriteria";
import { ListingsFilterState } from "@/src/entities/listings/model/type";
import { useListingsFilterStore } from "@/src/features/listings/model/store/listingsStore";

describe("listings filter criteria", () => {
  it("normalizes array selections into stable sorted values", () => {
    expect(
      normalizeListingsFilterCriteria({
        regionType: ["서울", "경기", "서울"],
        rentalTypes: ["청년", "신혼부부", "청년"],
        supplyTypes: ["행복주택", "국민임대", "행복주택"],
        houseTypes: ["오피스텔", "아파트", "오피스텔"],
      })
    ).toEqual({
      regionType: ["경기", "서울"],
      rentalTypes: ["신혼부부", "청년"],
      supplyTypes: ["국민임대", "행복주택"],
      houseTypes: ["아파트", "오피스텔"],
      status: "",
      sortType: "최신공고순",
    });
  });

  it("parses listings filter criteria from URL search params", () => {
    const searchParams = new URLSearchParams({
      region: "서울,경기",
      target: "청년,신혼부부",
      rental: "행복주택",
      housing: "아파트,오피스텔",
      sortType: "deadline",
    });

    expect(parseListingsFilterCriteriaFromSearchParams(searchParams)).toEqual({
      regionType: ["경기", "서울"],
      rentalTypes: ["신혼부부", "청년"],
      supplyTypes: ["행복주택"],
      houseTypes: ["아파트", "오피스텔"],
      status: "",
      sortType: "마감임박순",
    });
  });

  it("serializes listings filter criteria into stable URL search params", () => {
    const searchParams = createListingsFilterSearchParams({
      regionType: ["서울", "경기"],
      rentalTypes: ["청년", "신혼부부"],
      supplyTypes: ["행복주택"],
      houseTypes: [],
      status: "",
      sortType: "마감임박순",
    });

    expect(searchParams.toString()).toBe(
      "region=%EA%B2%BD%EA%B8%B0%2C%EC%84%9C%EC%9A%B8&target=%EC%8B%A0%ED%98%BC%EB%B6%80%EB%B6%80%2C%EC%B2%AD%EB%85%84&rental=%ED%96%89%EB%B3%B5%EC%A3%BC%ED%83%9D&sortType=deadline"
    );
  });
});

describe("useListingsFilterStore", () => {
  const resetStore = () => {
    const initial = createDefaultListingsFilterCriteria();
    useListingsFilterStore.setState({
      draft: initial,
      applied: initial,
    });
  };

  beforeEach(() => {
    resetStore();
  });

  it("keeps draft changes isolated until apply", () => {
    useListingsFilterStore.getState().toggleDraftRegionType("서울");

    expect(useListingsFilterStore.getState().draft.regionType).toEqual(["서울"]);
    expect(useListingsFilterStore.getState().applied.regionType).toEqual([]);
  });

  it("applies normalized draft values into applied state", () => {
    const store = useListingsFilterStore.getState();

    store.toggleDraftRegionType("서울");
    store.toggleDraftRegionType("경기");
    store.toggleDraftRentalType("청년");
    store.toggleDraftRentalType("신혼부부");
    store.setSortType("마감임박순");
    useListingsFilterStore.getState().applyDraft();

    expect(useListingsFilterStore.getState().applied).toEqual({
      regionType: ["경기", "서울"],
      rentalTypes: ["신혼부부", "청년"],
      supplyTypes: [],
      houseTypes: [],
      status: "",
      sortType: "마감임박순",
    });
    expect(useListingsFilterStore.getState().draft).toEqual(
      useListingsFilterStore.getState().applied
    );
  });

  it("restores draft from applied when the sheet is reopened", () => {
    useListingsFilterStore.setState((state: ListingsFilterState) => ({
      ...state,
      applied: {
        regionType: ["서울"],
        rentalTypes: [],
        supplyTypes: [],
        houseTypes: [],
        status: "",
        sortType: "최신공고순",
      },
    }));

    useListingsFilterStore.getState().toggleDraftRegionType("경기");
    useListingsFilterStore.getState().syncDraftFromApplied();

    expect(useListingsFilterStore.getState().draft).toEqual(
      useListingsFilterStore.getState().applied
    );
  });
});
