import s from './Popular_movies.module.css'
import {useGetPopularQuery} from "../api/mainPageApi";
import type {ResultsPopular} from '../api/MainPage.types';
import {useNavigate} from "react-router-dom";
import {Button, useTheme} from "@mui/material";
import {addFilmsToStorage} from '../../../helper/addFilmsToStorage'
import {useState} from "react";
import {MovieCard} from "../../MovieCard/MovieCard";
import {useFavorites} from "../../../helper/useFavorites";

type Props = {
    data: ResultsPopular[]
    title: string
}
export const ListMoviesForMainPage = ({data, title}: Props) => {
    const navigate = useNavigate()
    const theme = useTheme();
    const [likedId, setLikedId] = useState<number[]>([])

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
    const { likedIds, toggleFavorite } = useFavorites()
    return <section className={s.section_popular}>
        <div className={s.headerPopular}>
            <h2>{title}</h2>
            <Button style={{border: '1px solid #d1d5db', color: theme.palette.text.primary}} color={'primary'}
                    onClick={handleGoToCategoryMovies}>View more</Button></div>
        <div className={s.wrap_card}>
            {data.map((el) => (
      <MovieCard key={el.id}  data={el} id={el.id} onLike={()=>toggleFavorite({ id: el.id,
          title: el.title,
          backdrop_path: el.backdrop_path,
          vote_average: el.vote_average})}
                 isLiked={likedIds.includes(el.id)} />
            ))}
        </div>
    </section>

}