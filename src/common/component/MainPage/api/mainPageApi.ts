import {baseApi} from "../../../../app/api/baseApi";
import type {ResponseType, SearchParams} from './MainPage.types';

export const mainPageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopular: build.query<ResponseType, {page:number}>({
            query: ({page}) => ({url: `/movie/popular?page=${page}`}) ,
            providesTags: ['Popular']
        }),
        getTopRated: build.query<ResponseType, {page:number}>({
            query: ({page}) => ({url: `movie/top_rated?page=${page}`}),
            providesTags: ['Popular']
        }),
        getUpcoming: build.query<ResponseType, {page:number}>({
            query: ({page}) => ({url:`movie/upcoming?page=${page}`}),
            providesTags: ['Popular']
        }),
        getNowPlaying: build.query<ResponseType, {page:number}>({
            query: ({page}) => ({url:`movie/now_playing?page=${page}`}),
            providesTags: ['Popular']
        }),
        getDiscoverMovie: build.query<ResponseType, { payload:{page:number,sort_by:string, 'vote_average.gte': number,'vote_average.lte': number} }>({
            query: ({payload}) =>
            {
                return {
                url: `discover/movie`,
                params: payload
            }
            },
        }),
        getMovieList: build.query<ResponseType, void>({
            query: () => `genre/movie/list`,
        }),
        searchMovie: build.query<ResponseType,SearchParams>({
            query: (params) => ({
                url: '/search/movie',
                params
            })
        })
    }),
})
export const {
    useGetPopularQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery,
    useGetNowPlayingQuery,
    useGetDiscoverMovieQuery,
    useGetMovieListQuery,
    useSearchMovieQuery
} = mainPageApi
