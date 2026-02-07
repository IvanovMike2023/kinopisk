import {useNavigate} from "react-router-dom";
import {SearchInput} from "../searchInput/searchInput";
import s from "./SearchResult.module.css";

export const SearchResult=()=>{

    return    <div className={s.container}>
    <section className={s.page}>
            <h2 className={s.title} >Search Results</h2>
            <SearchInput/>
    </section>

    </div>
}