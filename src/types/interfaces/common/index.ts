import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit";
import { OrderDirectionEnum } from "../../enums/common.enum";

type ApiResponseBase = {
  success: boolean;
  statusCode: number;
  message: string;
};

export interface ApiResponse<T> extends ApiResponseBase {
  data: T;
}

export interface ApiArrayResponse<T> extends ApiResponseBase {
  data: T[];
}

export interface ApiItemsResponse<T> extends ApiResponseBase {
  data: {
    items: T[];
    total: number;
  };
}

type ValidationError = Array<{ field: string; error: string }>;

export interface ApiErrorResponseDetail extends Omit<ApiResponseBase, 'message'> {
  message: string | ValidationError;
  error: string;
}

export interface ApiErrorResponse {
  error: {
    status: number;
    data: ApiErrorResponseDetail;
  }
}

export type ApiQueryResponse<T> = 
  | { data: ApiResponse<T>; error?: undefined }
  | { data?: undefined; error: FetchBaseQueryError | SerializedError };

export type OrderDirection = keyof typeof OrderDirectionEnum;

export interface IFilter {
  orderField?: string;
  orderDirection?: OrderDirection;
  page: number;
  limit: number;
  q: string;
  startTime?: string;
  endTime?: string;
}

type ISODateString = string;

export interface IItem {
  id: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt?: ISODateString;
}
