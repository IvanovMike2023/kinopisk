import {useState} from "react";
import {MovieCard} from "../../utils/MovieCard/MovieCard";
import {useFavorites} from "../../helper/useFavorites";
import s from "../SearchPage/Search.module.css";

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
        {films.map((el) => (
            <MovieCard key={el.id}
                       data={el} id={el.id}
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