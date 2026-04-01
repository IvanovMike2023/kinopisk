import s from "./FilteredMovie.module.css";
import {useGetDiscoverMovieQuery} from "../../app/api/mainPageApi";
import {Filters_Sort} from "./Filters_Sort/Filters_Sort";
import {useCallback, useMemo, useState} from "react";
import {Pagination} from "../../shared/Pagination/Pagination";
import {MovieCard} from "../../entities/MovieCard/MovieCard";
import {useFavorites} from "../../shared/helper/useFavorites";
import {SkeletonFilteredMovies} from "./SkeletonFilteredMovies/SkeletonFilteredMovies";

type initialParamsType = {
    page: number,
    sort_by: string,
    'vote_average.gte': number,
    'vote_average.lte': number,
    with_genres?: string
}
export const FilteredMovies = () => {
    const initialParams = {
        page: 1,
        sort_by: 'popularity.desc',
        'vote_average.gte': 0,
        'vote_average.lte': 10,
    };
    const [params, setParams] = useState<initialParamsType>(initialParams);
    const [isresetFilter, setresetFilter] = useState(false);
    const {likedIds, toggleFavorite} = useFavorites()

    const {data, isLoading} = useGetDiscoverMovieQuery({params})

    const currentPage = data?.page ?? 1;
    const count = data?.total_pages ?? 1;
    const setCurrentPage = (value: number) => {
        setParams(prev => ({...prev, page: value}))
    }
    const selectFilter = useCallback((value: string) => {
        setParams(prev => ({...prev, page: 1, sort_by: value}));
    }, [])
    const debounce = <T extends (...args: unknown[]) => unknown>(
        func: T,
        delay: number
    ) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: Parameters<T>): void => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }
    const debouncedSetParams = useMemo(() => {
        return debounce((value: number[]) => {
            setParams(prev => ({...prev, 'vote_average.gte': value[0], 'vote_average.lte': value[1]}));
        }, 200)
    }, [])
    const selectFilterSlider = (value: number[]) => {
        debouncedSetParams(value);
    }
    const selectButtonFilter = (id: string, isClick: boolean) => {
        setParams(prev => {
                const genres = prev.with_genres ? prev.with_genres.split(',') : []
                const newGenres = isClick ? [...genres, id] : genres.filter(f => f != id)
                return {...prev, with_genres: newGenres.join(',') || undefined};
            }
        )
    }
    const resetFilter = () => {
        setresetFilter(!isresetFilter)
        setParams(initialParams);
    }
    return <div className={s.container}>

        <section className={s.section}>
            <div className={s.wrapper}>
                <div className={s.contentRow}>
                    <div className={s.menu}>
                        <Filters_Sort isresetFilter={isresetFilter} resetFilter={resetFilter}
                                      selectButtonFilter={selectButtonFilter} selectFilterSlider={selectFilterSlider}
                                      selectFilter={selectFilter}/>
                    </div>
                    {
                        isLoading ? <SkeletonFilteredMovies/>
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