import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const formatDate = (dateString: string | Date | number): string => {
  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return format(date, "dd/MM/yyyy", { locale: vi });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const formatDateTime = (dateString: string | Date | number): string => {
  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return format(date, "dd/MM/yyyy HH:mm", { locale: vi });
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "";
  }
};

export const formatRelativeTime = (dateString: string | Date | number): string => {
  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "";
  }
};

export const formatFullDate = (dateString: string | Date | number): string => {
  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return format(date, "'Ngày' dd 'tháng' MM 'năm' yyyy", { locale: vi });
  } catch (error) {
    console.error("Error formatting full date:", error);
    return "";
  }
};


export const toISODateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};