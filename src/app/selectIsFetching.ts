import { createSelector } from "@reduxjs/toolkit"
import { mainPageApi } from "./api/mainPageApi"
import type {RootState} from "./store";
import type { QueryState } from "@reduxjs/toolkit/dist/query/core/apiState";

export const selectIsFetching = createSelector(
    (state: RootState) => state[mainPageApi.reducerPath].queries as Record<string, QueryState>,
    (queries) => Object.values(queries).some((query) => query?.status === "pending")
)