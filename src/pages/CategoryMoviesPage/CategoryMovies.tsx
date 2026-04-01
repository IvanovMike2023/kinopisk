import {
    useGetNowPlayingQuery,
    useGetPopularQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery
} from "../../app/api/mainPageApi";
import {Pagination} from "../../shared/Pagination/Pagination";
import {useEffect, useState} from "react";
import {Button, useTheme} from "@mui/material";
import s from "./CategoryMovies.module.css";
import {useNavigate, useLocation} from 'react-router-dom';
import {MovieCard} from "../../entities/MovieCard/MovieCard";
import {useFavorites} from "../../shared/helper/useFavorites";
import {SkeletonCategoryMoviesPage} from "./SkeletonCategoryMoviesPage/SkeletonCategoryMoviesPage";
import {MovieSchema, ResponseSchema} from "../../app/api/MainPage.types";
import {z} from "zod";

type CategoryKey = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

export const CategoryMovies = () => {
    type MovieType = z.infer<typeof MovieSchema>;
    type ResponseType = z.infer<typeof ResponseSchema>;
    const [page, setPage] = useState(1);
    const {data: Popular, refetch: refetchPopular, isLoading} = useGetPopularQuery({page})
    const {data: topRatedData, refetch: refetchTopRated} = useGetTopRatedQuery({page});
    const {data: UpcomingData, refetch: refetchUpcoming} = useGetUpcomingQuery({page});
    const {data: NowPlayingData, refetch: refetchNowPlaying} = useGetNowPlayingQuery({page});
    const [results, setResults] = useState<ResponseType | undefined>(undefined);
    const [activeCategory, setActiveCategory] = useState('Popular Movies');
    const {likedIds, toggleFavorite} = useFavorites()
    const currentPage = results?.page ?? 1
    const count = results?.total_pages ?? 1
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const changeCategoryInUrl = (categoryUrlPart:CategoryKey ) => {
        navigate(`/movies/${categoryUrlPart}`);
    }
    const setCurrentPage = (newpage:number) => {
        setPage(newpage)
    }
    const categoryMap = {
        'popular': {data: Popular, refetch: refetchPopular, label: "Popular Movies"},
        'top_rated': {data: topRatedData, refetch: refetchTopRated, label: "Top Rated Movies"},
        'upcoming': {data: UpcomingData, refetch: refetchUpcoming, label: "Upcoming Movies"},
        'now_playing': {data: NowPlayingData, refetch: refetchNowPlaying, label: "Now Playing"}
    }
    const categories :{ key: CategoryKey; label: string }[]= [
        {key: 'popular', label: 'Popular Movies'},
        {key: 'top_rated', label: 'Top Rated Movies'},
        {key: 'upcoming', label: 'Upcoming Movies'},
        {key: 'now_playing', label: 'Now Playing'}
    ];
    useEffect(() => {
        const categoryKeyStr = location.pathname.split('/')[2];
        if (!['popular','top_rated','upcoming','now_playing'].includes(categoryKeyStr)) return;

        const categoryKey = categoryKeyStr as CategoryKey;
        const category = categoryMap[categoryKey]
        if (category) {
            category.refetch().unwrap().then((res) => {
                setResults(res)
            })
            setActiveCategory(category.label);
        } else setResults([])
    }, [location.pathname, page]);
    useEffect(() => {
        const categoryKey = location.pathname.split('/')[2];
        const categoryLabels: Record<CategoryKey, string> = {
            'popular': 'Popular Movies',
            'top_rated': 'Top Rated Movies',
            'upcoming': 'Upcoming Movies',
            'now_playing': 'Now Playing'
        };
        if ((categoryKey as CategoryKey) in categoryLabels) {
            setActiveCategory(categoryLabels[categoryKey as CategoryKey]);
        } else {
            setActiveCategory('Popular Movies');
        }
        setActiveCategory(categoryLabels[categoryKey] || 'Popular Movies');
        setPage(1);
    }, [location.pathname]);
    if (isLoading) return <SkeletonCategoryMoviesPage activeCategory={activeCategory}/>
    return <div className={s.container}>
        <section className={s.section}>
            <div className={s.category}>
                <div className={s.categoryButtons}>
                    {categories.map((cat) => (
                        <Button key={cat.key}
                                onClick={() => changeCategoryInUrl(cat.key)}
                                variant={activeCategory === cat.label ? 'contained' : 'outlined'}>
                            {cat.label}
                        </Button>
                    ))}
                </div>
            </div>
            <h2 style={{color: theme.palette.text.primary}} className={s.titleResult}>{activeCategory}</h2>
            <div className={s.movies}>
                {results?.results?.map((el:MovieType) => (
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
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                        count={count}/>

        </section>
    </div>
}