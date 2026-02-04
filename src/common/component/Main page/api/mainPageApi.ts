import {baseApi} from "../../../../app/api/baseApi";
import {PopularType} from "./PageApi.types";
export const todolistApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopular: build.query<PopularType, void>({
            query: () => `/movie/popular?language=en-US&page=1`,
            providesTags: ['Popular']
        }),
    }),
})
export const {
    useGetPopularQuery,
} = todolistApi

