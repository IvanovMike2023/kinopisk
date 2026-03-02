import {baseApi} from "../../../../app/api/baseApi";
import type {PopularType} from './MainPage.types';

export const mainPageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopular: build.query<PopularType, void>({
            query: ({page}) => ({url: `/movie/popular?language=en-US&page=${page}`}) ,
            providesTags: ['Popular']
        }),
    }),
})
export const {
    useGetPopularQuery,
} = mainPageApi
