import s from "./FilteredMovie.module.css";
import {useGetDiscoverMovieQuery, useGetPopularQuery} from "../MainPage/api/mainPageApi";
import {SearchResult} from "../SearchPage/SearchResult/SearchResult";
import {Filters_Sort} from "./Filters_Sort/Filters_Sort";
import {useCallback, useEffect, useRef, useState} from "react";
import {Pagination} from "../../Pagination/Pagination";

export const FilteredMovies = () => {

    const [params, setParams] = useState({
        page: 1,
        sort_by: 'original_title.asc',
        'vote_average.gte': 7,
        'vote_average.lte': 8
    });
    const {data, refetch} = useGetDiscoverMovieQuery({payload: params})
    const currentPage = data?.page
    const count = data?.total_pages
    const setCurrentPage = (value) => {
        setParams(prev => ({...prev, page: value}))
    }
    const selectFilter = (value) => {
        switch (value) {
            case 'popularity.asc' :
                setParams({page: 1, sort_by: 'popularity.asc'})
                break
            case 'popularity.desc':
                setParams({page: 1, sort_by: 'popularity.desc'})
                break
            case 'vote_average.asc':
                setParams({page: 1, sort_by: 'vote_average.asc'})
                break
            case 'vote_average.desc':
                setParams({page: 1, sort_by: 'vote_average.desc'})
                break
            case 'primary_release_date.desc':
                setParams({page: 1, sort_by: 'primary_release_date.desc'})
                break
            case 'primary_release_date.asc':
                setParams({page: 1, sort_by: 'primary_release_date.asc'})
                break
            case 'original_title.asc':
                setParams({page: 1, sort_by: 'original_title.asc'})
                break
            case 'original_title.desc':
                setParams({page: 1, sort_by: 'original_title..desc'})
                break
        }
    }
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    const debouncedSetParams = useRef();

    const createDebounce = useCallback(() => {
        debouncedSetParams.current = debounce((value) => {
            setParams(prev => ({ ...prev, 'vote_average.gte': value[0], 'vote_average.lte': value[1] }));
        }, 200);
    }, [setParams]);
    useEffect(() => {
        createDebounce();
    }, [createDebounce]);
    const selectFilterSlider = (value) => {
        debouncedSetParams.current(value);
    }

    useEffect(() => {
        refetch();
    }, [params]);
    return <div className={s.container}>
        <section className={s.section}>
            <div className={s.wrapper}>
                <div className={s.contentRow}>
                    <div className={s.menu}>
                        <Filters_Sort selectFilterSlider={selectFilterSlider} selectFilter={selectFilter}/>
                    </div>
                    <section>
                        <div className={s.movies}>
                            {data?.results.map((el) => (
                                <SearchResult
                                    key={el.id}
                                    vote_average={el.vote_average}
                                    title={el.title}
                                    poster_path={el.poster_path}
                                />
                            ))}

                        </div>
                        <div className={s.pagination_wrapper}>
                            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                                        count={count}/>
                        </div>
                    </section>
                </div>

            </div>
        </section>
    </div>
}