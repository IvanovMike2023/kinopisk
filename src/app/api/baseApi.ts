import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'kinopoiskApi',
    //tagTypes: ['Tasks', 'Todolist', 'Auth'],
    baseQuery: async (arg, api, extraOption) => {
        const result = await fetchBaseQuery({
            baseUrl: 'https://api.themoviedb.org/3',
            prepareHeaders: headers => {
               headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            }
        })
        (arg, api, extraOption)
        return result
    },
    endpoints: () => ({}),
})


