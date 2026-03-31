import {useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcomingQuery} from "../../app/api/mainPageApi";
import s from "./MainPage.module.css";
import {useEffect} from "react";
import {SearchInput} from "../../shared/utils/SearchInput/searchInput";
import {ListMoviesForMainPage} from "./ListMoviesForMainPage/ListMoviesForMainPage";
import {useDispatch} from "react-redux";
import {showError} from "../../app/snackSlice";
import {MainPageSkeleton} from "./ListMoviesForMainPage/MainPageSkeleton/MainPageSkeleton";

export const MainPage = () => {
    const {data: Popular, error,isLoading} = useGetPopularQuery({page: 1})
    const {data: topRatedData} = useGetTopRatedQuery({page: 1});
    const {data: UpcomingData} = useGetUpcomingQuery({page: 1});
    const {data: NowPlayingData} = useGetNowPlayingQuery({page: 1});
    const dispatch = useDispatch()
    useEffect(() => {
        if (error?.message) {
            dispatch(showError(error.message));
        }
    }, [error, dispatch]);
    const backdropPath = Popular?.results.length
        ? Popular.results[Math.floor(Math.random() * Popular.results.length)].backdrop_path
        : null;
    const backdropStyle = backdropPath ? `url(${backdropPath})` : undefined;

    const popular_movies = Popular?.results
        ? Popular.results.slice(0, 6).map(el => ({
            ...el,
            poster_path: el.poster_path || "",
            backdrop_path: el.backdrop_path || "",
        }))
        : [];

    const topRated_movies = topRatedData?.results
        ? topRatedData.results.slice(0, 6).map(el => ({
            ...el,
            poster_path: el.poster_path || "",
            backdrop_path: el.backdrop_path || "",
        }))
        : [];

    const upcoming_movies = UpcomingData?.results
        ? UpcomingData.results.slice(0, 6).map(el => ({
            ...el,
            poster_path: el.poster_path || "",
            backdrop_path: el.backdrop_path || "",
        }))
        : [];

    const now_playing_movies = NowPlayingData?.results
        ? NowPlayingData.results.slice(0, 6).map(el => ({
            ...el,
            poster_path: el.poster_path || "",
            backdrop_path: el.backdrop_path || "",
        }))
        : [];
    if (isLoading) return <MainPageSkeleton />;
    return <div className={s.Container}>

        <section className={s.page}>
            <section style={{backgroundImage: backdropStyle}}
                     className={s.section}>
                <div className={s.content}>
                    <h1 className={s.title}>Welcome</h1>
                    <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
                    <SearchInput/>
                </div>
            </section>
            <div className={s.popularMovies}>
                <ListMoviesForMainPage  data={popular_movies} title={'Popular Movies'}/>
                <ListMoviesForMainPage  data={topRated_movies} title={'Top Rated Movies'}/>
                <ListMoviesForMainPage  data={upcoming_movies} title={'Upcoming Movies'}/>
                <ListMoviesForMainPage  data={now_playing_movies} title={'Now Playing'}/>
            </div>
        </section>
    </div>
}
