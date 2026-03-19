import {useNavigate, useParams} from "react-router-dom";
import {useGetCreditsQuery, useGetDetailsMovieQuery, useGetSimilarQuery} from "../MainPage/api/mainPageApi";
import s from "./MoviePage.module.css"
import {MovieCard} from "../MovieCard/MovieCard";
import {useFavorites} from "../../helper/useFavorites";
import {useTheme} from "@mui/material";
export const MoviePage=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const movie_id=Number(id)
    const {likedIds, toggleFavorite} = useFavorites()

    const {data:movie}=useGetDetailsMovieQuery({movie_id:movie_id})
    const {data:Credits}=useGetCreditsQuery({movie_id:movie_id})
    const {data:Similar}=useGetSimilarQuery({movie_id:movie_id})
   const actor= Credits?.cast?.slice(0,6)
   const similar= Similar?.results?.slice(0,6)
    const goBack=()=>{
        navigate(-1)
    }
    return  <div style={{backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}} className={s.wrapper}>
        <div  className={s.container}>
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
                    <button style={{color: theme.palette.text.primary}} onClick={goBack} className={s.back}>Back</button>
                </div>

                <div className={s.meta}>
                    <span>Release year: {movie?.release_date?.slice(0, 4)}</span>

                    <span className={s.rating}>
              {movie?.vote_average?.toFixed(1)}
            </span>

                    <span>Runtime: {movie?.runtime}m</span>
                </div>

                <p className={s.overview}>{movie?.overview}</p>

                <div  className={s.genres}>
                    <h3>Genres</h3>
                    <div style={{backgroundColor: theme.palette.background.default}} className={s.genreList} >
                        {movie?.genres?.map((g: any) => (
                            <span  key={g.id} className={s.genre}>
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
                        <div className={s.actorAvatar}>
                        {actor.profile_path ?    (<img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        className={s.actorImg}
                        alt={actor.name}
                    />)
                      :
                        (
                        <div className={s.noPoster}>
                            No poster
                        </div>
                        ) }

                    </div>
                        <div className={s.actorInfo}>
                            <span className={s.actorName}>{actor.name}</span>
                            <span className={s.actorRole}>{actor.character}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        {/* Similar Movies */}
        <div className={s.inner}>
        <div className={s.similarBlock}>
            <h2>Similar Movies</h2>
            <div className={s.similarList}>
                {similar?.map((sim: any) => (
                <MovieCard key={sim.id}
                           data={sim} id={sim.id}
                           onLike={() => toggleFavorite({
                               id: sim.id,
                               title: sim.title,
                               poster_path: sim.poster_path,
                               vote_average: sim.vote_average
                           })}
                           isLiked={likedIds.includes(sim.id)} />
                ))}
            </div>
        </div>
        </div>
    </div>
}