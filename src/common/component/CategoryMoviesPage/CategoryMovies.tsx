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

export const CategoryMovies = () => {
    const [page, setPage] = useState(1);
    const [dataitem, setDataitem] = useState('Popular');

    const {data: Popular, refetch: refetchPopular} = useGetPopularQuery({page})
    const {data: topRatedData, refetch: refetchTopRated} = useGetTopRatedQuery({page});
    const {data: UpcomingData, refetch: refetchUpcoming} = useGetUpcomingQuery({page});
    const {data: NowPlayingData, refetch: refetchNowPlaying} = useGetNowPlayingQuery({page});
    const [results, setResults] = useState(Popular);

    const currentPage = results?.page
    const count = results?.total_pages
    const theme = useTheme();
    const setCurrentPage = (newpage) => {
        setPage(newpage)
    }
    const getPopularMovies = () => {
        refetchPopular().unwrap().then(() => {
            setResults(Popular || [])
            setDataitem('Popular')
            setPage(1)
        });
    }
    const getTopRated = () => {
        refetchTopRated().unwrap().then(() => {
            setResults(topRatedData || [])
            setDataitem('TopRated')
            setPage(1)
        });
    }
    const Upcoming = () => {
        refetchUpcoming().unwrap().then(() => {
            setResults(UpcomingData || [])
            setDataitem('Upcoming')
            setPage(1)
        });
    }
    const NowPlaying = () => {
        refetchNowPlaying().unwrap().then(() => {
            setResults(NowPlayingData || [])
            setDataitem('NowPlaying')
            setPage(1)
        });
    }
    useEffect(() => {
        if (dataitem === 'Popular') {
            setResults(Popular || []);
        } else if (dataitem === 'TopRated') {
            setResults(topRatedData || []);
        } else if (dataitem === 'Upcoming') {
            setResults(UpcomingData || []);
        } else if (dataitem === 'NowPlaying') {
            setResults(NowPlayingData || []);
        }
    }, [Popular, topRatedData, UpcomingData, NowPlayingData, dataitem]);
    return <div className={s.container}>
        <section className={s.section}>
            <div className={s.category}>
                <div className={s.categoryButtons}>
                    <Button onClick={getPopularMovies} variant="contained">Popular Movies</Button>
                    <Button onClick={getTopRated} variant="contained">Top Rated Movies</Button>
                    <Button onClick={Upcoming} variant="contained">Upcoming Movies</Button>
                    <Button onClick={NowPlaying} variant="contained">Now Playing Movies</Button>
                </div>
            </div>
            <h2 style={{color: theme.palette.text.primary}} className={s.titleResult}>Popular Movies</h2>
            <div className={s.movies}>
                {results?.results.map((el) => (
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