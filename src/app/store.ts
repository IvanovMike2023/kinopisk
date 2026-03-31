import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {baseApi} from "./api/baseApi";
import {snackReducer} from "./snackSlice";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [baseApi.reducerPath]: baseApi.reducer,
        snackSlice:snackReducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})
setupListeners(store.dispatch)
// тип всего состояния Redux
export type RootState = ReturnType<typeof store.getState>
// тип dispatch
export type AppDispatch = typeof store.dispatch