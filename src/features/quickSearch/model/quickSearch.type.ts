export interface QuickSearchData {
  historyId: string | null;
  pinPointId: string;
  transitTime: number;
  minSize: number;
  maxSize: number;
  maxDeposit: number;
  maxMonthPay: number;
  facilities: string[];
  rentalTypes: string[];
  supplyTypes: string[];
  houseTypes: string[];
  livingNumber: number; // 기존 스토어와 통합
}

export interface QuickSearchState extends QuickSearchData {
  // Setters for individual fields
  setHistoryId: (value: string | null) => void;
  setPinPointId: (value: string) => void;
  setTransitTime: (value: number) => void;
  setMinSize: (value: number) => void;
  setMaxSize: (value: number) => void;
  setMaxDeposit: (value: number) => void;
  setMaxMonthPay: (value: number) => void;
  setFacilities: (value: string[]) => void;
  setRentalTypes: (value: string[]) => void;
  setSupplyTypes: (value: string[]) => void;
  setHouseTypes: (value: string[]) => void;
  setLivingNumber: (value: number) => void; // 기존 스토어와 통합

  // Array manipulation methods
  addFacility: (facility: string) => void;
  removeFacility: (facility: string) => void;
  toggleFacility: (facility: string) => void;

  addRentalType: (type: string) => void;
  removeRentalType: (type: string) => void;
  toggleRentalType: (type: string) => void;

  addSupplyType: (type: string) => void;
  removeSupplyType: (type: string) => void;
  toggleSupplyType: (type: string) => void;

  addHouseType: (type: string) => void;
  removeHouseType: (type: string) => void;
  toggleHouseType: (type: string) => void;

  // Bulk operations
  setQuickSearchData: (data: Partial<QuickSearchData>) => void;
  reset: () => void;
}
