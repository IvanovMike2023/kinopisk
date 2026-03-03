import {baseApi} from "../../../../app/api/baseApi";
import type {ResponseType} from './MainPage.types';

export const mainPageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopular: build.query<ResponseType, void>({
            query: ({page}) => ({url: `/movie/popular?page=${page}`}) ,
            providesTags: ['Popular']
        }),
        getTopRated: build.query<ResponseType, void>({
            query: ({page}) => ({url: `movie/top_rated?page=${page}`}),
            providesTags: ['Popular']
        }),
        getUpcoming: build.query<ResponseType, void>({
            query: ({page}) => ({url:`movie/upcoming?page=${page}`}),
            providesTags: ['Popular']
        }),
        getNowPlaying: build.query<ResponseType, void>({
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
