import {Container} from "@mui/material";
import {useGetPopularQuery} from "./api/mainPageApi";
import s from "./MainPage.module.css";

export const MainPage = () => {

    const {data} = useGetPopularQuery()
    console.log(data)
    const url = data?.results[0].backdrop_path
    return <Container maxWidth={"lg"} sx={{backgroundColor: 'skyblue'}}>

        <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${url})`}} className={s.section}>
            <div className={s.content}>
                Main Pageccccccccccccccccccccccccccccccccccccccc
            </div>

        </section>

    </Container>
}