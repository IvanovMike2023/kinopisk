import { createSelector } from "@reduxjs/toolkit"
import type {RootState} from "./store";
import {pagesApi} from "./api/PagesApi";


// Типизация через RootState
export const selectIsFetching = createSelector(
    (state: RootState) => state[pagesApi.reducerPath].queries,
    (queries) =>
        Object.values(queries as Record<string, { status?: string }>).some(
            (query) => query.status === "pending"
        )
)