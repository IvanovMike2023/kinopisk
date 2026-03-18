import {useParams} from "react-router-dom";
import {useGetCreditsQuery, useGetDetailsMovieQuery} from "../MainPage/api/mainPageApi";
import s from "./MoviePage.module.css"
export const MoviePage=()=>{
    const { id } = useParams();
    const movie_id=Number(id)
    const {data:movie}=useGetDetailsMovieQuery({movie_id:movie_id})
    const {data:Credits}=useGetCreditsQuery({movie_id:movie_id})
   const actor= Credits?.cast?.slice(0,6)
    console.log(actor)
    return  <div className={s.wrapper}>
        <div className={s.container}>
            {/* LEFT POSTER */}
            <div className={s.posterBlock}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    className={s.poster}
                    alt={movie?.title}
                />
            </div>

            {/* RIGHT INFO */}
            <div className={s.info}>
                <div className={s.header}>
                    <h1 className={s.title}>{movie?.title}</h1>
                    <button className={s.back}>Back</button>
                </div>

                <div className={s.meta}>
                    <span>Release year: {movie?.release_date?.slice(0, 4)}</span>

                    <span className={s.rating}>
              {movie?.vote_average?.toFixed(1)}
            </span>

                    <span>Runtime: {movie?.runtime}m</span>
                </div>

                <p className={s.overview}>{movie?.overview}</p>

                <div className={s.genres}>
                    <h3>Genres</h3>
                    <div className={s.genreList}>
                        {movie?.genres?.map((g: any) => (
                            <span key={g.id} className={s.genre}>
                  {g.name}
                </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* CAST */}
        <div className={s.inner}>
        <div className={s.castBlock}>
            <h2>Cast</h2>

            <div className={s.castList}>
                {actor?.map((actor: any) => (
                    <div key={actor.id} className={s.actor}>
                        <img
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            className={s.actorImg}
                            alt={actor.name}
                        />
                        <span className={s.actorName}>{actor.name}</span>
                        <span className={s.actorRole}>{actor.character}</span>
                    </div>
                ))}
            </div>
        </div>
        </div>
    </div>
}