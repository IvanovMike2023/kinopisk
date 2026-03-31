import s from "./FilteredMovie.module.css";
import {useGetDiscoverMovieQuery, useGetMovieListQuery} from "../../app/api/mainPageApi";
import {Filters_Sort} from "./Filters_Sort/Filters_Sort";
import {useCallback, useEffect, useRef, useState} from "react";
import {Pagination} from "../../shared/Pagination/Pagination";
import {MovieCard} from "../../entities/MovieCard/MovieCard";
import {useFavorites} from "../../shared/helper/useFavorites";
import {SkeletonFilteredMovies} from "./SkeletonFilteredMovies/SkeletonFilteredMovies";

export const FilteredMovies = () => {
    const initialParams = {
        page: 1,
        sort_by: 'popularity.desc',
        'vote_average.gte': 0,
        'vote_average.lte': 10,
    };
    const [params, setParams] = useState(initialParams);
    const [_, setDisplayedData] = useState(null);
    const [isresetFilter, setresetFilter] = useState(false);
    const {likedIds, toggleFavorite} = useFavorites()

    const {data,isLoading} = useGetDiscoverMovieQuery({params})


    useEffect(() => {
        if (data) {
            setDisplayedData(data);
        }
    }, [data]);
    const currentPage = data?.page ?? 1;
    const count = data?.total_pages?? 1;
    const setCurrentPage = (value) => {
        setParams(prev => ({...prev, page: value}))
    }
    const selectFilter = (value) => {
        switch (value) {
            case 'popularity.asc':
                setParams(prev => ({...prev, page: 1, sort_by: 'popularity.asc'}));
                break;
            case 'popularity.desc':
                setParams(prev => ({...prev, page: 1, sort_by: 'popularity.desc'}));
                break;
            case 'vote_average.asc':
                setParams(prev => ({...prev, page: 1, sort_by: 'vote_average.asc'}));
                break;
            case 'vote_average.desc':
                setParams(prev => ({...prev, page: 1, sort_by: 'vote_average.desc'}));
                break;
            case 'primary_release_date.desc':
                setParams(prev => ({...prev, page: 1, sort_by: 'primary_release_date.desc'}));
                break;
            case 'primary_release_date.asc':
                setParams(prev => ({...prev, page: 1, sort_by: 'primary_release_date.asc'}));
                break;
            case 'original_title.asc':
                setParams(prev => ({...prev, page: 1, sort_by: 'original_title.asc'}));
                break;
            case 'original_title.desc':
                setParams(prev => ({...prev, page: 1, sort_by: 'original_title.desc'}));
                break;
        }
    }

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const debouncedSetParams = useRef();
    const createDebounce = useCallback(() => {
        debouncedSetParams.current = debounce((value) => {
            setParams(prev => ({...prev, 'vote_average.gte': value[0], 'vote_average.lte': value[1]}));
        }, 200);
    }, [setParams]);
    useEffect(() => {
        createDebounce();
    }, [createDebounce]);
    const selectFilterSlider = (value) => {
        debouncedSetParams.current(value);
    }

    const selectButtonFilter = (id, isClick) => {
        if (isClick) {
            setParams(prev => {
                const iswith_genres = prev.with_genres ? prev.with_genres.split(',') : []
                if (!iswith_genres.includes(id)) {
                    iswith_genres.push(id)
                }
                return {...prev, with_genres: iswith_genres.join()}
            })
        } else {
            const {with_genres, ...rest} = params;
            if (with_genres.includes(id)) {
                if (with_genres === id) {
                    return setParams(rest)
                }

                const with_genres_id = with_genres.replace(/,/g, " ").split(' ').filter((fl:string) => fl != id).toString()
                const newParams = {...params, with_genres: with_genres_id}
                setParams(newParams)
            }
        }
    }

    const resetFilter=()=>{
         setresetFilter(!isresetFilter)
        setParams(initialParams);
    }

    return <div className={s.container}>

        <section className={s.section}>
            <div className={s.wrapper}>
                <div className={s.contentRow}>
                    <div className={s.menu}>
                        <Filters_Sort isresetFilter={isresetFilter} resetFilter={resetFilter} selectButtonFilter={selectButtonFilter} selectFilterSlider={selectFilterSlider}
                                      selectFilter={selectFilter}/>
                    </div>
                    {
                        isLoading? <SkeletonFilteredMovies/>
                    :
                    <section>
                        <div className={s.movies}>
                            {data?.results.map((el) => (
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
                        <div className={s.pagination_wrapper}>
                            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                                        count={count}/>
                        </div>
                    </section>
                }

                </div>

            </div>
        </section>

    </div>
}