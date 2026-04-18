import { REGION_KEYWORDS } from "@/src/features/chat/server/model/model";

export const districtMatchs = (source: string) => {
  return source.match(
    /(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)?\s*([가-힣]+구|[가-힣]+동|[가-힣]+시|[가-힣]+군)/
  );
};

export const extractListingKeyword = (keyword?: string, fallback?: string) => {
  const source = keyword?.trim() || fallback?.trim() || "";
  if (!source) return undefined;

  const matchedRegion = REGION_KEYWORDS.find(region => source.includes(region));
  if (matchedRegion) return matchedRegion;

  const districtMatch = districtMatchs(source);

  if (districtMatch) {
    return `${districtMatch[1] ?? ""}${districtMatch[2]}`.trim();
  }

  return source.split(/\s+/)[0];
};
