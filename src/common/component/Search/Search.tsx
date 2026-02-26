import {useNavigate} from "react-router-dom";
import {SearchInput} from "../searchInput/searchInput";
import s from "./Search.module.css";

export const Search=()=>{

    return    <div className={s.container}>
    <section className={s.page}>
            <h2 className={s.title} >Search Results</h2>
            <SearchInput/>
    </section>

    </div>
}