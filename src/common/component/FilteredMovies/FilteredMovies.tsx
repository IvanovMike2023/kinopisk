import s from "./FilteredMovie.module.css";
import {useGetDiscoverMovieQuery, useGetPopularQuery} from "../MainPage/api/mainPageApi";
import {SearchResult} from "../SearchPage/SearchResult/SearchResult";
import {Filters_Sort} from "./Filters_Sort/Filters_Sort";
import {useState} from "react";

export const FilteredMovies=()=>{
    const [params, setParams] = useState({ page: 20, sort_by: 'original_title.asc' });

    const {data,refetch} =  useGetDiscoverMovieQuery({payload: params})
    const selectFilter=(value)=>{
        switch (value){
            case 'popularity.asc' :
                setParams({ page: 20, sort_by: 'popularity.asc' })
                break
            case 'popularity.desc':
                setParams({ page: 20, sort_by: 'popularity.desc' })
                break
        }
        refetch()
    }
    return <div className={s.container}>
        <section className={s.section}>
            <div className={s.wrapper}>
                <div className={s.menu}>
                    <Filters_Sort selectFilter={selectFilter} />
                </div>
                <div className={s.movies}>
                    {data?.results.map((el)=>(
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