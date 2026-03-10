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
        getDiscoverMovie: build.query<ResponseType, { payload:{page:number,sort_by:string, 'vote_average.gte': 3,'vote_average.lte': 10} }>({
            query: ({payload}) =>  ({
                    url: `discover/movie`,
                    params: payload

            }),
        }),
    }),
})
export const {
    useGetPopularQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery,
    useGetNowPlayingQuery,
    useGetDiscoverMovieQuery,
} = mainPageApi
