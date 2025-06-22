import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/configs";
import type { IInsurancePackageResponse } from "@/types/interfaces/insurance-package";
import  type { ApiArrayResponse } from "@/types/interfaces/common";

const reducerPath = "insurancePackageApi";
const endpoint = "insurance-package";


export const insurancePackageApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getInsurancePlans: builder.query<ApiArrayResponse<IInsurancePackageResponse>, void>({
      query: () => ({
        url: `${endpoint}`,
      }),
    }),
  }),
});

export const {
    useGetInsurancePlansQuery,
} = insurancePackageApi;