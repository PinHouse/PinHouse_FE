import {
  ListingItemMinimal,
  ListingNormalized,
  ListingUnion,
  PinPointPlace,
  RentType,
  ToggleLikeVariables,
} from "@/src/entities/listings/model/type";
import { DetailFilterTabKey, FilterTabKey, RENT_COLOR_CLASS } from "../model";
import { LISTING_ICON_MAP } from "../model/listingsMap";
import { ListingBgBookMark } from "../ui/listingsContents/listingsBookMark";
import { useToogleLike } from "@/src/entities/listings/hooks/useListingHooks";
import { LikeButton } from "@/src/assets/icons/button/likeButton";
import { LineLikeButton } from "@/src/assets/icons/button/lineLikeButton";
import { SmallHome } from "@/src/assets/icons/home/smallHome";
import { SmallMapPin } from "@/src/assets/icons/onboarding/smallMapPin";
import { FireIcon } from "@/src/assets/icons/onboarding/fire";

export const formatInfoText = (text: string) => {
  if (!text) return text;

  return text.replace(/\s*\(/, "\n(");
};

export const getListingsRental = (type: string) => {
  if (!(type in RENT_COLOR_CLASS)) return null;
  const key = type as RentType;
  const rental = RENT_COLOR_CLASS[key];
  return rental;
};

const normalizeRentType = (rentType: string) => {
  const v = (rentType ?? "").replace(/\s+/g, "").trim();
  if (/\d+년임대/.test(v)) return "N년임대";
  if (v.includes("공공")) return "통합공공임대";
  return rentType;
};

export const getListingIcon = (type: string, housingType: string, size = 78) => {
  const Near = normalizeRentType(type);

  const IconComp = LISTING_ICON_MAP[Near]?.[housingType];
  if (!IconComp) return null;

  return <IconComp width={size} height={size} />;
};

export function getIndicatorLeft(activeTab: FilterTabKey) {
  switch (activeTab) {
    case "region":
      return 20;
    case "target":
      return 20 + 55;
    case "rental":
      return 20 + 55 + 80;
    case "housing":
      return 20 + 55 + 77 + 84;
  }
}

export function getDetailIndicatorLeft(activeTab: DetailFilterTabKey) {
  switch (activeTab) {
    case "distance":
      return 20;
    case "region":
      return 20 + 57;
    case "cost":
      return 20 + 57 + 55;
    case "area":
      return 20 + 57 + 55 + 57;
    case "around":
      return 20 + 57 + 55 + 57 + 56;
  }
}

export function getIndicatorWidth(activeTab: FilterTabKey) {
  switch (activeTab) {
    case "region":
      return 32;
    case "target":
      return 60;
    case "rental":
      return 60;
    case "housing":
      return 60;
  }
}

export const highlight = (text: string, keyword: string) => {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-primary-blue-50 font-bold text-primary-blue-300">
        {part}
      </span>
    ) : (
      part
    )
  );
};

// 사용처: 리스트 카드 타이틀에서 키워드 중심의 일부만 하이라이트 표시 (listingsContentCard.tsx)
export const HighlightCenteredText = ({
  text,
  keyword,
  range = 5,
}: {
  text: string;
  keyword: string;
  range?: number;
}) => {
  const centered = getKeywordCenteredText(text, keyword, range);
  return <>{highlight(centered, keyword)}</>;
};

export const getKeywordCenteredText = (text: string, keyword: string, range: number = 20) => {
  if (!keyword) return text;

  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return text;

  const start = Math.max(0, index - range);
  const end = Math.min(text.length, index + keyword.length + range);

  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";

  return prefix + text.substring(start, end) + suffix;
};

export const LikeType = ({ id, liked, type, resetQuery }: ListingItemMinimal) => {
  const { mutate } = useToogleLike(resetQuery);
  const toggleLike = async () => {
    const body: ToggleLikeVariables = liked
      ? { method: "delete", targetId: id, type: type }
      : { method: "post", targetId: id, liked: liked, type: type };

    mutate(body);
  };

  return (
    <div onClick={toggleLike}>
      {liked ? (
        <LikeButton className="hover:cursor-pointer" />
      ) : (
        <LineLikeButton className="hover:cursor-pointer" />
      )}
    </div>
  );
};

export const HouseICons = (item: ListingNormalized) => {
  const icon = getListingIcon(item.type, item.housingType);
  return <div>{icon}</div>;
};

type HouseRentalProps = ListingNormalized & {
  query: "listingListInfinite" | "listingSearchInfinite" | "notice";
};

//  ListingNormalized
export const HouseRental = ({ query, ...item }: HouseRentalProps) => {
  const Near = normalizeRentType(item.type);
  const rentalText = getListingsRental(Near);
  if (!rentalText) return null;
  return (
    <span className="flex w-full justify-between">
      <ListingBgBookMark item={item.type} bg={rentalText.bg} text={rentalText.text} border="none" />
      <LikeType liked={item.liked} id={item.id} type={"NOTICE"} resetQuery={[query]} />
    </span>
  );
};

// 사용처: 구간 소요시간 텍스트("12분") → 분(12) 변환 (TransportIconRenderer.tsx)
export const parseMinutes = (minutesText: string | number): number => {
  if (typeof minutesText !== "string") return 0;

  const hourMatch = minutesText.match(/(\d+)\s*시간/);
  const minuteMatch = minutesText.match(/(\d+)\s*분/);

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  return hours * 60 + minutes;
};

// 사용처: ComplexesInfo 컴포넌트 아이콘/라벨 메타
const COMPLEX_INFO_META = {
  name: {
    icon: SmallHome,
    label: "단지명",
  },
  address: {
    icon: SmallMapPin,
    label: "주소",
  },
  heating: {
    icon: FireIcon,
    label: "난방방식",
  },
} as const;

// 사용처: 상세 카드 타일 상단 기본 정보 표시 (listingsCardTtileInfra.tsx)
export const ComplexesInfo = ({
  infoKey,
  infoValue,
}: {
  infoKey: keyof typeof COMPLEX_INFO_META;
  infoValue: string;
}) => {
  const meta = COMPLEX_INFO_META[infoKey];
  const Icon = meta.icon;

  return (
    <div className="flex items-center">
      <Icon height={20} width={20} />
      <span className="block whitespace-pre-line break-keep p-1 text-xs-13 leading-relaxed">
        {formatInfoText(infoValue ?? meta.label)}
      </span>
    </div>
  );
};

export const sortTypeChange = (sort: boolean) => {
  return sort ? "주변환경 매칭순" : " 핀포인트 거리순";
};

export type PinpointOptionValue = {
  key: string;
  value: string;
  description?: string;
};

export type PinPointOption = {
  myPinPoint: PinpointOptionValue[];
};

export const mapPinPointToOptions = (data?: PinPointPlace["pinPoints"]): PinPointOption => {
  const pinPointList = {
    myPinPoint:
      data?.map(item => ({
        key: item.id,
        value: item.name,
        description: item.address,
      })) ?? [],
  };

  return pinPointList;
};

export const getDefaultPinPointLabel = (
  options: PinPointOption,
  fallback = "핀포인트를 추가해 주세요"
) => {
  const opt = options.myPinPoint;
  if (opt.length === 0) return fallback;
  const first = opt[0];
  return first.value || first.description || fallback;
};
