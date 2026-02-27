import {useNavigate} from "react-router-dom";
import {SearchInput} from "../SearchInput/searchInput";
import s from "./Search.module.css";
import {useSearchMonieQuery} from "./api/searchPageApi";
import {useSelector} from "react-redux";
import {baseApi} from "../../../app/api/baseApi";
import {useEffect, useState} from "react";
import {SearchResult} from "./SearchResult/SearchResult";

export const Search = () => {
    const [inputValue, setinputValue] = useState('')
    const [onChangeValue, setonChangeValue] = useState('')

    const {data,isLoading, isFetching,isSuccess,status} = useSearchMonieQuery({query: inputValue})
    const handleSearch = (value: string) => {
        setinputValue(value)
    }
    const handleChange=(value)=>{
        setonChangeValue(value)
    }
    return <div className={s.container}>

        <section className={s.page}>
            <h2 className={s.title}>Search Results</h2>
            <SearchInput handleChange={handleChange} handleSearch={handleSearch}/>
            {onChangeValue.trim() === ''  ? (
                <h3>Enter a movie title to start searching.</h3>
            ) : isSuccess ? (
                <h2 className={s.titleResult}>Results for "{inputValue}"</h2>
            ) : null}
            <div  className={s.movies}>
                {data?.results.map((el)=>{
                    return <SearchResult key={el.id} vote_average={el.vote_average} title={el.title} poster_path={el.poster_path} />
                })}
            </div>
        </section>

    </div>
}