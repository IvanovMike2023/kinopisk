import {Button, Container, TextField} from "@mui/material";
import {useGetPopularQuery} from "./api/mainPageApi";
import s from "./MainPage.module.css";
import {useState} from "react";

export const MainPage = () => {
    const [searchInput, setSearchInput] = useState('');

    const {data} = useGetPopularQuery()
    console.log(data?.results.length)
    const backdrop_path_number = Math.floor(Math.random() * data?.results.length)
    const url = data?.results[backdrop_path_number].backdrop_path

    const handleSearch = () => {
    }
    return        <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${url})`}} className={s.section}>
            <div className={s.content}>
                <h1>asdcascdxascascascsa</h1>
                <h1>asdcascdxascascascsa</h1>
                <form className={s.form}>
                    <TextField
                        label={searchInput ? "" : "Search for a movie"}
                        variant="outlined"
                        fullWidth
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 20, // задаёт радиус закругления
                                backgroundColor: '#1f2b40',
                                color:'#fff'
                            },
                        }}
                        style={{marginBottom: 10}}
                    />

                    {/* Кнопка поиска */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        style={{ marginBottom: 20, borderRadius: 40 }}
                    >
                       Search
                    </Button>
                </form>

            </div>

        </section>


}