import {
    useGetNowPlayingQuery,
    useGetPopularQuery,
    useGetTopRatedQuery,
    useGetUpcomingQuery
} from "../MainPage/api/mainPageApi";
import {SearchResult} from "../SearchPage/SearchResult/SearchResult";
import {Pagination} from "../../Pagination/Pagination";
import {useEffect, useState} from "react";
import {Button, useTheme} from "@mui/material";
import s from "./CategoryMovies.module.css";
import {useNavigate, useLocation} from 'react-router-dom';


export const CategoryMovies = () => {

    const [page, setPage] = useState(1);
    const {data: Popular, refetch: refetchPopular} = useGetPopularQuery({page})
    const {data: topRatedData, refetch: refetchTopRated} = useGetTopRatedQuery({page});
    const {data: UpcomingData, refetch: refetchUpcoming} = useGetUpcomingQuery({page});
    const {data: NowPlayingData, refetch: refetchNowPlaying} = useGetNowPlayingQuery({page});
    const [results, setResults] = useState(undefined);
    const [activeCategory, setActiveCategory] = useState('Popular Movies');

    const currentPage = results?.page
    const count = results?.total_pages
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const changeCategoryInUrl = (categoryUrlPart) => {
        navigate(`/movies/${categoryUrlPart}`);
    }
    const setCurrentPage = (newpage) => {
        setPage(newpage)
    }
    const categoryMap = {
        'popular': {data: Popular, refetch: refetchPopular, label: "Popular Movies"},
        'top_rated': {data: topRatedData, refetch: refetchTopRated, label: "Top Rated Movies"},
        'upcoming': {data: UpcomingData, refetch: refetchUpcoming, label: "Upcoming Movies"},
        'now_playing': {data: NowPlayingData, refetch: refetchNowPlaying, label: "Now Playing"}
    }
    const categories = [
        {key: 'popular', label: 'Popular Movies'},
        {key: 'top_rated', label: 'Top Rated Movies'},
        {key: 'upcoming', label: 'Upcoming Movies'},
        {key: 'now_playing', label: 'Now Playing'}
    ];
    useEffect(() => {
        const categoryKey = location.pathname.split('/')[2];
        const category = categoryMap[categoryKey]
        if (category) {
            category.refetch({page}).unwrap().then((res) => {
                setResults(res)
            })
            setActiveCategory(category.label);
        } else setResults([])
    }, [location.pathname, page]);
    useEffect(() => {
        const categoryKey = location.pathname.split('/')[2];
        const categoryLabels = {
            'popular': 'Popular Movies',
            'top_rated': 'Top Rated Movies',
            'upcoming': 'Upcoming Movies',
            'now_playing': 'Now Playing'
        };
        setActiveCategory(categoryLabels[categoryKey] || 'Popular Movies');
        setPage(1);
    }, [location.pathname]);

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
                {results?.results?.map((el) => (
                    <SearchResult
                        key={el.id}
                        vote_average={el.vote_average}
                        title={el.title}
                        poster_path={el.poster_path}
                    />
                ))}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                        count={count}/>

        </section>
    </div>
}