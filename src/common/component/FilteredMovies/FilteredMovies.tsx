import s from "./FilteredMovie.module.css";
import {useGetDiscoverMovieQuery, useGetPopularQuery} from "../MainPage/api/mainPageApi";
import {SearchResult} from "../SearchPage/SearchResult/SearchResult";
import {Filters_Sort} from "./Filters_Sort/Filters_Sort";
import {useState} from "react";

export const FilteredMovies = () => {
    const [params, setParams] = useState({page: 1, sort_by: 'original_title.asc'});
    const {data, refetch} = useGetDiscoverMovieQuery({payload: params})
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
                setParams({page: 20, sort_by: 'original_title.asc'})
                break
            case 'original_title.desc':
                setParams({page: 20, sort_by: 'original_title..desc'})
                break
        }




        refetch()
    }
    return <div className={s.container}>
        <section className={s.section}>
            <div className={s.wrapper}>
                <div className={s.menu}>
                    <Filters_Sort selectFilter={selectFilter}/>
                </div>
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
            </div>
        </section>
    </div>
}