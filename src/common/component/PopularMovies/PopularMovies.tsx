import s from './Popular_movies.module.css'
import {useGetPopularQuery} from "../MainPage/api/mainPageApi";
import type {ResultsPopular} from '../MainPage/api/MainPage.types';
import {useNavigate} from "react-router-dom";
import {Button, useTheme} from "@mui/material";

type Props={
    popular_movies:ResultsPopular[]
}
export const PopularMovies = ({ popular_movies}:Props) => {
    const navigate=useNavigate()
    const theme = useTheme();

    const handleGoToCategoryMovies=()=>{
    navigate('/movies/popular')
}
    return <section class={s.section_popular}>
        <div className={s.headerPopular}> <h2>Popular Movies</h2> <Button style={{border:'1px solid #d1d5db', color: theme.palette.text.primary }} color={'primary'} onClick={handleGoToCategoryMovies}>View more</Button></div>
        <div className={s.wrap_card}>
        {popular_movies.map((el)=>(
            <article key={el.id} className={s.card}>
                <div className={s.posterFrame} >
                    <a className={s.posterLink}  href="">
                        <img className={s.poster} src={'https://image.tmdb.org/t/p/w185'+el.poster_path} alt=""/>
                        <button className={s.like }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                 focusable="false" className={s.favoriteIcon}><path
                                d="M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                        </button>
                        <span className={el.vote_average>7 ? s.vote_average_top: s.vote_average}>{el.vote_average}</span>
                    </a>
                </div>
                <a href="#" className={s.cardTitle}>{el.title}</a>
            </article>
        ))}
        </div>
    </section>

}