import {useLocation} from "react-router-dom";
import {SearchInput} from "../SearchInput/searchInput";
import s from "./Search.module.css";
import {useState} from "react";
import {SearchResult} from "./SearchResult/SearchResult";
import {useSearchMovieQuery} from "./api/searchPageApi";

export const Search = () => {
    const [inputValue, setinputValue] = useState('')
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const query = params.get('query') || '';
    const {data,isLoading, isFetching,isSuccess,status,refetch} = useSearchMovieQuery({query: query})
    console.log(query)
const handleInput=(value)=>{
    setinputValue(value)
    }
    return <div className={s.container}>

        <section className={s.page}>
            <h2 className={s.title}>Search Results</h2>
            <SearchInput handleInput={handleInput} query={query} />

            { query!=''    ?
                <h2 className={s.titleResult}>Results for "{query}"</h2>
                :
                <h3>Enter a movie title to start searching.</h3>

            }
            <div  className={s.movies}>
                {data?.results.map((el)=>{
                    return <SearchResult key={el.id} vote_average={el.vote_average} title={el.title} poster_path={el.poster_path} />
                })}
            </div>
        </section>

    </div>
}