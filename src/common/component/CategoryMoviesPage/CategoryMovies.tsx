import {useGetPopularQuery} from "../MainPage/api/mainPageApi";
import {SearchResult} from "../SearchPage/SearchResult/SearchResult";
import {Pagination} from "../../Pagination/Pagination";
import {useState} from "react";
import {Button, useTheme} from "@mui/material";
import s from "./CategoryMovies.module.css";

export const CategoryMovies=()=>{
    const [page, setPage] = useState(1);

    const {data,refetch} = useGetPopularQuery({page})
    const currentPage = data?.page
    const count = data?.total_pages
    const theme = useTheme();
    const setCurrentPage = (newpage) => {
        console.log(newpage)
        setPage(newpage)
        refetch({page:newpage})
    }
    return <div className={s.container}>
        <section className={s.section}>
        <div className={s.category} >
            <div className={s.categoryButtons}>
            <Button variant="contained">Contained</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="contained">Contained</Button>
        </div>
        </div>
        <h2 style={{ color: theme.palette.text.primary }} className={s.titleResult}>Popular Movies</h2>
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
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                    count={count}/>

    </section>
    </div>
}