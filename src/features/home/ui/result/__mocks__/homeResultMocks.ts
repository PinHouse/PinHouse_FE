import { GlobalSearchItem } from "@/src/entities/home/model/type";

const makeItem = (index: number): GlobalSearchItem => ({
  id: `mock-${index + 1}`,
  title: `테스트 공고 ${index + 1}`,
  agency: "LH",
  housingType: "아파트",
  supplyType: "공공임대",
  announceDate: "2026-01-20",
  applyStart: "2026-01-21",
  applyEnd: "2026-02-01",
  targetGroups: ["청년", "신혼부부"],
  liked: false,
});

export const makeHomeResultItems = (count: number) =>
  Array.from({ length: count }, (_, index) => makeItem(index));

// Example datasets for "더보기" 테스트
export const homeResultItemsLessThanFive = makeHomeResultItems(4);
export const homeResultItemsExactlyFive = makeHomeResultItems(5);
export const homeResultItemsMoreThanFive = makeHomeResultItems(9);
export const homeResultItemsMoreThanTen = makeHomeResultItems(12);
