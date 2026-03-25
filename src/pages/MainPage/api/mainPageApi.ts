import {baseApi} from "../../../app/api/baseApi";
import type { SearchParams} from './MainPage.types';
import {z} from 'zod'
import {
    CreditsSchema,
    GenreListSchema,
    MovieDetailsSchema,
    ResponseDetailsSchema,
    ResponseSchema
} from "./MainPage.types";

export type DiscoverParams = {
    page?: number;
    sort_by?: string;
    'vote_average.gte'?: number;
    'vote_average.lte'?: number;
};
export type ResponseType = z.infer<typeof ResponseSchema>;
export type DiscoverTypeType = z.infer<typeof ResponseDetailsSchema>;
export type CreditType = z.infer<typeof CreditsSchema>;
export type ResponseTypeDetailsMovie = z.infer<typeof MovieDetailsSchema>;
export type ResponseGenreListSchema = z.infer<typeof GenreListSchema >;

const parseResponse = <T>(schema: z.ZodType<T>) => (response: unknown) => schema.parse(response);

export const mainPageApi = baseApi.injectEndpoints({
    endpoints: (build) => {
        return ({
            getPopular: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `/movie/popular?page=${page}`}),
                transformResponse:parseResponse(ResponseSchema),
                providesTags: ['Popular']
            }),
            getTopRated: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `movie/top_rated?page=${page}`}),
                    transformResponse:parseResponse(ResponseSchema),
                providesTags: ['TopRated']
            }),
            getUpcoming: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `movie/upcoming?page=${page}`}),
                transformResponse:parseResponse(ResponseSchema),
                providesTags: ['Upcoming']
            }),
            getNowPlaying: build.query<ResponseType, { page: number }>({
                query: ({page}) => ({url: `movie/now_playing?page=${page}`}),
                transformResponse:parseResponse(ResponseSchema),
                providesTags: ['NowPlaying']
            }),
            getDiscoverMovie: build.query<DiscoverTypeType,DiscoverParams >({
                query: ({params}) => ({
                    url: `discover/movie`,
                    params
                }),
                transformResponse:parseResponse(ResponseDetailsSchema),

            }),
            getMovieList: build.query<ResponseGenreListSchema, void>({
                query: () => `genre/movie/list`,
                transformResponse:parseResponse(GenreListSchema),
            }),
            getSearchMovie: build.query<ResponseType, SearchParams>({
                query: (params) => ({
                    url: '/search/movie',
                    params
                }),
                transformResponse:parseResponse(ResponseSchema),
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
