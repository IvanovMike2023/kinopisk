import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { showError } from "../snackSlice";

// Интерфейс для данных API
export interface BaseApiResponse {
    status_code?: number;
    status_message?: string;
    [key: string]: any;
}

// Безопасный BaseQueryFn для TS
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

    const result = await rawBaseQuery(args, api, extraOptions);

    // Кастим к BaseApiResponse
    const data = result.data as BaseApiResponse | undefined;

    // Проверка на ошибки
    if (result.error || (data && data.status_code)) {
        let message = "Что-то пошло не так";

        if (result.error?.status === "FETCH_ERROR") message = "Нет интернета";
        else if (typeof result.error?.status === "number")
            message = (result.error?.data as BaseApiResponse)?.status_message || `Ошибка ${result.error.status}`;
        else if (data?.status_message) message = data.status_message;

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

// Создаём API
export const baseApi = createApi({
    reducerPath: "kinopoiskApi",
    baseQuery,
    tagTypes: ["Popular", "TopRated", "Upcoming", "NowPlaying"],
    endpoints: () => ({}),
});