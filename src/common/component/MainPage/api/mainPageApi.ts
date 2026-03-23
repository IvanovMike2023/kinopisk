import {baseApi} from "../../../../app/api/baseApi";
import type { SearchParams} from './MainPage.types';
import {z} from 'zod'
import {
    CreditsSchema,
    GenreListSchema,
    MovieDetailsSchema,
    ResponseDetailsSchema,
    ResponseSchema
} from "./MainPage.types";


export type ResponseType = z.infer<typeof ResponseSchema>;
export type DiscoverTypeType = z.infer<typeof ResponseDetailsSchema>;
export type CreditType = z.infer<typeof CreditsSchema>;
export type ResponseTypeDetailsMovie = z.infer<typeof MovieDetailsSchema>;
export type ResponseGenreListSchema = z.infer<typeof GenreListSchema >;



export const mainPageApi = baseApi.injectEndpoints({
    endpoints: (build) => {
        return ({
            getPopular: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `/movie/popular?page=${page}`}),
                transformResponse: (response: unknown) => {
                    return ResponseSchema.parse(response)
                },
                providesTags: ['Popular']
            }),
            getTopRated: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `movie/top_rated?page=${page}`}),
                transformResponse: (response: unknown) => {
                    return ResponseSchema.parse(response)
                },
                providesTags: ['Popular']
            }),
            getUpcoming: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `movie/upcoming?page=${page}`}),
                transformResponse: (response: unknown) => {
                    return ResponseSchema.parse(response)
                },
                providesTags: ['Popular']
            }),
            getNowPlaying: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `movie/now_playing?page=${page}`}),
                transformResponse: (response: unknown) => {
                    return ResponseSchema.parse(response)
                },
                providesTags: ['Popular']
            }),
            getDiscoverMovie: build.query<DiscoverTypeType, { payload: { page: number, sort_by: string, 'vote_average.gte': number, 'vote_average.lte': number } }>({
                query: ({payload}) => ({
                    url: `discover/movie`,
                    params: payload
                }),
                transformResponse: (response: unknown) => {
                    return ResponseDetailsSchema.parse(response)
                },
            }),
            getMovieList: build.query<ResponseGenreListSchema, void>({
                query: () => `genre/movie/list`,
                transformResponse: (response: unknown) => {
                    return GenreListSchema.parse(response)
                },

            }),
            getSearchMovie: build.query<ResponseType, SearchParams>({
                query: (params) => ({
                    url: '/search/movie',
                    params
                }),
                transformResponse: (response: unknown) => {
                    return ResponseSchema.parse(response)
                },
            }),
            getDetailsMovie: build.query<ResponseTypeDetailsMovie, { movie_id: number }>({
                query: ({movie_id}) => ({
                    url: `/movie/${movie_id}`
                }),
                transformResponse: (response: unknown) => {
                    return MovieDetailsSchema.parse(response)
                },
            }),
            getCredits: build.query<CreditType, { movie_id: number }>({
                query: ({movie_id}) => ({
                    url: `/movie/${movie_id}/credits`
                }),
                transformResponse: (response: unknown) => {
                    return CreditsSchema.parse(response)
                },
            }),
            getSimilar: build.query<ResponseType, { movie_id: number }>({
                query: ({movie_id}) => ({
                    url: `/movie/${movie_id}/similar`
                }),
                transformResponse: (response: unknown) => {
                    return ResponseSchema.parse(response)
                },
            })
        });
    },
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
    useGetCreditsQuery,
    useGetSimilarQuery
} = mainPageApi
