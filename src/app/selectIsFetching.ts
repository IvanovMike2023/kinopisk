import { createSelector } from "@reduxjs/toolkit"
import { mainPageApi } from "../pages/MainPage/api/mainPageApi"

export const selectIsFetching = createSelector(
    (state) => state[mainPageApi.reducerPath].queries,
    (queries) => Object.values(queries).some((query) => query?.status === "pending")
)