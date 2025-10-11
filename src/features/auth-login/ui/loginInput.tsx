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
      <span className="text-text-primary pb-2 text-xs">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="focus:border-button-light focus:ring-button-light w-full rounded-lg border border-gray-300 px-2 py-3 text-sm transition-all duration-200 focus:ring-1"
      />
    </div>
  );
};
