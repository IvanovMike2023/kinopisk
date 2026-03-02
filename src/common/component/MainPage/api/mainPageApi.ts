import {baseApi} from "../../../../app/api/baseApi";
import type {PopularType} from './MainPage.types';

export const mainPageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopular: build.query<PopularType, void>({
            query: ({page}) => ({url: `/movie/popular?language=en-US&page=${page}`}) ,
            providesTags: ['Popular']
        }),
        getTopRated: build.query<PopularType, void>({
            query: ({page}) => ({url: `movie/top_rated?page=${page}`}),
            providesTags: ['Popular']
        }),
        getUpcoming: build.query<PopularType, void>({
            query: ({page}) => ({url:`movie/upcoming?page=${page}`}),
            providesTags: ['Popular']
        }),
        getNowPlaying: build.query<PopularType, void>({
            query: ({page}) => ({url:`movie/now_playing?page=${page}`}),
            providesTags: ['Popular']
        }),
    }),
})
export const {
    useGetPopularQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery,
    useGetNowPlayingQuery,
} = mainPageApi
