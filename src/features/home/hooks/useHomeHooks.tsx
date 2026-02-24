import { GlobalListType, GlobalSearchSection } from "@/src/entities/home/model/type";

export const useHomeGlobalSearch = (globalData?: GlobalListType): GlobalSearchSection[] => {
  if (!globalData) return [];

  return [
    {
      category: "notices",
      content: globalData.notices.content,
      hasNext: globalData.notices.hasNext,
    },
    {
      category: "complexes",
      content: globalData.complexes.content,
      hasNext: globalData.complexes.hasNext,
    },
    {
      category: "targetGroups",
      content: globalData.targetGroups.content,
      hasNext: globalData.targetGroups.hasNext,
    },
    {
      category: "regions",
      content: globalData.regions.content,
      hasNext: globalData.regions.hasNext,
    },
    {
      category: "houseTypes",
      content: globalData.houseTypes.content,
      hasNext: globalData.houseTypes.hasNext,
    },
  ];
};
