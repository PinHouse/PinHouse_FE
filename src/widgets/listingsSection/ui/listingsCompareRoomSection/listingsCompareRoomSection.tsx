import {
  ListingCompareCard,
  ListingCompareHeader,
  ListingCompareItem,
  ListingsCompareContentHeader,
  mapCompareItemToCardProps,
} from "@/src/features/listings/ui/listingsCompareRoom";
import { ListingCompareCardSkeleton } from "@/src/features/listings/ui/listingsCompareRoom/components/listingsCompareCardSkeleton";

import { PageTransition } from "@/src/shared/ui/animation";
import { Skeleton } from "@/src/shared/ui/skeleton/skeleton";

export const LISTING_COMPARE_MOCK: ListingCompareItem[] = [
  {
    id: "room-001",
    roomType: "대학생",
    complexName: "진주가좌올리움",
    distanceText: "핀포인트로부터 약 09시 00분 거리",
    priceText: "보증금 0만원 · 월임대료 0만원",
    optionText: "전용면적 약 26㎡ (8평)",
    tags: ["버스정류장", "편의점", "마트"],
  },
  {
    id: "room-002",
    roomType: "청년",
    complexName: "가좌청년주택",
    distanceText: "핀포인트로부터 약 12시 00분 거리",
    priceText: "보증금 300만원 · 월임대료 15만원",
    optionText: "전용면적 약 31㎡ (9평)",
    tags: ["지하철", "카페", "병원"],
  },
  {
    id: "room-003",
    roomType: "신혼부부",
    complexName: "진주역 행복주택",
    distanceText: "핀포인트로부터 약 15시 00분 거리",
    priceText: "보증금 800만원 · 월임대료 25만원",
    optionText: "전용면적 약 42㎡ (13평)",
    tags: ["초등학교", "공원", "마트"],
  },
  {
    id: "room-004",
    roomType: "고령자",
    complexName: "진주노인복지주택",
    distanceText: "핀포인트로부터 약 10시 30분 거리",
    priceText: "보증금 200만원 · 월임대료 10만원",
    optionText: "전용면적 약 29㎡ (9평)",
    tags: ["병원", "약국", "복지관"],
  },
  {
    id: "room-005",
    roomType: "고령자",
    complexName: "진주노인복지주택",
    distanceText: "핀포인트로부터 약 10시 30분 거리",
    priceText: "보증금 200만원 · 월임대료 10만원",
    optionText: "전용면적 약 29㎡ (9평)",
    tags: ["병원", "약국", "복지관"],
  },
  {
    id: "room-006",
    roomType: "고령자",
    complexName: "진주노인복지주택",
    distanceText: "핀포인트로부터 약 10시 30분 거리",
    priceText: "보증금 200만원 · 월임대료 10만원",
    optionText: "전용면적 약 29㎡ (9평)",
    tags: ["병원", "약국", "복지관"],
  },
  {
    id: "room-007",
    roomType: "고령자",
    complexName: "진주노인복지주택",
    distanceText: "핀포인트로부터 약 10시 30분 거리",
    priceText: "보증금 200만원 · 월임대료 10만원",
    optionText: "전용면적 약 29㎡ (9평)",
    tags: ["병원", "약국", "복지관"],
  },
];

export const ListingCompareSection = ({ id }: { id: string }) => {
  const data = LISTING_COMPARE_MOCK; // 나중에 API
  return (
    <section className="mx-auto min-h-full w-full">
      <PageTransition>
        <ListingCompareHeader id={id} />
        <div className="p-4">
          <ListingsCompareContentHeader />
        </div>
        <div className="grid grid-cols-2 items-stretch gap-2 px-4">
          {data.map(item => (
            <ListingCompareCard key={item.id} {...mapCompareItemToCardProps(item)} />
          ))}
        </div>

        {/* <div className="grid grid-cols-2 gap-2 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListingCompareCardSkeleton key={i} />
          ))}
        </div> */}
      </PageTransition>
    </section>
  );
};
