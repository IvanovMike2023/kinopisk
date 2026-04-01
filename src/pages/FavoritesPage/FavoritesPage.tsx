import {MovieCard} from "../../entities/MovieCard/MovieCard";
import { useFavorites} from "../../shared/helper/useFavorites";
import type {Film} from "../../shared/helper/useFavorites";
import s from "../FavoritesPage/FavoritesPage.module.css";

export const FavoritesPage=()=>{
    const stored = localStorage.getItem('films')
    const films = stored ? JSON.parse(stored) : []
    const {likedIds, toggleFavorite} = useFavorites()
    return <div className={s.container}>
        <section className={s.page}>
    <div>
        <>
            <h2  className={s.titleResult}>Results for</h2>
            <div className={s.movies}>
        {films.map((el: Film ) => (
            <MovieCard key={el.id}
                       data={el}
                       onLike={() => toggleFavorite({
                           id: el.id,
                           title: el.title,
                           poster_path: el.poster_path,
                           vote_average: el.vote_average
                       })}
                       isLiked={likedIds.includes(el.id)}/>
        ))}
    </div>
            </>
        </div>
        </section>

    </div>
}