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
import { useNavigate, useLocation } from 'react-router-dom';

export const CategoryMovies = () => {
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]); // Массив текущих результатов
    const [activeCategory, setActiveCategory] = useState('Popular Movies');

    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const { data: Popular, refetch: refetchPopular } = useGetPopularQuery({ page });
    const { data: topRatedData, refetch: refetchTopRated } = useGetTopRatedQuery({ page });
    const { data: UpcomingData, refetch: refetchUpcoming } = useGetUpcomingQuery({ page });
    const { data: NowPlayingData, refetch: refetchNowPlaying } = useGetNowPlayingQuery({ page });

    const currentPage = results?.page || 1;
    const count = results?.total_pages || 1;

    const changeCategoryInUrl = (categoryUrlPart) => {
        navigate(`/movies/${categoryUrlPart}`);
    };

    // Обработчик смены страницы
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Обновляем результаты при изменении страницы и выбранной категории
    useEffect(() => {
        switch (location.pathname.split('/')[2]) {
            case 'popular':
                refetchPopular({ page }).unwrap().then((res) => {
                    setResults(res);
                });
                break;
            case 'top_rated':
                refetchTopRated({ page }).unwrap().then((res) => {
                    setResults(res);
                });
                break;
            case 'upcoming':
                refetchUpcoming({ page }).unwrap().then((res) => {
                    setResults(res);
                });
                break;
            case 'now_playing':
                refetchNowPlaying({ page }).unwrap().then((res) => {
                    setResults(res);
                });
                break;
            default:
                setResults([]);
        }
    }, [page, location.pathname, refetchPopular, refetchTopRated, refetchUpcoming, refetchNowPlaying]);

    // Обновление активной категории при изменении URL
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const categoryPath = pathParts[2];
        switch (categoryPath) {
            case 'popular':
                setActiveCategory('Popular Movies');
                break;
            case 'top_rated':
                setActiveCategory('Top Rated Movies');
                break;
            case 'upcoming':
                setActiveCategory('Upcoming Movies');
                break;
            case 'now_playing':
                setActiveCategory('Now Playing');
                break;
            default:
                setActiveCategory('Popular Movies');
        }
        // Обновляем страницу при смене категории
        setPage(1);
    }, [location.pathname]);

    return (
        <div className={s.container}>
            <section className={s.section}>
                <div className={s.category}>
                    <div className={s.categoryButtons}>
                        <Button
                            onClick={() => changeCategoryInUrl('popular')}
                            variant={activeCategory === 'Popular Movies' ? 'contained' : 'outlined'}
                        >
                            Popular Movies
                        </Button>
                        <Button
                            onClick={() => changeCategoryInUrl('top_rated')}
                            variant={activeCategory === 'Top Rated Movies' ? 'contained' : 'outlined'}
                        >
                            Top Rated Movies
                        </Button>
                        <Button
                            onClick={() => changeCategoryInUrl('upcoming')}
                            variant={activeCategory === 'Upcoming Movies' ? 'contained' : 'outlined'}
                        >
                            Upcoming Movies
                        </Button>
                        <Button
                            onClick={() => changeCategoryInUrl('now_playing')}
                            variant={activeCategory === 'Now Playing' ? 'contained' : 'outlined'}
                        >
                            Now Playing Movies
                        </Button>
                    </div>
                </div>
                <h2 style={{ color: theme.palette.text.primary }} className={s.titleResult}>{activeCategory}</h2>
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
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange}
                    count={count}
                />
            </section>
        </div>
    );
};