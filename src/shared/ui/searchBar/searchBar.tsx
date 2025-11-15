"use client";

import { cn } from "@/src/shared/lib/utils";

import { Search } from "@/src/assets/icons/home";
import { XButton } from "@/src/assets/icons/button";
import { Input } from "../input/deafult";
import { SearchBarProps } from "./type";
import { searchBarVariants } from "./searchBar.variants";
import { useSearchBar } from "./useSearchBar";

export const SearchBar = ({
  leftIcon = <Search className="h-5 w-5" />,
  rightIcon,
  variant = "default",
  state,
  className,
  options = [],
  onSelect,
  value,
  onChange,
  ...props
}: SearchBarProps) => {
  const {
    searchValue,
    isOpen,
    hoveredIndex,
    setHoveredIndex,
    isFocused,
    wrapperRef,
    currentState,
    isCapsule,
    hasValue,
    filteredOptions,
    handleChange,
    handleSelect,
    handleFocus,
    handleBlur,
    handleFilledClear,
  } = useSearchBar({
    value,
    onChange,
    options,
    onSelect,
    variant: variant ?? "default",
    state: state ?? undefined,
  });

  // 아이콘 표시 조건
  const showLeftIcon = variant === "default";
  const showRightSearchIcon =
    isCapsule && (currentState === "default" || currentState === "typing");
  const showFilledXButton = isCapsule && currentState === "filled";
  const showInputXButton = isCapsule && hasValue && isFocused;

  const defaultLeftIcon = leftIcon ?? <Search className="h-5 w-5" />;

  const dropdownMenu = isOpen && filteredOptions.length > 0 && (
    <ul
      className={cn(
        "shadow-md-16 group absolute left-0 top-full z-20 mt-2 w-full rounded border border-gray-200 bg-white font-bold text-text-tertiary"
      )}
    >
      {filteredOptions.map((item, index) => {
        const isHovered = hoveredIndex === index;
        return (
          <li
            key={item.key}
            onClick={() => handleSelect(item)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(0)}
            className={cn(
              "gap-[0.5 rem] flex cursor-pointer flex-col px-3 py-[0.625rem]",
              isHovered ? "bg-primary-blue-25 text-primary-blue-400" : "text-greyscale-grey-400"
            )}
          >
            <span className="truncate text-sm font-medium leading-[132%] tracking-[-0.01em]">
              {item.value}
            </span>
            {item.description && (
              <span className="truncate text-[0.625rem] leading-[132%]">{item.description}</span>
            )}
          </li>
        );
      })}
    </ul>
  );

  // Capsule variant는 Input 컴포넌트를 wrapper로 감싸서 스타일 적용
  if (variant === "capsule") {
    return (
      <div className="relative w-full" ref={wrapperRef}>
        <div className={cn(searchBarVariants({ variant, state: currentState }), className)}>
          <Input
            {...props}
            value={searchValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "flex-1 border-none bg-transparent p-0 shadow-none",
              (showInputXButton || showFilledXButton) && "pr-10" // X 버튼 공간
            )}
          />
          {showRightSearchIcon && (
            <div className="pointer-events-none flex-shrink-0">
              {rightIcon || <Search className="text-greyscale-grey-400 h-5 w-5" />}
            </div>
          )}
          {showFilledXButton && (
            <button
              type="button"
              onMouseDown={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={handleFilledClear}
              className="flex-shrink-0 cursor-pointer text-greyscale-grey-500 hover:text-greyscale-grey-700"
              aria-label="Clear input"
            >
              <XButton className="h-5 w-5" />
            </button>
          )}
        </div>
        {dropdownMenu}
      </div>
    );
  }

  // Default variant는 기존 Input 컴포넌트 사용
  return (
    <div className="relative w-full" ref={wrapperRef}>
      {showLeftIcon && (
        <div className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2">
          {defaultLeftIcon}
        </div>
      )}
      <Input
        {...props}
        value={searchValue}
        onChange={handleChange}
        onFocus={handleFocus}
        className={cn(showLeftIcon && "pl-[3.125rem]", className)}
      />
      {dropdownMenu}
    </div>
  );
};
