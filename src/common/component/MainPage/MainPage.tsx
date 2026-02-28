import {useGetPopularQuery} from "./api/mainPageApi";
import s from "./MainPage.module.css";
import {useEffect, useState} from "react";
import {SearchInput} from "../SearchInput/searchInput";
import {useTheme} from "@mui/material";

export const MainPage = () => {
    const [backdrop_path, setBackdrop_path] = useState('');
    const {data} = useGetPopularQuery()

    useEffect(() => {
        const backdrop_path_number = Math.floor(Math.random() * data?.results.length)
        const url = data?.results[backdrop_path_number].backdrop_path
        setBackdrop_path(url)
    }, [data])
    return <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}
                    className={s.section}>
        <div className={s.content}>
            <h1 className={s.title}>Welcome</h1>
            <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
            <SearchInput />
        </div>
    </section>


}