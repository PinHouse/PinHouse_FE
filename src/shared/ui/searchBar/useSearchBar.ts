import { useEffect, useMemo, useRef, useState } from "react";
import { SearchBarOption } from "./type";

interface UseSearchBarProps {
  value?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: SearchBarOption[];
  onSelect?: (option: SearchBarOption) => void;
  variant?: "default" | "capsule";
  state?: "default" | "typing" | "filled";
}

export const useSearchBar = ({
  value,
  onChange,
  options = [],
  onSelect,
  variant = "default",
  state,
}: UseSearchBarProps) => {
  const [searchValue, setSearchValue] = useState(value?.toString() || "");
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isCapsule = variant === "capsule";
  const hasValue = searchValue.length > 0;

  // Capsule variant일 때 state 자동 결정
  const currentState = useMemo(() => {
    if (state) return state;
    if (!isCapsule) return "default";
    if (!hasValue) return "default";
    return isFocused ? "typing" : "filled";
  }, [state, isCapsule, hasValue, isFocused]);

  // 검색어로 필터링
  const filteredOptions = useMemo(
    () =>
      options.filter(
        option =>
          option.value.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [options, searchValue]
  );

  // value prop이 변경되면 내부 state도 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setSearchValue(value.toString());
    }
  }, [value]);

  // 드롭다운 표시 여부 업데이트
  useEffect(() => {
    if (searchValue.length > 0 && filteredOptions.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchValue, filteredOptions]);

  // Synthetic event 생성 헬퍼
  const createChangeEvent = (value: string): React.ChangeEvent<HTMLInputElement> =>
    ({
      target: { value },
      currentTarget: { value },
    }) as React.ChangeEvent<HTMLInputElement>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setHoveredIndex(0);
    onChange?.(e);
  };

  const handleSelect = (option: SearchBarOption) => {
    setSearchValue(option.value);
    setIsOpen(false);
    onSelect?.(option);
    onChange?.(createChangeEvent(option.value));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
  };

  const handleFilledClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchValue("");
    setIsOpen(false);
    onChange?.(createChangeEvent(""));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    searchValue,
    isOpen,
    hoveredIndex,
    setHoveredIndex,
    isFocused,
    wrapperRef,
    currentState: currentState as "default" | "typing" | "filled",
    isCapsule,
    hasValue,
    filteredOptions,
    handleChange,
    handleSelect,
    handleFocus,
    handleBlur,
    handleFilledClear,
  };
};
