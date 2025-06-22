import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/configs";
import type { IInsuranceTransactionFilter, IInsuranceTransactionResponse } from "@/types/interfaces/insurance-transaction";
import type { ApiItemsResponse } from "@/types/interfaces/common";
import { formatQuery } from "@/lib/utils";



const reducerPath = "insuranceTransactionApi";
const endpoint = "insurance-transaction";

export const insuranceTransactionApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getInsuranceTransactions: builder.query<ApiItemsResponse<IInsuranceTransactionResponse>, IInsuranceTransactionFilter>({
      query: (filter: IInsuranceTransactionFilter) => {
        const params = formatQuery(filter);
        return {
          url: `${endpoint}/me?${params.toString()}`,
        }
      },
    }),
  }),
});

export const {
    useGetInsuranceTransactionsQuery
} = insuranceTransactionApi;