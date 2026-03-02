import {useGetPopularQuery} from "./api/mainPageApi";
import s from "./MainPage.module.css";
import {useEffect, useState} from "react";
import {SearchInput} from "../SearchInput/searchInput";
import {PopularMovies} from "../PopularMovies/PopularMovies";

export const MainPage = () => {
    const [backdrop_path, setBackdrop_path] = useState('');
    const {data} = useGetPopularQuery({page:10})

    useEffect(() => {
        const backdrop_path_number = Math.floor(Math.random() * data?.results.length)
        const url = data?.results[backdrop_path_number].backdrop_path
        setBackdrop_path(url)
    }, [data])
     const popular_movies =data?.results? data?.results.slice().sort((a, b) => b.vote_average - a.vote_average).slice(0, 6):[]
    return <div className={s.Container}>
    <section className={s.page} >
    <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}
                    className={s.section}>
        <div className={s.content}>
            <h1 className={s.title}>Welcome</h1>
            <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
            <SearchInput />
        </div>

    </section>
        <div className={s.popularMovies} >
                <PopularMovies popular_movies={popular_movies}  />

        </div>
    </section>
    </div>
}