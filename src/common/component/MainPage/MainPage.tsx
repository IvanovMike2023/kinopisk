import {useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcomingQuery} from "./api/mainPageApi";
import s from "./MainPage.module.css";
import {useEffect, useRef, useState} from "react";
import {SearchInput} from "../SearchInput/searchInput";
import {ListMoviesForMainPage} from "./ListMoviesForMainPage/ListMoviesForMainPage";

export const MainPage = () => {
    const [backdrop_path, setBackdrop_path] = useState('');
    const {data:Popular} = useGetPopularQuery({page: 1})
    const {data: topRatedData} = useGetTopRatedQuery({page: 1});
    const {data: UpcomingData} = useGetUpcomingQuery({page: 1});
    const {data: NowPlayingData} = useGetNowPlayingQuery({page: 1});
    useEffect(() => {
        const backdrop_path_number = Math.floor(Math.random() * Popular?.results.length)
        const url = Popular?.results[backdrop_path_number].backdrop_path
        setBackdrop_path(url)
    }, [Popular])
    const topRated_movies =topRatedData?.results ? topRatedData?.results.slice(0, 6): []
    const upcoming_movies =UpcomingData?.results ? UpcomingData?.results.slice(0, 6): []
    const now_playing_movies = NowPlayingData?.results ? NowPlayingData?.results.slice(0, 6): []
    const popular_movies =Popular?.results ? Popular?.results.slice(0, 6) : []


        const [startTime, setStartTime] = useState(null);
        const [now, setNow] = useState(null);
        // 1. Создаем ref для хранения ID интервала
        // Это значение не будет сбрасываться при рендерах
        const timerRef = useRef(null);

        function handleStart() {
            setStartTime(Date.now());
            setNow(Date.now());

            clearInterval(timerRef.current);

            // 2. Записываем ID в .current
            timerRef.current = setInterval(() => {
                setNow(Date.now());
            }, 10);
            console.log(timerRef)
        }

        function handleStop() {
            // 3. Читаем ID из .current, чтобы остановить таймер
            clearInterval(timerRef.current);
        }

        let secondsPassed = 0;
        if (startTime != null && now != null) {
            secondsPassed = (now - startTime) / 1000;
        }





    return <div className={s.Container}>
        <h1>Прошло времени: {secondsPassed.toFixed(3)}</h1>
        <button onClick={handleStart}>Старт</button>
        <button onClick={handleStop}>Стоп</button>
        <section className={s.page}>
            <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}
                     className={s.section}>
                <div className={s.content}>
                    <h1 className={s.title}>Welcome</h1>
                    <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
                    <SearchInput/>
                </div>

            </section>
            <div className={s.popularMovies}>
                <ListMoviesForMainPage data={popular_movies} title={'Popular Movies'}  />
                <ListMoviesForMainPage data={topRated_movies} title={'Top Rated Movies'} />
                <ListMoviesForMainPage data={upcoming_movies} title={'Upcoming Movies'} />
                <ListMoviesForMainPage data={now_playing_movies} title={'Now Playing'} />
            </div>
        </section>
    </div>
}