"use client";

import {
  useListingDetailBasic,
  useListingRentalDetail,
} from "@/src/entities/listings/hooks/useListingDetailHooks";
import {
  useListingDetailCountStore,
  useListingsDetailTypeStore,
} from "@/src/features/listings/model";
import { useEffect } from "react";
import { ComplexList, ListingsCardTileProps } from "@/src/entities/listings/model/type";

export const useListingsCardDetailSectionHooks = (id: string) => {
  const { data, isLoading } = useListingDetailBasic(id);
  const setCounts = useListingDetailCountStore(state => state.setCounts);

  const ready = !!id && !!data?.data && !isLoading;
  const basicInfo = data?.data?.basicInfo;
  const filtered = data?.data?.filtered;
  const nonFiltered = data?.data?.nonFiltered;

  useEffect(() => {
    if (!filtered) return;
    setCounts(filtered.totalCount);
  }, [filtered, setCounts]);

  return {
    data,
    isLoading,
    ready,
    basicInfo,
    filtered,
    nonFiltered,
  };
};

export const useListingRentalDetailHooks = (listing: ListingsCardTileProps["listing"]) => {
  const { data: infra } = useListingRentalDetail(listing.id);
  const route = infra?.distance;
  const infraData = infra?.infra;
  const roomTypes = infra?.unitTypes;
  const rentalInfo = infra?.rentalInfo;

  return {
    infra,
    infraData,
    roomTypes,
    rentalInfo,
    route,
  };
};

export const useListingComplexSectionHooks = (listings: ComplexList) => {
  const { sortType, setSortType } = useListingsDetailTypeStore();
  const complexesCount =
    listings?.totalCount < 10 ? `0${listings?.totalCount}` : listings?.totalCount;
  const onDangSortType = () => {
    setSortType(sortType === "거리 순" ? "주변환경 매칭순" : "거리 순");
  };
  return {
    complexesCount,
    onDangSortType,
    sortType,
  };
};
