import {Header} from '../common/component/Header/Header'
import s from './App.module.css'
import {MainPage} from "../common/component/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import {SearchPages} from "../common/component/SearchPage/SearchPages";
import {ThemeProvider} from "@mui/material/styles";
import {CategoryMovies} from "../common/component/CategoryMoviesPage/CategoryMovies";
import {Footer} from "../common/component/Footer/Footer";
import {FilteredMovies} from "../common/component/FilteredMovies/FilteredMovies";
import {FavoritesPage} from "../common/component/FavoritesPage/FavoritesPage";
import {MoviePage} from "../common/component/MoviePage/MoviePage";
import {getTheme} from "../common/utils/theme/theme";
import {useThemeMode} from "../common/helper/useThemeMode";
import {GlobalSnackbar} from "../common/component/GlobalSnackbar/GlobalSnackbar";

function App() {
    const [darkMode,toggleTheme]=useThemeMode()
    const theme=getTheme(darkMode)
    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}
                 style={{backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}}>
                <Header darkMode={darkMode} handleThemeChange={toggleTheme}/>
                <GlobalSnackbar />
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/movies/:category" element={< CategoryMovies/>}/>
                    <Route path="/movies/filtered-movies" element={< FilteredMovies/>}/>
                    <Route path="/search" element={< SearchPages/>}/>
                    <Route path="/favorites" element={< FavoritesPage/>}/>
                    <Route path="/movie/:id" element={<MoviePage />} />
                </Routes>
                <Footer/>
            </div>
        </ThemeProvider>
    )
}

export default App
