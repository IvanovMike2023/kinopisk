import s from './Popular_movies.module.css'
import {useGetPopularQuery} from "../api/mainPageApi";
import type {ResultsPopular} from '../api/MainPage.types';
import {useNavigate} from "react-router-dom";
import {Button, useTheme} from "@mui/material";
import {addFilmsToStorage} from '../../../helper/addFilmsToStorage'
import {useState} from "react";

type Props = {
    data: ResultsPopular[]
    title: string
}
export const ListMoviesForMainPage = ({data, title}: Props) => {
    const navigate = useNavigate()
    const theme = useTheme();

    const handleGoToCategoryMovies = () => {
        switch (title) {
            case 'Popular Movies':
                navigate('/movies/popular')
                break
            case 'Top Rated Movies':
                navigate('/movies/top_rated')
                break
            case 'Upcoming Movies':
                navigate('/movies/upcoming')
                break
            case 'Now Playing':
                navigate('/movies/now_playing')
                break
            default :
                navigate('/movies/popular')
        }

    }
    const [likedId, setLikedId] = useState<number[]>([])
    const handleLike = (e) => {
        e.preventDefault()
        const idLike = Number(e.currentTarget.id)

        setLikedId((prev) => {
            if (prev.includes(idLike)) {
                const update = prev.filter((f) => f !== idLike)
                const stored = localStorage.getItem('films')
                const films = stored ? JSON.parse(stored) : []
                const newfilms = films.filter((f) => f.id != idLike)
                localStorage.setItem('films', JSON.stringify(newfilms))
                return update
            } else {
                const result = data.find((el) => el.id === idLike)
                if (result) {
                    const newFilm = {
                        id: result.id,
                        title: result.title,
                        backdrop_path: result.backdrop_path,
                        vote_average: result.vote_average
                    };
                    addFilmsToStorage(newFilm)
                }
                return [...prev, idLike]
            }
        })

    }
    return <section className={s.section_popular}>
        <div className={s.headerPopular}>
            <h2>{title}</h2>
            <Button style={{border: '1px solid #d1d5db', color: theme.palette.text.primary}} color={'primary'}
                    onClick={handleGoToCategoryMovies}>View more</Button></div>
        <div className={s.wrap_card}>
            {data.map((el) => (
                <article key={el.id} className={s.card}>
                    <div className={s.posterFrame}>
                        <a className={s.posterLink}
                           href="src/common/component/MainPage/ListMoviesForMainPage/ListMoviesForMainPage">
                            <img className={s.poster} src={'https://image.tmdb.org/t/p/w185' + el.poster_path} alt=""/>
                            <button id={el.id} onClick={handleLike} className={s.like}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                     focusable="false" className={likedId.includes(el.id) ? s.active : s.favoriteIcon}>
                                    <path
                                        d="M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                </svg>
                            </button>
                            <span
                                className={el.vote_average > 7 ? s.vote_average_top : s.vote_average}>{el.vote_average}</span>
                        </a>
                    </div>
                    <a href="src/common/component/MainPage/ListMoviesForMainPage/ListMoviesForMainPage#"
                       className={s.cardTitle}>{el.title}</a>
                </article>
            ))}
        </div>
    </section>

}