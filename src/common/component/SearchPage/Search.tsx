import {useNavigate} from "react-router-dom";
import {SearchInput} from "../SearchInput/searchInput";
import s from "./Search.module.css";
import {useSearchMonieQuery} from "./api/searchPageApi";
import {useSelector} from "react-redux";
import {baseApi} from "../../../app/api/baseApi";
import {useState} from "react";
import {SearchResult} from "./SearchResult/SearchResult";

export const Search = () => {
    const [inputValue, setinputValue] = useState('')

    const {data, isFetching} = useSearchMonieQuery({query: inputValue})
    const handleSearch = (value: string) => {
        setinputValue(value)
    }
    if (!isFetching) {
        console.log(data.results)
    }

    return <div className={s.container}>
        <section className={s.page}>
            <h2 className={s.title}>Search Results</h2>
            <SearchInput handleSearch={handleSearch}/>
            <div  className={s.movies}>
                {data?.results.map((el)=>{
                    return <SearchResult title={el.title} backdrop_path={el.backdrop_path} />
                })}
            </div>


        </section>

    </div>
}