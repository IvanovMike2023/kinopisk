import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {showError} from "../SnackSlice";

export const baseApi = createApi({
    reducerPath: 'kinopoiskApi',
    //tagTypes: ['Tasks', 'Todolist', 'Auth'],
    baseQuery: async (arg, api, extraOption) => {
        const rawBaseQuery =  fetchBaseQuery({
            baseUrl: 'https://api.themoviedb.org/3',
            prepareHeaders: headers => {
               headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
                return headers
            }
        })
        const result = await rawBaseQuery(arg, api, extraOption);
        if (result.error || result.data?.status_code) {
            let message = 'Что-то пошло не так';

            if (result.error?.status === 'FETCH_ERROR') {
                message = 'Нет интернета';
            } else if (typeof result.error?.status === 'number') {
                message =
                    result.error?.data?.status_message ||
                    `Ошибка ${result.error.status}`;
            } else if (result.data?.status_code) {
                message = result.data.status_message;
            }

            // 🚀 диспатчим в глобальный Snackbar
            api.dispatch(showError(message));

            return {
                error: {
                    ...result.error,
                    message,
                },
            };
        }

        return result;
    },
    endpoints: () => ({}),
})


