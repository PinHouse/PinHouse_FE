"use client";

import { useState } from "react";
import { QuickSearchResultBottomSheet } from "@/src/features/quickSearch/ui/common/quickSearchResultBottomSheet";
import { QuickSearchResultHeader } from "@/src/features/quickSearch/ui/common/quickSearchResultHeader";

export default function QuickSearchResultPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  // 임시 데이터 (나중에 API로 대체)
  const mockData = [
    {
      tag: "대학생",
      complexName: "단지 이름 최대 한줄 넘어가면 자동으로 잘려서 표시됩니다",
      distanceHours: 0,
      distanceMinutes: 30,
      deposit: 1000,
      monthlyRent: 50,
      exclusiveArea: 30,
      recruitmentUnits: 5,
      infrastructureTags: ["지하철", "편의점", "카페", "마트"],
      floorPlanImage: undefined,
      onGoToAnnouncement: () => console.log("공고 바로가기 클릭"),
    },
    {
      tag: "직장인",
      complexName: "강남 아파트",
      distanceHours: 1,
      distanceMinutes: 15,
      deposit: 2000,
      monthlyRent: 80,
      exclusiveArea: 40,
      recruitmentUnits: 3,
      infrastructureTags: ["지하철", "편의점"],
      floorPlanImage: undefined,
      onGoToAnnouncement: () => console.log("공고 바로가기 클릭"),
    },
    {
      tag: "신혼부부",
      complexName: "서초 오피스텔",
      distanceHours: 0,
      distanceMinutes: 45,
      deposit: 1500,
      monthlyRent: 60,
      exclusiveArea: 35,
      recruitmentUnits: 2,
      infrastructureTags: ["카페", "마트", "병원"],
      floorPlanImage: undefined,
      onGoToAnnouncement: () => console.log("공고 바로가기 클릭"),
    },
    {
      tag: "대학생",
      complexName: "홍대 원룸",
      distanceHours: 0,
      distanceMinutes: 20,
      deposit: 500,
      monthlyRent: 40,
      exclusiveArea: 25,
      recruitmentUnits: 10,
      infrastructureTags: ["지하철", "편의점", "카페"],
      floorPlanImage: undefined,
      onGoToAnnouncement: () => console.log("공고 바로가기 클릭"),
    },
  ];

  return (
    <div className="relative flex h-screen flex-col bg-white">
      <QuickSearchResultHeader />
      <QuickSearchResultBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        cards={mockData}
      />
    </div>
  );
}
