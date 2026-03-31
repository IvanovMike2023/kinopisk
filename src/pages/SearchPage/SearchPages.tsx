import {useLocation, useNavigate} from "react-router-dom";
import {SearchInput} from "../../shared/utils/SearchInput/searchInput";
import s from "./Search.module.css";
import {useState} from "react";
import {Pagination} from "../../shared/Pagination/Pagination";
import {useTheme} from "@mui/material";
import {MovieCard} from "../../entities/MovieCard/MovieCard";
import {useFavorites} from "../../shared/helper/useFavorites";
import {useGetSearchMovieQuery} from "../../app/api/mainPageApi";
import {SkeletonSearchPage} from "./SkeletonSearchPage/SkeletonSearchPage";

export const SearchPages = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate()
    const queryFromURL: string = params.get('query') || '';
    const [query, setQuery] = useState(queryFromURL);
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const {likedIds, toggleFavorite} = useFavorites()

    const [inputValue, setinputValue] = useState(query)

    const {data,refetch,isLoading } = useGetSearchMovieQuery({query: query, page: page })
    const handleInput = (value:string) => {
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
    const handleSearch = (f:string) => {
        // Обновляем URL с новым query
        const params = new URLSearchParams(location.search);
        params.set('query', f);
        setQuery(f); // Обновляем состояние `query`
    }
    const currentPage = data?.page ?? 1
    const count = data?.total_pages ?? 0
    const setCurrentPage = (newpage:number) => {
        setPage(newpage)
        refetch()
    }
    if(isLoading) return <SkeletonSearchPage/>
    return <div className={s.container}>
        <section className={s.page}>
            <h2 style={{color: theme.palette.text.primary }}>Search Results</h2>
            <SearchInput handleSearch={handleSearch} handleInput={handleInput} query={query}/>
            {inputValue != '' && query.trim() != '' && data?.results.length === 0 ? (<><h2
                    style={{color: theme.palette.text.primary }}>Results for "{query}"</h2><span className={s.titleResultSpan}>No matches found for {query}</span></>) :
                (inputValue === '' || query.trim() === '' ?
                        (<h3 className={s.titleResultSpan}>Enter a movie title to start searching.</h3>)
                        :
                        (
                            query.trim() !== '' && (
                                <>
                                    <h2 style={{ color: theme.palette.text.primary }} className={s.titleResult}>Results for "{query}"</h2>
                                    <div className={s.movies}>
                                        {data?.results.map((el) => (
                                            <MovieCard key={el.id}
                                                       data={{...el,
                                                           poster_path: el.poster_path || "",
                                                           backdrop_path: el.backdrop_path || "",
                                                       }}
                                                       id={el.id}
                                                       onLike={(id,e) => {
                                                           e.preventDefault();
                                                           toggleFavorite({
                                                               id,
                                                               title: el.title || 'Unknown Title',
                                                               poster_path: el.poster_path,
                                                               vote_average: el.vote_average
                                                           })
                                                       }}
                                                       isLiked={likedIds.includes(el.id)}/>
                                        ))}
                                    </div>
                                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                                                count={count}/>
                                </>
                            )
                        )
                )
            }
        </section>

    </div>
}