import {useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcomingQuery} from "./api/mainPageApi";
import s from "./MainPage.module.css";
import {useEffect, useRef, useState} from "react";
import {SearchInput} from "../SearchInput/searchInput";
import {ListMoviesForMainPage} from "./ListMoviesForMainPage/ListMoviesForMainPage";
import {MySnackbar} from "../MySnackbar/MySnackbar";
import {useDispatch, useSelector} from "react-redux";
import {hideError, showError} from "../../../app/SnackSlice";

export const MainPage = () => {
    const {data: Popular,error} = useGetPopularQuery({page: 1})
    const {data: topRatedData} = useGetTopRatedQuery({page: 1});
    const {data: UpcomingData} = useGetUpcomingQuery({page: 1});
    const {data: NowPlayingData} = useGetNowPlayingQuery({page: 1});
const dispatch=useDispatch()
    useEffect(() => {
        if (error?.message) {
            console.log(error)
            dispatch(showError(error.message));
        }
    }, [error, dispatch]);
const backdrop=Popular?.results[Math.floor(Math.random() * Popular?.results.length)].backdrop_path
    const topRated_movies = topRatedData?.results ? topRatedData?.results.slice(0, 6) : []
    const upcoming_movies = UpcomingData?.results ? UpcomingData?.results.slice(0, 6) : []
    const now_playing_movies = NowPlayingData?.results ? NowPlayingData?.results.slice(0, 6) : []
    const popular_movies = Popular?.results ? Popular?.results.slice(0, 6) : []
    return <div className={s.Container}>

        <section className={s.page}>
            <section style={{backgroundImage: backdrop}}
                     className={s.section}>
                <div className={s.content}>
                    <h1 className={s.title}>Welcome</h1>
                    <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
                    <SearchInput/>
                </div>

            </section>
            <div className={s.popularMovies}>
                <ListMoviesForMainPage data={popular_movies} title={'Popular Movies'}/>
                <ListMoviesForMainPage data={topRated_movies} title={'Top Rated Movies'}/>
                <ListMoviesForMainPage data={upcoming_movies} title={'Upcoming Movies'}/>
                <ListMoviesForMainPage data={now_playing_movies} title={'Now Playing'}/>
            </div>
        </section>
    </div>
}