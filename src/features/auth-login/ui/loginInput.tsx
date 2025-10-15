"use client";
import React from "react";
import { LoginInputProps } from "../model/auth.cilent.type";

export const UseLoginInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: LoginInputProps) => {
  return (
    <div className="flex flex-col">
      <span className="pb-2 text-xs text-text-primary">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-2 py-3 text-sm transition-all duration-200 focus:border-button-light focus:ring-1 focus:ring-button-light"
      />
    </div>
  );
};
