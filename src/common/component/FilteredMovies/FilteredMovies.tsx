import s from "./FilteredMovie.module.css";
import {useGetPopularQuery} from "../MainPage/api/mainPageApi";
import {SearchResult} from "../SearchPage/SearchResult/SearchResult";
import {Filters_Sort} from "./Filters_Sort/Filters_Sort";

export const FilteredMovies=()=>{
    const {data} = useGetPopularQuery({page: 1})
    return <div className={s.container}>
        <section className={s.section}>
            <div className={s.wrapper}>
                <div className={s.menu}>
                    <Filters_Sort/>
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