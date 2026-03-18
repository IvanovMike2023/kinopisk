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
            query: ({payload}) =>({
                url: `discover/movie`,
                params: payload
            }),
        }),
        getMovieList: build.query<ResponseType, void>({
            query: () => `genre/movie/list`,
        }),
        getSearchMovie: build.query<ResponseType,SearchParams>({
            query: (params) => ({
                url: '/search/movie',
                params
            })
        }),
        getDetailsMovie: build.query<any,{movie_id:number}>({
            query: ({movie_id}) => {
                return {
                    url: `/movie/${movie_id}`
                }
            }
        }),
        getCredits: build.query<any,{movie_id:number}>({
            query: ({movie_id}) => {
                return {
                    url: `/movie/${movie_id}/credits`
                }
            }
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
    useGetSearchMovieQuery,
    useGetDetailsMovieQuery,
    useGetCreditsQuery
} = mainPageApi
