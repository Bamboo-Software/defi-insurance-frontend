import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { IFilter } from "@/types/interfaces/common";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatQuery = <T extends Partial<IFilter>>(filter: T) => {
  const cleanFilter = Object.entries(filter).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      acc[key] = String(value);
    }
    return acc;
  }, {} as Record<string, string>);
  const params = new URLSearchParams(cleanFilter);
  return params;
};