import s from "../MainPage/ListMoviesForMainPage/Popular_movies.module.css";
import { Link } from "react-router-dom";
type Props = {
    onLike: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void
    isLiked:boolean
    data:any
}
export const MovieCard = ({data, isLiked, onLike}): Props => {
    return (
        <article className={s.card}>
            <div className={s.posterFrame}>
                <Link className={s.posterLink}
                      to={`/movie/${data.id}`}
                   >
                    <img className={s.poster} src={'https://image.tmdb.org/t/p/w185' + data.poster_path} alt=""/>
                    <button id={data.id} onClick={(e) => onLike(data.id, e.preventDefault())} className={s.like}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                             focusable="false" className={isLiked ? s.active : s.favoriteIcon}>
                            <path
                                d="M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"></path>
                        </svg>
                    </button>
                    <span
                        className={data.vote_average > 7 ? s.vote_average_top : s.vote_average}>{data.vote_average}</span>
                </Link>
            </div>
            <a href="src/common/component/MainPage/ListMoviesForMainPage/ListMoviesForMainPage#"
               className={s.cardTitle}>{data.title}</a>
        </article>
    )
}
