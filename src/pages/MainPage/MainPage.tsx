import { useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcomingQuery } from "../../app/api/PagesApi";
import s from "./MainPage.module.css";
import {useEffect, useState} from "react";
import { SearchInput } from "../../shared/utils/SearchInput/searchInput";
import { ListMoviesForMainPage } from "./ListMoviesForMainPage/ListMoviesForMainPage";
import { useDispatch } from "react-redux";
import { showError } from "../../app/snackSlice";
import { MainPageSkeleton } from "./ListMoviesForMainPage/MainPageSkeleton/MainPageSkeleton";
import {MovieSchema} from "../../app/api/PagesApi.types";

export const MainPage = () => {
    const { data: Popular, error, isLoading } = useGetPopularQuery({ page: 1 });
    const { data: topRatedData } = useGetTopRatedQuery({ page: 1 });
    const { data: UpcomingData } = useGetUpcomingQuery({ page: 1 });
    const { data: NowPlayingData } = useGetNowPlayingQuery({ page: 1 });
    const dispatch = useDispatch();

    // Показываем ошибку, если есть
    useEffect(() => {
        if (error?.message) dispatch(showError(error.message));
    }, [error, dispatch]);

    // Стейт для фонового изображения (замораживаем после первой загрузки Popular)
    const [backdropUrl, setBackdropUrl] = useState<string>();
    useEffect(() => {
        if (Popular?.results.length && !backdropUrl) {
            const randomMovie = Popular.results[Math.floor(Math.random() * Popular.results.length)];
            setBackdropUrl(randomMovie.backdrop_path);
        }
    }, [Popular, backdropUrl]);

    if (isLoading) return <MainPageSkeleton />;

    // Парсим массивы фильмов через Zod
    const popular_movies = Popular?.results ? MovieSchema.array().parse(Popular.results.slice(0, 6)) : [];
    const topRated_movies = topRatedData?.results ? MovieSchema.array().parse(topRatedData.results.slice(0, 6)) : [];
    const upcoming_movies = UpcomingData?.results ? MovieSchema.array().parse(UpcomingData.results.slice(0, 6)) : [];
    const now_playing_movies = NowPlayingData?.results ? MovieSchema.array().parse(NowPlayingData.results.slice(0, 6)) : [];
    console.log(backdropUrl)

    return (
        <div className={s.Container}>
            <section className={s.page}>
                {/* Фоновая секция: фон фиксируется через стейт */}
                <section className={s.section} style={{ backgroundImage: backdropUrl }}>
                    <div className={s.content}>
                        <h1 className={s.title}>Welcome</h1>
                        <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
                        <SearchInput />
                    </div>
                </section>

                <div className={s.popularMovies}>
                    <ListMoviesForMainPage data={popular_movies} title="Popular Movies" />
                    <ListMoviesForMainPage data={topRated_movies} title="Top Rated Movies" />
                    <ListMoviesForMainPage data={upcoming_movies} title="Upcoming Movies" />
                    <ListMoviesForMainPage data={now_playing_movies} title="Now Playing" />
                </div>
            </section>
        </div>
    );
};