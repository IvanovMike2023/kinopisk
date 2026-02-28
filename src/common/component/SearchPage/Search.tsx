import {useLocation, useNavigate} from "react-router-dom";
import {SearchInput} from "../SearchInput/searchInput";
import s from "./Search.module.css";
import {useState} from "react";
import {SearchResult} from "./SearchResult/SearchResult";
import {useSearchMovieQuery} from "./api/searchPageApi";

export const Search = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate()
    const queryFromURL = params.get('query') || '';
    const [query, setQuery] = useState(queryFromURL);

    const [inputValue, setinputValue] = useState(query)

    const {data} = useSearchMovieQuery({query: query})

    const handleInput = (value) => {
        setinputValue(value)
        if (value === '') {
            setinputValue('')
            // Удаляем параметр query, если ввод пустой
            navigate({
                pathname: location.pathname,
                search: ''
            });
            setQuery(''); // Обновляем состояние `query` в компоненте
        }
    }
    const handleSearch = (f) => {
        // Обновляем URL с новым query
        const params = new URLSearchParams(location.search);
        params.set('query', f);
        setQuery(f); // Обновляем состояние `query`
    }
    return <div className={s.container}>
        <section className={s.page}>
            <h2 className={s.title}>Search Results</h2>
            <SearchInput handleSearch={handleSearch} handleInput={handleInput} query={query}/>
            { inputValue != '' && query.trim() != '' && data?.results.length===0 ? (<><h2 className={s.titleResult}>Results for "{query}"</h2><span className={s.titleResultSpan}>No matches found for {query}</span></>):
                (  inputValue === '' || query.trim() === '' ?
                (<h3 className={s.titleResultSpan}>Enter a movie title to start searching.</h3>)
                :
                (
                    query.trim() !== '' && (
                        <>
                            <h2 className={s.titleResult}>Results for "{query}"</h2>
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
                        </>
                    )
                )
                )
            }
        </section>

    </div>
}