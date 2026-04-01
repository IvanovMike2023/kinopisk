import { createSelector } from "@reduxjs/toolkit"
import { mainPageApi } from "./api/mainPageApi"
import type {RootState} from "./store";


// Типизация через RootState
export const selectIsFetching = createSelector(
    (state: RootState) => state[mainPageApi.reducerPath].queries,
    (queries) =>
        Object.values(queries as Record<string, { status?: string }>).some(
            (query) => query.status === "pending"
        )
)