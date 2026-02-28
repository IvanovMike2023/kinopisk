import {baseApi} from "../../../../app/api/baseApi";

export const searchApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        searchMovie: build.query<any, void>({
            query: (params) => ({url: '/search/movie',params})
            //?include_adult=false&include_video=false&language=en-US&page=3&sort_by=original_title.desc'
            //`/search/movie?include_adult=false&include_video=false&language=en-US&sort_by=original_title.desc'`,
            //providesTags: ['Popular']
        }),
    }),
})
export const {
    useSearchMovieQuery,
} = searchApi
