import { createSelector } from "@reduxjs/toolkit"
import { mainPageApi } from "./api/mainPageApi"

export const selectIsFetching = createSelector(
    (state) => state[mainPageApi.reducerPath].queries,
    (queries) => Object.values(queries).some((query) => query?.status === "pending")
)