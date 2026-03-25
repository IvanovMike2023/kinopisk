import s from './Popular_movies.module.css'
import {useNavigate} from "react-router-dom";
import {Button, Skeleton, useTheme} from "@mui/material";
import {MovieCard} from "../../../entities/MovieCard/MovieCard";
import {useFavorites} from "../../../shared/helper/useFavorites";
import {MovieSchema} from "../api/MainPage.types";

type Props = {
    data: MovieSchema[]
    title: string
    isLoad?:boolean
}
export const ListMoviesForMainPage = ({isLoad,data, title}: Props) => {
    const navigate = useNavigate()
    const theme = useTheme();
    const {likedIds, toggleFavorite} = useFavorites()
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
    return <section className={s.section_popular}>
        <div className={s.headerPopular}>
            <h2>{title}</h2>
            <Button style={{border: '1px solid #d1d5db', color: theme.palette.text.primary}} color={'primary'}
                    onClick={handleGoToCategoryMovies}>View more</Button></div>
        <div className={s.wrap_card}>
            {
                data.map((el) => (
                    <MovieCard key={el.id} data={el} id={el.id} onLike={() => toggleFavorite({
                        id: el.id,
                        title: el.title,
                        poster_path: el.poster_path,
                        vote_average: el.vote_average
                    })}
                               isLiked={likedIds.includes(el.id)}/>
                ))
            }

        </div>
    </section>

}