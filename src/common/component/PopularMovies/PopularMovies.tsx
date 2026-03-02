import s from './Popular_movies.module.css'
import {useGetPopularQuery} from "../MainPage/api/mainPageApi";
import type {ResultsPopular} from '../MainPage/api/MainPage.types';

type Props={
    popular_movies:ResultsPopular[]
}
export const PopularMovies = ({ popular_movies}:Props) => {
    return <section class={s.section_popular}>
        <div className={s.headerPopular}> <h2>Popular Movies</h2> <button>View more</button></div>
        <div className={s.wrap_card}>
        {popular_movies.map((el)=>(
            <article key={el.id} className={s.card}>
                <div className={s.posterFrame} >
                    <a className={s.posterLink}  href="">
                        <img className={s.poster} src={'https://image.tmdb.org/t/p/w185'+el.poster_path} alt=""/>
                        <span className={el.vote_average>7 ? s.vote_average_top: s.vote_average}>{el.vote_average}</span>
                    </a>
                </div>
                <a href="#" className={s.cardTitle}>{el.title}</a>
            </article>

        ))}
        </div>
    </section>

}