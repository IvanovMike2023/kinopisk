import {baseApi} from "../../../../app/api/baseApi";

export const searchApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        searchMovie: build.query<any, void>({
            query: (params) => ({url: '/search/movie',params})
        }),
    }),
})
export const {
    useSearchMovieQuery,
} = searchApi
