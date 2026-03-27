// src/app/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { showError } from "../snackSlice";

// Тип для ответа базового API, включая возможные ошибки TMDB
export interface BaseApiResponse {
    status_code?: number;
    status_message?: string;
    [key: string]: any;
}

// Типизация базового запроса
const baseQuery: BaseQueryFn<
    string | { url: string; method?: string; body?: any; params?: any },
    unknown,
    { message?: string }
    > = async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3",
        prepareHeaders: (headers) => {
            const token = import.meta.env.VITE_ACCESS_TOKEN;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    });

    // Выполняем запрос
    const result = await rawBaseQuery(args, api, extraOptions);

    // Приведение данных к типу BaseApiResponse
    const data = result.data as BaseApiResponse | undefined;

    // Обработка ошибок
    if (result.error || data?.status_code) {
        let message = "Что-то пошло не так";

        if (result.error?.status === "FETCH_ERROR") {
            message = "Нет интернета";
        } else if (typeof result.error?.status === "number") {
            message = result.error?.data?.status_message || `Ошибка ${result.error.status}`;
        } else if (data?.status_code) {
            message = data.status_message || message;
        }

        // Диспатчим в глобальный Snackbar
        api.dispatch(showError(message));

        return {
            error: {
                ...result.error,
                message,
            },
        };
    }

    return result;
};

// Создаём базовый API с RTK Query
export const baseApi = createApi({
    reducerPath: "kinopoiskApi",
    baseQuery: baseQuery,
    endpoints: () => ({}), // эндпоинты добавим отдельно
});